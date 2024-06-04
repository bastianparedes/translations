import { INestApplication, Injectable } from '@nestjs/common';
import { TrpcService } from './trpc.service';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';

@Injectable()
export class TrpcRouter {
  constructor(private readonly trpc: TrpcService) {}

  appRouter = this.trpc.router({
    translate: this.trpc.procedure
      .input(
        z.object({
          text: z.string(),
          targetLanguages: z.array(z.string()),
          sourceLanguage: z.string(),
        }),
      )
      .query(async ({ input }) => {
        const promisedTexts = input.targetLanguages.map((targetLanguage) =>
          fetch(
            `https://api.pons.com/text-translation-web/v4/translate?locale=es`,
            {
              body: JSON.stringify({
                targetLanguage: targetLanguage,
                text: input.text,
                sourceLanguage: input.sourceLanguage,
              }),
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
            .then((response) => response.json())
            .then((json: { text: string }) => ({
              languageCode: targetLanguage,
              text: json.text,
            })),
        );

        const translatedTexts = await Promise.all(promisedTexts);
        return translatedTexts;
      }),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({ router: this.appRouter }),
    );
  }
}

export type AppRouter = TrpcRouter['appRouter'];
