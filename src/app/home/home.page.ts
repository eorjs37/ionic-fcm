import { Component } from '@angular/core';
import { NotiService } from '@app/service/noti.service';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private notiService: NotiService) {

  }

  clickNoti(){
    this.notiService.currentLocalNoti();
  }
}
