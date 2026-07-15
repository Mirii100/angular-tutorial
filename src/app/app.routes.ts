import { Routes } from '@angular/router';
import { ConditionalRendering } from './components/conditional-rendering/conditional-rendering';
import { About } from './components/about/about';
import { Forms } from './components/forms/forms';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'conditional-rendering',
        pathMatch: 'full'
    },
    {

        path: 'conditional-rendering',
        component: ConditionalRendering
    },
    {
        path: 'about',
        component: About
    },
    
  {
        path: 'forms',
        component: Forms
    },
    

];
