import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Movie } from '../../../model';

@Component({
  selector: 'app-movie-tile',
  templateUrl: 'movie-tile.html',
  styleUrls: ['movie-tile.css']
})
export class MovieTileComponent
{
  @Input()
  public movie: Movie;

  @Input()
  public isSelected: boolean;

  @Output()
  public select = new EventEmitter();

  public onClick()
  {
    this.select.emit({ value: this.movie });
  }
}
