import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-list',
  templateUrl: 'movie-list.html',
  styleUrls: ['movie-list.css']
})
export class MovieListComponent
{
  public movies: any[];

  public selectedMovie: any;

  constructor(private _http: HttpClient)
  {
    _http.get<any[]>('movies/movies.json')
      .subscribe(
      movies => this.movies = movies,
      err => console.error(err));
  }

  public onSelect(event)
  {
    this.selectedMovie = event.target;
  }
}
