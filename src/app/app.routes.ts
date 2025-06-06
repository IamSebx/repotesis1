import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BienvenidaComponent } from './views/bienvenida/bienvenida.component';
import { PrediccionComponent } from './views/prediccion/prediccion.component';

export const routes: Routes = [
    {
        path: 'bienvenida',
        component: BienvenidaComponent,
    },
    {   
        path: 'prediccion',
        component: PrediccionComponent,
    },
    {
        path: '', redirectTo: '/bienvenida', pathMatch: 'full'
    },
    {
        path: '**', redirectTo: '/bienvenida'
    }
];
