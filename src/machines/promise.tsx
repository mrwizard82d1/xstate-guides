import { createMachine } from 'xstate';

const promiseMachine = createMachine(
    {
        predictableActionArguments: true,  // Recommended for V5 compatibility
        id: 'promise',
        initial: 'pending',
        states: {
            pending: {
                on: {
                    'RESOLVE': { target: 'resolved' },
                    'REJECT': { target: 'rejected' },
                },
            },
            resolved: {
                type: 'final',
            },
            rejected: {
                type: 'final',
            },
        },
    }
);

export default promiseMachine;
