const fs = require('fs');
const code = fs.readFileSync('src/shared/domain/entities/__tests__/entity.spec.ts', 'utf-8');
console.log(code.includes('describe'));
