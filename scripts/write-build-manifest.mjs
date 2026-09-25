import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));

const manifest = {
  app: pkg.name,
  version: pkg.version,
  gitSha: process.env.VITE_BUILD_SHA || 'local',
  deployment: process.env.VITE_DEPLOYMENT || 'local',
  builtAt: new Date().toISOString()
};

const publicDir = path.join(root, 'public');
fs.mkdirSync(publicDir, { recursive: true });
fs.writeFileSync(
  path.join(publicDir, 'build.json'),
  JSON.stringify(manifest, null, 2) + '\n',
  'utf8'
);

console.log(`Wrote public/build.json for ${manifest.version} @ ${manifest.gitSha}`);
