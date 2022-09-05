import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private endpoint = `${environment.apiURL}`;

  private readonly headers: HttpHeaders = new HttpHeaders({
    'X-PO-SCREEN-LOCK': 'false',
  });

  constructor(private http: HttpClient) {}

  public getEndpoint(): string {
    return this.endpoint;
  }

  public getHead(params?: HttpParams): Observable<any> {
    return this.http.head(`${this.endpoint}`, {
      headers: this.headers,
      params,
    });
  }
}
