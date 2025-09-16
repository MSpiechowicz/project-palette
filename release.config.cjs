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
    }],
    ['@semantic-release/changelog', {
      changelogFile: 'CHANGELOG.md',
    }],
    ['@semantic-release/npm', {
      npmPublish: false,
    }],
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
