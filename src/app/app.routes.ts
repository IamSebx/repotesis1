import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BienvenidaComponent } from './views/bienvenida/bienvenida.component';
import { PrediccionComponent } from './views/prediccion/prediccion.component';

export const routes: Routes = [
    {
        path: '',
        component: BienvenidaComponent,
    },
    {   
        path: 'diagnostico',
        component: PrediccionComponent,
    },
    {
        path: '**', redirectTo: '/'
    }
];
