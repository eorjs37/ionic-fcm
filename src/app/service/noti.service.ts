import { Injectable } from '@angular/core';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
@Injectable({
  providedIn: 'root'
})
export class NotiService {

  constructor(private localnoti: LocalNotifications) {

  }

  scheduleNotification(){
    this.localnoti.schedule({
      id:1,
      title: 'Attention',
      text: 'MaxGun Notification',
      data: { mydata: 'My Hidden message this is' },
      trigger:{in:5, unit:ELocalNotificationTriggerUnit.SECOND},
      foreground: true
    });
  }

  notiClick(){
    this.localnoti.on('click').subscribe(()=>{
      alert('click');
      console.log('click');

    });
  }
}
