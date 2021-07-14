import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../model/User';
import { UserLogin } from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient //criando um objeto do tipo HttpClient que foi importado no arquvio app.module.ts
  ) { }



  entrar(userLogin: UserLogin): Observable<UserLogin>{
    return this.http.post<UserLogin>('https://juciblogpessoal.herokuapp.com/usuarios/logar', userLogin)
     
  }

  cadastrar(user: User): Observable<User>{
    return this.http.post<User>('https://juciblogpessoal.herokuapp.com/usuarios/cadastrar/', user)
  }

  getByIdUser(id: number): Observable<User>{
    return this.http.get<User>(`https://juciblogpessoal.herokuapp.com/usuarios/${id}`)
  }
  logado(){
    let ok: boolean = false

    if(environment.token != ''){
      ok = true
    }

    return ok
  }
}
