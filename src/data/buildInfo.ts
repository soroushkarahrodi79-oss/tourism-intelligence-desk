export const BUILD_INFO = {
  appVersion: '0.4.0',
  gitSha: import.meta.env.VITE_BUILD_SHA || 'local',
  deployment: import.meta.env.VITE_DEPLOYMENT || 'local',
  evidenceManifestVersion: 'v0.4-2026-09-25'
} as const;

export const shortBuildSha =
  BUILD_INFO.gitSha === 'local' ? 'local' : BUILD_INFO.gitSha.slice(0, 7);
