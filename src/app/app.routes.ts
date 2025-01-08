import { Routes } from '@angular/router';
import { LoginComponent } from "./components/login/login.component";
import { authGuard } from './guards/auth.guard';
import {AdminLayoutComponent} from "./pages/adminLayout/adminLayout.component";
import {StatistiquesComponent} from "./components/statistiques/statistiques.component";
import {UserComponent} from "./components/user/user.component";
import {UserCreateComponent} from "./components/user/create/userCreate.component";
import {CompetitionComponent} from "./components/competition/competition.component";
import {CompetitionCreateComponent} from "./components/competition/create/competitionCreate.component";
import {SpeciesComponent} from "./components/species/species.component";
import {SpeciesCreateComponent} from "./components/species/create/speciesCreate.component";
import {roleGuard} from "./guards/role.guard";
import {MemberLayoutComponent} from "./pages/memberLayout/memberLayout.component";
import {MemberCompetitionComponent} from "./components/member/competition/memberCompetition.component";
export const routes: Routes = [
  { path: '/', component: LoginComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [
      {
        path: '',
        component: StatistiquesComponent,
      },

      {
        path: 'users',
        component: UserComponent,
      },
      {
        path: 'users/create',
        component: UserCreateComponent,
      },
      {
        path: 'competitions',
        component: CompetitionComponent,
      },
      {
        path: 'competitions/create',
        component: CompetitionCreateComponent,
      },
      {
        path: 'species',
        component: SpeciesComponent,
      },
      {
        path: 'species/create',
        component: SpeciesCreateComponent,
      },
    ],
    canActivate: [authGuard, roleGuard],
    data: { role: 'ADMIN' }
  },
  {
    path: 'member',
    component: MemberLayoutComponent,
    children: [
      {
        path: '',
        component: StatistiquesComponent,
      },
      {
        path: 'competitions',
        component: MemberCompetitionComponent,
      }
    ],
    canActivate: [authGuard, roleGuard],
    data: { role: 'MEMBER' }
  },

];
