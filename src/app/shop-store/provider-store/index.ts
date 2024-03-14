import * as ProviderActions from './provider.actions';
import * as ProviderSelectors from './provider.selectors';
import { ProviderEffects } from './provider.effects';
import { State as ProviderState } from './provider.entity';
import { reducer as ProviderReducer } from './provider.reducer';

export {
  ProviderActions,
  ProviderState,
  ProviderReducer,
  ProviderEffects,
  ProviderSelectors,
};
