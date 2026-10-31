import {createServer} from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import {resolve,extname,sep} from 'node:path';
const root=resolve('site');const port=Number(process.env.PORT||4173);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.woff2':'font/woff2','.ttf':'font/ttf','.txt':'text/plain'};
createServer(async(req,res)=>{try{
 let name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);let file=resolve(root,'.'+name);
 if(file!==root&&!file.startsWith(root+sep)){res.writeHead(403);res.end();return;}
 if((await stat(file)).isDirectory())file=resolve(file,'index.html');
 const body=await readFile(file);res.writeHead(200,{'Content-Type':types[extname(file)]||'application/octet-stream'});res.end(body);
}catch{res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'});try{res.end(await readFile(resolve(root,'404.html')))}catch{res.end('Not found')}}}).listen(port,'127.0.0.1',()=>console.log('Preview http://127.0.0.1:'+port));
