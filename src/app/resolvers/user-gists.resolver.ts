import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { GistStore } from '../store/gists.store';
import { GistService } from '../services/gist.service';
import { map } from 'rxjs';

export const userGistsResolver: ResolveFn<any> = (
  activatedRoute,
  routerState
) => {
  const gistService = inject(GistService);
  const gistID = activatedRoute.paramMap.get('id');

  if (gistID) {
    return gistService.getGistById(gistID).pipe(
      map((gist: any) => {
        const description = gist.description;
        const files = Object.keys(gist.files).map((key) => {
          const file = gist.files[key];
          return {
            filename: file.filename,
            content: file.content,
          };
        });

        return {
          gist_id: gistID,
          description,
          public: gist.public,
          files,
        };
      })
    );
  } else return null;
};
