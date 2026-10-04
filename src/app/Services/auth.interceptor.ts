import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth-service.service';

/**
 * Interceptor כוללני שמצרף את ה-token (JWT) מהמקומלסטורייד
 * לכל בקשה יוצאת לשרת — כדי שלא נצטרך להוסיף את ה-Header
 * בכל שירות בנפרד.
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    // אם אין טוקן — שולחים את הבקשה כמו שהיא.
    if (!token) {
      return next.handle(req);
    }

    // מצרפים את ה-JWT כ-Bearer token.
    const authReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    });

    return next.handle(authReq);
  }
}
