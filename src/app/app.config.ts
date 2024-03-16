import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { MessageService, ConfirmationService } from 'primeng/api';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorInterceptor } from "@app/core/interceptors/error.interceptor";
import { loaderInterceptor } from "@app/core/interceptors/loader.interceptor";
import { jwtInterceptor } from "./core/interceptors/jwt.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([errorInterceptor, loaderInterceptor, jwtInterceptor])),
    MessageService,
    ConfirmationService
  ],
};
