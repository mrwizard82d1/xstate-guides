import { createMachine } from 'xstate';

export const lightMachine = createMachine(
    {
        predictableActionArguments: true,

        // Machine identifier
        id: 'light',

        // Initial state
        initial: 'green',

        // Local context for the entire machine
        context: {
            elapsed: 0,
            direction: 'east',
        },

        // State definition
        states: {
            green: {},
            yellow: {},
            red: {},
        },
    },
);