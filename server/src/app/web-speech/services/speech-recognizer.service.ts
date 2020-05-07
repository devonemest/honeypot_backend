import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { SpeechNotification } from '../model/speech-notification';
import { SpeechError } from '../model/speech-error';

import { AppWindow } from '../model/app-window';
const { webkitSpeechRecognition }: AppWindow = (window as any) as AppWindow;
import { DataService } from "../../service/data.service";

@Injectable()
export class SpeechRecognizerService {

  recognition: any;
  startTimestamp;
  ignoreOnEnd: boolean;
  language: string;

  constructor(private data: DataService) {}

  initialize(language: string): void {
    this.recognition = new webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = language;
  }

  setLanguage(language: string) {
    this.recognition.lang = language;
  }

  start() {
    // this.startTimestamp = timestamp;
    this.recognition.start();
  }

  onStart(): Observable<SpeechNotification> {
    if (!this.recognition) {
      this.initialize(this.language);
    }

    return new Observable(observer => {
      this.recognition.onstart = () => {
        observer.next({
          info: 'info_speak_now'
        });
      };
    });
  }

  onEnd(): Observable<SpeechNotification> {
    return new Observable(observer => {
      this.recognition.onend = () => {
        // if (this.ignoreOnEnd) {
        //   return;
        // }
        //
        // observer.next({
        //   info: 'info_start'
        // });
        this.recognition.start();
      };
    });
  }

  onResult(): Observable<SpeechNotification> {
    return new Observable(observer => {
      this.recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
            this.data.addText(finalTranscript)
            console.log(this.data.data)
          } else {
            interimTranscript += event.results[i][0].transcript;
            console.log('interim transcript', event, interimTranscript);
          }
        }

        observer.next({
          info: 'final_transcript',
          content: finalTranscript
        });
        observer.next({
          info: 'interim_transcript',
          content: interimTranscript
        });
      };
    });
  }

  onError(): Observable<SpeechNotification> {
    return new Observable(observer => {
      this.recognition.onerror = (event) => {
        let result: SpeechError;
        if (event.error === 'no-speech') {
          result = SpeechError.NO_SPEECH;
          this.ignoreOnEnd = true;
        }
        if (event.error === 'audio-capture') {
          result = SpeechError.NO_MICROPHONE;
          this.ignoreOnEnd = true;
        }
        if (event.error === 'not-allowed') {
          if (event.timeStamp - this.startTimestamp < 100) {
            result = SpeechError.BLOCKED;
          } else {
            result = SpeechError.NOT_ALLOWED;
          }

          this.ignoreOnEnd = true;
        }
        observer.next({
          error: result
        });
      };
    });
  }

  stop() {
    this.recognition.stop();
  }
}
