import { Component, OnInit,Input, TemplateRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Commonservices} from '../app.commonservices';
// import {Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {BloglistComponent} from "../bloglist/bloglist.component";

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
    public blogres:any;
    public selectedFile:File;
    modalRef:BsModalRef;
    @Input()
    set id(data: any) {
        this.blogid = (data) || '<no name set>';
        this.blogid = data;
        // console.log(this.compid);
        this.getBlogDetails();

        /*  console.log(this.postarr);
         console.log(postarr1);*/
    }

    constructor(fb: FormBuilder,public _commonservices : Commonservices,private _http: HttpClient,private router: Router,private route:ActivatedRoute,private sanitizer: DomSanitizer,public bloglistpage:BloglistComponent){
        this.blogid = '';
        this.fb = fb;
        this.videos = [];
        this.images = [];
        this.videolinkerror = false;
        this.imageserror = false;
        this.serverurl=_commonservices.url;
        this.siteurl=_commonservices.siteurl;
        this.serverurl=_commonservices.url;
        this.uploadurl=_commonservices.uploadurl;
        this.route.params.subscribe(params=>{
            this.blogid = params['id'];
            this.getBlogDetails();
        });
        this.bloglistpage=bloglistpage;
    }

    ngOnInit() {
        this.dataForm = this.fb.group({
            title: ["", Validators.required],
            type: ["", Validators.required],
            description: ["", Validators.required],
            startdate: ["", Validators.required],
            enddate: ["", Validators.required],
            user: [false],
            musicians: 0,
            dancer: 0,
            model: 0,
            producer: 0,
            fan: 0,
            ambassadors:0,
           signupaffiliate: 0,
            videolink:0
        });
    }

    getBlogDetails(){
        var link =this._commonservices.nodesslurl1+'blogdetailsview';
        var data = {_id: this.blogid};

        this._http.post(link, data)
            .subscribe(res => {
                let result:any;
                result = res;
                console.log('result');
                console.log(result.data);
                if (result.status == 'success' && typeof(result.data) != 'undefined'){
                    let blogdet = result.data;
                    this.blogres=result.data;
                    console.log(blogdet);
                    this.dataForm.controls['title'].setValue(blogdet.title);
                    this.dataForm.controls['type'].setValue(blogdet.type);
                    this.dataForm.controls['description'].setValue(blogdet.description);
                    this.dataForm.controls['startdate'].setValue(blogdet.newstartdate);
                    this.dataForm.controls['enddate'].setValue(blogdet.newenddate);

                    this.dataForm.controls['dancer'].setValue(blogdet.dancer);
                    this.dataForm.controls['model'].setValue(blogdet.model);
                    this.dataForm.controls['musicians'].setValue(blogdet.musicians);
                    this.dataForm.controls['producer'].setValue(blogdet.producer);
                    this.dataForm.controls['fan'].setValue(blogdet.fan);
                    this.dataForm.controls['signupaffiliate'].setValue(blogdet.signupaffiliate);
                    this.dataForm.controls['ambassadors'].setValue(blogdet.ambassadors);

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
    checkval(event,type){
        if(event.target.checked){
            this.dataForm.controls[type].setValue(1);
        }else{
            this.dataForm.controls[type].setValue(0);
        }

    }
    allcheck(){
        /*this.dataForm.patchValue(
         {
         musicians:true,
         user:true
         }
         );*/
        console.log(this.dataForm.controls['user'].value);
        if(this.dataForm.controls['user'].value==1){
            this.dataForm.controls['musicians'].setValue(1);
            this.dataForm.controls['dancer'].setValue(1);
            this.dataForm.controls['model'].setValue(1);
            this.dataForm.controls['producer'].setValue(1);
            this.dataForm.controls['fan'].setValue(1);
        }
        if(!this.dataForm.controls['user'].value){
            this.dataForm.controls['musicians'].setValue(0);
            this.dataForm.controls['dancer'].setValue(0);
            this.dataForm.controls['model'].setValue(0);
            this.dataForm.controls['producer'].setValue(0);
            this.dataForm.controls['fan'].setValue(0);

        }

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
                type: formval.type,
                description: formval.description,
                startdate: formval.startdate,
                enddate: formval.enddate,
                videos: this.videos,
                images: this.images,
                dancer: formval.dancer,
                producer: formval.producer,
                model: formval.model,
                musicians: formval.musicians,
                fan: formval.fan,
                signupaffiliate: formval.signupaffiliate,
                ambassadors: formval.ambassadors,
            };
   /*         if(formval.dancer){
                data.dancer = 1;
            }
            if(formval.model){
                data.model = 1;
            }
            if(formval.musicians){
                data.musicians = 1;
            }
            if(formval.producer){
                data.producer = 1;
            }
            if(formval.fan){
                data.fan = 1;
            }
            if(formval.signupaffiliate){
                data.signupaffiliate = 1;
            }
            if(formval.signupaffiliate){
                data.ambassadors = 1;
            }*/

  this._http.post(link, data)
                .subscribe(res => {
                    let result:any;
                    result = res;
                    if (result.status == 'success') {
                        this.bloglistpage.modalRef.hide();
                        this.bloglistpage.getBlogList();

                        // this.router.navigate(['/blog-list']);
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
