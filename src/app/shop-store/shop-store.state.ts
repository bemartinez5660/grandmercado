import { ProvinceState } from './province-store';
import { ProviderState } from './provider-store';
import { DepartamentState } from './departament-store';
import { ReceiverState } from './receiver-store';
import { CategoryState } from './category-store';

export interface State {
  provinces: ProvinceState;
  providers: ProviderState;
  departaments: DepartamentState;
  categories: CategoryState;
  receiver: ReceiverState;
}

export const shopFeatureKey = 'shop';
