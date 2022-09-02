import {createMachine} from "xstate";

type FetchMachineContext = {};

export type FetchMachineEvent =
    | { type: 'FETCH' }
    | { type: 'FULFILL' }
    | { type: 'REJECT' }
    | { type: 'ITEM.CLICK' }
    | { type: 'BACK' }
    | { type: 'RETRY' }

export const fetchMachine = createMachine<FetchMachineContext, FetchMachineEvent>(
    {
        predictableActionArguments: true,
        id: 'fetch-machine',

        // initial state
        initial: 'idle',

        // Define states using state nodes
        states: {
            idle: {
                on: {
                    FETCH: { target: 'pending' },
                },
            },
            pending: {
                on: {
                    FULFILL: { target: 'success' },
                    REJECT: { target: 'failure' },
                },
            },
            success: {
                // Initial child state
                initial: 'items',

                // Child states
                states: {
                    items: {
                        on: {
                            'ITEM.CLICK': { target: 'item' },
                        },
                    },
                    item: {
                        on: {
                            BACK: { target: 'items' },
                        },
                    },
                },
            },
            failure: {
                on: {
                    RETRY: { target: 'pending' },
                },
            },
        },
    })
