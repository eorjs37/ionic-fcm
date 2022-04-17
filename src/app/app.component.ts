import { Component } from '@angular/core';
import { FCM } from  'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { NotiService } from '@app/service/noti.service';
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
    private notiService: NotiService
  ) {

    this.initializeApp();

    this.notiService.notiClick();
  }

  initializeApp() {
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
    });
  }

  ionViewWillEnter(){
  }
}
