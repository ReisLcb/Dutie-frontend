import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Usuario } from '../modelos/usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuarioService {
    private http = inject(HttpClient)
    private api = `http://localhost:3000/usuarios`

  constructor() { }

  cadastrar(usuario:Partial<Usuario>){
    return this.http.post<Usuario>(this.api, usuario)
  }

  login(usuario:Partial<Usuario>){
    return this.http.get<Usuario>(`${this.api}/login/${usuario.nome_de_usuario}/${usuario.senha}`)
  }

  getAll(){
    return this.http.get<Usuario[]>(this.api)
  }

  getById(id:number){
    return this.http.get<Usuario[]>(`${this.api}/id/${id}`)
  }

  getByName(nome:string){
    return this.http.get<Usuario[]>(`${this.api}/username/${nome}`)
  }

  update(usuario:Partial<Usuario>, id:number){
    return this.http.put<Usuario>(`${this.api}/update/${id}`, usuario)
  }

  delete(id:number){
    return this.http.delete<Usuario>(`${this.api}/delete/${id}`)
  }
}
