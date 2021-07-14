import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem ()
  listaPostagens: Postagem[]

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  user: User = new User()
  idUser = environment.id //idUser recebe o id do usuário logado (que está no environment)

  constructor(
    private router: Router, 
    private postagemService: PostagemService,
    private temaService: TemaService,
    private authService: AuthService
  ) { }

  ngOnInit() {

    if(environment.token == ''){
      alert('Sua sessão expirou, faça o login novamente!')
      this.router.navigate(['/entrar'])
    }
    this.temaService.refreshToken()
    this.postagemService.refreshToken()
    this.getAllTemas()
    this.getAllPostagens()
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) =>{
      this.tema = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) =>{
      this.user = resp
    })
  }
  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }
  publicar(){
    this.tema.id = this.idTema //indica para pegar o tema com o id igual o valor que esta na variável idTema
    this.postagem.tema = this.tema //passando esse tema para o atributo tema da tabela postagem (relacionamento entre tema e postagem)

    this.user.id = this.idUser //pegando o usuário correto referente ao idUser logado
    this.postagem.usuario = this.user //passando esse usuário para a postagem (relacionamento entre usuario e postagem)

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) =>{
      this.postagem = resp
      console.log(resp)
      alert('Postagem realizada com sucesso!')
      this.postagem = new Postagem() //para zerar/limpar os campos de uma postagem
      this.getAllPostagens()
    })
  }


}
