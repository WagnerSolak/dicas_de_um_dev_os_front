import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Tecnico } from 'src/app/models/tecnico';
import { TecnicoService } from 'src/app/services/tecnico.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tecnico-read',
  templateUrl: './tecnico-read.component.html',
  styleUrls: ['./tecnico-read.component.css']
})
export class TecnicoReadComponent implements AfterViewInit {

  tecnicos: Tecnico[] = [];

  displayedColumns: string[] = ['id', 'nome', 'cpf', 'telefone', 'action'];
  dataSource = new MatTableDataSource<Tecnico>(this.tecnicos);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private service : TecnicoService,
    private router: Router    
    ){} 

  ngAfterViewInit() {
    // comentado a linha abaixo pq se deixar ele e no DataSource deixar o array ele não trás a paginação de forma correta
    // this.dataSource.paginator = this.paginator;
    this.findAll();
  }

  findAll():void{
    this.service.findAll().subscribe((resposta) => {
      this.tecnicos = resposta;
      // adicionado para ele buscar os objetos e "popular" a tabela
      this.dataSource = new MatTableDataSource<Tecnico>(this.tecnicos);
      // paginator trazido do método ViewInit para acertar a paginação do Table Tecnicos
      this.dataSource.paginator = this.paginator;
    })
  }

  navigateToCreate(): void{
    this.router.navigate(['tecnicos/create'])
  }
}

