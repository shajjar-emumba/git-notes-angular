export enum ApiBase {
  GISTS = 'https://api.github.com/gists',
}

export enum GistEndPoints {
  PUBLIC = `${ApiBase.GISTS}/public`,
  GIST_BY_ID = `${ApiBase.GISTS}`,
  USER_GISTS = `${ApiBase.GISTS}`,
  CREATE_GIST = `${ApiBase.GISTS}`,
  STARRED_GIST = `${ApiBase.GISTS}/starred`,
}
