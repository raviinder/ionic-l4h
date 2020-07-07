import { Injectable } from '@angular/core';
import { AlertController } from  '@ionic/angular'
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenHttpInterceptorService implements HttpInterceptor{

  constructor(
    private auth: AngularFireAuth
) {

}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.auth.idToken.pipe(
        take(1),
        switchMap(idToken => {
            let clone = req.clone()
            if (idToken) {
                clone = clone.clone({ headers: req.headers.set('Authorization', 'Bearer ' + idToken) });
            }
            return next.handle(clone)
        })
    )

}
}
