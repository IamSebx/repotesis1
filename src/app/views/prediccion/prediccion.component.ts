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
  backendStatus: string = 'Verificando...';
  tiempoProcesamiento: number | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.checkBackendConnection();
  }

  checkBackendConnection(): void {
    this.apiService.checkBackendHealth().subscribe({
      next: (response) => {
        this.backendStatus = `Conectado (${response.status})`;
      },
      error: (error) => {
        this.backendStatus = `Error de conexión: ${error}`;
      }
    });
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    this.resetAnalysis();
    
    if (file && this.isImage(file.type)) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreviewUrl = e.target.result;
      };
      reader.readAsDataURL(file);
    } else if (file) {
      this.errorMessage = 'Solo se aceptan imágenes (JPEG, PNG, JPG)';
      this.selectedFile = null;
    }
  }

  isImage(fileType: string): boolean {
    return fileType.match(/image\/(png|jpeg|jpg)/) !== null;
  }

  analizar(): void {
    if (!this.selectedFile) return;

    this.isLoading = true;
    this.errorMessage = null;
    this.tiempoProcesamiento = null;
    
    this.apiService.analyzeImage(this.selectedFile).subscribe({
      next: (response) => {
        this.result = response;
        this.tiempoProcesamiento = response.tiempo_de_espera || null;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = this.handleApiError(error);
        this.isLoading = false;
      }
    });
  }

  private handleApiError(error: any): string {
    if (error.error?.error?.includes('No se pudo descargar el modelo')) {
      return 'Error al cargar los modelos de análisis. Por favor intente más tarde.';
    }
    return error.error?.detail || 'Error al procesar la imagen';
  }

  resetAnalysis(): void {
    this.result = null;
    this.errorMessage = null;
    this.tiempoProcesamiento = null;
  }

  formatDiagnosis(diagnosis: string): string {
    const diagnoses: {[key: string]: string} = {
      'Tuberculosis': 'Tuberculosis Detectada',
      'Normal': 'Normal (No se detectó tuberculosis)',
      'BajaCalidad': 'Baja Calidad - Precaución en el diagnóstico',
      'NoRadiografia': 'No es una radiografía'
    };
    return diagnoses[diagnosis] || diagnosis;
  }

  getDiagnosisColor(diagnostico: string): string {
    switch(diagnostico) {
      case 'Tuberculosis': return 'diagnosis-danger';
      case 'Normal': return 'diagnosis-success';
      case 'BajaCalidad': return 'diagnosis-warning';
      case 'NoRadiografia': return 'diagnosis-info';
      default: return '';
    }
  }
}