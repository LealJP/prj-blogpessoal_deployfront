import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token) //seta a autorização necessária com o token (implementado no backend) para que seja possível fazer a requisião de get 
  }
  refreshToken() { //esse método passa novamente o token para a headers para conseguir autorização do backend
    this.token = {
      headers: new HttpHeaders().set('Authorization', environment.token)
    }
  }
  getAllPostagens(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>('https://juciblogpessoal.herokuapp.com/postagens', this.token)
  }

  postPostagem(postagem: Postagem): Observable<Postagem>{
    return this.http.post<Postagem>('https://juciblogpessoal.herokuapp.com/postagens', postagem, this.token)
  }
}
