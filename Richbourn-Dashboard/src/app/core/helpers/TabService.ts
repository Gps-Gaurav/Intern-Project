import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
 
@Injectable()
export class TabService {
  selectedInput: BehaviorSubject<number> = new BehaviorSubject<number>(1);
}