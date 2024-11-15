import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService<ResponseInterface> {

  constructor(private http: HttpClient) { }

  protected get(url: string): Observable<ResponseInterface[]> {
    return this.http.get<ResponseInterface[]>(url)
      .pipe(
        catchError(err => {
          // TODO: Log error to be, show toastr etc.
          console.log(err);
          return of([]);
        })
      )
  }

  // Due to not being able to have one model for response and request for cities, we need to got with unknown type of data
  protected post(url: string, data: unknown): Observable<void> {
    return this.http.post<void>(url, data)
      .pipe(
        catchError(err => {
          // TODO: Log error to be, show toastr etc.
          console.log(err);
          return of();
        })
      )
  }
}
