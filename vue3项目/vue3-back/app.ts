
// 修改文件自动重启项目
const run = () => {
  //开启子进程
  return Deno.run({
    cmd: ["deno", "run", "--allow-net", "--allow-read", "./main.ts"],
    cwd: Deno.cwd()
  });
}
let _process = run();
// 监听文件变化杀死子进程重启一个新的进程
const watcher = Deno.watchFs(Deno.cwd());
for await (const event of watcher) {
  console.log('kill _process');
  _process.close();
  console.log('restart');
  _process = run();
}