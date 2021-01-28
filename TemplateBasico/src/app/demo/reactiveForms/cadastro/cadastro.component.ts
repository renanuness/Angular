import { AfterViewInit, Component, ElementRef, OnInit, ViewChildren } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup, Validators } from '@angular/forms';
import { MASKS, NgBrazilValidators } from 'ng-brazil';
import { CustomValidators } from 'ng2-validation';
import { fromEvent, merge, Observable } from 'rxjs';
import { DisplayMessage, GenericValidator, ValidationMessages } from './generic-form-validation';

import { Usuario } from './models/usuario';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html'
})
export class CadastroComponent implements OnInit, AfterViewInit {

	@ViewChildren(FormControlName, {read: ElementRef}) formInputElement: ElementRef[];

	public MASKS = MASKS;
	cadastroForm: FormGroup;
	usuario: Usuario;
	formResult: string = '';


	validationMessages: ValidationMessages;
	genericValidator: GenericValidator;
	displayMessage: DisplayMessage = {};


	constructor(private fb: FormBuilder) {

		this.validationMessages = {
			nome:{
				required: 'O Nome é requerido',
				minlength: 'O Nome precisa ter no mínimo 2 caracteres'
			},
			cpf:{
				required: 'Informe o CPF',
				cpf: 'CPF em formato inválido'  
			},
			email:{
				required: 'Informe o e-mail',
				email: 'Email inválido'
			},
			senha:{
				required: 'Informe a senha',
				rangeLength: 'A senha deve possuir entre 6 e 15 caracteres'
			},
			senhaConfirmacao:{
				required: 'Informe a senha novamente',
				rangeLength: 'A senha deve possuir entre 6 e 15 caracteres',
				equalTo: 'As senha não conferem'
			}
		};
	
		this.genericValidator = new GenericValidator(this.validationMessages)
	}
	
	ngAfterViewInit(): void {
		let controlBlurs: Observable<any>[] = this.formInputElement
		.map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

		merge(...controlBlurs).subscribe(() => {
			this.displayMessage = this.genericValidator.processarMensagens(this.cadastroForm);
		});
	}

	ngOnInit() {
		let senha = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15])]);
		let senhaConfirmacao = new FormControl('', [Validators.required, CustomValidators.rangeLength([6,15]),  CustomValidators.equalTo(senha)])
    
		this.cadastroForm = this.fb.group({
			nome: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(200)]],
			cpf: ['',[<any>Validators.required, <any>NgBrazilValidators.cpf]],
			email: ['',[Validators.required, Validators.email]],
			senha: senha,
			senhaConfirmacao: senhaConfirmacao
		})
	}

	adicionarUsuario(){
		if(this.cadastroForm.dirty && this.cadastroForm.valid){
			this.usuario = Object.assign({}, this.usuario, this.cadastroForm.value);
			this.formResult = JSON.stringify(this.cadastroForm.value);
		}
		else{
			this.formResult = "Não submeteu!!!"
		}
	}
}
