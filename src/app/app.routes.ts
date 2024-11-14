import { Routes } from '@angular/router';
import { InvalidPageComponent } from './pages/invalid-page/invalid-page.component';
import { UserListComponent } from './pages/user-list/user-list.component';
import { UserAddComponent } from './pages/user-add/user-add.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'users'
    },
    {
        path: 'users',
        component: UserListComponent
    },
    {
        path: 'users/add',
        component: UserAddComponent
    },
    {
        path: '**',
        component: InvalidPageComponent
    }
];
