import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[adHost]',
})
export class AboutDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}