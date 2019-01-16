import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '@features/login/login.guard';
import { PageNotFoundComponent } from '@features/login/page-not-found/page-not-found.component';
import { MainComponent } from './main/main.component';
import { LoginComponent } from '@features/login/login.component';

const routes: Routes = [
	{path: 'login', component: LoginComponent},
	{path: 'main', component: MainComponent, canActivate: [LoginGuard]},
	{path: '', redirectTo: 'login', pathMatch: 'full'},
	{path: '**', component: PageNotFoundComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {useHash: true})],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
