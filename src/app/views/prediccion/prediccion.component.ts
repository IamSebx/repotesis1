import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-prediccion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './prediccion.component.html',
  styleUrls: ['./prediccion.component.css']
})
export class PrediccionComponent {
  // Componente simplificado que solo muestra el iframe de Gradio
}