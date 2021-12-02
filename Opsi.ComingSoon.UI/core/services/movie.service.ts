import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { empty } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Movie } from '../model';

@Injectable()
export class MovieService
{
  constructor(private _http: HttpClient) { }

  public async getMovies(): Promise<Movie[]>
  {
    return this._http.get<Movie[]>('api/movies')
      .pipe(catchError(e =>
      {
        console.error(e);
        return empty();
      }))
      .toPromise();
  }
}
