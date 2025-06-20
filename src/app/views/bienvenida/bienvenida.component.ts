import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import AOS from 'aos';

@Component({
  selector: 'app-bienvenida',
  imports: [CommonModule, FormsModule, RouterModule],	
  templateUrl: './bienvenida.component.html',
  styleUrls: ['./bienvenida.component.css']
})
export class BienvenidaComponent {
   constructor() { }

  ngOnInit(): void {
    AOS.init({ // Inicializa AOS
      duration: 1000, // Duración de la animación en ms
      once: true, // La animación solo ocurre una vez
    });
  }
}
