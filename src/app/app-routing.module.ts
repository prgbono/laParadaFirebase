import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

// Servicio Guard que se suscribe al estado del usuario. Las páginas con canActivate: [AuthGuard] no serán accesibles de no estar logado
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: './home/home.module#HomePageModule', canActivate: [AuthGuard] },
  { path: 'landing', loadChildren: './pages/landing/landing.module#LandingPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'users', loadChildren: './pages/users/users.module#UsersPageModule' },
  { path: 'user-detail/:id', loadChildren: './pages/user-detail/user-detail.module#UserDetailPageModule', canActivate: [AuthGuard] },
  { path: 'signup/:stockId', loadChildren: './pages/signup/signup.module#SignupPageModule', canActivate: [AuthGuard] },
  { path: 'reset-password', loadChildren: './pages/reset-password/reset-password.module#ResetPasswordPageModule' },
  { path: 'stock', loadChildren: './pages/stock/stock.module#StockPageModule' },
  { path: 'stock-detail/:id', loadChildren: './pages/stock-detail/stock-detail.module#StockDetailPageModule', canActivate: [AuthGuard] },
  { path: 'stock-create', loadChildren: './pages/stock-create/stock-create.module#StockCreatePageModule', canActivate: [AuthGuard] }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
