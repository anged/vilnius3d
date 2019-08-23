import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';

export class Vilnius3dHttpInterceptor implements HttpInterceptor {
    constructor(private jwtService:  JwtService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.jwtService.getToken();
        console.log('APP token', token)
        const headerConfig = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        } 
        if (token) {
            headerConfig['Authorization'] =`Bearer ${token}`;
        }
        const authReq = req.clone({ setHeaders: headerConfig });
        return next.handle(authReq);
    }

}
