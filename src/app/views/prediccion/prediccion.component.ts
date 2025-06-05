import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-prediccion',
  imports: [CommonModule, FormsModule],
  templateUrl: './prediccion.component.html',
  styleUrls: ['./prediccion.component.css']
})
export class PrediccionComponent implements OnInit {
  selectedFile: File | null = null;
  imagePreviewUrl: string | null = null;
  isLoading: boolean = false;
  result: any = null;
  errorMessage: string | null = null;
  backendStatus: string = 'Verificando conexión...';
  isBackendConnected: boolean = false;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.checkBackendConnection();
  }

  checkBackendConnection(): void {
    this.apiService.checkBackendHealth().subscribe({
      next: (response) => {
        this.backendStatus = 'Backend conectado';
        this.isBackendConnected = true;
      },
      error: (error) => {
        this.backendStatus = 'Backend no disponible';
        this.isBackendConnected = false;
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.resetAnalysis();
    
    if (file && this.isValidImage(file)) {
      this.selectedFile = file;
      this.previewImage(file);
    } else if (file) {
      this.errorMessage = 'Solo se aceptan imágenes (JPEG, PNG, JPG)';
      this.selectedFile = null;
    }
  }

  private isValidImage(file: File): boolean {
    return file.type.match(/image\/(jpeg|png|jpg)/) !== null;
  }

  private previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.imagePreviewUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  analizar(): void {
    if (!this.selectedFile || !this.isBackendConnected) return;

    this.isLoading = true;
    this.errorMessage = null;
    
    this.apiService.analyzeImage(this.selectedFile).subscribe({
      next: (response) => {
        this.result = response;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error;
        this.isLoading = false;
      }
    });
  }

  resetAnalysis(): void {
    this.result = null;
    this.errorMessage = null;
  }

  getDiagnosisText(diagnosis: string): string {
    const diagnosisMap: Record<string, string> = {
      'Tuberculosis': 'Tuberculosis Detectada',
      'Normal': 'Normal (No se detectó tuberculosis)',
      'BajaCalidad': 'Imagen de Baja Calidad',
      'NoRadiografia': 'No es una radiografía'
    };
    return diagnosisMap[diagnosis] || diagnosis;
  }

  getDiagnosisClass(diagnosis: string): string {
    return diagnosis.toLowerCase();
  }
}