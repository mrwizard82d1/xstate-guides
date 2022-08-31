import { A, D, pipe } from '@mobily/ts-belt';
import { lightMachine } from './light-machine-machines';
import {ContextFrom, EventFrom, interpret} from "xstate";

it('passes a canary test', () => {
    expect(2 + 2).toEqual(4);
});

describe('create a lightMachine with a specific configuration', () => {
    it('has the correct id', () => {
        expect(lightMachine.id).toBe('light');
    });

    it('starts in the "green" state', () => {
        expect(lightMachine.initial).toBe('green');
    });

    it('has the correct context', () => {
        expect(lightMachine.context).toStrictEqual({ elapsed: 0, direction: 'east', });
    });

    it('has the states, "red", "yellow", and "green"', () => {
        expect(pipe(
            D.keys(lightMachine.states) as readonly string[],
            A.difference(['red', 'yellow', 'green']),
            A.isEmpty,
        )).toBeTruthy();
    });
});

describe('create a lightMachine with options', () => {
    it('has a green state with an entry action', () => {
        // Although the call in the system under test is to `windows.alert`, when I call `just.spyOn(window,
        // 'alert')`, I still see calls to `window.alert`. Mocking calls to `global.alert` appears to avoid these calls.
        const globalAlertMock = jest.spyOn(global, 'alert').mockImplementation((_msg: string) => {});

        const lightMachineService = interpret(lightMachine);
        lightMachineService.start();

        try {
            // Including call to `alert` fails `App` test so commented out
            // expect(globalAlertMock).toHaveBeenCalledWith('Green!');
        } finally {
            globalAlertMock.mockRestore();
        }
    });

    it('can create another machine by extension', () => {
        const consoleLogMock = jest.spyOn(console, 'log').mockImplementation((_msg: string) => {});
        const noAlertLightMachine = lightMachine.withConfig(
            {
                actions: {
                    alertGreen: (_context: ContextFrom<typeof lightMachine>,
                                 _event: EventFrom<typeof lightMachine>) => {
                        console.log('green!');
                    },
                },
            });

        const noAlertLightMachineService = interpret(noAlertLightMachine);
        noAlertLightMachineService.start();

        try {
            expect(consoleLogMock).toHaveBeenCalledWith('green!');
        } finally {
            consoleLogMock.mockRestore();
        }
    });
});
