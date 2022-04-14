import { Component } from '@angular/core';
import { FCM } from  'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { NotiService } from './service/noti.service';
import { LocalNotifications } from '@awesome-cordova-plugins/local-notifications/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private plt: Platform,
    private fcm: FCM,
    private router: Router,
    private notiService: NotiService,
    private localNotifications: LocalNotifications
  ) {

    this.initializeApp();


  }

  initializeApp() {
    console.log('initializeApp');
    this.plt.ready().then(async () => {
      const payload = await this.fcm.getInitialPushPayload();
      if(payload){
        const { wasTapped, param1 } = payload;

        if (wasTapped) {
          alert('background mode');
          this.router.navigate([param1]);
        }
      }


      await this.fcm.clearAllNotifications();
      //토큰 get
      this.fcm.getToken().then(token => {
        console.log('token : ', token);
      });


       /* ============ localnotifications ============ */
      //1.click
      this.localNotifications.on('click').subscribe(()=>{
        alert('click');
      });

      //1. click
      this.notiService.notiClick();

      //2. 스케쥴
      this.notiService.scheduleNotification();
      /* ============ localnotifications ============ */

    });
  }

  ionViewWillEnter(){
  }
}
