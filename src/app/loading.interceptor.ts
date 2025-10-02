import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { finalize, Observable } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingCtrl = inject(LoadingController);

  let loadingInstance: HTMLIonLoadingElement;

  // Cria e mostra o loading antes de continuar com a requisição
  const loadingPromise = loadingCtrl.create({
    message: 'Carregando...',
    spinner: 'crescent',
    backdropDismiss: false,
    cssClass: 'carregamento'
  });

  return new Observable(observer => {
    let subscription:any;

    loadingPromise.then(loading => {
      loadingInstance = loading;
      loading.present();

      subscription = next(req).pipe(
        finalize(() => {
          loadingInstance.dismiss();
        })
      ).subscribe({
        next: (event) => observer.next(event),
        error: (err) => observer.error(err),
        complete: () => observer.complete(),
      });
    });

    // Cleanup caso unsubscribe antes da promessa carregar
    return () => {
      subscription?.unsubscribe();
      loadingInstance?.dismiss();
    };
  });
};
