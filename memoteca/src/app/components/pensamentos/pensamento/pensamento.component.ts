import { Pensamento } from './../Pensamento';
import { Component, Input, OnInit } from '@angular/core';
import { PensamentoService } from '../pensamento.service';

@Component({
  selector: 'app-pensamento',
  templateUrl: './pensamento.component.html',
  styleUrls: ['./pensamento.component.css']
})
export class PensamentoComponent implements OnInit {

  constructor(private service: PensamentoService) { }

  @Input() pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo: '',
    favorito: false
  };

  @Input() lisaFavorito: Pensamento[] = [];

  ngOnInit(): void {
  }

  larguraPensamento(): string {
    if (this.pensamento.conteudo.length >= 256) {
      return 'pensamento-g'
    }
    return 'pensamento-p'
  }

  mudarIconeFavorito(): string {
    if (this.pensamento.favorito == false)
      return 'inativo';

    return 'ativo'
  }

  mudarFavorito() {
    this.service.mudarFavorito(this.pensamento).subscribe(() => {
      this.lisaFavorito.splice(this.lisaFavorito.indexOf(this.pensamento, 1))
    })
  }

}
