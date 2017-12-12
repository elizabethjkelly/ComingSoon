import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-movie-details',
  templateUrl: 'movie-details.html',
  styleUrls: ['movie-details.css']
})
export class MovieDetailsComponent
{
  @Input()
  public movie;
}
