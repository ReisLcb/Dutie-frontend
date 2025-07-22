import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonList, IonItem, IonButton, IonInput, ToastController, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle  } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonContent, CommonModule, FormsModule, IonList, RouterLink, IonItem, IonButton, ReactiveFormsModule, IonInput, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle]
})
export class HomePage {
  private router = inject(Router)
  private UsuarioService = inject(UsuarioService)

  constructor(private toastController: ToastController) {}

  async exibirMensagem(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
    })

    await toast.present()
  }

  private formBuilder = inject(NonNullableFormBuilder);
  protected usuarioForm = this.formBuilder.group({
    nome_de_usuario: ['', [Validators.required]],
    senha: ['', [Validators.required]],
  });

  protected login(){
    this.UsuarioService.login(this.usuarioForm.value).subscribe({
      next: () => {
        this.exibirMensagem(`Login realizado com sucesso!`)
        this.router.navigate(['/listagem'])
      },

      error: (erro) => this.exibirMensagem(erro.error.error)
    })
  }
}
