interface GistOwner {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
}

interface GistFile {
  filename: string;
  type: string;
  language: string;
  raw_url: string;
  size: number;
  truncated: boolean;
  content?: string;
}

interface GistHistory {
  user: GistOwner;
  version: string;
  committed_at: string;
  change_status: {
    total: number;
    additions: number;
    deletions: number;
  };
  url: string;
}

interface GistFork {
  url: string;
  forks_url: string;
  commits_url: string;
  id: string;
  node_id: string;
  git_pull_url: string;
  git_push_url: string;
  html_url: string;
  files: Record<string, GistFile>;
  public: boolean;
  created_at: string;
  updated_at: string;
  description: string;
  comments: number;
  user: GistOwner | null;
  comments_url: string;
  owner: GistOwner;
}

export interface GistData {
  url: string;
  forks_url: string;
  commits_url: string;
  id: string;
  node_id: string;
  git_pull_url: string;
  git_push_url: string;
  html_url: string;
  files: Record<string, GistFile>;
  public: boolean;
  created_at: string;
  updated_at: string;
  description: string;
  comments: number;
  user: GistOwner | null;
  comments_url: string;
  owner: GistOwner;
  fork_of: GistFork;
  forks: GistFork[];
  history: GistHistory[];
  truncated: boolean;
}

export interface GistState {
  gists: GistData[];
  isLoading: boolean;
  error: string;
  searchQuery: string;
}

export interface GistPreview {
  id: string;
  owner_name: string;
  gist_name: string;
  avatar_url: string;
  type: string;
  updated_at: string;
  description: string;
}

export interface AuthState {
  isLoading: boolean;
  user: any | null;
  error: string | null;
}

export interface User {
  accessToken: string;
  displayName: string | null;
  email: string | null;
  uid: string;
  photoURL: string | null;
}
