import { Component } from '@angular/core';
import { TranslatorComponent } from './translator/translator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TranslatorComponent],
  templateUrl: './app.component.html',
})

export class AppComponent {};
