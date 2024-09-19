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
import { CreateGistData } from '../models/interfaces';
import { Router } from '@angular/router';

const initialState: GistState = {
  gists: [],
  userGists: [],
  isLoading: false,
  error: '',
  searchQuery: '',
};

export const GistStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withComputed((store) => ({
    searchGists: computed(() => {
      const gists: GistData[] = store.gists();

      if (gists.length > 0) {
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
      } else {
        return [];
      }
    }),

    dataSource: computed(() => {
      const { gists } = store;
      return gists().map(mapToDataSource);
    }),
  })),

  withMethods(
    (store, gistService = inject(GistService), router = inject(Router)) => ({
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
                next: (gist: any) => {
                  const mappedGist = mapToDataSource(gist);
                  patchState(store, { gists: mappedGist, isLoading: false });
                },
                error: (err: Error) => {
                  patchState(store, { isLoading: false, error: err.message });
                },
              })
            );
          })
        )
      ),

      getUserGists: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((token) => {
            return gistService.getUserGists(token).pipe(
              tapResponse({
                next: (gists: GistData[]) => {
                  const mappedGist = gists.map(mapToDataSource);
                  patchState(store, {
                    userGists: mappedGist,
                    isLoading: false,
                  });
                },
                error: (err: Error) => {
                  console.log(err);
                  patchState(store, { isLoading: false, error: err.message });
                },
              })
            );
          })
        )
      ),

      createUserGist: rxMethod<[string, CreateGistData]>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(([token, gistData]) => {
            return gistService.createGist(token, gistData).pipe(
              tapResponse({
                next: () => {
                  router.navigateByUrl('/user-gists');
                  patchState(store, {
                    isLoading: false,
                  });
                },
                error: (err: Error) => {
                  console.log(err);
                  patchState(store, { isLoading: false, error: err.message });
                },
              })
            );
          })
        )
      ),

      deleteUserGist: rxMethod<[string, string]>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(([token, id]) => {
            return gistService.deleteGist(token, id).pipe(
              tapResponse({
                next: () => {
                  const currentGists: GistData[] = store.userGists() || [];
                  const updatedGists = currentGists.filter(
                    (gist) => gist.id !== id
                  );
                  patchState(store, {
                    userGists: updatedGists,
                    isLoading: false,
                  });
                },
                error: (err: Error) => {
                  console.log(err);
                  patchState(store, { isLoading: false, error: err.message });
                },
              })
            );
          })
        )
      ),
    })
  )
);

// Helper function to map gists for DataSource
const mapToDataSource = (gist: GistData | any) => {
  const firstFile = gist.files[Object.keys(gist.files)[0]];
  return {
    id: gist.id,
    owner_name: gist.owner.login,
    gist_name: firstFile?.filename,
    gist_file_raw_url: firstFile?.raw_url,
    avatar_url: gist.owner.avatar_url,
    updated_at: gist.updated_at,
    type: gist.owner.type,
    description: gist.owner.description,
  };
};
