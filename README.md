# Cordova + FCM

> Ionic에서 FCM이 동작하는 방법 및 처리는 아래와 같다.

### 1.플러그인 설치 <https://ionicframework.com/docs/native/fcm>, <https://ionicframework.com/docs/native/local-notifications>

### 2.app.module.ts에 import

### 3.background일때 , foreground일때 동작하게 하기

### 4.<추가> alias 주는법
---

## 1.플러그인 설치

> <https://ionicframework.com/docs/native/fcm>에 들어가서  
>  ionic cordova plugin add cordova-plugin-fcm-with-dependecy-updated  
>  npm install @awesome-cordova-plugins/fcm를 설치해 준다.  
>  다음으로는 <https://ionicframework.com/docs/native/local-notifications>에 들어가서  
>  ionic cordova plugin add cordova-plugin-local-notification  
>  npm install @awesome-cordova-plugins/local-notifications를 설치해준다.

## 2.app.module.ts에 import

> 아래 코드처럼 app.module.ts에 import를 해준다.

<pre>
 <code>
   //app.module.ts
   import { FCM } from 'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';

   @NgModule({
        providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },LocalNotifications,FCM],
    })
    export class AppModule {}
 </code>
</pre>

## 3.background일때 , foreground일때 동작하게 하기

> 경우의 수는 3가지가 존재한다.

1. **background에서 동작할때(앱이 비활성화)**
2. **foreground에서 동작할때(앱이 활성화 되어있지만 폰에서 다른 작업을 할 경우)**
3. **foreground에서 동작하면서 해당 앱에서 다른작업을 할때**

### 1. **background에서 동작할때(앱이 비활성화)**

<pre>
 <code>
   //app.component.ts
   import { FCM } from  'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
   import { Platform } from '@ionic/angular';
   export class AppComponent {
       constructor(
            private plt: Platform,
            private fcm: FCM,
       ) {

            this.initializeApp();
       }

       initializeApp(){
           this.plt.ready().then(async () => {
                //background에서 동작 하는 코드
                const payload = await this.fcm.getInitialPushPayload();
                if (payload) {
                    const { wasTapped, param1 } = payload;

                    if (wasTapped) {
                        //background에서 받은 코드를 작성하면됨.
                        this.router.navigate([param1]);
                    }
                }
           })
       }
   }
 </code>
</pre>

### 2. **foreground에서 동작할때(앱이 활성화 되어있지만 폰에서 다른 작업을 할 경우)**

<pre>
 <code>
   //app.component.ts
   import { FCM } from  'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
   import { Platform } from '@ionic/angular';
   export class AppComponent {
       constructor(
            private plt: Platform,
            private fcm: FCM,
       ) {

            this.initializeApp();
       }

       initializeApp(){
           this.plt.ready().then( () => {
                //foreground는 onNotification()를 사용한다.
                this.fcm.onNotification().subscribe((data) => {
                    const { wasTapped, param1 } = data;
                    //wasTapped일때 push올라온것을 클릭하면 동작한다.
                    if (wasTapped) {
                        this.router.navigate([param1]);
                    }
                });
           })
       }
   }
 </code>
</pre>

### 3. **foreground에서 동작하면서 해당 앱에서 다른작업을 할때**

<pre>
 <code>
   //app.component.ts
   import { FCM } from  'cordova-plugin-fcm-with-dependecy-updated/ionic/ngx';
   import { Platform } from '@ionic/angular';
   export class AppComponent {
       constructor(
            private plt: Platform,
            private fcm: FCM,
       ) {

            this.initializeApp();
       }

       initializeApp(){
           this.plt.ready().then( () => {
               //3.localnotifactions를 누르면 동작시킨다.
               this.localNotifactions.on('click').subscribe(res => {
                    const { param1 } = res.data;
                    this.router.navigate([param1]);
               });

                //foreground는 onNotification()를 사용한다.
                this.fcm.onNotification().subscribe((data) => {
                    const { wasTapped, param1 } = data;

                    //1.wasTapped이 false이면 localNotification을 동작시킨다.
                    if (!wasTapped) {
                        //2.localnotifactions를 호출 시킨다.
                        this.localNoti(data);
                    }
                });
           })
       }

       //loacalnoti
       localNoti(payload) {
            this.localNotifactions.schedule({
               id: 1,
               title: 'Attention',
               text: 'MaxGun Notification',
               data: payload,
               trigger: { in: 1 },
               foreground: true,
            });
       }
   }
 </code>
</pre>

### 4. **<추가> alias 주는법**
```json
/* To learn more about this file see: https://angular.io/config/tsconfig. */
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@app/*": ["src/app/*"],
      "@environments/*": ["src/environments/*"],
    }
  },
}

```