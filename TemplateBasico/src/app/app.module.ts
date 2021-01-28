import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { CustomFormsModule } from 'ng2-validation'
import { NgBrazil} from 'ng-brazil';
import { TextMaskModule } from 'angular2-text-mask';

import { AppComponent } from './app.component';
import { SobreComponent } from './institucional/sobre/sobre.component';
import { CadastroComponent } from './demo/reactiveForms/cadastro/cadastro.component';
import { NavegacaoModule } from './navegacao/navegacao.module';
import { AppRoutingModule } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    SobreComponent,
    CadastroComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NavegacaoModule,
    CustomFormsModule,
    TextMaskModule,
    NgBrazil
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
