import { lightMachine } from './light-machine-states';
import { createMachine, EventFrom } from "xstate";

const lightMachineWithNestedState = createMachine(
    {
        predictableActionArguments: true,
        id: 'trafficLight',
        initial: 'red',
        states: {
            red: {
                initial: 'stop',
                states: {
                    stop: {},
                },
            },
        },
    });

describe('Test environment', () => {
    it('should pass a canary test', () => {
        expect(2 + 2).toBe(4);
    });
})

describe('lightMachine illustrating XState states', () => {
    it('should initially be "green"', () => {
        expect(lightMachine.initialState.value).toBe('green');
    });

    it('should have an undefined context', () => {
        expect(lightMachine.initialState.context).toBeUndefined();
    });

    it.each(
        [
            { from: 'green', to: 'yellow' },
            { from: 'yellow', to: 'red' },
            { from: 'red', to: 'green' },
        ])('should transition from $from to $to', ({ from, to }) => {

        const nextState = lightMachine.transition(from, { type: 'TIMER' });
        expect(nextState.value).toBe(to);
    });
})

describe('state.matches', () => {

    it('should match parent state alone', () => {
        expect(lightMachineWithNestedState.initialState.matches('red')).toBeTruthy();
    });

    it('should match an object with parent state name and child state name', () => {
        expect(lightMachineWithNestedState.initialState.matches({ red: 'stop'})).toBeTruthy();
    });

    it('should match a string of the form "parent.child"', () => {
        expect(lightMachineWithNestedState.initialState.matches('red.stop')).toBeTruthy();
    });

    it('should not match a different top level state', () => {
        expect(lightMachineWithNestedState.initialState.matches('green')).toBeFalsy();
    });

    it('should match one of many states', () => {
        const anyMatches = [{red: 'stop'}, {red: 'go'}].some(lightMachineWithNestedState.initialState.matches);
        expect(anyMatches).toBeTruthy();
    });
})

describe('state.nextEvents should', () => {
    const lightThatMightFlash = createMachine(
        {
            predictableActionArguments: true,
            id: 'trafficLightThatFlashes',
            initial: 'green',
            states: {
                green: {
                    on: {
                        TIMER: 'yellow',
                        EMERGENCY: 'allRed',
                    },
                },
                yellow: {
                    on: {
                        TIMER: 'red'
                    },
                },
                red: {},
                allRed: {}
            },
        });

    it('returns many items if multiple events cause a transition', () => {
        expect(lightThatMightFlash.initialState.nextEvents).toEqual(['TIMER', 'EMERGENCY']);
    });

    it('returns one item if one events cause a transition', () => {
        const nextState = lightThatMightFlash.transition('green', { type: 'TIMER' });
        expect(nextState.nextEvents).toEqual(['TIMER']);
    });

    it('returns no items if no events cause a transition', () => {
        const nextState = lightThatMightFlash.transition('yellow', { type: 'TIMER' });
        expect(nextState.nextEvents).toEqual([]);
    });
})

describe('state.changed should', () => {
    it('return `undefined` if initial state with no history', () => {
        expect(lightMachine.initialState.changed).toBeUndefined();
    });

    it('return true if state changed', () => {
        const nextState = lightMachine.transition(lightMachine.initialState, { type: 'TIMER' });
        expect(nextState.changed).toBeTruthy();
    });

    it('return false if state unchanged', () => {
        const nextState =
            lightMachine.transition(lightMachine.initialState,
                                    { type: 'NO_SUCH_EVENT' } as unknown as EventFrom<typeof lightMachine>);
        expect(nextState.changed).toBeFalsy();
    });
})

describe('state.done should', () => {
    const answeringMachine = createMachine(
        {
            initial: 'unanswered',
            states: {
                unanswered: {
                    on: {
                        ANSWER: { target: 'answered' },
                    },
                },
                answered: {
                    type: 'final',
                },
            },
        });
    it('return true if state is of final type', () => {
        expect(answeringMachine.transition(answeringMachine.initialState, { type: 'ANSWER' })).toBeTruthy();
    });

    it('return false if state is not of final type', () => {
        expect(answeringMachine.initialState.done).toBeFalsy();
    });
})

describe('state.toStrings() should', () => {
    it('return all strings for nested state', () => {
        expect(lightMachineWithNestedState.initialState.toStrings()).toEqual(['red', 'red.stop']);
    });

    it('returns a single sting for "simple" state', () => {
        const nextState = lightMachine.transition('yellow', { type: 'TIMER' });
        expect(nextState.toStrings()).toEqual(['red']);
    });
})
