import { Data } from "@angular/router"
import { Tema } from "./Tema"
import { User } from "./User" //importou a classe User

export class Postagem{
    public id: number
    public titulo: string
    public texto: string
    public data: Date
    public usuario: User
    public tema: Tema  //ManyToOne --> muitas postagens para 1 único tema

}

