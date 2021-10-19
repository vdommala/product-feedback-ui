import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appMedia]',
})
export class MediaDirective {
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {}
  private hasView: boolean = false;
  private removeListener!: () => void;

  @Input()
  set appMedia(query: string) {
    if (this.removeListener) {
      this.removeListener();
    }
    const mql: MediaQueryList = window.matchMedia(query);
    const changeListener = (event: any) => {
      if (event.matches && !this.hasView) {
        this.hasView = true;
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
      if (!event.matches && this.hasView) {
        this.hasView = false;
        this.viewContainerRef.clear();
      }
    };
    changeListener(mql);
    mql.addEventListener('change', changeListener);
    this.removeListener = () => removeEventListener('change', changeListener);
  }
}
