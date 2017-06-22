import { Component, Input } from '@angular/core';

import { MovieService } from '$/services'

@Component({
  selector: 'app-movie-list',
  moduleId: module.id,
  templateUrl: 'movie-list.html',
  styleUrls: ['movie-list.css']
})
export class MovieListComponent
{
  @Input()
  public get filter(): MovieFilter { return this._filter; };
  public set filter(value: MovieFilter) { this._filter = value; this.updateMovies(); };
  private _filter: MovieFilter;

  public allMovies: Movie[];
  public movies: Movie[];

  public selectedMovie: Movie;

  constructor(movieService: MovieService)
  {
    movieService.getAll()
      .map(res => res.json())
      .subscribe(movies => this.updateMovies(movies), err => console.error(err));
  }

  public updateMovies(movies?: Movie[])
  {
    if (movies && movies.length > 0)
    {
      this.allMovies = movies;
    }

    if (this.allMovies && this.filter)
    {
      this.movies = this.allMovies
        .filter(m =>
          (!this.filter.keyword || m.name.toLocaleLowerCase().includes(this.filter.keyword)) &&
          m.rating >= this.filter.minRating)
        .sort((a, b) => a.name < b.name ? 1 : -1)
    }
    else
    {
      this.movies = this.allMovies;
    }
  }

  public onSelect(selectedValue: Movie)
  {
    this.selectedMovie = selectedValue;
  }
}
