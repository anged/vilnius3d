import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

export class Vilnius3dHttpInterceptor implements HttpInterceptor {
    // TODO create DI
    jwts: JwtHelperService;
    constructor(private router: Router, private jwtService: JwtService, private userService: UserService) {
        this.jwts = new JwtHelperService();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.jwtService.getToken();
        const isExpired = this.jwts.isTokenExpired(token);

        // Redirect to login if token expired
        if (token && isExpired) {
            this.router.navigate(['/login'], { state: { tknExpired: true }});
            this.userService.googleLogOut();
        }

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
