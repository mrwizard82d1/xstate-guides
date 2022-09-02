import { stateNodeTypesMachine } from "./state-node-types-machine";

describe('state-node-types-machine.spec should', () => {
    it('pass a canary test', () => {
        expect(2 + 2).toBe(4);
    })
})

describe('stateNodeTypes should', () => {
    it('be successfully created', () => {
        expect(stateNodeTypesMachine).not.toBeFalsy();
    });

    it('start in the idle state', () => {
        expect(stateNodeTypesMachine.initialState.value).toBe('idle');
    });

    it('transitions to parallel states from idle', () => {
        const nextState = stateNodeTypesMachine.transition('idle', { type: 'FETCH' });
        expect(nextState.toStrings()).toEqual( [
            'pending',
            'pending.resource1',
            'pending.resource2',
            'pending.resource1.pending',
            'pending.resource2.pending'
            ]);
    });

    it('transitions to parallel states on "FULFILL.resource1" from resource1.pending', () => {
        const nextState = stateNodeTypesMachine.transition('pending.resource1.pending',
                                                           { type: 'FULFILL.resource1' });
        expect(nextState.toStrings()).toEqual( [
                                                   'pending',
                                                   'pending.resource1',
                                                   'pending.resource2',
                                                   'pending.resource1.success',
                                                   'pending.resource2.pending'
                                               ]);
    });

    it('transitions to parallel states on "FULFILL.resource2" from resource2.pending', () => {
        const nextState = stateNodeTypesMachine.transition('pending.resource2.pending',
                                                           { type: 'FULFILL.resource2' });
        expect(nextState.toStrings()).toEqual( [
                                                   'pending',
                                                   'pending.resource2',
                                                   'pending.resource1',
                                                   'pending.resource2.success',
                                                   'pending.resource1.pending',
                                               ]);
    });

    it('transitions to success.items on "FULFILL.resource2" and "FULFILL.resource1" from resource2.pending', () => {
        const stateT0 = stateNodeTypesMachine.transition(stateNodeTypesMachine.initialState,
                                                             { type: 'FETCH' })
        const stateT1 = stateNodeTypesMachine.transition(stateT0, { type: 'FULFILL.resource2' });
        const stateT2 = stateNodeTypesMachine.transition(stateT1, { type: 'FULFILL.resource1' });
        expect(stateT2.value).toEqual( { success: 'items' });
    });
})
