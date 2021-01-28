import { NgModule} from '@angular/core'; 
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './navegacao/home/home.component';
import { SobreComponent } from './institucional/sobre/sobre.component';
import { CadastroComponent } from './demo/reactiveForms/cadastro/cadastro.component';
import { NotFoundComponent } from './navegacao/not-found/not-found.component';

const rootRouterConfig: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'sobre', component: SobreComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'produtos', 
        loadChildren: () => import('./demo/arquitetura-componentes/produto.module')
        .then(m => m.ProdutoModule)},
    
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports:[
        RouterModule.forRoot(rootRouterConfig)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{}
