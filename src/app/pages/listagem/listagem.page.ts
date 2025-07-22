import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCol, IonRow, ToastController, IonSearchbar, IonIcon, IonButton } from '@ionic/angular/standalone';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Usuario } from 'src/app/modelos/usuario';
import { addIcons } from 'ionicons';
import { trashOutline, createOutline } from 'ionicons/icons'
import { Router } from '@angular/router';

@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.page.html',
  styleUrls: ['./listagem.page.scss'],
  standalone: true,
  imports: [IonButton, IonGrid, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCol, IonRow, IonSearchbar, IonIcon]
})

export class ListagemPage {
  protected opcao:string = 'nome'

  private UsuarioService = inject(UsuarioService)
  private router = inject(Router)
  public usuarios:Usuario[] = []

  constructor(private toastController: ToastController) { 
    addIcons({ trashOutline, createOutline })
  }

  public ionViewDidEnter(){
    this.obterTodos() 
  }

  async exibirMensagem(mensagem:string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  protected obterTodos(){
    this.UsuarioService.getAll().subscribe({
      next: (users) => this.usuarios = users,
      error: () => this.exibirMensagem("Erro ao obter usuários")
    })
  }

  protected procurarPeloNome(evento:Event){
    const searchBar = evento.target as HTMLIonSearchbarElement

    if(searchBar.value){
    this.UsuarioService.getByName(searchBar.value).subscribe({
      next: (users) => this.usuarios = users,
      error: (erro) => this.exibirMensagem(erro.error)
    })
  } else this.obterTodos()
  }

  protected alterar(idx:number){
      const usuarioSelecionado = this.usuarios[idx]

      this.router.navigate(['/cadastro'], {state: usuarioSelecionado})
  }

  protected excluir(id:number){
    this.UsuarioService.delete(id).subscribe({
      next: () => {
        this.exibirMensagem("Usuário excluido com sucesso")
        this.obterTodos()
      },
      error: (erro) => this.exibirMensagem(erro.error.error)
    })
  }

}
