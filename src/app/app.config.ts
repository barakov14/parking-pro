import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {tokenInterceptor} from "./core/auth/services/token-interceptor.service";
import {API_URL} from "./core/http/api-url.token";
import {environment} from "./environments/environment.prod";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    {
      provide: API_URL,
      useValue: environment.api_url,
    },
  ]
};
