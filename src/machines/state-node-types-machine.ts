// This module illustrates the state node type; however, other than creating the machine successfully, it is unclear
// how one might test this field since the `type` property (or anything similar) is not exposed.

import {createMachine} from "xstate";

export const stateNodeTypesMachine = createMachine(
    {
        predictableActionArguments: true,
        id: 'state-node-types',
        initial: 'idle',
        // Define very complex states
        states: {
            idle: {
                type: 'atomic',
                on: {
                    FETCH: { target: 'pending' }
                }
            },
            pending: {
                type: 'parallel',
                states: {
                    resource1: {
                        type: 'compound',
                        initial: 'pending',
                        states: {
                            pending: {
                                on: {
                                    'FULFILL.resource1': { target: 'success' }
                                }
                            },
                            success: {
                                type: 'final'
                            }
                        }
                    },
                    resource2: {
                        type: 'compound',
                        initial: 'pending',
                        states: {
                            pending: {
                                on: {
                                    'FULFILL.resource2': { target: 'success' }
                                }
                            },
                            success: {
                                type: 'final'
                            }
                        }
                    }
                },
                onDone: 'success'
            },
            success: {
                type: 'compound',
                initial: 'items',
                states: {
                    items: {
                        on: {
                            'ITEM.CLICK': { target: 'item' }
                        }
                    },
                    item: {
                        on: {
                            BACK: { target: 'items' }
                        }
                    },
                    hist: {
                        type: 'history',
                        history: 'shallow'
                    }
                }
            }
        }
    });
