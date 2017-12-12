import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movie-tile',
  templateUrl: 'movie-tile.html',
  styleUrls: ['movie-tile.css']
})
export class MovieTileComponent
{
  @Input()
  public movie;

  @Input()
  public isSelected: boolean;

  @Output()
  public select = new EventEmitter();

  public onClick()
  {
    this.select.emit({ target: this.movie });
  }
}
