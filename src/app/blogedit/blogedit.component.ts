import { Component, OnInit,Input } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Commonservices} from '../app.commonservices';
// import {Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-blogedit',
    templateUrl: './blogedit.component.html',
    styleUrls: ['./blogedit.component.css'],
    providers: [Commonservices]
})
export class BlogeditComponent implements OnInit {
    public dataForm: FormGroup;
    public fb;
    public serverurl;
    public siteurl;
    private uploadurl;
    public is_error;
    public blogid;
    public videolink;
    public videolinkerror:boolean;
    public imageserror:boolean;
    public videos:any;
    public images:any;
    public selectedFile:File;
    @Input()
    set id(data: any) {
        this.blogid = (data) || '<no name set>';
        this.blogid = data;
        // console.log(this.compid);
        this.getBlogDetails();

        /*  console.log(this.postarr);
         console.log(postarr1);*/
    }

    constructor(fb: FormBuilder,private _commonservices : Commonservices,private _http: HttpClient,private router: Router,private route:ActivatedRoute,private sanitizer: DomSanitizer){
        this.blogid = '';
        this.fb = fb;
        this.videos = [];
        this.images = [];
        this.videolinkerror = false;
        this.imageserror = false;
        this.serverurl=_commonservices.url;
        this.siteurl=_commonservices.siteurl;
        this.uploadurl=_commonservices.uploadurl;
        this.route.params.subscribe(params=>{
            this.blogid = params['id'];
            this.getBlogDetails();
        });
    }

    ngOnInit() {
        this.dataForm = this.fb.group({
            title: ["", Validators.required],
            description: ["", Validators.required],
            videolink: [""]
        });
    }

    getBlogDetails(){
        var link =this.serverurl+'blogdetails';
        var data = {_id: this.blogid};

        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;
                if (result.status == 'success' && typeof(result.item) != 'undefined'){
                    let blogdet = result.item;
                    this.dataForm.controls['title'].setValue(blogdet.title);
                    this.dataForm.controls['description'].setValue(blogdet.description);
                    if(blogdet.videos)
                        this.videos = blogdet.videos;
                    if(blogdet.images)
                        this.images = blogdet.images;
                }
            },error => {
                console.log("Oooops!");
            });

    }

    getYTURL(item){
        return this.sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+item+'?rel=0&amp;showinfo=0');
    }

    addYTvideo(){
        this.videolinkerror = false;
        var yt_regex = /(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
        var ytsaerch = this.dataForm.controls['videolink'].value;
        if(ytsaerch != ''){
            if(typeof (ytsaerch.match(yt_regex)) != 'undefined' &&  (ytsaerch.match(yt_regex)) && typeof (ytsaerch.match(yt_regex)[1]) != 'undefined'){
                var videoId =ytsaerch.match(yt_regex)[1];
                this.videos.push(videoId);
                this.dataForm.controls['videolink'].setValue('');
            }else{
                this.videolinkerror = true;
            }
        }else{
            this.videolinkerror = true;
        }
    }

    onFileChanged(event) {
        this.imageserror = false;
        this.selectedFile = event.target.files[0];

        const uploadData = new FormData();
        uploadData.append('file', this.selectedFile);

        this._http.post(this.uploadurl, uploadData)
            .subscribe(event => {
                let res:any;
                res = event;
                if(res.error_code == 0){
                    this.images.push(res.filename);
                }else{
                    this.imageserror = true;
                }
            });
    }

    dosubmit(formval) {
        let x: any;
        for (x in this.dataForm.controls) {
            this.dataForm.controls[x].markAsTouched();
        }
        if (this.dataForm.valid) {
            var link = this.serverurl+'updateblog';
            var data = {
                _id: this.blogid,
                title: formval.title,
                description: formval.description,
                videos: this.videos,
                images: this.images
            };


            this._http.post(link, data)
                .subscribe(res => {
                    let result:any;
                    result = res;
                    if (result.status == 'success') {
                        this.router.navigate(['/blog-list']);
                    }
                    else {
                        this.is_error = result.msg;
                    }
                }, error => {
                    console.log("Oooops!");
                });
        }
    }

}
