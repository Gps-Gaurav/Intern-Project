import { Directive, Input, ElementRef, HostListener, OnInit } from '@angular/core';

import {Subject} from 'rxjs';
import { TabService } from './TabService';
type IKNOWISNUMBER = any;
type IKNOWISSTRING = any;

@Directive({
  selector: '[tabIndex]'
})
export class TabDirective implements OnInit{

  private _index: number;
  get index(): IKNOWISNUMBER{
    return this._index;
  }
  @Input('tabIndex')
  set index(i: IKNOWISSTRING){
    this._index = parseInt(i);
  }
  @HostListener('keydown', ['$event'])
  onInput(e: any) {
    if (e.which === 13) {
      this.tabService.selectedInput.next(this.index + 1)
      e.preventDefault();
    }
  }
  constructor(private el: ElementRef, private tabService: TabService) { 
  }

  ngOnInit(){
    this.tabService.selectedInput
      .subscribe((i) => {
        console.log(i, this.index);
        if (i === this.index){
          this.el.nativeElement.focus();
        }
      });
  }
}