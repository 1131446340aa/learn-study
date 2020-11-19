commonJs 有缓存

commonJS 是浅拷贝 ， ESMondels 是值的引用，类似const ，只读

es modules 只能放在顶部，不能写在if else

es modules 编译时确定导入和导出，静态语法，方便tree shanking 和类型检查 



其他

AMD 和CMD

AMD 依赖前置（requireJS）  CMD 就近原则

requireJS 动态创建脚本，通过监听onload 事件


AMD在下载完就会执行 CMD 在使用完才会执行