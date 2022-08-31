import { lightMachine } from './light-machine-states';

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
