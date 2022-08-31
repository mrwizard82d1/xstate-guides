// State machine for a traffic light illustrating XState states.

import { createMachine } from 'xstate';

type LightMachineContext = undefined;

type LightMachineEvent =
    | { type: 'TIMER' };

export const lightMachine = createMachine<LightMachineContext, LightMachineEvent>(
    {
        predictableActionArguments: true,
        id: 'light',
        initial: 'green',
        states: {
            green: {
                on: { TIMER: 'yellow' },
            },
            yellow: {
                on: { TIMER: 'red' },
            },
            red: {
                on: { TIMER: 'green' },
            },
        },
    });

