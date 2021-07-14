import { Postagem } from "./Postagem"; //importou a classe Postagem para fazer o relacionamento

export class Tema{
    public id: number
    public descricao: string
    public postagem: Postagem[] //@OneToMany --> 1 tema para muitas postagens 
}

