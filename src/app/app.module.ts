import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import {
  NbAutocompleteModule,
  NbButtonModule, NbCheckboxModule,
  NbFormFieldModule,
  NbGlobalPhysicalPosition,
  NbIconModule,
  NbInputModule,
  NbLayoutModule, NbPopoverModule,
  NbThemeModule,
  NbToastrModule, NbUserModule
} from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HomeComponent } from './views/home/home.component';
import { AuthComponent } from './views/auth/auth.component';
import { LoaderBarComponent } from './components/loader-bar/loader-bar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { JwtInterceptor } from './auth/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthComponent,
    LoaderBarComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    NbEvaIconsModule,
    NbThemeModule.forRoot({ name: 'darkJuice' }),
    NbInputModule,
    NbLayoutModule,
    NbFormFieldModule,
    NbIconModule,
    NbPopoverModule,
    NbButtonModule,
    NbUserModule,
    AutocompleteLibModule,
    NbCheckboxModule,
    NbToastrModule.forRoot({position: NbGlobalPhysicalPosition.BOTTOM_RIGHT, limit: 3}),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
