import { CreateGistData, GistData } from './interfaces';

export const mockGistData: GistData[] = [
  {
    url: 'https://api.github.com/gists/abcdef1234567890',
    forks_url: 'https://api.github.com/gists/abcdef1234567890/forks',
    commits_url: 'https://api.github.com/gists/abcdef1234567890/commits',
    id: 'abcdef1234567890',
    node_id: 'G_kwDOABC1234567890',
    git_pull_url: 'git://gist.github.com/abcdef1234567890.git',
    git_push_url: 'git@gist.github.com:abcdef1234567890.git',
    html_url: 'https://gist.github.com/username/abcdef1234567890',
    files: {
      'file1.txt': {
        filename: 'file1.txt',
        type: 'application/javascript',
        language: 'JavaScript',
        raw_url:
          'https://gist.githubusercontent.com/username/abcdef1234567890/raw/example.js',
        size: 1234,
        truncated: false,
        content: 'File content',
      },
    },
    public: true,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-02T00:00:00Z',
    description: 'This is a sample gist description.',
    comments: 0,
    user: {
      login: 'username',
      id: 123456,
      node_id: 'MDQ6VXNlcjEyMzQ1Ng==',
      avatar_url: 'https://avatars.githubusercontent.com/u/123456?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/username',
      html_url: 'https://github.com/username',
      followers_url: 'https://api.github.com/users/username/followers',
      following_url:
        'https://api.github.com/users/username/following{/other_user}',
      gists_url: 'https://api.github.com/users/username/gists{/gist_id}',
      starred_url:
        'https://api.github.com/users/username/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/username/subscriptions',
      organizations_url: 'https://api.github.com/users/username/orgs',
      repos_url: 'https://api.github.com/users/username/repos',
      events_url: 'https://api.github.com/users/username/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/username/received_events',
      type: 'User',
      site_admin: false,
    },
    comments_url: 'https://api.github.com/gists/abcdef1234567890/comments',
    owner: {
      login: 'username',
      id: 123456,
      node_id: 'MDQ6VXNlcjEyMzQ1Ng==',
      avatar_url: 'https://avatars.githubusercontent.com/u/123456?v=4',
      gravatar_id: '',
      url: 'https://api.github.com/users/username',
      html_url: 'https://github.com/username',
      followers_url: 'https://api.github.com/users/username/followers',
      following_url:
        'https://api.github.com/users/username/following{/other_user}',
      gists_url: 'https://api.github.com/users/username/gists{/gist_id}',
      starred_url:
        'https://api.github.com/users/username/starred{/owner}{/repo}',
      subscriptions_url: 'https://api.github.com/users/username/subscriptions',
      organizations_url: 'https://api.github.com/users/username/orgs',
      repos_url: 'https://api.github.com/users/username/repos',
      events_url: 'https://api.github.com/users/username/events{/privacy}',
      received_events_url:
        'https://api.github.com/users/username/received_events',
      type: 'User',
      site_admin: false,
    },
    fork_of: null,
    forks: [],
    history: [
      {
        user: {
          login: 'username',
          id: 123456,
          node_id: 'MDQ6VXNlcjEyMzQ1Ng==',
          avatar_url: 'https://avatars.githubusercontent.com/u/123456?v=4',
          gravatar_id: '',
          url: 'https://api.github.com/users/username',
          html_url: 'https://github.com/username',
          followers_url: 'https://api.github.com/users/username/followers',
          following_url:
            'https://api.github.com/users/username/following{/other_user}',
          gists_url: 'https://api.github.com/users/username/gists{/gist_id}',
          starred_url:
            'https://api.github.com/users/username/starred{/owner}{/repo}',
          subscriptions_url:
            'https://api.github.com/users/username/subscriptions',
          organizations_url: 'https://api.github.com/users/username/orgs',
          repos_url: 'https://api.github.com/users/username/repos',
          events_url: 'https://api.github.com/users/username/events{/privacy}',
          received_events_url:
            'https://api.github.com/users/username/received_events',
          type: 'User',
          site_admin: false,
        },
        version: '1',
        committed_at: '2024-01-01T00:00:00Z',
        change_status: {
          total: 1,
          additions: 1,
          deletions: 0,
        },
        url: 'https://api.github.com/gists/abcdef1234567890/commits',
      },
    ],
    truncated: false,
    isStarred: false,
  },
];

export const mockCreateGistData: CreateGistData = {
  description: 'Mock Gist',
  public: true,
  files: {
    'file1.txt': {
      content: 'File content',
    },
  },
};
