import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MapComponent } from '../components/map/map';
import { masterFirebaseConfig } from './api-key';
import { mastergoogleMaps } from './api-key';
import { AngularFireModule } from 'angularfire2';
import { AddSpotComponent } from "../components/add-spot/add-spot";
import { EditSpotComponent } from '../components/edit-spot/edit-spot';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { FeatureFilter } from '../pipes/feature-filter';


export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL,
  storageBucket: masterFirebaseConfig.storageBucket
}
export const googleMaps = {
  apiKey: mastergoogleMaps.apiKey
}

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddSpotComponent,
    EditSpotComponent,
    MapComponent,
    FeatureFilter
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AgmCoreModule.forRoot({
     apiKey: googleMaps.apiKey
   })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    AddSpotComponent,
    EditSpotComponent,
    MapComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
