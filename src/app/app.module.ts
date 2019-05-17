import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {appRoutingProviders, routing} from 'route';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { KendrickComponent } from './kendrick/kendrick.component';
import { AboutAudioDeadlineComponent } from './about-audio-deadline/about-audio-deadline.component';
import { CommunityComponent } from './community/community.component';
import { AffiliateComponent } from './affiliate/affiliate.component';
import { ContactusComponent } from './contactus/contactus.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
//import { CookieService } from 'angular2-cookie/services/cookies.service';
import { UsherComponent } from './usher/usher.component';
import { SevynstreeterComponent } from './sevynstreeter/sevynstreeter.component';
import { AdminleftComponent } from './adminleft/adminleft.component';
import { AdminlistComponent } from './adminlist/adminlist.component';
import { AdminaddComponent } from './adminadd/adminadd.component';
import { AdmineditComponent } from './adminedit/adminedit.component';
import { AffiliatelistComponent } from './affiliatelist/affiliatelist.component';
import {ModalModule} from 'ngx-bootstrap/modal';
import { UserlistComponent } from './userlist/userlist.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { UpdateprofileComponent } from './updateprofile/updateprofile.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { AffiliatedashboardComponent } from './affiliatedashboard/affiliatedashboard.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import {CookieService} from 'ngx-cookie-service';
import { Communitysignup1Component } from './communitysignup1/communitysignup1.component';
import { Communitysignup2Component } from './communitysignup2/communitysignup2.component';
import { Communitysignup3Component } from './communitysignup3/communitysignup3.component';
import { ViewbrodcastComponent } from './viewbrodcast/viewbrodcast.component';
import { NamefilterPipe } from './namefilter.pipe';
import { AgreementComponent } from './agreement/agreement.component';
import { ArtistsexchangeComponent } from './artistsexchange/artistsexchange.component';
import { CompetitionComponent } from './competition/competition.component';
import { TrainingartistsComponent } from './trainingartists/trainingartists.component';
import { BloglistComponent } from './bloglist/bloglist.component';
import { BlogaddComponent } from './blogadd/blogadd.component';
import { BlogeditComponent } from './blogedit/blogedit.component';
import {CKEditorModule} from 'ngx-ckeditor';
import { SafehtmlPipe } from './safehtml.pipe';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { AffiliatereportComponent } from './affiliatereport/affiliatereport.component';
import { BlogfilterPipe } from './blogfilter.pipe';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogdetailsComponent } from './blogdetails/blogdetails.component';
import { SponsorlistComponent } from './sponsorlist/sponsorlist.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { AmbassadorsignupComponent } from './ambassadorsignup/ambassadorsignup.component';
import { AmbassadorlistComponent } from './ambassadorlist/ambassadorlist.component';
import { TicketsaleComponent } from './ticketsale/ticketsale.component';
import { CommunitysignupComponent } from './communitysignup/communitysignup.component';
import {ScrollToModule} from '@nicky-lenaers/ngx-scroll-to';
import { FanlistComponent } from './fanlist/fanlist.component';
import { ModellistComponent } from './modellist/modellist.component';
import { DancerlistComponent } from './dancerlist/dancerlist.component';
import { MusicianlistComponent } from './musicianlist/musicianlist.component';
import { SerchbyrolePipe } from './serchbyrole.pipe';
import { Communitysignupstep2Component } from './communitysignupstep2/communitysignupstep2.component';
import { GenreaddComponent } from './genreadd/genreadd.component';
import { GenreeditComponent } from './genreedit/genreedit.component';
import { GenrelistComponent } from './genrelist/genrelist.component';
import { AmbassadoragreementComponent } from './ambassadoragreement/ambassadoragreement.component';
import { AmbassadordashboardComponent } from './ambassadordashboard/ambassadordashboard.component';
import { HostfliistylzComponent } from './hostfliistylz/hostfliistylz.component';
import { PromocodeaddComponent } from './promocodeadd/promocodeadd.component';
import { PromocodeeditComponent } from './promocodeedit/promocodeedit.component';
import { PromocodelistComponent } from './promocodelist/promocodelist.component';
import { ProductaddComponent } from './productadd/productadd.component';
import { ProducteditComponent } from './productedit/productedit.component';
import { ProductlistComponent } from './productlist/productlist.component';
import { OrderlistComponent } from './orderlist/orderlist.component';
import { CommssionlistComponent } from './commssionlist/commssionlist.component';
import { ArtistfooterComponent } from './artistfooter/artistfooter.component';
import { ArtistheaderComponent } from './artistheader/artistheader.component';
import {TestresolveService} from "../app/testresolve.service";
import { DatesComponent } from './dates/dates.component';
import { TeamComponent } from './team/team.component';
import { TrendingartistComponent } from './trendingartist/trendingartist.component';
import { Oreder1Pipe } from './oreder1.pipe';
import { Oreder2Pipe } from './oreder2.pipe';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {OwlNativeDateTimeModule, OwlDateTimeModule} from "ng-pick-datetime";
import { Commission1Pipe } from './commission1.pipe';
import { Commission2Pipe } from './commission2.pipe';
import { Commission3Pipe } from './commission3.pipe';
import { NeweventrsvpComponent } from './neweventrsvp/neweventrsvp.component';
import { BannertestComponent } from './bannertest/bannertest.component';
import { CompetitionaddComponent } from './competitionadd/competitionadd.component';
import { CompetitioneditComponent } from './competitionedit/competitionedit.component';
import { CompetitionlistComponent } from './competitionlist/competitionlist.component';
import { CharlimitPipe } from './charlimit.pipe';
import {ImageCropperModule} from "ngx-image-cropper";
import { BanneraddComponent } from './banneradd/banneradd.component';
import { BannereditComponent } from './banneredit/banneredit.component';
import { BannerlistComponent } from './bannerlist/bannerlist.component';
import { BannerfilterPipe } from './bannerfilter.pipe';
import { LaeventComponent } from './laevent/laevent.component';
import { BannerbysponsorPipe } from './bannerbysponsor.pipe';
import { PartnersComponent } from './partners/partners.component';
import { OrderbyPipe } from './orderby.pipe';
import { MyorderComponent } from './myorder/myorder.component';
import { TicketsaleoldComponent } from './ticketsaleold/ticketsaleold.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import {NgxPaginationModule} from "ngx-pagination";
import { Bannerfilter2Pipe } from './bannerfilter2.pipe';
import { CompetitionuserlistComponent } from './competitionuserlist/competitionuserlist.component';
import { CompuserfilterPipe } from './compuserfilter.pipe';
import { EventsComponent } from './events/events.component';
import { CompfilterPipe } from './compfilter.pipe';
import { GenrefilterPipe } from './genrefilter.pipe';
import { ShatterblokComponent } from './shatterblok/shatterblok.component';
import { AdminfooterComponent } from './adminfooter/adminfooter.component';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { CompetitionOldComponent } from './competition-old/competition-old.component';
import { ContactusOldComponent } from './contactus-old/contactus-old.component';
import { FebeventComponent } from './febevent/febevent.component';
import { HostfliiComponent } from './hostflii/hostflii.component';
import { JoinmovementComponent } from './joinmovement/joinmovement.component';
import { OurstoryComponent } from './ourstory/ourstory.component';
import { PartnersOldComponent } from './partners-old/partners-old.component';
import { TeamOldComponent } from './team-old/team-old.component';
import { ThedeadlineexperienceComponent } from './thedeadlineexperience/thedeadlineexperience.component';

