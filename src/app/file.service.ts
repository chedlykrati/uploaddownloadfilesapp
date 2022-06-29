import { HttpClient, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private server = 'http://localhost:8085';


  //HttpClient :for http Request
  constructor(private http: HttpClient) { }

  //define function to upload file
  //formData: body request
  upload(formData: FormData): Observable<HttpEvent<string[]>>{
    return this.http.post<string[]>(`${this.server}/file/upload`, formData , {
      reportProgress: true,
      observe: 'events'
    });
  }

  //define function to download file
  doawnload(filename: string): Observable<HttpEvent<Blob>>{
    return this.http.get(`${this.server}/file/download/{filename}` , {
      reportProgress: true,
      observe: 'events',
      responseType: 'blob'
    });
  }

}
