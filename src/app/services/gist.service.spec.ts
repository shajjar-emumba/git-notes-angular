import { TestBed } from '@angular/core/testing';

import { GistService } from './gist.service';
import { provideHttpClient } from '@angular/common/http';

import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { GistEndPoints } from '../models/enums';

import { mockGistData, mockCreateGistData } from '../models/mock-data';

describe('GistService', () => {
  let service: GistService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(GistService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all public gists', () => {
    service.getAllPublicGists().subscribe((gists) => {
      expect(gists).toEqual(mockGistData);
    });

    const req = httpController.expectOne(GistEndPoints.PUBLIC);
    expect(req.request.method).toBe('GET');

    req.flush(mockGistData);
  });

  it('should retrieve a gist by id', () => {
    const gistId = '123';
    service.getGistById(gistId).subscribe((gist) => {
      expect(gist).toEqual(mockGistData);
    });

    const req = httpController.expectOne(
      `${GistEndPoints.GIST_BY_ID}/${gistId}`
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockGistData);
  });

  it('should create a new gist', () => {
    const token = 'mockToken';

    service.createGist(mockCreateGistData).subscribe((gist) => {
      expect(gist).toEqual(mockGistData[0]);
    });

    const req = httpController.expectOne(GistEndPoints.CREATE_GIST);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockCreateGistData);

    req.flush(mockGistData[0]);
  });

  it('should delete a gist', () => {
    const token = 'mockToken';
    const gistId = '123';

    service.deleteGist(gistId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpController.expectOne(
      `${GistEndPoints.GIST_BY_ID}/${gistId}`
    );
    expect(req.request.method).toBe('DELETE');

    req.flush(null);
  });

  it('should update a gist', () => {
    const token = 'mockToken';
    const gistId = '123';

    service.updateGist(gistId, mockCreateGistData).subscribe((gist) => {
      expect(gist).toEqual(mockGistData[0]);
    });

    const req = httpController.expectOne(
      `${GistEndPoints.GIST_BY_ID}/${gistId}`
    );
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(mockCreateGistData);

    req.flush(mockGistData[0]);
  });

  it('should star a gist', () => {
    const token = 'mockToken';
    const gistId = '123';

    service.starGist(gistId).subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpController.expectOne(
      `${GistEndPoints.GIST_BY_ID}/${gistId}/star`
    );
    expect(req.request.method).toBe('PUT');

    req.flush(null);
  });

  it('should retrieve starred gists', () => {
    const token = 'mockToken';

    service.starredGists().subscribe((gists) => {
      expect(gists).toEqual(mockGistData);
    });

    const req = httpController.expectOne(GistEndPoints.STARRED_GIST);
    expect(req.request.method).toBe('GET');

    req.flush(mockGistData);
  });
});
