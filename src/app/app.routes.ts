import { Routes } from '@angular/router';
import { ConditionalRendering } from './components/conditional-rendering/conditional-rendering';
import { About } from './components/about/about';
import { Forms } from './components/forms/forms';
import { RoutesDemo } from './components/routes/routes';
import { Product } from './components/product/product';

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
];
