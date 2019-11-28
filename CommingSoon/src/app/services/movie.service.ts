import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Movie } from '../model';

@Injectable()
export class MovieService
{
  constructor(private _http: HttpClient) { }

  public getMovies(): Observable<Movie[]>
  {
    return this._http.get<Movie[]>('movies/movies.json')
      .pipe(catchError(e =>
      {
        console.error(e);
        return empty();
      }));
  }
}
