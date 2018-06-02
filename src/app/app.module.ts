import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AudiodrawComponent } from './componentes/audiodraw/audiodraw.component';

import { AudioContextModule } from 'angular-audio-context';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    AudiodrawComponent
  ],
  imports: [
    BrowserModule,
    AudioContextModule.forRoot('balanced'),
    AngularFireModule.initializeApp(environment.config),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
