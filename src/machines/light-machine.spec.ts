import { A, D, pipe } from '@mobily/ts-belt';
import { lightMachine } from './light-machine';

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
