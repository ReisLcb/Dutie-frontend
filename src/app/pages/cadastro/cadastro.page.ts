import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NonNullableFormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonList, IonItem, IonButton, IonInput, ToastController, IonInputPasswordToggle, IonToolbar, IonIcon, IonHeader } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';
import { addIcons } from 'ionicons';
import { arrowBackOutline } from 'ionicons/icons';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, CommonModule, FormsModule, IonList, IonItem, IonButton, ReactiveFormsModule, IonInput, IonInputPasswordToggle, IonToolbar, IonIcon, IonHeader, RouterLink]
})
export class CadastroPage {
  private router = inject(Router)
  private UsuarioService = inject(UsuarioService)

  private formBuilder = inject(NonNullableFormBuilder);
  protected usuarioForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.min(3), Validators.maxLength(100)]],
    nome_de_usuario: ['', [Validators.required, Validators.min(3), Validators.maxLength(20)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]]
  });

  selectedFile: File | null = null;

  constructor(private toastController: ToastController) {
    addIcons({ arrowBackOutline });
  }

  async exibirMensagem(msg:string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      position: 'bottom',
    });

    await toast.present();
  }

  // onFileSelected(event: Event) {
  //   const input = event.target as HTMLInputElement;

  //   if (input.files && input.files.length > 0) {
  //     this.selectedFile = input.files[0];
  //     console.log(this.selectedFile)
  //   }
  // } passar informação da foto para ao método create e depois para o DB

  public ionViewWillEnter(){
    this.usuarioForm.patchValue({
      nome: '',
      nome_de_usuario: '',
      email: '',
      senha: ''
    })
  }


  protected cadastrar(){
        this.UsuarioService.cadastrar(this.usuarioForm.value).subscribe({
          next: () =>{
            this.exibirMensagem(`Bem-vindo, ${this.usuarioForm.value.nome_de_usuario}!`)
            this.router.navigate(['/home'])
          },

          error: (erro) => {
            this.exibirMensagem(erro.error)
          }
        })
  }
}
