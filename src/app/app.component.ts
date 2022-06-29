import { HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Component } from '@angular/core';
import { FileService } from './file.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //title = 'updoawnfilesapp';
  constructor(private fileService: FileService){}

  //define a function to upload files
  onUploadFiles(files: File[]): void{
    const formData = new FormData();
    for(const file of files){formData.append('files' , file , file.name);}
    this.fileService.upload(formData).subscribe(
      event => {
        console.log(event);
      this.reportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }


  //define a function to download files
  onDownloadFiles(filename: string): void{
    this.fileService.doawnload(filename).subscribe(
      event => {
        console.log(event);
      this.reportProgress(event);
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  private reportProgress(event: HttpEvent<string[] | Blob>) {
    throw new Error('Method not implemented.');
  }
}
