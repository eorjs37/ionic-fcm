import { Injectable } from '@angular/core';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
@Injectable({
  providedIn: 'root'
})
export class NotiService {

  constructor(private localnoti: LocalNotifications) {
  }

  notiClick(){
    this.localnoti.on('click').subscribe(()=>{
      alert('click');
      console.log('click');

    });
  }

  /**
   * @description : 현재시간에 알림을 보낸다
   */
  currentLocalNoti(){
    const date = new Date();
    const notidate = new Date(new Date().getTime());
    const yyyy = date.getFullYear();
    const month = date.getMonth();
    const currentdate = date.getDate();

    this.localnoti.schedule({
      id:3,
      title:`${yyyy}년 ${month+1}월 ${currentdate}일`,
      trigger:{
        firstAt:notidate
      }
    });
  }
}
