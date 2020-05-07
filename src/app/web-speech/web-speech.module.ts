import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SpeechRecognizerService } from './services/speech-recognizer.service';

import { WebSpeechComponent } from './web-speech.component';
import {MaterialModule} from "../shared/material/material.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [
    WebSpeechComponent
  ],
  exports: [
    WebSpeechComponent
  ],
  providers: [
  ]
})
export class WebSpeechModule { }
