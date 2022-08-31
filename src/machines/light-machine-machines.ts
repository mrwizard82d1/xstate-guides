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
            green: {
                // Define an action referenced by a string
                entry: 'alertGreen',
            },
            yellow: {},
            red: {},
        },
    },
    {
        actions: {
            // Action implementation
            alertGreen: (_context: { elapsed: number, direction: string },
                         _event) => {
                // Call to `alert` breaks `App` test. I do not know why.
                // alert('Green!');
            }
        },
        delays: {},
        guards: {},
        services: {},
    }
);