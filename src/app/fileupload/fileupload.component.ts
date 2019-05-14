import { Component, OnInit } from '@angular/core';
import {Commonservices} from "../app.commonservices";
// import {Http} from "@angular/http";
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fileupload',
  templateUrl: './fileupload.component.html',
  styleUrls: ['./fileupload.component.css'],
  providers: [Commonservices]
})
export class FileuploadComponent implements OnInit {
  public selectedFile;
  public uploadfolder;
  public uploadurl;
  public uploadmsg;

  constructor(private _http: HttpClient,private _commonservices : Commonservices) {
    this.uploadfolder = 'laevenimg/';
    this.uploadurl='https://audiodeadline.com/fileuploadtest.php';

  }

  ngOnInit() {
  }

  onFileChanged(event) {
    for(let n in event.target.files){
      this.selectedFile = event.target.files[n];

      const uploadData = new FormData();
      uploadData.append('file', this.selectedFile);
      uploadData.append('uploadfolder', this.uploadfolder);

      this._http.post(this.uploadurl, uploadData)
          .subscribe(event => {
            this.uploadmsg = 'Success'
          }, error => {
            this.uploadmsg = 'Error'
          });
    }
  }

}
