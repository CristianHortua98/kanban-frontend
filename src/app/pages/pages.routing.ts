import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { InicioComponent } from './inicio/inicio.component';

const routes: Routes = [
    {
        path: '', 
        component: PagesComponent,
        children: [
            { path: 'inicio', component: InicioComponent, data: {titulo: 'Inicio'}},
            { path: '', redirectTo: 'inicio', pathMatch: 'full' },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
