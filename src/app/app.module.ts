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
import { SummaryComponent } from './summary/summary.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewTaskComponent } from './new-task/new-task.component';
import { TemplateComponent } from './template/template.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { DragDropModule, CdkDropListGroup, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DialogAddTaskComponent } from './dialog-add-task/dialog-add-task.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BoardComponent,
    SignupComponent,
    NewPasswordComponent,
    HeaderComponent,
    SidebarNavComponent,
    SummaryComponent,
    ContactsComponent,
    NavbarComponent,
    NewTaskComponent,
    TemplateComponent,
    LegalNoticeComponent,
    DialogAddTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    ReactiveFormsModule,
    DragDropModule,
    CdkDropListGroup, 
    CdkDropList, 
    CdkDrag,
    MatProgressBarModule
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
