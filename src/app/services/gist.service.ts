import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateGistData, GistData } from '../models/interfaces';
import { GistEndPoints } from '../models/enums';

@Injectable({
  providedIn: 'root',
})
export class GistService {
  constructor(private http: HttpClient) {}

  getAllPublicGists(): Observable<GistData[]> {
    return this.http.get<GistData[]>(GistEndPoints.PUBLIC);
  }

  getGistById(id: string): Observable<GistData[]> {
    return this.http.get<GistData[]>(`${GistEndPoints.GIST_BY_ID}/${id}`);
  }

  getUserGists(): Observable<GistData[]> {
    return this.http.get<GistData[]>(`${GistEndPoints.USER_GISTS}`);
  }

  createGist(gistData: CreateGistData): Observable<GistData> {
    return this.http.post<GistData>(GistEndPoints.CREATE_GIST, gistData);
  }

  deleteGist(gistId: string): Observable<void> {
    return this.http.delete<void>(`${GistEndPoints.GIST_BY_ID}/${gistId}`);
  }

  updateGist(gistId: string, gistData: CreateGistData): Observable<GistData> {
    return this.http.patch<GistData>(
      `${GistEndPoints.GIST_BY_ID}/${gistId}`,
      gistData
    );
  }

  starGist(gistId: string): Observable<void> {
    return this.http.put<void>(`${GistEndPoints.GIST_BY_ID}/${gistId}/star`, {
      gist_id: gistId,
    });
  }

  starredGists(): Observable<GistData[]> {
    return this.http.get<GistData[]>(`${GistEndPoints.STARRED_GIST}`);
  }

  isGistStarred(gistId: string): Observable<any> {
    return this.http.get<void>(`${GistEndPoints.GIST_BY_ID}/${gistId}/star`);
  }

  forkGist(gistId: string): Observable<GistData> {
    return this.http.post<GistData>(
      `${GistEndPoints.GIST_BY_ID}/${gistId}/forks`,
      { gist_id: gistId }
    );
  }

  unstarGist(gistId: string): Observable<GistData> {
    return this.http.delete<GistData>(
      `${GistEndPoints.GIST_BY_ID}/${gistId}/star`
    );
  }
}
