import { fetchMachine, FetchMachineEvent } from './fetch-machine';

describe('fetch-machine.spec should', () => {
    it('pass a canary test', () => {
        expect(2 + 2).toBe(4);
    });
})

describe('fetchMachine should', () => {
    it.each(
        [
            { from: 'idle', to: 'pending' , on: 'FETCH' },
            { from: 'pending', to: { success: 'items' }, on: 'FULFILL' },
            { from: 'pending', to: 'failure', on: 'REJECT' },
            { from:  { success: 'items' } , to: { success: 'item' }, on: 'ITEM.CLICK' },
            { from:  { success: 'item' } , to: { success: 'items' }, on: 'BACK' },
            { from:  'failure' , to: 'pending', on: 'RETRY' },
        ])('transition from "$from" to "$to" when "$on" received',
           ({ from, to, on }) => {
            const { value } = fetchMachine.transition(from, { type: on } as FetchMachineEvent);
            expect(value).toEqual(to);
    });
})
