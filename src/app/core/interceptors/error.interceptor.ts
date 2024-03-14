import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { EMPTY, catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  return next(req).pipe(
    catchError(({ error }) => {
      messageService.add({
        key: 'toast',
        severity: 'error',
        summary: 'Listo!',
        detail: error.message,
      });

      return throwError(() => error.message);
    })
  );
};
