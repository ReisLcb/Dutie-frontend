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

  getAll(){
    return this.http.get<Usuario[]>(this.api)
  }

  getById(id:number){
    return this.http.get<Usuario>(`${this.api}/id/${id}`)
  }
  
  getByName(nome:string){
    return this.http.get<Usuario[]>(`${this.api}/nome/${nome}`)
  }

  getByUsername(username:string){
    return this.http.get<Usuario>(`${this.api}/username/${username}`)
  }

  getByEmail(email:string){
    return this.http.get<Usuario>(`${this.api}/email/${email}`)
  }

  update(usuario:Partial<Usuario>, id:number){
    return this.http.put<Usuario>(`${this.api}/update/${id}`, usuario)
  }

  alterarSenha(senhaDados:Partial<{senhaAtual:string, novaSenha:string}>, id:number){
    return this.http.put<Usuario>(`${this.api}/alterarSenha/${id}`, senhaDados)
  }

  delete(id:number){
    return this.http.delete<Usuario>(`${this.api}/delete/${id}`)
  }
}
