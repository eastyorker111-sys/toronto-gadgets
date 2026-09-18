import { ImageResponse } from 'next/og.js';
import { createElement as h } from 'react';
import { readFile, writeFile } from 'node:fs/promises';

// Export browser formats from the approved Adobe master without changing its shape.
const logo = await readFile('public/brand/tg-symbol.png');
const src = `data:image/png;base64,${logo.toString('base64')}`;
for (const [size, path] of [[96, 'public/favicon-96.png'], [180, 'public/apple-touch-icon.png'], [48, 'public/favicon.ico']]) {
  const response = new ImageResponse(h('div', {style: {display:'flex', width:'100%', height:'100%', alignItems:'center', justifyContent:'center', background:'#ecd8a8'}}, h('img', {src, width:size * .88, height:size * .88 * 522/663})), {width:size, height:size});
  const png = Buffer.from(await response.arrayBuffer());
  if (path.endsWith('.ico')) {
    const header = Buffer.alloc(22);
    header.writeUInt16LE(1, 2); header.writeUInt16LE(1, 4);
    header[6] = size; header[7] = size;
    header.writeUInt16LE(1, 10); header.writeUInt16LE(32, 12);
    header.writeUInt32LE(png.length, 14); header.writeUInt32LE(22, 18);
    await writeFile(path, Buffer.concat([header, png]));
  } else await writeFile(path, png);
}
await writeFile('public/favicon.svg', `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96"><rect width="96" height="96" fill="#ecd8a8"/><image href="${src}" x="6" y="15" width="84" height="66"/></svg>`);
console.log('Exported the approved logo to browser and Apple icon formats.');
