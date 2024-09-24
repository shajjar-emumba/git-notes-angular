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
import { catchError, forkJoin, map, of, pipe, switchMap, tap } from 'rxjs';
import { CreateGistData } from '../models/interfaces';
import { Router } from '@angular/router';
import { AuthStore } from './auth.store';

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

      return gists.length
        ? gists
            .filter(({ owner }) => owner.login.includes(store.searchQuery()))
            .map(mapToDataSource)
        : [];
    }),
    dataSource: computed(() => {
      const { gists } = store;
      return gists().map(mapToDataSource);
    }),
  })),

  withMethods(
    (
      store,
      gistService = inject(GistService),
      router = inject(Router),
      authStore = inject(AuthStore)
    ) => ({
      udpateSearchQuery(query: string) {
        patchState(store, { searchQuery: query });
      },

      getAllGists: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() => {
            return gistService.getAllPublicGists().pipe(
              switchMap((gists: GistData[]) => {
                if (authStore.user()) {
                  const token = authStore.user().accessToken;
                  const starredGistsChecks$ = gists.map((gist) => {
                    return gistService.isGistStarred(token, gist.id).pipe(
                      map(() => ({
                        ...gist,
                        isStarred: true,
                      })),
                      catchError(() =>
                        of({
                          ...gist,
                          isStarred: false,
                        })
                      )
                    );
                  });

                  return forkJoin(starredGistsChecks$);
                } else {
                  return of(gists);
                }
              }),
              tapResponse({
                next: (gists) => {
                  console.log(gists);
                  patchState(store, { gists, isLoading: false });
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
              switchMap((gists: GistData[]) => {
                if (!gists.length) {
                  return of([]);
                }
                const starredGistsChecks$ = gists.map((gist) => {
                  return gistService.isGistStarred(token, gist.id).pipe(
                    map(() => ({
                      ...mapToDataSource(gist),
                      isStarred: true,
                    })),
                    catchError(() =>
                      of({
                        ...mapToDataSource(gist),
                        isStarred: false,
                      })
                    )
                  );
                });

                return forkJoin(starredGistsChecks$);
              }),
              tapResponse({
                next: (mappedGists) => {
                  console.log(mappedGists);
                  patchState(store, {
                    userGists: mappedGists,
                    isLoading: false,
                  });
                },
                error: (err: Error) => {
                  console.error(err);
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

      updateUserGist: rxMethod<[string, string, CreateGistData]>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(([token, id, gistData]) => {
            return gistService.updateGist(token, id, gistData).pipe(
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

      starGist: rxMethod<[string, string]>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(([token, id]) => {
            return gistService.starGist(token, id).pipe(
              tapResponse({
                next: (response) => {
                  console.log('Gist starred Successfully');
                  const currentUserGists: GistData[] = store.userGists() || [];
                  const allGists: GistData[] = store.gists() || [];

                  console.log(currentUserGists);
                  const updatedUserGists = currentUserGists.map((userGist) =>
                    userGist.id === id
                      ? { ...userGist, isStarred: true }
                      : userGist
                  );

                  const updatedAllGists = allGists.map((gist) =>
                    gist.id === id ? { ...gist, isStarred: true } : gist
                  );

                  patchState(store, {
                    gists: updatedAllGists,
                    userGists: updatedUserGists,
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

      getUserStarredGists: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((token) => {
            return gistService.starredGists(token).pipe(
              tapResponse({
                next: (gists: GistData[]) => {
                  const mappedGist = gists.map((gist) => ({
                    ...mapToDataSource(gist),
                    isStarred: true,
                  }));
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
    isStarred: gist.isStarred,
  };
};
