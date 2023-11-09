import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BoardComponent } from './board/board.component';
import { MatIconModule } from '@angular/material/icon';
import { SignupComponent } from './signup/signup.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { AuthInterceptorServiceService } from './services/auth-interceptor-service';
import { AuthService } from './services/auth-service';
import { HeaderComponent } from './header/header.component';
import { SidebarNavComponent } from './sidebar-nav/sidebar-nav.component';
import { MobileBottombarNavComponent } from './mobile-bottombar-nav/mobile-bottombar-nav.component';
import { MobileHeaderComponent } from './mobile-header/mobile-header.component';
import { AddTaskComponent } from './add_task/add_task.component';
import { SummaryComponent } from './summary/summary.component';
import { ContactsComponent } from './contacts/contacts.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoardComponent,
    SignupComponent,
    NewPasswordComponent,
    HeaderComponent,
    SidebarNavComponent,
    MobileBottombarNavComponent,
    MobileHeaderComponent,
    AddTaskComponent,
    SummaryComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorServiceService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
