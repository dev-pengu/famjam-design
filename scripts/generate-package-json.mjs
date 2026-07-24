import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

// Accept project name as argument or process all if not specified
const projects = process.argv[2] ? [process.argv[2]] : ['fonts', 'icons', 'tokens', 'ui'];

for (const project of projects) {
  const srcPath = resolve(`libs/${project}/package.json`);
  const distPath = resolve(`dist/libs/${project}/package.json`);

  if (!existsSync(distPath)) {
    console.warn(`No dist package.json found for ${project} — run build first`);
    continue;
  }

  const srcPkg = JSON.parse(readFileSync(srcPath, 'utf-8'));
  const distPkg = JSON.parse(readFileSync(distPath, 'utf-8'));

  const publishPkg = {
    name: srcPkg.name,
    version: srcPkg.version,
    description: srcPkg.description,
    keywords: srcPkg.keywords,
    author: srcPkg.author,
    license: srcPkg.license,
    repository: srcPkg.repository,
    main: distPkg.main, // use dist values for paths
    module: distPkg.module,
    types: distPkg.types,
    exports: distPkg.exports,
    files: srcPkg.files,
    sideEffects: srcPkg.sideEffects,
    peerDependencies: srcPkg.peerDependencies,
    peerDependenciesMeta: srcPkg.peerDependenciesMeta,
    dependencies: srcPkg.dependencies,
  };

  // Remove undefined fields
  for (const key of Object.keys(publishPkg)) {
    if (publishPkg[key] === undefined) delete publishPkg[key];
  }

  console.log({ ...publishPkg });
  writeFileSync(distPath, JSON.stringify(publishPkg, null, 2) + '\n');
  console.log(`✓ Generated package.json for ${project}`);
}
