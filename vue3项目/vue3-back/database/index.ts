import { Client } from "https://deno.land/x/mysql/mod.ts";


const client = new Client();
client.connect({
  hostname: "localhost",
  username: "root",
  password: "",
  db: "test",
});

export default client