import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor() { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   const envObj: any = { url: environment.apiUrl+request.url};
    request = request.clone({ 
      setHeaders: {
				'content-type' : 'application/json',
				'Access-Control-Allow-Origin' : '*',
			},
      url: `${environment.apiUrl}${request.url}`
    });
   const  req = request.clone(request)
  return next.handle(req);
  }
}
