import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  /* set server url */
  SERVER_URL: string = "https://developmentapi.audiodeadline.com:6090/";

  constructor(private httpClient: HttpClient) { }

  public upload(data) {
    let uploadURL = this.SERVER_URL + 'uploads';

    return this.httpClient.post<any>(uploadURL, data, {
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', data: progress };
        case HttpEventType.Response:
          return { status: 'complete', data: event.body };
        default:
            return { status: 'others', data: event.type };
      }
    })
    );
  }
  
}
