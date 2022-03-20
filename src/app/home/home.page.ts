import { Component } from '@angular/core';
import { AlertController, Platform } from '@ionic/angular';
import { ELocalNotificationTriggerUnit, LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  scheduled = [];
  constructor(private plt: Platform, private localNotifactions: LocalNotifications, private altCtrl: AlertController) {
    this.plt.ready().then(() => {
      this.localNotifactions.on('click').subscribe(res => {
        console.log('click : ',res);
        const msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });

      this.localNotifactions.on('trigger').subscribe(res => {
        console.log('trigger : ', res);
        const msg = res.data ? res.data.mydata : '';
        this.showAlert(res.title, res.text, msg);
      });
    });
  }

  scheduleNotification() {
    this.localNotifactions.schedule({
      id: 1,
      title: 'Attention',
      text: 'MaxGun Notification',
      data: { mydata: 'My Hidden message this is' },
      trigger: { in: 5, unit: ELocalNotificationTriggerUnit.SECOND },
      foreground:true,
    });
  }

  recurringNotification() {
    this.localNotifactions.schedule({
      id: 22,
      title: 'Recurring',
      text: 'MaxGun Recurring Notification',
      data: { mydata: 'My Hidden message this is' },
      trigger: { every:ELocalNotificationTriggerUnit.MINUTE },
    });
  }

  repeatingDaily() {
    this.localNotifactions.schedule({
      id: 42,
      title: 'Good Morning',
      text: 'Code something epic today',
      trigger: { every:{ hour:9,minute:40} },
    });
  }

  getAll() {
    this.localNotifactions.getAll().then(res => {
      this.scheduled = res;
    });
  }

  showAlert(header, sub, msg) {
    this.altCtrl.create({
      // eslint-disable-next-line object-shorthand
      header:header,
      subHeader: sub,
      message: msg,
      buttons: ['Ok']
    }).then(alert => alert.present());
  }
}
