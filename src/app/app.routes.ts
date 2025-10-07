import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BienvenidaComponent } from './views/bienvenida/bienvenida.component';
import { PrediccionComponent } from './views/prediccion/prediccion.component';
import { ConceptosBasicosComponent } from './views/conceptos-basicos/conceptos-basicos.component';
import { TratamientoComponent } from './views/tratamiento/tratamiento.component';
import { PrevencionComponent } from './views/prevencion/prevencion.component';

export const routes: Routes = [
    {
        path: '',
        component: BienvenidaComponent,
    },
    {   
        path: 'conceptos-basicos',
        component: ConceptosBasicosComponent,
    },
    {   
        path: 'prevencion',
        component: PrevencionComponent,
    },
    {   
        path: 'diagnostico',
        component: PrediccionComponent,
    },
    {   
        path: 'tratamiento',
        component: TratamientoComponent,
    },
    {
        path: '**', redirectTo: '/'
    }
];
