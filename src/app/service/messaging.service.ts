import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
import {Metrika} from "ng-yandex-metrika";


@Injectable()
export class MessagingService {

  currentMessage = new BehaviorSubject(null);
  token = new BehaviorSubject(null);



  constructor(private metrika: Metrika, private angularFireMessaging: AngularFireMessaging) {
    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      }
    )
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        this.token.next(token);
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (payload) => {
        console.log("new message received. ", payload);
        this.currentMessage.next(payload);
      })
  }
}
