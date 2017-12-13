import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-movie-list',
  templateUrl: 'movie-list.html',
  styleUrls: ['movie-list.css']
})
export class MovieListComponent
{
  public get filter() { return this._filter; }
  public set filter(value)
  {
    this._filter = value;
    this.updateList();
  }
  private _filter = { keyword: null, minRating: 0 };

  public movies: any[];

  public selectedMovie: any;

  private _allMovies: any[];

  constructor(private _http: HttpClient)
  {
    _http.get<any[]>('movies/movies.json')
      .subscribe(
      movies => this.updateList(movies),
      err => console.error(err));
  }

  public updateList(movies?)
  {
    if (movies)
    {
      this._allMovies = movies;
    }

    this.movies = this._allMovies
      .filter(movie =>
          (!this.filter.keyword || movie.name.toLowerCase().includes(this.filter.keyword)) &&
          movie.rating >= this.filter.minRating)
      .sort((a, b) => a.name < b.name ? -1 : 1);
  }

  public onSelect(event)
  {
    this.selectedMovie = event.target;
  }
}
