import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movie-filter',
  templateUrl: 'movie-filter.html',
  styleUrls: ['movie-filter.css']
})
export class MovieFilterComponent
{
  @Output()
  public filterChange = new EventEmitter();

  private _model = { keyword: null, minRating: 0 };

  public onKeywordChange(value: string)
  {
    if (value)
    {
      value = value.toLocaleLowerCase();
    }

    this._model = { keyword: value, minRating: this._model.minRating };
    this.filterChange.emit({ target: this._model });
  }

  public onMinRatingChange(value: number)
  {
    this._model = { keyword: this._model.keyword, minRating: value };
    this.filterChange.emit({ target: this._model });
  }
}
