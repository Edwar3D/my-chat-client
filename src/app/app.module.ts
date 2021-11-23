import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { ChatComponent } from './chat/chat.component';

import { ChatService } from './_services/chat.service';
import { CookieService } from 'ngx-cookie-service';
import { SocketService } from './_services/socket.service';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatIconModule} from '@angular/material/icon';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatMenuModule} from '@angular/material/menu';
import { ShowContactComponent } from './show-contact/show-contact.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ChatComponent,
    ProfileComponent,
    ContactComponent,
    ShowContactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSliderModule,
    ReactiveFormsModule,
    TextFieldModule,
    MatIconModule,
    MatBottomSheetModule,
    MatMenuModule
  ],
  providers: [authInterceptorProviders,SocketService, ChatService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
