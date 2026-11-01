const fs = require('fs');
const pkgPath = '.output/server/package.json';
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

// Hapus package yang Windows-only
delete pkg.dependencies['@img/sharp-win32-x64'];
delete pkg.dependencies['@img/sharp-linux-x64'];
delete pkg.dependencies['@img/sharp-linux-arm64'];

fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
console.log('✅ Removed Windows-only sharp binaries from server package.json');
