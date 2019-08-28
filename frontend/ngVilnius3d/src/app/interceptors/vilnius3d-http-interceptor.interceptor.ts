import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';

export class Vilnius3dHttpInterceptor implements HttpInterceptor {
    constructor(private jwtService: JwtService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.jwtService.getToken();
        console.log('APP token', token, req)
        let headerConfig = {
            // NOTE: We do not need to pass content type
            // Angular set correct type automatically
            setHeaders: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }
        if (token) {
            headerConfig.setHeaders['Authorization'] = `Bearer ${token}`;
        }


        // Check if sending file
        //  NOTE: We do not need to pass content type
        // Angular set correct type automatically
        if (req.body instanceof FormData) {
            delete headerConfig.setHeaders['Content-Type'];
            delete headerConfig.setHeaders['Accept'];
        }

        console.log('HEADER', headerConfig)
        const authReq = req.clone(headerConfig);
        return next.handle(authReq);
    }

}
