/**
 * Created by kta pc on 6/1/2017.
 */
/**
 * Created by ipsita on 7/4/17.
 */

import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HeaderComponent} from 'app/header/header.component';
import {HomeComponent} from 'app/home/home.component';
import {FooterComponent} from 'app/footer/footer.component';
import {AboutAudioDeadlineComponent} from 'app/about-audio-deadline/about-audio-deadline.component';
import {CommunityComponent} from 'app/community/community.component';
import {AffiliateComponent} from 'app/affiliate/affiliate.component';
import {ContactusComponent} from 'app/contactus/contactus.component';
import {SignupComponent} from 'app/signup/signup.component';
import {LoginComponent} from 'app/login/login.component';
import {DashboardComponent} from 'app/dashboard/dashboard.component';
import {KendrickComponent} from 'app/kendrick/kendrick.component';
import {UsherComponent} from 'app/usher/usher.component';
import {SevynstreeterComponent} from 'app/sevynstreeter/sevynstreeter.component';
import {AdminaddComponent} from './app/adminadd/adminadd.component';
import {AdminlistComponent} from './app/adminlist/adminlist.component';
import {AdmineditComponent} from './app/adminedit/adminedit.component';
import {AffiliatelistComponent} from './app/affiliatelist/affiliatelist.component';
import {UserlistComponent} from './app/userlist/userlist.component';
import {MyaccountComponent} from './app/myaccount/myaccount.component';
import {UpdateprofileComponent} from './app/updateprofile/updateprofile.component';
import {ChangepasswordComponent} from './app/changepassword/changepassword.component';
import {AffiliatedashboardComponent} from './app/affiliatedashboard/affiliatedashboard.component';
import {UserdashboardComponent} from './app/userdashboard/userdashboard.component';
import {Communitysignup1Component} from './app/communitysignup1/communitysignup1.component';
import {Communitysignup2Component} from './app/communitysignup2/communitysignup2.component';
import {Communitysignup3Component} from './app/communitysignup3/communitysignup3.component';
import {ViewbrodcastComponent} from './app/viewbrodcast/viewbrodcast.component';
import {AgreementComponent} from './app/agreement/agreement.component';
import {ArtistsexchangeComponent} from './app/artistsexchange/artistsexchange.component';
import {TrainingartistsComponent} from './app/trainingartists/trainingartists.component';
import {CompetitionComponent} from './app/competition/competition.component';
import {BloglistComponent} from './app/bloglist/bloglist.component';
import {BlogaddComponent} from './app/blogadd/blogadd.component';
import {BlogeditComponent} from './app/blogedit/blogedit.component';
import {ForgotpasswordComponent} from './app/forgotpassword/forgotpassword.component';
import {AffiliatereportComponent} from './app/affiliatereport/affiliatereport.component';
import {BlogsComponent} from './app/blogs/blogs.component';
import {BlogdetailsComponent} from './app/blogdetails/blogdetails.component';
import {SponsorlistComponent} from './app/sponsorlist/sponsorlist.component';
import {ResetpasswordComponent} from './app/resetpassword/resetpassword.component';
import {AmbassadorsignupComponent} from './app/ambassadorsignup/ambassadorsignup.component';
import {AmbassadorlistComponent} from './app/ambassadorlist/ambassadorlist.component';
import {TicketsaleComponent} from './app/ticketsale/ticketsale.component';
import {CommunitysignupComponent} from './app/communitysignup/communitysignup.component';
import {ModellistComponent} from './app/modellist/modellist.component';
import {MusicianlistComponent} from './app/musicianlist/musicianlist.component';
import {DancerlistComponent} from './app/dancerlist/dancerlist.component';
import {FanlistComponent} from './app/fanlist/fanlist.component';
import {Communitysignupstep2Component} from './app/communitysignupstep2/communitysignupstep2.component';
import {GenreeditComponent} from './app/genreedit/genreedit.component';
import {GenrelistComponent} from './app/genrelist/genrelist.component';
import {GenreaddComponent} from './app/genreadd/genreadd.component';
import {AmbassadoragreementComponent} from './app/ambassadoragreement/ambassadoragreement.component';
import {AmbassadordashboardComponent} from './app/ambassadordashboard/ambassadordashboard.component';
import {HostfliistylzComponent} from './app/hostfliistylz/hostfliistylz.component';
import {PromocodeaddComponent} from "./app/promocodeadd/promocodeadd.component";
import {PromocodelistComponent} from "./app/promocodelist/promocodelist.component";
import {PromocodeeditComponent} from "./app/promocodeedit/promocodeedit.component";
import {ProductaddComponent} from "./app/productadd/productadd.component";
import {ProductlistComponent} from "./app/productlist/productlist.component";
import {ProducteditComponent} from "./app/productedit/productedit.component";
import {OrderlistComponent} from "./app/orderlist/orderlist.component";
import {CommssionlistComponent} from "./app/commssionlist/commssionlist.component";
import {DatesComponent} from "./app/dates/dates.component";
import {TeamComponent} from "./app/team/team.component";
import {TrendingartistComponent} from "./app/trendingartist/trendingartist.component";
import {NeweventrsvpComponent} from "./app/neweventrsvp/neweventrsvp.component";
import {BannertestComponent} from "./app/bannertest/bannertest.component";
import {CompetitionaddComponent} from "./app/competitionadd/competitionadd.component";
import {CompetitionlistComponent} from "./app/competitionlist/competitionlist.component";
import {CompetitioneditComponent} from "./app/competitionedit/competitionedit.component";
import {BanneraddComponent} from "./app/banneradd/banneradd.component";
import {BannerlistComponent} from "./app/bannerlist/bannerlist.component";
import {BannereditComponent} from "./app/banneredit/banneredit.component";
import {LaeventComponent} from "./app/laevent/laevent.component";
import {PartnersComponent} from "./app/partners/partners.component";
import {MyorderComponent} from "./app/myorder/myorder.component";
import {TicketsaleoldComponent} from "./app/ticketsaleold/ticketsaleold.component";
import {FileuploadComponent} from "./app/fileupload/fileupload.component";
import {CompetitionuserlistComponent} from "./app/competitionuserlist/competitionuserlist.component";
import {EventsComponent} from "./app/events/events.component";
import {ShatterblokComponent} from "./app/shatterblok/shatterblok.component";



