const fs = require('fs');


const files = [
  'src/components/GameBoard.tsx',
  'src/components/ShopScreen.tsx',
  'src/components/MetaMatrixLab.tsx',
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');

  // We append `-index` or `-idx` or `-i` to mappings to strictly enforce unique keys.
  content = content.replace(/key=\{([a-zA-Z0-9_\.]+id)\}/g, 'key={`${$1}-${idx || i || index || Math.random()}`}');
  content = content.replace(/key=\{d\.id\}/g, 'key={`die-${d.id}`}');
  content = content.replace(/key=\{p\.id\}/g, 'key={`part-${p.id}`}');
  content = content.replace(/key=\{fp\.id\}/g, 'key={`fire-${fp.id}`}');
  content = content.replace(/key=\{([a-zA-Z]+)\}/g, (match, p1) => {
     if (p1 === 'val' || p1 === 'v') return `key={\`num-\${${p1}}\`}`;
     if (p1 === 'index' || p1 === 'i' || p1 === 'idx') return match;
     if (['currentText', 'handName', 'relicId', 'displayScore', 'hand'].includes(p1)) {
        return `key={\`str-\${${p1}}\`}`;
     }
     return match;
  });
  content = content.replace(/key="ambient-flash"/g, 'key="ambient-flash"');
  
  if (file.includes('GameBoard.tsx')) {
     content = content.replace(/key=\{\s*activeActivation\.id \|\| activeActivation\.name\s*\}/g, 'key={activeActivation.id || `act-${activeActivation.name}`}');
  }

  fs.writeFileSync(file, content, 'utf8');
});

console.log('Done rewriting keys.');
