import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService as AuthGuard } from './guards/auth-guard.service';
import { RoleGuardService as RoleGuard } from './guards/role-guard.service';
const routes: Routes = [

 /* Om te kijken of gebruiker is ingelogd
   { path: '', component: ProfileComponent, canActivate: [AuthGuard] },

    /* Om te kijken of gebruiker administrator is
    {
        path: 'admin',
        component: AdminComponent,
        canActivate: [RoleGuard],
        data: {
            expectedRole: 'admin'
        }
    }*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
