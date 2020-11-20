import { Application } from "https://deno.land/x/oak/mod.ts";
import { Session } from "https://deno.land/x/session@1.1.0/mod.ts";
import user from './routes/user.ts'
import article from './routes/article.ts'
import { oakCors } from 'https://deno.land/x/cors@v1.2.0/mod.ts'
// import cors from './middleware/cors.ts'
const app = new Application();

const session = new Session({ framework: "oak" });
await session.init();
app.use(oakCors({
  origin: ['http://localhost:3000'], // 允许这个域名的 跨域请求
  maxAge: 5,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposedHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  methods: ['GET', 'POST', 'DELETE']
  // allowMethods: ['GET', 'POST', 'DELETE'],          
}))
app.use(session.use()(session));
app.use(user.routes());

app.use(user.allowedMethods());
app.use(article.routes())
app.use(article.allowedMethods())
await app.listen({ port: 8083 });