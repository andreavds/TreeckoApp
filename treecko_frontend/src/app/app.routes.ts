import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { BoardGuard } from './guards/board.guard';
import { BoardComponent } from './pages/board/board.component';

export const routes: Routes = [
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'board/:id',
    component: BoardComponent,
    canActivate: [BoardGuard],
    },
    { path: 'board/:id', component: BoardComponent },
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: '**', redirectTo: '/home' },
];
