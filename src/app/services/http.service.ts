import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class HttpService {
  constructor(private http: HttpClient) {
  }

  fetchGamesFeed(): Observable<any> {
    return this.http.get('http://stage.whgstage.com/front-end-test/games.php');
  }

  fetchJackpotFeed(): Observable<any> {
    return this.http.get('http://stage.whgstage.com/front-end-test/jackpots.php');
  }
}
