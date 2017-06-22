import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movie-tile',
  moduleId: module.id,
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
    this.select.emit(this.movie);
  }
}
