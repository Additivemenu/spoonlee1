编译选项

自动监视指定文件变化, 自动编译

```bash
tsc xxx.ts -w
```





更方便的, 路径下ts文件全编译:

```bash
tsc

tsc -w    // w for watch
```

但上面的指令想要生效, 需要tsconfig.json配置文件, 来指明ts的配置

:gem: a tscongif.json file

```json
{
    /*
    tsconfig.json 是ts编译器的配置文件, ts编译器可以根据它的信息来对代码进行编译
        "include" 用来指定哪些ts文件需要被编译
                |-- 路径： ** 表示任意路径
                            * 表示任意文件
        "exclude"  不需要被编译的文件目录
                |-- 默认值: ["node_module", "bower_component", "jspm_packages"]
        "extends" 定义被继承的配置文件 e.g. "extends": "./configs/base", 配置文件非常复杂时才用
        "files" 指定被编译文件的列表, 只有需要编译的文件才会用到, 比较麻烦

    */
    "include":[
        "./src/**/*"
    ],
    "exclude":[
        "./src/hello/**/*"
    ]


}
```



06-



