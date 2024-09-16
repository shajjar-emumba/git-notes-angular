import { inject } from '@angular/core';
import { Auth, GithubAuthProvider, signInWithPopup } from '@angular/fire/auth';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { AuthState } from '../models/interfaces';

const initialState: AuthState = {
  isLoading: false,
  user: null,
  error: null,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),

  withMethods((store, firebaseAuth = inject(Auth)) => ({
    async signIn() {
      const provider = new GithubAuthProvider();
      try {
        patchState(store, { isLoading: true });
        const result = await signInWithPopup(firebaseAuth, provider);
        const credential = GithubAuthProvider.credentialFromResult(result);

        const token = credential!.accessToken;
        if (!token) {
          throw new Error('No access token found');
        }

        const user = result.user;

        patchState(store, {
          isLoading: false,
          user: {
            accessToken: token,
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
            photoURL: user.photoURL,
          },
        });
      } catch (error) {
        patchState(store, {
          isLoading: false,
          error: (error as Error).message || 'An error occurred',
        });
      }
    },

    async signOut() {
      try {
        patchState(store, { isLoading: true });
        await firebaseAuth.signOut();
        patchState(store, {
          isLoading: false,
          user: null,
        });
      } catch (error) {
        patchState(store, {
          isLoading: false,
          error: (error as Error).message || 'An error occurred',
        });
      }
    },
  }))
);
