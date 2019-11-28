import { Component } from '@angular/core';
import { MovieFilterValue } from '../../../model';
import { FilterController } from '../../../services';

@Component({
  selector: 'app-movie-filter',
  templateUrl: 'movie-filter.html',
  styleUrls: ['movie-filter.css']
})
export class MovieFilterComponent
{
  private _filterValue = new MovieFilterValue();

  constructor(private _filterController: FilterController) { }

  public onKeywordChange(value: string)
  {
    this._filterValue.keyword = value && value.toLocaleLowerCase();
    this._filterController.movie.next(this._filterValue);
  }

  public onMinRatingChange(value: number)
  {
    this._filterValue.minRating = value && value * 10 || 0;
    this._filterController.movie.next(this._filterValue);
  }
}