import {AdminheaderComponent} from "./app/adminheader/adminheader.component";
import {AdminfooterComponent} from "./app/adminfooter/adminfooter.component";
import {ContactusOldComponent} from "./app/contactus-old/contactus-old.component";
import {PartnersOldComponent} from "./app/partners-old/partners-old.component";
import {CompetitionOldComponent} from "./app/competition-old/competition-old.component";
import {TeamOldComponent} from "./app/team-old/team-old.component";
import {ThedeadlineexperienceComponent} from "./app/thedeadlineexperience/thedeadlineexperience.component";
import {JoinmovementComponent} from "./app/joinmovement/joinmovement.component";
import {HostfliiComponent} from "./app/hostflii/hostflii.component";
import {OurstoryComponent} from "./app/ourstory/ourstory.component";
import {FebeventComponent} from "./app/febevent/febevent.component";


import {ManageCompetitionSignupComponent} from "./app/manage-competition-signup/manage-competition-signup.component";
import {CompetitionStatsComponent} from "./app/competition-stats/competition-stats.component";
import {MediaInterestReportComponent} from "./app/media-interest-report/media-interest-report.component";

import {AffiliatemediamarketingComponent} from "./app/affiliatemediamarketing/affiliatemediamarketing.component";
import {UpcomingeventsComponent} from "./app/upcomingevents/upcomingevents.component";
import {AffiliatetreeComponent} from "./app/affiliatetree/affiliatetree.component";

