import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// class for sending data and sharing of data between components
export class SharedServices {
  private refreshFlag = new BehaviorSubject<boolean>(false);

  getRefreshFlag() {
    return this.refreshFlag.asObservable();
  }

  setRefreshFlag(value: boolean) {
    this.refreshFlag.next(value);
  }
}
