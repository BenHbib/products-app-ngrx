import { Injectable } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import {
  GetAllProductsActionError,
  GetAllProductsActionSuccess,
  ProductsActionsTypes,
  GetSelectedProductsActionSuccess,
  GetSelectedProductsActionError,
} from './products.actions';
import { catchError, map, mergeMap, Observable, of } from 'rxjs';

// effects est un service c'est pour cela on doit utiliser @Injectable
@Injectable()
export class ProductsEffects {
  constructor(
    private productsService: ProductsService,
    private effectActions: Actions
  ) {}

  getAllProductsEffect: Observable<Action> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProductsActionsTypes.GET_ALL_PRODUCTS),
      mergeMap((action) => {
        return this.productsService.getAllProducts().pipe(
          map((products) => new GetAllProductsActionSuccess(products)),
          catchError((err) => of(new GetAllProductsActionError(err.message)))
        );
      })
    )
  );

  // Get Selected Products
  getSelectedProductsEffect: Observable<Action> = createEffect(() =>
    this.effectActions.pipe(
      ofType(ProductsActionsTypes.GET_SELECTED_PRODUCTS),
      mergeMap((action) => {
        return this.productsService.getSelectedProduct().pipe(
          map((products) => new GetSelectedProductsActionSuccess(products)),
          catchError((err) =>
            of(new GetSelectedProductsActionError(err.message))
          )
        );
      })
    )
  );
}
