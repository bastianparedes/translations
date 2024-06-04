import { Component } from '@angular/core';
import { TranslationsComponent } from './translations/translations.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TranslationsComponent],
  templateUrl: './app.component.html',
})

export class AppComponent {};
