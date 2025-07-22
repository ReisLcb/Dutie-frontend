import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Tarefa } from '../modelos/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {
      private http = inject(HttpClient)
      private api = `http://localhost:3000/tarefas`

  constructor() { }

  getAll(){
    return this.http.get<Tarefa[]>(this.api)
  }

  getByName(nome:string){
    return this.http.get<Tarefa[]>(`${this.api}/nome/${nome}`)
  }

  getById(id:number){
    return this.http.get<Tarefa>(`${this.api}/id/${id}`)
  }

  create(tarefa:Partial<Tarefa>){
    return this.http.post<Tarefa>(this.api, tarefa)
  }

  update(id:number, tarefa:Partial<Tarefa>){
    return this.http.put<Tarefa>(`${this.api}/update/${id}`, tarefa)
  }

  delete(id:number){
    return this.http.delete(`${this.http}/delete/${id}`)
  }
}
