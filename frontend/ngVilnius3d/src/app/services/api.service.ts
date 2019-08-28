import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  private formatErrors(error: any) {
    return  throwError(error);
  }

  handleError(error:  any) {
   return throwError('POST failed', error)  
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.url}${path}`, { params }).pipe(
      catchError(this.formatErrors)
    )
  }

  getExpress(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${environment.urlExpress}${path}`, { params }).pipe(
      catchError(this.formatErrors)
    )
  }

  postExpress(path: string, body:  Object): Observable<any> {
    return this.http.post(`${environment.urlExpress}${path}`, body).pipe(
      catchError(this.handleError)
    );
  }

}
