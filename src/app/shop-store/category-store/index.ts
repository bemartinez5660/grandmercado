import * as CategoryActions from './category.actions';
import * as CategorySelectors from './category.selectors';
import { State as CategoryState } from './category.entity';
import { reducer as CategoryReducer } from './category.reducer';
import { CategoryEffects } from './category.effects';

export {
  CategoryActions,
  CategoryState,
  CategoryEffects,
  CategoryReducer,
  CategorySelectors,
};
