import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

    //declaração global de objetos e variáves
  user: User = new User()
  confirmarSenha: string
  tipoUsuario: string

  constructor(

   //injeção de dependências
    private authService: AuthService,
    private rota: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

  }

  confirmSenha(event: any) {

    this.confirmarSenha = event.target.value //o que estiver no valor do input, que chama esse método confirmSenha, será passado para essa variável confirmarSenha
  }

  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  cadastrar() {
    this.user.tipo = this.tipoUsuario

    if (this.user.senha != this.confirmarSenha) {
      alert('As senhas estão incorretas.')

    } else { 
      
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        this.rota.navigate(['/entrar'])
        alert('Usuário cadastrado com sucesso')
      })
      
      
    }
  }

}
