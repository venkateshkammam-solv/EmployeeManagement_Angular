// src/app/document-upload/upload.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private uploadUrl = '/api/uploadDocument'; 
  private orchestrationStatusBase = '/api/orchestrations';

  constructor(private http: HttpClient) {}

  uploadDocument(file: File, employeeId: string, documentType: string, email: string): Observable<number | { instanceId: string }> {
    const form = new FormData();
    form.append('file', file, file.name);
    form.append('employeeId', employeeId);
    form.append('documentType', documentType);
    form.append('email', email);

    const req = new HttpRequest('POST', this.uploadUrl, form, { reportProgress: true });

    return this.http.request(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = event.total ? Math.round(100 * event.loaded / event.total) : 0;
          return percentDone;
        } else if (event.type === HttpEventType.Response) {
          return { instanceId: event.body.instanceId || event.body.instance || null };
        } else {
          return 0;
        }
      })
    );
  }
}
