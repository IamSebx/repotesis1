import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, of, TimeoutError } from 'rxjs';
import { catchError, timeout, retry, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrls = [
    'https://detector-tbc-api.strategyec.com',
    // 'http://localhost:8000',
    // 'http://127.0.0.1:8000'
  ];
  private currentApiUrl = this.apiUrls[0];
  private readonly API_TIMEOUT = 30000; // 30 segundos

  constructor(private http: HttpClient) { }

  analyzeImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.currentApiUrl}/upload-image/`, formData).pipe(
      timeout(this.API_TIMEOUT),
      catchError((error: HttpErrorResponse) => {
        return this.handleApiError(error, () => 
          this.http.post(`${this.currentApiUrl}/upload-image/`, formData)
        );
      })
    );
  }

  checkBackendHealth(): Observable<any> {
    return this.http.get(`${this.currentApiUrl}/health-check`).pipe(
      timeout(5000),
      retry(2),
      catchError((error: HttpErrorResponse) => {
        return this.handleApiError(error, () => 
          this.http.get(`${this.currentApiUrl}/health-check`)
        );
      })
    );
  }

  private handleApiError(error: HttpErrorResponse, retryFn: () => Observable<any>): Observable<any> {
    if (error.status === 0 || error instanceof TimeoutError) {
      this.rotateApiUrl();
      return throwError(() => this.getConnectionError());
    } else if (error.status === 400) {
      return throwError(() => 'Formato de imagen no válido. Solo se aceptan JPEG, PNG o JPG');
    } else if (error.status === 500) {
      return throwError(() => 'Error interno del servidor al procesar la imagen');
    }
    return throwError(() => `Error inesperado: ${error.message}`);
  }

  private getConnectionError(): string {
    return `No se pudo conectar con el servidor backend. Verifica:
      - Que el servidor esté corriendo en ${this.currentApiUrl}
      - Que no haya problemas de red o firewall
      - Que el backend esté accesible`;
  }

  private rotateApiUrl(): void {
    const currentIndex = this.apiUrls.indexOf(this.currentApiUrl);
    this.currentApiUrl = this.apiUrls[(currentIndex + 1) % this.apiUrls.length];
    console.log('Alternando URL a:', this.currentApiUrl);
  }
}