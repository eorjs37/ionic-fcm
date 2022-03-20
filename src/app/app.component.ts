import { Component } from '@angular/core';
import { FCM } from  'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private plt: Platform,
    private fcm: FCM,
    private router: Router
  ) {

    this.initializeApp();
  }

  initializeApp() {
    console.log('initializeApp');
    this.plt.ready().then(async () => {
      const payload = await this.fcm.getInitialPushPayload();
      const { wasTapped, param1 } = payload;

      if (wasTapped) {
        alert('background mode');
        this.router.navigate([param1]);
      }

      await this.fcm.clearAllNotifications();
      this.fcm.getToken().then(token => {
        console.log('token : ', token);
      });
    });
  }
}
