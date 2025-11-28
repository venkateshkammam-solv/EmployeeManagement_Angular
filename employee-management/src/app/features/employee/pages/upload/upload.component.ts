import { Component } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, DecimalPipe, FormsModule],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent {
  selectedFile: File | null = null;
  isUploading = false;
  status: 'success' | 'error' | null = null;
  employeeId: string | null = null;
  documentType: string | null = null;
  description: string | null = null;
  department: string | null = null;
  email: string | null = null;
  employeeName: string | null = null;
  effectiveDate: string | null = null;

  constructor(private http: HttpClient) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      this.selectedFile = input.files[0];
    }
  }

  removeFile() {
    this.selectedFile = null;
  }

  upload() {
    if (!this.selectedFile || !this.documentType) return;
    this.isUploading = true;
    const formData = new FormData();
    formData.append("employeeId", this.employeeId ?? "");
    formData.append("employeeName", this.employeeName?? "");
    formData.append('file', this.selectedFile);
    formData.append('documentType', this.documentType);
    formData.append('description', this.description ?? '');
    formData.append('department', this.department ?? '');
    formData.append('email', this.email?? '');
    formData.append('effectiveDate', this.effectiveDate ?? '');
    this.http.post('http://localhost:7295/api/UploadDocument_HttpStart', formData).subscribe({
      next: () => {
        this.status = 'success';
        this.isUploading = false;
      },
      error: () => {
        this.status = 'error';
        this.isUploading = false;
      }
    });
  }
}
