import { Component, Input } from '@angular/core';

import { Movie, MovieFilterValue } from '../../../model';
import { MovieService, FilterController } from '../../../services';

@Component({
  selector: 'app-movie-list',
  templateUrl: 'movie-list.html',
  styleUrls: ['movie-list.css']
})
export class MovieListComponent
{
  public movies: Movie[];

  public selectedMovie: Movie;

  private _allMovies: Movie[];
  private _filter = new MovieFilterValue();

  constructor(private _movieService: MovieService, private _filterController: FilterController) { }

  public ngOnInit()
  {
    this._movieService.getMovies()
      .subscribe(movies => this.updateList(movies));

    this._filterController.movie.subscribe(filterValue =>
    {
      this._filter = filterValue;
      this.updateList();
    })
  }

  public updateList(movies?: Movie[])
  {
    if (movies)
    {
      this._allMovies = movies;
    }

    this.movies = this._allMovies
      .filter(movie =>
        (!this._filter.keyword || movie.name.toLowerCase().includes(this._filter.keyword)) &&
        movie.rating >= this._filter.minRating)
      .sort((a, b) => a.name < b.name ? -1 : 1);
  }

  public onSelect(event: { value: Movie })
  {
    this.selectedMovie = event.value;
  }
}
