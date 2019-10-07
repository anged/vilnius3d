import { HttpInterceptor, HttpEvent, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtService } from '../services/jwt.service';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';

export class Vilnius3dHttpInterceptor implements HttpInterceptor {
    private publicService = `${environment.urlExpress}/scenes`;
    // TODO create DI
    private jwts: JwtHelperService;
    constructor(private router: Router, private jwtService: JwtService, private userService: UserService) {
        this.jwts = new JwtHelperService();
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.jwtService.getToken();
        const isExpired = this.jwts.isTokenExpired(token);
        const shouldExclude = req.url === this.publicService;
        // console.log(req, this.router, shouldExclude)
        // Redirect to login if token expired
        // and exclude public service
        if (token && isExpired && !shouldExclude) {
            this.router.navigate(['/login'], { state: { tknExpired: true }});
            this.userService.googleLogOut();
        }

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

        const authReq = req.clone(headerConfig);
        return next.handle(authReq);
    }

}
