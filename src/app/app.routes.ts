import { Routes } from '@angular/router';
import { ConditionalRendering } from './components/conditional-rendering/conditional-rendering';
import { About } from './components/about/about';
import { Forms } from './components/forms/forms';
import { RoutesDemo } from './components/routes/routes';
import { Product } from './components/product/product';
import { Protected, authGuard, Routeguards } from './components/routeguards/routeguards';
import { Counters } from './components/counters/counters';
import { AngularHttpclientsComponent } from './components/angular-httpclients-component/angular-httpclients-component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'conditional-rendering',
        pathMatch: 'full',
    },
    {
        path: 'conditional-rendering',
        component: ConditionalRendering,
    },
    {
        path: 'about',
        component: About,
    },
    {
        path: 'forms',
        component: Forms,
    },
    {
        path: 'routes',
        component: RoutesDemo,
    },
    {
        path: 'product/:id',
        component: Product,
    },
    {
        path: 'protected',
        component: Protected,
        canActivate: [authGuard],
    },
    {
        path: 'routeguards',
        component: Routeguards,
    },
    {
        path: 'counters',
        component: Counters,
    },

    {
        path: 'angular-httpclients-component',
        component: AngularHttpclientsComponent,
    }
];
