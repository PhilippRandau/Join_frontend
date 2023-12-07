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
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DialogAddTaskComponent } from './dialog-add-task/dialog-add-task.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MAT_DATE_LOCALE, MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectModule } from '@angular/material/select';
import { NgxAnimatedCounterModule } from '@bugsplat/ngx-animated-counter';
import { ContactAddComponent } from './contact-add/contact-add.component';
import { DialogTaskDetailsComponent } from './dialog-task-details/dialog-task-details.component';
import { DialogTaskDetailsEditComponent } from './dialog-task-details-edit/dialog-task-details-edit.component';



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
    ContactAddComponent,
    DialogTaskDetailsComponent,
    DialogTaskDetailsEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    ReactiveFormsModule,
    DragDropModule,
    MatProgressBarModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatDatepickerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatNativeDateModule,
    BrowserAnimationsModule,
    MatSelectModule,
    NgxAnimatedCounterModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorServiceService,
      multi: true
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
