import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
    {
        path: '', 
        component: PagesComponent,
        children: [
            { path: 'inicio', component: InicioComponent, data: {title: 'Inicio'}},
            { path: '', redirectTo: 'inicio', pathMatch: 'full' },
        ],
    },
    {
        path: '',
        component: PagesComponent,
        loadChildren: () => import('../users/users.module').then(m => m.UsersModule)
    },
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
