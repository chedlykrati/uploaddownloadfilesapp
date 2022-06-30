import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component } from '@angular/core';
import { FileService } from './file.service';
import { saveAs} from 'file-saver';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
   //title = 'updoawnfilesapp';
   filenames: string[] = []
   fileStatus = { status: '' ,requestType: '' , percent: 0}


   //inject fileService in the constructor
  constructor(private fileService: FileService){}

  //define a function to upload files
  onUploadFiles(files: File[]): void{
    const formData = new FormData();
    for(const file of files) {
      formData.append('files' , file , file.name);
    }
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

  private reportProgress(httpEvent: HttpEvent<string[] | Blob>): void {
   // throw new Error('Method not implemented.');
   switch(httpEvent.type){
    case HttpEventType.UploadProgress:
      this.updateStatus(httpEvent.loaded , httpEvent.total! , 'Uploading');
      break;
    case HttpEventType.DownloadProgress:
      this.updateStatus(httpEvent.loaded , httpEvent.total! , 'Downloading');
      break; 
    case HttpEventType.ResponseHeader:
      console.log('Header returned' , httpEvent);
      break;
    case HttpEventType.Response:
      if(httpEvent.body instanceof Array){
        for(const filename of httpEvent.body){
          this.filenames.unshift(filename);
        }

      }else{
        //download logic
        saveAs(new File([httpEvent.body!], httpEvent.headers.get('File-Name')!,
        {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}));
      /*
        saveFilesAs(new Blob([httpEvent.body!],
          {type: `${httpEvent.headers.get('Content-Type')};charset=utf-8`}),
          httpEvent.headers.get('File-Name'));
          */
        }
      break;      

      default:
        console.log(httpEvent);
      break;  

   }

  }
  updateStatus(loaded: number, total: number , requestType: string) {
    //throw new Error('Method not implemented.');
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round(100 * loaded / total);
  }
}
