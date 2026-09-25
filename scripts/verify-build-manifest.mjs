import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
const built = JSON.parse(fs.readFileSync(path.join(root, 'dist', 'build.json'), 'utf8'));

if (built.app !== pkg.name) {
  throw new Error(`build.json app mismatch: ${built.app} !== ${pkg.name}`);
}

if (built.version !== pkg.version) {
  throw new Error(`build.json version mismatch: ${built.version} !== ${pkg.version}`);
}

const expectedSha = process.env.VITE_BUILD_SHA || 'local';
if (built.gitSha !== expectedSha) {
  throw new Error(`build.json SHA mismatch: ${built.gitSha} !== ${expectedSha}`);
}

if (!built.builtAt || Number.isNaN(Date.parse(built.builtAt))) {
  throw new Error('build.json builtAt is missing or invalid');
}

console.log(`Verified dist/build.json for ${built.version} @ ${built.gitSha}`);