import {EventsOldComponent} from "./app/events-old/events-old.component";
import {InviteFriendsComponent} from "./app/invite-friends/invite-friends.component";
import {OrderDetailsComponent} from "./app/order-details/order-details.component";
import {PasteventComponent} from "./app/pastevent/pastevent.component";

import {TestresolveService} from "../src/app/testresolve.service";
import {AmbassadoropportunityComponent} from "./app/ambassadoropportunity/ambassadoropportunity.component";
import {TermsandconditionsComponent} from "./app/termsandconditions/termsandconditions.component";
import {ReturnsrefundsComponent} from "./app/returnsrefunds/returnsrefunds.component";
import {SavedcardsComponent} from "./app/savedcards/savedcards.component";
import {AffiliateTreeComponent} from "./app/affiliate-tree/affiliate-tree.component";
/* category management */
import {CategoryListComponent} from "./app/category-list/category-list.component";
import {CategoryAddComponent} from "./app/category-add/category-add.component";
/* category management */

const appRoutes: Routes = [

    { path: 'header', component: HeaderComponent},
    { path: '', component: HomeComponent},

    { path: 'footer', component: FooterComponent},
    { path: 'aboutaudiodeadline', component: AboutAudioDeadlineComponent},
    { path: 'community', component: CommunityComponent},
    { path: 'affiliate', component: AffiliateComponent},
    { path: 'contactus', component: ContactusComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'signup/:uname', component: SignupComponent},
    { path: 'signup/:uname/:mediaid', component: SignupComponent},
    { path: 'login', component: LoginComponent},
    { path: 'kendrick', component: KendrickComponent},
    { path: 'usher', component: UsherComponent},
    { path: 'sevynstreeter', component: SevynstreeterComponent},


    { path: 'dashboard', component: DashboardComponent},
    { path: 'add-admin', component: AdminaddComponent},
    // { path: 'admin-list', component: AdminlistComponent},
    { path: 'admin-list', component: AdminlistComponent,resolve:{results: TestresolveService},data:{object:'adminlistnew'}},
    { path: 'edit-admin/:id', component: AdmineditComponent},
    { path: 'edit-affiliate/:id', component: AdmineditComponent},
    { path: 'edit-ambassador/:id', component: AdmineditComponent},
    { path: 'edit-user/:id', component: AdmineditComponent},
    // { path: 'affiliate-list', component: AffiliatelistComponent},
    { path: 'affiliate-list', component: AffiliatelistComponent,resolve:{results:TestresolveService},data:{object:'affiliateresolve'}},
    // { path: 'user-list', component: UserlistComponent},
    { path: 'my-account', component: MyaccountComponent},
    { path: 'update-profile', component: UpdateprofileComponent},
    { path: 'change-password', component: ChangepasswordComponent},
    { path: 'affiliate-dashboard', component: AffiliatedashboardComponent,resolve: {results: TestresolveService},data: { object: 'orderlistaff' }},
    { path: 'ambassador-dashboard', component: AffiliatedashboardComponent,resolve: {results: TestresolveService},data: { object: 'orderlistaff' }},
    { path: 'user-dashboard', component: UserdashboardComponent},
    { path: 'community-signup-1', component: Communitysignup1Component},
    { path: 'community-signup-2', component: Communitysignup2Component},
    { path: 'community-signup-3', component: Communitysignup3Component},
    { path: 'view-broascast', component: ViewbrodcastComponent},
    { path: 'agreement/:userid', component: AgreementComponent},
    { path: 'artist-xp', component: ArtistsexchangeComponent},
    { path: 'trainingartists', component: TrainingartistsComponent},
    { path: 'competition', component: CompetitionComponent},
    { path: 'blog-list', component: BloglistComponent},
    { path: 'event-list', component: BloglistComponent},
    { path: 'add-blog', component: BlogaddComponent},
    { path: 'edit-blog/:id', component: BlogeditComponent},
    { path: 'forgot-password', component: ForgotpasswordComponent},
    { path: 'affiliate-report', component: AffiliatereportComponent},
    { path: 'blogs', component: BlogsComponent},
    { path: 'blog-details/:id', component: BlogdetailsComponent},
    // { path: 'sponsor-list', component: SponsorlistComponent},
    { path: 'resetpassword/:accesscode', component: ResetpasswordComponent},
    { path: 'ambassador-signup', component: AmbassadorsignupComponent},
    { path: 'ambassador-opportunity', component: AmbassadoropportunityComponent},
    { path: 'ambassador-signup/:uname', component: AmbassadorsignupComponent},
    { path: 'ambassador-signup/:uname/:mediaid', component: AmbassadorsignupComponent},
    { path: 'ambassador-agreement/:userid', component: AmbassadoragreementComponent},
    // { path: 'ambassador-list', component: AmbassadorlistComponent},
    { path: 'ambassador-list', component: AmbassadorlistComponent,resolve:{results:TestresolveService},data:{object:'ambassadorresolve'}},
    { path: 'ticket-sale', component: TicketsaleComponent},
    { path: 'ticket-sale/:param1', component: TicketsaleComponent},
    { path: 'ticket-sale/:param1/:param2', component: TicketsaleComponent},
    { path: 'ticket-sale/:param1/:param2/:param3', component: TicketsaleComponent},
    { path: 'ticket-sale-test', component: TicketsaleComponent},
    { path: 'ticket-sale-test/:param1', component: TicketsaleComponent},
    { path: 'ticket-sale-test/:param1/:param2', component: TicketsaleComponent},
    { path: 'ticket-sale-test/:param1/:param2/:param3', component: TicketsaleComponent},
    { path: 'community-signup', component: CommunitysignupComponent},
    { path: 'community-signup/:uname', component: CommunitysignupComponent},
    { path: 'community-signup/:uname/:mediaid', component: CommunitysignupComponent},
    { path: 'community-signup-step-2', component: Communitysignupstep2Component},
    { path: 'community-signup-step-2/:uid', component: Communitysignupstep2Component},
    { path: 'fan-list', component: FanlistComponent},
    { path: 'dancer-list', component: DancerlistComponent},
    { path: 'musician-list', component: MusicianlistComponent},
    { path: 'model-list', component: ModellistComponent},
    { path: 'add-genre', component: GenreaddComponent},
    // { path: 'genre-list', component: GenrelistComponent},
    { path: 'genre-list', component: GenrelistComponent,resolve:{results:TestresolveService},data:{object:'genrelistnew'}},
    { path: 'edit-genre/:id', component: GenreeditComponent},
    // { path: 'ambassador-dashboard', component: AmbassadordashboardComponent},
    { path: 'host-flii-stylz', component: HostfliistylzComponent},
    { path: 'add-promocode', component: PromocodeaddComponent},
    { path: 'promocode-list', component: PromocodelistComponent},
    { path: 'edit-promocode/:id', component: PromocodeeditComponent},
    { path: 'add-product', component: ProductaddComponent},
    { path: 'product-list', component: ProductlistComponent},
    
    { path: 'edit-product/:id', component: ProducteditComponent},
    { path: 'order-list', component: OrderlistComponent,resolve: {results: TestresolveService},data: { object: 'orderlistaff' }},
    { path: 'myorder', component: OrderlistComponent,resolve: {results: TestresolveService},data: { object: 'orderlistaff' }},
    // { path: 'commission-list', component: CommssionlistComponent},
    { path: 'all-competitip', component: CompetitionuserlistComponent},

    { path: 'dates', component: DatesComponent},
    { path: 'team', component: TeamComponent},
    { path: 'trending-artists', component: TrendingartistComponent},
    { path: 'LaEvent', component: LaeventComponent},
    { path: 'LaEventold', component: NeweventrsvpComponent},
    { path: 'bannertestlis', component: BannertestComponent},
    { path: 'partnerships', component: PartnersComponent},

    { path: 'add-competition', component: CompetitionaddComponent},
    // { path: 'competition-list', component: CompetitionlistComponent},
    { path: 'competition-list', component: CompetitionlistComponent,resolve: {results: TestresolveService},data: { object: 'complist'}},
    { path: 'edit-competition/:id', component: CompetitioneditComponent},

    { path: 'add-media', component: BanneraddComponent},
    { path: 'media-list', component: BannerlistComponent},
    { path: 'edit-media/:id', component: BannereditComponent},

     { path: 'my-order', component: MyorderComponent},
    {path: 'commission-list', component: CommssionlistComponent,resolve: {results: TestresolveService}, data: {object: 'commisionlist', condition: {typeval:'true'}}},
    // {path: 'my-order', component: MyorderComponent,resolve: {results: TestresolveService}, data: {object: 'myorder', condition: {}}},

    { path: 'ticket-sale-old', component: TicketsaleoldComponent},
    { path: 'fileupload', component: FileuploadComponent},
    { path: 'event', component: EventsComponent},
    { path: 'shatterblokevent', component:ShatterblokComponent },



    { path: 'febevent', component: FebeventComponent},
    { path: 'ourstory', component: OurstoryComponent},
    { path: 'hostflii', component: HostfliiComponent},
    { path: 'joinmovement', component: JoinmovementComponent},
    { path: 'thedeadlineexperience', component: ThedeadlineexperienceComponent},
    { path: 'team_old', component: TeamOldComponent},
    { path: 'competition_old', component: CompetitionOldComponent},
    { path: 'partners_old', component: PartnersOldComponent},
    { path: 'contactus_old', component: ContactusOldComponent},

    { path: 'adminheader', component: AdminheaderComponent},
    { path: 'adminfooter', component: AdminfooterComponent},

    // { path: 'manage-competition-signup', component: ManageCompetitionSignupComponent},
    { path: 'manage-competition-signup', component: ManageCompetitionSignupComponent,resolve: {results: TestresolveService},data: { object: 'managecompsign'}},
    { path: 'competition-stats', component: CompetitionStatsComponent},
    { path: 'media-interest-report', component: MediaInterestReportComponent},
    { path: 'affiliatemediamarketing', component: AffiliatemediamarketingComponent,resolve: {results: TestresolveService},data: { object: 'mediamarketdata' }},
    { path: 'ambassadormediamarketing', component: AffiliatemediamarketingComponent,resolve: {results: TestresolveService},data: { object: 'mediamarketdata' }},
    { path: 'upcomingevents', component: UpcomingeventsComponent,resolve: {results: TestresolveService},data: { object: 'blogsresolve'}},
    // { path: 'upcomingevents', component: UpcomingeventsComponent},
    { path: 'affiliatetree', component: AffiliatetreeComponent},
    { path: 'user-list', component: UserlistComponent,resolve:{results:TestresolveService},data:{object:'userlistresolve'}},
    { path: 'sponsor-list', component: SponsorlistComponent,resolve:{results:TestresolveService},data:{object:'sponserlistresolve'}},

    { path: 'events-old', component: EventsOldComponent},
    { path: 'invite-friends', component: InviteFriendsComponent},
    { path: 'order-details/:id', component: OrderDetailsComponent},
    { path: 'pastevent', component: PasteventComponent},
    // { path: '**', component: HomeComponent},
    { path: 'termsandconditions', component: TermsandconditionsComponent},
    { path: 'returnsrefunds', component: ReturnsrefundsComponent},
    { path: 'savedcards', component: SavedcardsComponent},
    { path: 'affiliate-tree/:username/:item/:children', component: AffiliateTreeComponent},
    /* category management */
    { path: 'category-list', component: CategoryListComponent },
    { path: 'category-add', component: CategoryAddComponent },
    { path: 'category-edit/:id', component: CategoryListComponent },
    /* category management */
    { path: '**', component: TicketsaleComponent},
    // { path: '/ticket-sale-test/**', component: TicketsaleComponent},

];


export const appRoutingProviders: any[] = [
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,{ useHash: false });