const fs = require('fs');
const pkgPath = '.output/server/package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
pkg.dependencies['firebase-functions'] = '^6.0.0';
fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log('Done. Firebase keys:', Object.keys(pkg.dependencies).filter(k => k.startsWith('firebase')));
