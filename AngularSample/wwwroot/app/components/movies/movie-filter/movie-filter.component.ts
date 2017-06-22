import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movie-filter',
  moduleId: module.id,
  templateUrl: 'movie-filter.html',
  styleUrls: ['movie-filter.css']
})
export class MovieFilterComponent
{
  public model: MovieFilter = { keyword: null, minRating: 0 };

  public onKeywordChange(value: string)
  {
    if (value)
    {
      value = value.toLocaleLowerCase();
    }

    this.model = { keyword: value, minRating: this.model.minRating };
  }

  public onMinRatingChange(value: number)
  {

    this.model = { keyword: this.model.keyword, minRating: value };
  }
}
