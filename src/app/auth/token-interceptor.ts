import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, catchError, filter, switchMap, take, throwError } from "rxjs";
import { AuthService } from "./shared/auth.service";
import { SigninResponse } from "./signin/signin.response.payload";

@Injectable({
    providedIn : 'root'
})

export class TokenInterceptor implements HttpInterceptor{

    isTokenRefreshing = false;
    refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject(null);

    constructor(public authService : AuthService){}

    intercept(req: HttpRequest<any>, 
        next: HttpHandler): 
        Observable<HttpEvent<any>> {
            console.log('intercept');
            const jwtToken = this.authService.getJwtToken();
        if (req.url.indexOf('refresh') !== -1 || req.url.indexOf('sign-in') !== -1) {
            console.log('!==-1');
            return next.handle(req);
        }
        
        if (jwtToken) {
            return next.handle(this.addToken(req, jwtToken)).pipe(catchError(error => {
                // if( error.name = 'HttpErrorResponse'){
                //     console.log('http error occured')
                //     this.authService.logout();
                // }
                if (error.status === 403) {
                        console.log('error occured ',error);
                    return this.handleAuthErrors(req, next);
                } else {
                    console.log('error occured not ',error);
                    return throwError(error);
                }
            }));
        }
        return next.handle(req);
    }

    private handleAuthErrors(req : HttpRequest<any>, next : HttpHandler)
    : Observable<HttpEvent<any>>{
        console.log('handleAuthErrors');

        if(!this.isTokenRefreshing){
            this.isTokenRefreshing = true;
            this.refreshTokenSubject.next(null);

            return this.authService.refreshToken().pipe(
                switchMap((refreshingTokenResponse : SigninResponse ) => {
                    this.isTokenRefreshing = false;
                    this.refreshTokenSubject
                        .next(refreshingTokenResponse.authenticationToken);
                    
                        return next.handle(this.addToken(req, 
                            refreshingTokenResponse.authenticationToken));
                })
            )
        }else {
            return this.refreshTokenSubject.pipe(
                filter(result => result !== null),
                take(1),
                switchMap((res) => {
                    return next.handle(this.addToken(req,
                        this.authService.getJwtToken()))
                })
            );
        }
    }

    addToken(req : HttpRequest<any>, jwtToken : any){
        // console.log('addToken');
        return req.clone({
            headers: req.headers.set('Authorization','Bearer ' + jwtToken)
            .set('Access-Control-Allow-Origin','*')
            .set('Access-Control-Allow-Methods','POST, PUT, PATCH, GET, DELETE, OPTIONS')
            .set('Access-Control-Allow-Headers','Origin, X-Requested-With, XMLHttpRequest, Content-Type, Accept, Access-Control-Allow-Origin')
            // .set('Content-Type','application/json')
            .set('Access-Control-Allow-Credentials', 'true')
            .set('X-Requested-With', 'XMLHttpRequest')
        });
    }
}