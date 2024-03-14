import * as DepartamentActions from './departament.actions';
import * as DepartamentSelectors from './departament.selectors';
import { State as DepartamentState } from './departament.entity';
import { reducer as DepartamentReducer } from './departament.reducer';
import { DepartamentEffects } from './departament.effects';

export {
  DepartamentActions,
  DepartamentState,
  DepartamentReducer,
  DepartamentEffects,
  DepartamentSelectors,
};
