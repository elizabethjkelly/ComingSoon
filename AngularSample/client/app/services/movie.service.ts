import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MovieService
{
  constructor(private _http: HttpClient) { }

  public getAll()
  {
    return this._http.get('movies/movies.json');
  }
}
