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
import { MatSnackBar } from '@angular/material/snack-bar';

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
      authStore = inject(AuthStore),
      snackBar = inject(MatSnackBar)
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
                const token = authStore.user()?.accessToken;
                return token
                  ? forkJoin(checkStarredGists(gists, gistService))
                  : of(gists);
              }),
              tapResponse({
                next: (gists) => {
                  patchState(store, { gists, isLoading: false });
                },
                error: (err: Error) => {
                  patchState(store, { isLoading: false, error: err.message });
                  showSnackBarFeedback(
                    'Something went wrong loading all gists!',
                    'Close',
                    true,
                    snackBar
                  );
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

      getUserGists: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() => {
            const token = authStore.user()?.accessToken;

            return gistService.getUserGists().pipe(
              switchMap((gists) =>
                gists.length
                  ? forkJoin(checkStarredGists(gists, gistService))
                  : of([])
              ),
              tapResponse({
                next: (gists) => {
                  patchState(store, {
                    userGists: gists.map(mapToDataSource),
                    isLoading: false,
                  });
                },
                error: (err: Error) => {
                  console.error(err);
                  patchState(store, { isLoading: false, error: err.message });
                  showSnackBarFeedback(
                    'Something went wrong loading user gists!',
                    'Close',
                    true,
                    snackBar
                  );
                },
              })
            );
          })
        )
      ),

      createUserGist: rxMethod<CreateGistData>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((gistData) => {
            const token = authStore.user()?.accessToken;

            return gistService.createGist(gistData).pipe(
              tapResponse({
                next: () => {
                  // on successfull creation redirect back to user-gist page
                  router.navigateByUrl('/user-gists');
                  patchState(store, {
                    isLoading: false,
                  });

                  showSnackBarFeedback(
                    'Gist created successfully',
                    'Close',
                    false,
                    snackBar
                  );
                },
                error: (err: Error) => {
                  console.log(err);
                  patchState(store, { isLoading: false, error: err.message });
                  showSnackBarFeedback(
                    'Something went wrong creating gist',
                    'Close',
                    true,
                    snackBar
                  );
                },
              })
            );
          })
        )
      ),

      deleteUserGist: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((id) => {
            const token = authStore.user()?.accessToken;

            return gistService.deleteGist(id).pipe(
              tapResponse({
                next: () => {
                  patchState(store, {
                    userGists: updateGistsAfterDelete(store.userGists(), id),
                    isLoading: false,
                  });
                  showSnackBarFeedback(
                    'Gist deleted successfully',
                    'Close',
                    false,
                    snackBar
                  );
                },
                error: (err: Error) => {
                  console.log(err);
                  patchState(store, { isLoading: false, error: err.message });
                  showSnackBarFeedback(
                    'Something went wrong deleting gist!',
                    'Close',
                    true,
                    snackBar
                  );
                },
              })
            );
          })
        )
      ),

      updateUserGist: rxMethod<[string, CreateGistData]>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(([id, gistData]) => {
            const token = authStore.user()?.accessToken;

            return gistService.updateGist(id, gistData).pipe(
              tapResponse({
                next: () => {
                  router.navigateByUrl('/user-gists');
                  patchState(store, {
                    isLoading: false,
                  });
                  showSnackBarFeedback(
                    'Gist updated successfully',
                    'Close',
                    false,
                    snackBar
                  );
                },
                error: (err: Error) => {
                  console.log(err);
                  patchState(store, { isLoading: false, error: err.message });
                  showSnackBarFeedback(
                    'Something went wrong updating gist!',
                    'Close',
                    true,
                    snackBar
                  );
                },
              })
            );
          })
        )
      ),

      starGist: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((id) => {
            const token = authStore.user()?.accessToken;

            return gistService.starGist(id).pipe(
              tapResponse({
                next: (response) => {
                  patchState(store, {
                    gists: updateStarredStatus(store.gists(), id),
                    userGists: updateStarredStatus(store.userGists(), id),
                    isLoading: false,
                  });
                  showSnackBarFeedback(
                    'Gist starred successfully',
                    'Close',
                    false,
                    snackBar
                  );
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

      unstarGist: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((id) => {
            const token = authStore.user()?.accessToken;

            return gistService.unstarGist(id).pipe(
              tapResponse({
                next: (response) => {
                  console.log(response);
                  patchState(store, {
                    gists: updateStarredStatus(store.gists(), id, false),
                    userGists: updateStarredStatus(
                      store.userGists(),
                      id,
                      false
                    ),
                    isLoading: false,
                  });
                  showSnackBarFeedback(
                    'Gist unstarred successfully',
                    'Close',
                    false,
                    snackBar
                  );
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

      getUserStarredGists: rxMethod<void>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap(() => {
            const token = authStore.user()?.accessToken;

            return gistService.starredGists().pipe(
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
                  showSnackBarFeedback(
                    'Something went wrong starring gist!',
                    'Close',
                    true,
                    snackBar
                  );
                },
              })
            );
          })
        )
      ),

      forkAGist: rxMethod<string>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((id) => {
            const token = authStore.user()?.accessToken;

            return gistService.forkGist(id).pipe(
              tapResponse({
                next: (forkedGist: GistData) => {
                  patchState(store, {
                    gists: [forkedGist, ...store.gists()],
                    isLoading: false,
                  });
                  showSnackBarFeedback(
                    'Gist forked successfully',
                    'Close',
                    false,
                    snackBar
                  );
                },
                error: (err: Error) => {
                  console.log(err);
                  patchState(store, { isLoading: false, error: err.message });
                  showSnackBarFeedback(
                    'Something went wrong forking gist!',
                    'Close',
                    true,
                    snackBar
                  );
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

// Helper function to check gists starred status
const checkStarredGists = (gists: GistData[], gistService: GistService) => {
  return gists.map((gist) =>
    gistService.isGistStarred(gist.id).pipe(
      map(() => ({ ...gist, isStarred: true })),
      catchError(() => of({ ...gist, isStarred: false }))
    )
  );
};

//Helper function to update the starred status
const updateStarredStatus = (
  gists: GistData[],
  id: string,
  star: boolean = true
) =>
  gists.map((gist) => (gist.id === id ? { ...gist, isStarred: star } : gist));

// Helper function to get gist after deletion
const updateGistsAfterDelete = (gists: GistData[], id: string) => {
  return gists.filter((gist) => gist.id !== id);
};

// Helper function to show snackbar feedback
const showSnackBarFeedback = (
  message: string,
  action: string = 'Close',
  isError: boolean = false,
  snackBar: MatSnackBar
) => {
  const panelClass = isError ? 'snackbar-error' : 'snackbar-success';
  snackBar.open(message, action, {
    duration: 2000,
    panelClass: panelClass,
  });
};
