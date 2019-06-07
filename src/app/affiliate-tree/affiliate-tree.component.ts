import { Component, OnInit,Injectable ,Input} from '@angular/core';
import {NestedTreeControl,FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {Commonservices} from '../app.commonservices';
import {Router, ActivatedRoute} from '@angular/router';
import {BehaviorSubject, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {CollectionViewer, SelectionChange} from '@angular/cdk/collections';

// import {Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {BsModalService} from "ngx-bootstrap";



export class DynamicFlatNode {
  constructor(public item: string, public level = 1, public expandable = false,
              public isLoading = false) {}
}
@Injectable()
export class DynamicDatabase implements OnInit {
  ngOnInit(): void {
  }

  public userdata: CookieService;
  public serverurl;
  public apiurl;
  public jwttoken;
  public arrval:any=[];


  constructor(public _commonservices: Commonservices,public _http: HttpClient) {
    //this.userdata = userdata;
    this.serverurl=_commonservices.url;
    this.apiurl = _commonservices.nodesslurl;
    this.arrval=[];
  }


  dataMap = new Map<string, string[]>([
    ['Fruitsc', ['Apple', 'Orange', 'Banana']],
    ['Vegetables', ['Tomato', 'Potato', 'Onion']],
    ['Apple', ['Fuji', 'Macintosh']],
    ['Onion', ['Yellow', 'White', 'Purple']]
  ]);

  rootLevelNodes: any = [{item:'Fruitsc',id:1,username:'affiliate123'}, {item:'Vegetables',id:2,username:'affiliate123'}];


  /** Initial data from database */
  initialData(val:any): DynamicFlatNode[] {
    console.log('this.rootLevelNodes');
    console.log(this.rootLevelNodes);
    console.log(this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true)));



    return val.map(name => new DynamicFlatNode(name, 0, true));
  }

  getChildren(node: string,result:any): string[] | undefined {



    return result;

  }


  isExpandable(node: string): boolean {
    //return this.dataMap.has(node);
    console.log('isexpandable');
    // console.log(this.isExpandable(node));
    console.log(node);
    let tempnode:any=node;
    if(tempnode.children == 0){             // if there is no child in tree
      return false;
    }else
      return true;
  }
}


@Injectable()
export class DynamicDataSource {

  public serverurl;
  public apiurl;
  public jwttoken;
  public userdetails;
  public arrval:any=[];

  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] { return this.dataChange.value; }
  set data(value: DynamicFlatNode[]) {
    this.treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private treeControl: FlatTreeControl<DynamicFlatNode>,
              private database: DynamicDatabase,public _commonservices: Commonservices,public _http: HttpClient,public userdata: CookieService) {
    this.serverurl=_commonservices.url;
    this.apiurl = _commonservices.nodesslurl;
    this.arrval=[];
    // this.userdata=userdata;
    let userdetails =  this.userdata.get('userdetails');
    this.userdetails = JSON.parse(userdetails);

  }

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this.treeControl.expansionModel.onChange.subscribe(change => {
      if ((change as SelectionChange<DynamicFlatNode>).added ||
          (change as SelectionChange<DynamicFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: DynamicFlatNode, expand: boolean) {
    console.log('in togglenode');
    // expand = false;
    console.log(node);
    console.log('node.level');
    console.log(node.level);
    console.log(this.userdetails);
    if(this.userdetails.ambassador == 1 && node.level == 3){            // for ambassador , there will be 3 tier
      expand = false;
      console.log('ambassador called');
    }
    if(this.userdetails.signupaffiliate == 1 && node.level == 2){         // for affiliate , there will be 2 tier
      expand = false;
      console.log('affiliate called');
    }
    console.log(node.item);

    let nodeval:any={};
    nodeval=  node.item;

    let link =this.apiurl+'getaffiliatetree?id='+nodeval.username;

    this._http.get(link)
        .subscribe(res => {
          let result:any;
          result=res;

          console.log('res');
          console.log(result.item);
          console.log(result);
          const children = this.database.getChildren(node.item,result.item);
          const index = this.data.indexOf(node);
          if (!children || index < 0) { // If no children, or cannot find the node, no op
            return;
          }

          node.isLoading = true;

          setTimeout(() => {
            if (expand) {
              const nodes = children.map(name =>
                  new DynamicFlatNode(name, node.level + 1, this.database.isExpandable(name)));
              this.data.splice(index + 1, 0, ...nodes);
            } else {
              let count = 0;
              for (let i = index + 1; i < this.data.length
              && this.data[i].level > node.level; i++, count++) {}
              this.data.splice(index + 1, count);
            }

            // notify the change
            this.dataChange.next(this.data);
            node.isLoading = false;
          }, 1000);

          //return; result.item;
        },error => {
          //this.loadinglist = false;

          console.log("Oooops!");
          return [''];
        });


  }
}


@Component({
  selector: 'app-affiliate-tree',
  templateUrl: './affiliate-tree.component.html',
  styleUrls: ['./affiliate-tree.component.css'],
  providers: [DynamicDatabase, Commonservices]
})



export class AffiliateTreeComponent implements OnInit {
  public userdata: CookieService;
  public serverurl;
  public apiurl;
  public jwttoken;
  public userdetails:any;
  public affarray_val;

  @Input()                                                      // for property-binding of object
  set affuserdata(affuserdata: any) {
    // this.affarray_val = affuserdata;
    // console.log('this.affarray_val');
    // console.log(this.affarray_val);
  }

  constructor(private _commonservices: Commonservices,private _http: HttpClient,private modalService: BsModalService, public activeRoute:ActivatedRoute,userdata: CookieService,public database: DynamicDatabase) {
    this.userdata = userdata;
    this.serverurl=_commonservices.url;
    this.apiurl = _commonservices.nodesslurl;
    this.jwttoken = this.userdata.get('jwttoken');
    let userdetails =  this.userdata.get('userdetails');
    this.userdetails = JSON.parse(userdetails);
    this.affarray_val ={item:this.activeRoute.snapshot.params.item,username:this.activeRoute.snapshot.params.username,children:this.activeRoute.snapshot.params.children};
    // console.log(this.activeRoute.snapshot.params.username);
    // console.log(this.activeRoute.snapshot.params.item);

  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;
  // userdata: CookieService;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;
  ngOnInit() {
    //alert(this.apiurl);
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, this.database,this._commonservices,this._http,this.userdata);

    //this.dataSource.data = database.initialData([{item:'dfsdf',id:1,username:'affiliate123'}]);
    console.log('in constructuctor aff array affarray_val');
    console.log(this.affarray_val);
    this.dataSource.data = this.database.initialData([this.affarray_val]);
  }

}
