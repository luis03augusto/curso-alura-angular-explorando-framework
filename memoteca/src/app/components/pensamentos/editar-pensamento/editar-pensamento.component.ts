import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../Pensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  formulario! : FormGroup;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')

    this.service.buscaPorId(parseInt(id!)).subscribe((pensamento) => {
      this.formulario = this.formBuilder.group({
        id : [pensamento.id],
        conteudo: [pensamento.conteudo, Validators.compose([
          Validators.required,
          Validators.pattern(/(.|\s)*\S(.|\s)*/),
        ])],
        autoria: [pensamento.autoria, Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])],
        modelo: [pensamento.modelo],
        favorio: [pensamento.favorito]
      })
    })
  }

  editarPensamento(){
    if(this.formulario.valid){
      this.service.editar(this.formulario.value).subscribe(() => {
        this.router.navigate(['/listarPensamento'])
      })
    }
  }

  cancelar(){
    this.router.navigate(['/listarPensamento'])
  }

  habilitarBotao(): string{
    if(this.formulario.valid){
      return 'botao'
    }
    return 'botao__desabilitado'
  }

}
