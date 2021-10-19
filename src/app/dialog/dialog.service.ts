import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  Injector,
} from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { DialogComponent } from './dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  confirmation: boolean;
  constructor(
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.confirmation = false;
  }
  confirm(message: string): Observable<boolean> {
    return from(this.showAsComponent(message));
  }

  confirmAsPromise(message: string): Promise<any> {
    return this.showAsComponent(message);
  }

  showAsComponent(message: string): Promise<any> {
    const dialog = document.createElement('confirm');
    const factory =
      this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    const dialogRef = factory.create(this.injector, [], dialog);
    this.applicationRef.attachView(dialogRef.hostView);

    dialogRef.instance.message = message || 'is it ok?';
    console.log(document.body);
    document.body.appendChild(dialog);
    let result = dialogRef.instance.result;
    result.then((value) => {
      document.body.removeChild(dialog);
      this.applicationRef.detachView(dialogRef.hostView);
    });

    return result;
  }
}
