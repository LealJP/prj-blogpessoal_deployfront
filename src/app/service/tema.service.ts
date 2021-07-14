import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

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

  getAllTema(): Observable<Tema[]> {
    return this.http.get<Tema[]>('https://juciblogpessoal.herokuapp.com/tema', this.token )

  }

  getByIdTema(id: number): Observable<Tema> {
    return this.http.get<Tema>(`https://juciblogpessoal.herokuapp.com/tema/${id}`, this.token)
  }
  postTema(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>('https://juciblogpessoal.herokuapp.com/tema', tema, this.token)
  }

  putTema(tema: Tema): Observable<Tema> {
    return this.http.put<Tema>('https://juciblogpessoal.herokuapp.com/tema', tema, this.token)
  }

  deleteTema(id: number) {
    return this.http.delete(`https://juciblogpessoal.herokuapp.com/tema/${id}`, this.token)
  }
}
