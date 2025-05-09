import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-prediccion',
  imports: [CommonModule],
  templateUrl: './prediccion.component.html',
  styleUrl: './prediccion.component.css'
})
export class PrediccionComponent {
 selectedFile: File | null = null;
  imagePreviewUrl: string | null = null;

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && (file.type.startsWith('image') || file.type === 'application/pdf')) {
      this.selectedFile = file;

      if (file.type.startsWith('image')) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.imagePreviewUrl = e.target.result;
        };
        reader.readAsDataURL(file);
      } else {
        this.imagePreviewUrl = null;
      }
    }
  }

  isImage(fileName: string): boolean {
    return /\.(jpe?g|png|gif|bmp)$/i.test(fileName);
  }

  analizar(): void {
    console.log('Archivo enviado para análisis:', this.selectedFile);
    // Aquí puedes llamar al backend o mostrar un spinner
  }
}
