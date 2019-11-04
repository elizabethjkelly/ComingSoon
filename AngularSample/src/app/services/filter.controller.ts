import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { MovieFilterValue } from '../model';

@Injectable()
export class FilterController
{
  public movie = new Subject<MovieFilterValue>();
}
