import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonList, IonItem, IonButton, IonModal, IonInput, IonDatetime, IonDatetimeButton, IonLabel, ToastController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { addIcons } from 'ionicons';
import { addCircle, checkmarkOutline, closeCircle, closeCircleOutline } from 'ionicons/icons';
import { Usuario } from 'src/app/modelos/usuario';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, IonList, IonItem, IonButton, ReactiveFormsModule, IonInput, IonDatetime, IonModal, IonDatetimeButton, IonLabel]
})
export class CadastroPage {
  protected id:number = -1

  private router = inject(Router)
  private UsuarioService = inject(UsuarioService)

  private formBuilder = inject(NonNullableFormBuilder);
  protected usuarioForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.min(3), Validators.maxLength(100)]],
    nome_de_usuario: ['', [Validators.required, Validators.min(3), Validators.maxLength(20)]],
    data_nascimento: [new Date().toISOString(), [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private toastController: ToastController) {
    addIcons({ closeCircle, checkmarkOutline, addCircle, closeCircleOutline });

        const currentNav = this.router.getCurrentNavigation();
    if (currentNav?.extras.state) {
        const extras = currentNav.extras;
        let usuario = extras.state as Usuario;
        this.id = usuario.id;

        let usuarioSemId: Partial<Usuario> = usuario;

        delete usuarioSemId.id;

        this.usuarioForm.setValue(usuario);
    }
  }

  async exibirMensagem(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
    });

    await toast.present();
  }


  protected cadastrar(){
    if(this.id == -1){
        this.UsuarioService.cadastrar(this.usuarioForm.value).subscribe({
          next: () =>{
            this.exibirMensagem(`Bem-vindo, ${this.usuarioForm.value.nome_de_usuario}!`)
            this.router.navigate(['/home'])
          },

          error: (erro) => {
            this.exibirMensagem(erro.error.error)
          }
        })
    } else{
      this.UsuarioService.update(this.usuarioForm.value, this.id).subscribe({
        next: (user) =>{
          console.log(user)
          this.router.navigate(['/listagem'])
        },
        
        error: (erro) => this.exibirMensagem(erro.error.error)
      })
    }
  }
}
