import { Action } from '@ngrx/store';
import { Product } from '../model/product.model';
import { ProductsActions, ProductsActionsTypes } from './products.actions';

export enum ProductsStateEnum {
  LOADING = 'Loading',
  LOADED = 'Loaded',
  ERROR = 'Error',
  INITIAL = 'Initial',
}

// Créer le state (Car Reducer est le seul qui a le droit de modifier le state)
export interface ProductsState {
  products: Product[];
  errorMessage: string;
  dataState: ProductsStateEnum;
}

// Initialiser le state
const initState: ProductsState = {
  products: [],
  errorMessage: '',
  dataState: ProductsStateEnum.INITIAL,
};

export function productsReducer(
  // state: ProductsState = initState,
  state = initState,
  action: Action
): ProductsState {
  switch (action.type) {
    case ProductsActionsTypes.GET_ALL_PRODUCTS:
      return { ...state, dataState: ProductsStateEnum.LOADING };
    case ProductsActionsTypes.GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        dataState: ProductsStateEnum.LOADED,
        products: (<ProductsActions>action).payload,
      };
    case ProductsActionsTypes.GET_ALL_PRODUCTS_ERROR:
      return {
        ...state,
        dataState: ProductsStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
      };

    // Get Selected Products
    case ProductsActionsTypes.GET_SELECTED_PRODUCTS:
      return { ...state, dataState: ProductsStateEnum.LOADING };
    case ProductsActionsTypes.GET_SELECTED_PRODUCTS_SUCCESS:
      return {
        ...state,
        dataState: ProductsStateEnum.LOADED,
        products: (<ProductsActions>action).payload,
      };
    case ProductsActionsTypes.GET_SELECTED_PRODUCTS_ERROR:
      return {
        ...state,
        dataState: ProductsStateEnum.ERROR,
        errorMessage: (<ProductsActions>action).payload,
      };

    default:
      return { ...state };
  }
}
