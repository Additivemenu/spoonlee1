编译选项

自动监视指定文件变化, 自动编译

```bash
tsc xxx.ts -w
```

# tsc编译

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



# compilerOptions

## 基本配置

06-

```json
{
    "include":[
        "./src/**/*"
    ],
    "exclude":[
        "./src/hello/**/*"
    ],

    /*
        06-
        "compilerOptions": 编译器选项 最最重要的
    */

    "compilerOptions":{

        // target用来指定ts被编译为的ES的版本
        // rgument for '--target' option must be: 'es3', 'es5', 'es6', 'es2015', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'esnext'
        "target": "es2015",
        
        // module 指定要使用的模块化规范
        // Argument for '--module' option must be: 'none', 'commonjs', 'amd', 'system', 'umd', 'es6', 'es2015', 'es2020', 'es2022', 'esnext', 'node16', 'nodenext'.
        "module": "es2015",    

        // lib 用来指定项目中要使用的库
        // 一般在浏览器中运行的代码其实不需要explicit设置lib, 如果是在node中跑再设置
        // Argument for '--lib' option must be: 'es5', 'es6', 'es2015', 'es7', 'es2016', 'es2017', 'es2018', 'es2019', 'es2020', 'es2021', 'es2022', 'esnext', 'dom', 'dom.iterable', 'webworker', 'webworker.importscripts', 'webworker.iterable', 'scripthost', 'es2015.core',
        // 'es2015.collection', 'es2015.generator', 'es2015.iterable', 'es2015.promise', 'es2015.proxy', 'es2015.reflect', 'es2015.symbol', 'es2015.symbol.wellknown', 'es2016.array.include', 'es2017.object', 'es2017.sharedmemory', 'es2017.string', 'es2017.intl', 'es2017.typedarrays', 'es2018.asyncgenerator', 
        // 'es2018.asynciterable', 'es2018.intl', 'es2018.promise', 'es2018.regexp', 'es2019.array', 'es2019.object', 'es2019.string', 'es2019.symbol', 'es2019.intl', 'es2020.bigint', 'es2020.date', 'es2020.promise', 'es2020.sharedmemory', 
        // 'es2020.string', 'es2020.symbol.wellknown', 'es2020.intl', 'es2020.number', 'es2021.promise', 'es2021.string', 'es2021.weakref', 'es2021.intl', 'es2022.array', 'es2022.error', 'es2022.intl', 'es2022.object', 
        // 'es2022.sharedmemory', 'es2022.string', 'esnext.array', 'esnext.symbol', 'esnext.asynciterable', 'esnext.intl', 'esnext.bigint', 'esnext.string', 'esnext.promise', 'esnext.weakref'.
        "lib":["dom", "es6" ],

        // "outDir" 用来指定编译后文件所在的目录, 达到js和ts文件分离的目的
        "outDir": "./dist",

        // "outFile": 将ts代码合并编译为一个js文件 16min-
        // 设置outFile后, 所有全局作用域中的代码会合并到同一个js文件中, 如果使用imprt, export模块化就需要特定的module policy, 
        // 一般我们不用outFile, 打包才用， 了解即可
        // "outFile": "./dist/app.js"

    }

}
```



## Js兼容编译

07



```json
{
    "include":[
        "./src/**/*"
    ],
    "exclude":[
        "./src/hello/**/*"
    ],


    "compilerOptions":{

        "target": "es2015",
        "module": "es2015",    
        "lib":["dom", "es6" ],
        "outDir": "./dist",

        // P07-
        // allowJs: 是否对include 指明的路径下的js文件进行编译
        // 默认为 false
        "allowJs": false,

        // checkJs:  是否检查js代码是否符合ts语法规范 
        // 默认为false
        "checkJs": false,

        // "removeComments" : 是否连带comment一起编译到js文件中
        "removeComments": false,
        
        // "noEmit": 不生成编译后的js文件
        "noEmit": false,
        
        // "noEmitOnError": 当有错误时, 不生成编译后文件; 默认为false, 
        // 好用!
        "noEmitOnError": false,
    }


}
```



## Strict 语法检查

08- 

```json
{
    "include":[
        "./src/**/*"
    ],
    "exclude":[
        "./src/hello/**/*"
    ],

    "compilerOptions":{
				
      	// P06
        "target": "es2015",
        "module": "es2015",    
        "lib":["dom", "es6" ],
        "outDir": "./dist",
				
      	// P07
        "allowJs": false,
        "checkJs": false,
        "removeComments": false,
        "noEmit": false,
        "noEmitOnError": false,

        // P08: 语法检查配置 --------------------------------
        // 所有严格检查的总开关, 建议打开 **********
        "strict": true,

        // 用来设置编译后的文件是否使用严格模式, 默认false
        "alwaysStrict": true,

        // "noImplicitAny": 不允许隐式的any, 默认为false
        "noImplicitAny": true,

        // "noImplicitThis": 不允许不明确类型的this, 默认为false
        "noImplicitThis": true,

        // "strictNullChecks": 严格检查一个变量是否可能是null
        "strictNullChecks": true
    }
}
```

