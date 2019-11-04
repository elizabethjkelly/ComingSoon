import { MovieService } from './movie.service';
export * from './movie.service';

import { FilterController } from './filter.controller';
export * from './filter.controller';

export const SERVICES = [
  MovieService,
  FilterController
];
