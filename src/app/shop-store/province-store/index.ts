import * as ProvinceActions from './province.actions';
import * as ProvinceSelectors from './province.selectors';
import { State as ProvinceState } from './province.entity';
import { reducer as ProvinceReducer } from './province.reducer';
import { ProvinceEffects } from './province.effects';

export {
  ProvinceActions,
  ProvinceState,
  ProvinceReducer,
  ProvinceEffects,
  ProvinceSelectors,
};
