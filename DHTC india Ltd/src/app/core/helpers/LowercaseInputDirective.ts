/**
 * Desenvolvido em combinação com os posts
 * 
 * HTML: Forcing INPUT text to uppercase
 * @see https://www.the-art-of-web.com/html/input-field-uppercase/
 * 
 * Directive to upper case input fields
 * @see https://stackoverflow.com/questions/46825078/directive-to-upper-case-input-fields/46832182#46832182
 * 
 * How to convert input value to uppercase in angular 2 (value passing to ngControl)
 * https://stackoverflow.com/questions/35826325/how-to-convert-input-value-to-uppercase-in-angular-2-value-passing-to-ngcontrol#35829552
 * 
 */

 import { Directive, ElementRef, HostListener } from '@angular/core';
 @Directive({
   selector: '[lowercase]',
   host: {
     '(input)': '$event'
   }
 })
 export class LowercaseInputDirective {
 
   lastValue: string;
 
   constructor(public ref: ElementRef) { }
 
   @HostListener('input', ['$event']) onInput($event) 
   {
     var start = $event.target.selectionStart;
     var end = $event.target.selectionEnd;
     $event.target.value = $event.target.value.toLowerCase();
     $event.target.setSelectionRange(start, end);
     $event.preventDefault();
 
     // Garante que o último caractere digitado fique minúsculo
     if (!this.lastValue || (this.lastValue && $event.target.value.length > 0 && this.lastValue !== $event.target.value)) {
       this.lastValue = this.ref.nativeElement.value = $event.target.value;
       // Propagation
       const evt = document.createEvent('HTMLEvents');
       evt.initEvent('input', false, true);
       event.target.dispatchEvent(evt);
     }
   }
 }