import { TabsModule } from 'ngx-bootstrap';
import { ManageCompetitionSignupComponent } from './manage-competition-signup/manage-competition-signup.component';
import { CompetitionStatsComponent } from './competition-stats/competition-stats.component';
import { MediaInterestReportComponent } from './media-interest-report/media-interest-report.component';
import { AffiliatemediamarketingComponent } from './affiliatemediamarketing/affiliatemediamarketing.component';
import { UpcomingeventsComponent } from './upcomingevents/upcomingevents.component';
import { AffiliatetreeComponent } from './affiliatetree/affiliatetree.component';
import { InviteFriendsComponent } from './invite-friends/invite-friends.component';
import { EventsOldComponent } from './events-old/events-old.component';
import {OrderDetailsComponent} from "./order-details/order-details.component";
import { PasteventComponent } from './pastevent/pastevent.component';
import { AmbassadoropportunityComponent } from './ambassadoropportunity/ambassadoropportunity.component';
import { ReturnsrefundsComponent } from './returnsrefunds/returnsrefunds.component';
import { TermsandconditionsComponent } from './termsandconditions/termsandconditions.component';
import { SavedcardsComponent } from './savedcards/savedcards.component';

import {ListingModule} from "listing-angular7";
import {DemoMaterialModule} from '../material-module';
import { BannerfiltertextPipe } from './bannerfiltertext.pipe';
import { DatefilterPipe } from './datefilter.pipe';
import { DateblogpipePipe } from './dateblogpipe.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    KendrickComponent,
    AboutAudioDeadlineComponent,
    CommunityComponent,
    AffiliateComponent,
    ContactusComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    UsherComponent,
    SevynstreeterComponent,
    AdminleftComponent,
    AdminlistComponent,
    AdminaddComponent,
    AdmineditComponent,
    AffiliatelistComponent,
    UserlistComponent,
    MyaccountComponent,
    UpdateprofileComponent,
    ChangepasswordComponent,
    AffiliatedashboardComponent,
    UserdashboardComponent,
    Communitysignup1Component,
    Communitysignup2Component,
    Communitysignup3Component,
    ViewbrodcastComponent,
    NamefilterPipe,
    AgreementComponent,
    ArtistsexchangeComponent,
    CompetitionComponent,
    TrainingartistsComponent,
    BloglistComponent,
    BlogaddComponent,
    BlogeditComponent,
    SafehtmlPipe,
    ForgotpasswordComponent,
    AffiliatereportComponent,
    BlogfilterPipe,
    BlogsComponent,
    BlogdetailsComponent,
    SponsorlistComponent,
    ResetpasswordComponent,
    AmbassadorsignupComponent,
    AmbassadorlistComponent,
    TicketsaleComponent,
    CommunitysignupComponent,
    FanlistComponent,
    ModellistComponent,
    DancerlistComponent,
    MusicianlistComponent,
    SerchbyrolePipe,
    Communitysignupstep2Component,
    GenreaddComponent,
    GenreeditComponent,
    GenrelistComponent,
    AmbassadoragreementComponent,
    AmbassadordashboardComponent,
    HostfliistylzComponent,
    PromocodeaddComponent,
    PromocodeeditComponent,
    PromocodelistComponent,
    ProductaddComponent,
    ProducteditComponent,
    ProductlistComponent,
    OrderlistComponent,
    CommssionlistComponent,
    ArtistfooterComponent,
    ArtistheaderComponent,
    DatesComponent,
    TeamComponent,
    TrendingartistComponent,
    Oreder1Pipe,
    Oreder2Pipe,
    Commission1Pipe,
    Commission2Pipe,
    Commission3Pipe,
    NeweventrsvpComponent,
    BannertestComponent,
    CompetitionaddComponent,
    CompetitioneditComponent,
    CompetitionlistComponent,
    CharlimitPipe,
    BanneraddComponent,
    BannereditComponent,
    BannerlistComponent,
    BannerfilterPipe,
    LaeventComponent,
    BannerbysponsorPipe,
    PartnersComponent,
    OrderbyPipe,
    MyorderComponent,
    TicketsaleoldComponent,
    FileuploadComponent,
    Bannerfilter2Pipe,
    CompetitionuserlistComponent,
    CompuserfilterPipe,
    EventsComponent,
    CompfilterPipe,
    GenrefilterPipe,
    ShatterblokComponent,
    AdminfooterComponent,
    AdminheaderComponent,
    CompetitionOldComponent,
    ContactusOldComponent,
    FebeventComponent,
    HostfliiComponent,
    JoinmovementComponent,
    OurstoryComponent,
    PartnersOldComponent,
    TeamOldComponent,
    ThedeadlineexperienceComponent,
    ManageCompetitionSignupComponent,
    CompetitionStatsComponent,
    MediaInterestReportComponent,
    AffiliatemediamarketingComponent,
    UpcomingeventsComponent,
    AffiliatetreeComponent,
    InviteFriendsComponent,
    EventsOldComponent,
    OrderDetailsComponent,
    PasteventComponent,
    AmbassadoropportunityComponent,
    ReturnsrefundsComponent,
    TermsandconditionsComponent,
    SavedcardsComponent,
    BannerfiltertextPipe,
    DatefilterPipe,
    DateblogpipePipe
  ],
  imports: [
    ImageCropperModule,
    BrowserModule,
    FormsModule,
    // HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    NgxPaginationModule,
    routing,
    ReactiveFormsModule,
      CKEditorModule,
      ModalModule.forRoot(),
      ScrollToModule.forRoot(),
    TabsModule.forRoot(),
    ListingModule,
    DemoMaterialModule
  ],providers: [appRoutingProviders, CookieService, TestresolveService],
  bootstrap: [AppComponent]
})
export class AppModule { }
