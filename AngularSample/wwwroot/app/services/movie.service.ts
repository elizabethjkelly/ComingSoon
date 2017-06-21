import { Injectable, Injector } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class MovieService
{
  constructor(private _http: Http) { }

  public getAll()
  {
    return this._http.get('movies/movies.json');
  }
}