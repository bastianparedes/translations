import { Component } from '@angular/core';
import { trpcClient } from '../../trpc';
import {
  FormsModule
} from '@angular/forms';

@Component({
  selector: 'app-translator',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './translator.component.html'
})
export class TranslatorComponent {
  loading = false;
  timeout = NaN;
  languages = [
    {
      title: 'Français',
      code: 'fr',
      text: '',
    },
    {
      title: 'Español',
      code: 'es',
      text: '',
    },
    {
      title: 'English',
      code: 'en',
      text: '',
    }
  ];

  simplifyData() {
    this.languages.forEach((language) => {
      while (language.text.endsWith('\n')) {
        language.text = language.text.substring(0, language.text.length - 1);
      }
    });
  }

  onChange(sourceText: string, sourceCode: string) {
    if (this.loading) return;
    clearTimeout(this.timeout);
    this.timeout = Number(
      setTimeout(() => {
        this.translate(sourceText, sourceCode);
      }, 1000)
    );
  }

  async translate(sourceText: string, sourceCode: string) {
    this.simplifyData();
    this.loading = true;
    const targetLanguages = this.languages.filter((language) => language.code !== sourceCode).map((language) => language.code);
    const translations = await trpcClient.translate.query({
      text: sourceText,
      targetLanguages: targetLanguages,
      sourceLanguage: sourceCode
    });
    translations.forEach((translation) => {
      const language = this.languages.find((language) => language.code === translation.languageCode);
      if (language === undefined) return;
      language.text = translation.text;
    });

    this.simplifyData();
    this.loading = false;
  }
}
