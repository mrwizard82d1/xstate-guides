import { ComponentType } from 'react';

// Landing pages
import { GettingStartedPromise } from './GettingStartedPromise';
import { LightMachine } from './LightMachine'

interface Route {
    key: string,
    title: string,
    path: string,
    enabled: boolean,
    component: ComponentType,
}

export const routes: Array<Route> = [
    {
        key: 'getting-started-promise',
        title: 'Getting Started Promise',
        path: '/',
        enabled: true,
        component: GettingStartedPromise,
    },
    {
        key: 'light-machine',
        title: 'Light Machine',
        path: '/light-machine',
        enabled: true,
        component: LightMachine,
    },
];
