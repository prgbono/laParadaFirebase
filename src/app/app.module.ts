import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//FireBase and AngularFire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'; 
import { AngularFireAuthModule } from '@angular/fire/auth'; 
import { AngularFireStorageModule } from '@angular/fire/storage'; 
import { firebaseConfig } from './credentials';
// import { AngularFireAuthGuard } from '@angular/fire/auth-guard';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig), 
    AngularFireAuthModule,
    AngularFirestoreModule, 
    AngularFireStorageModule
  ],
  providers: [
    // StatusBar,
    // SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
    //,AngularFireAuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
