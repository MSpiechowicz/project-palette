// Main repo release config. Packages use: packages-release-config.js
module.exports = {
  branches: [
    'main',
    {
      name: 'dev',
      prerelease: true,
    },
  ],
  plugins: [
    '@semantic-release/commit-analyzer',
    ['@semantic-release/release-notes-generator', {
      preset: 'conventionalcommits',
      presetConfig: {
        types: [
          { type: 'feat', section: 'Features' },
          { type: 'fix', section: 'Bug Fixes' },
          { type: 'chore', section: 'Maintenance' },
          { type: 'docs', section: 'Documentation' },
          { type: 'style', section: 'Styling' },
          { type: 'refactor', section: 'Code Refactoring' },
          { type: 'perf', section: 'Performance Improvements' },
          { type: 'test', section: 'Tests' },
        ],
      },
    }],
    ['@semantic-release/changelog', {
      changelogFile: 'CHANGELOG.md',
    }],
    ['@semantic-release/npm', {
      npmPublish: false,
    }],
    '@semantic-release/github',
    [
      '@semantic-release/git', {
        assets: [
          'CHANGELOG.md',
          'package.json',
          'package-lock.json',
        ],
      },
    ],
  ],
};
