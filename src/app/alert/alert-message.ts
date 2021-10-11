import { AlertType } from './alert-type.enum';

export class AlertMessage {
  id: number;
  constructor(
    public message: string,
    public type: AlertType,
    public duration: number = 2000
  ) {
    {
      this.id = new Date().getTime();
    }
  }
}
