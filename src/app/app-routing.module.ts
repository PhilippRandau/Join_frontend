import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BoardComponent } from './board/board.component';
import { SignupComponent } from './signup/signup.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AddTaskComponent } from './add_task/add_task.component';
import { SummaryComponent } from './summary/summary.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'request-new-password', component: NewPasswordComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'board', component: BoardComponent },
  { path: 'add_task', component: AddTaskComponent },
  { path: 'contacts', component: ContactsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
