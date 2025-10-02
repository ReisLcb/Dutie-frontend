import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSelectOption, IonButton, IonSelect, IonTextarea, IonInput, IonItem, ToastController } from "@ionic/angular/standalone"
import { Router, RouterLink } from '@angular/router';
import { ListaTarefasService } from 'src/app/service/lista-tarefas.service';
import { Lista_tarefas } from 'src/app/modelos/lista-tarefas';

@Component({
  selector: 'app-lista-tarefas-update',
  templateUrl: './lista-tarefas-update.page.html',
  styleUrls: ['./lista-tarefas-update.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSelectOption, IonButton, FormsModule, ReactiveFormsModule, RouterLink, IonSelect, IonTextarea, IonInput, IonItem]
})

export class ListaTarefasUpdatePage implements OnInit {

  private idLista!:number
  private listaSelecionada!:any
  private listaService = inject(ListaTarefasService)
  private router = inject(Router)

  async exibirMensagem(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
    })

    await toast.present()
  }

  constructor(private toastController:ToastController) {
    if(this.listaSelecionada){
      let listaSemId:Partial<Lista_tarefas> = this.listaSelecionada
      delete listaSemId.id
    }
   }

  private fb = inject(NonNullableFormBuilder)
    protected fbListaTarefas = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descricao: [''],
      data_ultima_alteracao: [new Date().toISOString()],
      visibilidade: ['', [Validators.required]],
    });

  public ionViewWillEnter(){
      this.listaService.getById(this.idLista).subscribe({
        next: (resposta) => {
          this.listaSelecionada = resposta;

          // Aqui é onde você deve preencher o formulário
          this.fbListaTarefas.patchValue({
            titulo: this.listaSelecionada.titulo,
            descricao: this.listaSelecionada.descricao,
            visibilidade: this.listaSelecionada.visibilidade
          });
        },
        error: (erro) => this.exibirMensagem(erro.error)
      });
  }

  async ngOnInit() {
    this.idLista = this.obterIdLista()
  }

  obterIdLista():number{
    return parseInt(localStorage.getItem('id-lista-key')!.toString())
  }

  alterarListaTarefas(){
    this.listaService.update(this.idLista, this.fbListaTarefas.value).subscribe({
      next: () => {
        this.exibirMensagem("Lista de tarefas alterada com sucesso")
        this.router.navigate(['/main'])
    },
      error: (erro) => this.exibirMensagem(erro.error)
    })
  }
}
