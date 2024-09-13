import { GistData, GistState } from './../models/interfaces';
import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { GistService } from '../services/gist.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { pipe, switchMap, tap } from 'rxjs';

const initialState: GistState = {
  gists: [],
  isLoading: false,
  error: '',
  searchQuery: '',
};

export const GistStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed((store) => ({
    searchGists: computed(() => {
      const gists = store.gists();

      return gists
        .filter(({ owner }) => owner.login.includes(store.searchQuery()))
        .map(({ owner, files, updated_at, id, description }) => {
          const firstFile = files[Object.keys(files)[0]];
          return {
            id,
            owner_name: owner.login,
            gist_name: firstFile?.filename,
            avatar_url: owner.avatar_url,
            type: owner.type,
            updated_at,
            description,
          };
        });
    }),

    dataSource: computed(() =>
      store.gists().map((item) => {
        return {
          owner_name: item.owner.login,
          gist_name: item.files[Object.keys(item.files)[0]]?.filename,
          avatar_url: item.owner.avatar_url,
          updated_at: item.updated_at,
          type: item.owner.type,
        };
      })
    ),
  })),

  withMethods((store, gistService = inject(GistService)) => ({
    udpateSearchQuery(query: string) {
      patchState(store, { searchQuery: query });
    },

    getAllGists: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return gistService.getAllPublicGists().pipe(
            tapResponse({
              next: (gists: GistData[]) => {
                patchState(store, { gists, isLoading: false }),
                  console.log(gists);
              },
              error: (err: Error) => {
                patchState(store, { isLoading: false, error: err.message });
              },
            })
          );
        })
      )
    ),

    getGistById: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) => {
          return gistService.getGistById(id).pipe(
            tapResponse({
              next: (gists: GistData[]) => {
                patchState(store, { gists, isLoading: false });
              },
              error: (err: Error) => {
                patchState(store, { isLoading: false, error: err.message });
              },
            })
          );
        })
      )
    ),
  }))
);
