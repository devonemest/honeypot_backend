import {Component, OnInit} from '@angular/core';
import { MessagingService } from './service/messaging.service';
import {Metrika} from 'ng-yandex-metrika';
import {NavigationEnd, Router} from '@angular/router';
import { Location} from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'honeypot';
  message;

  prevPath = '';

  constructor(
    private messagingService: MessagingService,
    private metrika: Metrika,
    private router: Router,
    public location: Location,
  ) {
    this.prevPath = this.location.path();
    this.router
      .events.pipe(
      filter(event => (event instanceof NavigationEnd)))
      .subscribe(() => {
        const newPath = this.location.path();
        this.metrika.hit(newPath, {
          referer: this.prevPath,
        });
        this.metrika.userParams({UserToken: this.messagingService.token.getValue()});
        this.prevPath = newPath;
      });
  }

  ngOnInit() {
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.message = this.messagingService.currentMessage;
    this.messagingService.token.asObservable().subscribe(value => {
      if (value) {
        this.metrika.userParams({UserToken: value});
      }
    });


  }
}
