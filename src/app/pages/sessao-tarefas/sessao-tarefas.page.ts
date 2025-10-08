import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardTitle, IonList, IonItem, IonButton, IonIcon, IonCardSubtitle } from '@ionic/angular/standalone';
import { Tarefa } from 'src/app/modelos/tarefa';
import { Lista_tarefas } from 'src/app/modelos/lista-tarefas';
import { ListaTarefasService } from 'src/app/service/lista-tarefas.service';
import { TarefaService } from 'src/app/service/tarefa.service';
import { addIcons } from 'ionicons';
import { checkmarkOutline } from 'ionicons/icons';

@Component({
  selector: 'app-sessao-tarefas',
  templateUrl: './sessao-tarefas.page.html',
  styleUrls: ['./sessao-tarefas.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonList, IonItem, IonButton, IonIcon, IonCardSubtitle ]
})
export class SessaoTarefasPage implements OnInit {
  
  protected carregando: boolean = true;


  private listaTarefasService = inject(ListaTarefasService)
  private tarefaService = inject(TarefaService)

  protected lista_tarefas!:Partial<Lista_tarefas>;
  protected tarefas:Partial<Tarefa>[] = []
  protected listaTarefaId!:number;

  public async ionViewWillEnter(){
    this.tarefas = JSON.parse(this.obterTarefasStorage()!.toString())
    this.listaTarefaId = parseInt(this.obterListaId()!.toString())
    await this.obterListaTarefas(this.listaTarefaId)
    console.log(this.lista_tarefas)
  }

  constructor() {
    addIcons({ checkmarkOutline })
   }

  ngOnInit() {}

  private async obterListaTarefas(id_lista:number){
    this.listaTarefasService.getById(id_lista).subscribe({
      next: (resposta) => {
        this.lista_tarefas = resposta
        this.carregando = false; // Libera a renderização
        console.log(this.lista_tarefas)
      },
      error: (erro) => console.log(erro)
    })
  }

  private obterTarefasStorage(){
    return localStorage.getItem("tarefas")
  }

  private obterListaId(){
    return localStorage.getItem("id-lista-key")
  }

  protected concluirTarefa(index:number){
    this.tarefas[index].status = "Concluída"
    console.log(this.tarefas)
  }

}
