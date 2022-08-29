import {interpret, InterpreterFrom, StateFrom } from 'xstate';
import { promiseMachine  }from './promise';
import { D } from "@mobily/ts-belt";


test('canary test', () => {
    expect(2 + 2).toEqual(4);
});

describe('newly created promiseMachine', () => {
    it('has an id of "promise"', () => {
        expect(promiseMachine.id).toEqual('promise');
    });

    it('has an initial state of "pending"', () => {
        expect(promiseMachine.initial).toEqual('pending');
    });

    it('has three states: "pending", "resolved", "rejected"', () => {
        expect(D.keys(promiseMachine.states)).toEqual(['pending', 'resolved', 'rejected']);
    });

    it('specifies events that cause transitions from one state to another', () => {
        expect(D.keys(promiseMachine.states.pending.on)).toEqual(['RESOLVE', 'REJECT']);
    });

    it.each([
        { on: 'RESOLVE', to: { target: 'resolved' } },
        { on: 'REJECT', to: { target: 'rejected' } },
    ])('Transitions to $to on $on', ({ on, to }) => {
        const promiseService = interpret(promiseMachine);
        promiseService.start();
        const nextState = promiseService.send({ type: on });
        expect(nextState.value).toEqual(to.target);
    });

    it.each(
        [
            ['resolved'],
            ['rejected'],
        ])('specifies final state %s', (stateName) => {
            expect(promiseMachine.states[stateName].type).toEqual('final');
    });
});

describe('a state machine can be "run"', () => {
    it.each([
                { on: 'RESOLVE', to: 'resolved' },
                { on: 'REJECT', to: 'rejected' },
            ])('transitions on $on to $to', ({ on, to }) => {
                const promiseService: InterpreterFrom<typeof promiseMachine> = interpret(promiseMachine).start();
                const actual: StateFrom<typeof promiseMachine> = promiseService.send(on);
                expect(actual.value).toEqual(to);
    });
});
