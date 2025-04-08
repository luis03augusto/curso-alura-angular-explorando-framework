import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../Pensamento';
import { PensamentoService } from '../pensamento.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-pensamento',
  templateUrl: './listar-pensamento.component.html',
  styleUrls: ['./listar-pensamento.component.css']
})
export class ListarPensamentoComponent implements OnInit {

  pensamentos: Pensamento[] = [];
  paginaAtual: number = 1;
  haMaisPensamentos: boolean = true;
  filtro: string = '';
  favorito: boolean = false;
  listaFavorito: Pensamento[] = [];
  titulo: string = 'Meu Mural'

  constructor(private service: PensamentoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe((pensamentos) => {
      this.pensamentos = pensamentos
    })
  }

  recarregarComponente() {
    this.favorito = false
    this.paginaAtual = 1

    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([this.router.url]);
  }

  carregarMaisPensamentos() {

    this.service.listar(++this.paginaAtual, this.filtro, this.favorito).subscribe((pensamentos) => {
      this.pensamentos.push(...pensamentos)
      if (!pensamentos.length) {
        this.haMaisPensamentos = false
      }
    })
  }

  PesquisarPensamento() {
    this.haMaisPensamentos = true;
    this.paginaAtual = 1;

    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe((pensamentos) => {
      this.pensamentos = pensamentos
    })
  }

  listarFavorito() {
    this.titulo = 'Meus Favoritos'
    this.favorito = true;
    this.paginaAtual = 1;
    this.haMaisPensamentos = true;

    this.service.listar(this.paginaAtual, this.filtro, this.favorito).subscribe((pensamentoFavoritos) => {
      this.pensamentos = pensamentoFavoritos;
      this.listaFavorito = pensamentoFavoritos;
    })
  }

}
