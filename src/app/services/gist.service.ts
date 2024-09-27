import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getUserGists(token: string): Observable<GistData[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<GistData[]>(`${GistEndPoints.USER_GISTS}`, {
      headers,
    });
  }

  createGist(token: string, gistData: CreateGistData): Observable<GistData> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<GistData>(GistEndPoints.CREATE_GIST, gistData, {
      headers,
    });
  }

  deleteGist(token: string, gistId: string): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.delete<void>(`${GistEndPoints.GIST_BY_ID}/${gistId}`, {
      headers,
    });
  }

  updateGist(
    token: string,
    gistId: string,
    gistData: CreateGistData
  ): Observable<GistData> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.patch<GistData>(
      `${GistEndPoints.GIST_BY_ID}/${gistId}`,
      gistData,
      {
        headers,
      }
    );
  }

  starGist(token: string, gistId: string): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.put<void>(
      `${GistEndPoints.GIST_BY_ID}/${gistId}/star`,
      { gist_id: gistId },
      {
        headers,
      }
    );
  }

  starredGists(token: string): Observable<GistData[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<GistData[]>(`${GistEndPoints.STARRED_GIST}`, {
      headers,
    });
  }

  isGistStarred(token: string, gistId: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<void>(`${GistEndPoints.GIST_BY_ID}/${gistId}/star`, {
      headers,
    });
  }

  forkGist(token: string, gistId: string): Observable<GistData> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post<GistData>(
      `${GistEndPoints.GIST_BY_ID}/${gistId}/forks`,
      { gist_id: gistId },
      {
        headers,
      }
    );
  }

  unstarGist(token: string, gistId: string): Observable<GistData> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.delete<GistData>(
      `${GistEndPoints.GIST_BY_ID}/${gistId}/star`,
      {
        headers,
      }
    );
  }
}
