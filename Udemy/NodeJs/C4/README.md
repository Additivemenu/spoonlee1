Debug



## NPM scripts



```terminal
npm init
```

follow instructions poped out, generate a package.json file:

package.json

+ we can actually customize script for command here :bangbang: but note the cusotmized command only valid under the package.json path
  + e.g. run `npm start` would be equivalent if we run `node app.js`;
  + e..g run `npm run start-server` would be equivalent if we run `node app.js`

```json
{
  "name": "package",
  "version": "1.0.0",
  "description": "complete node.js guide",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js",
    "start-server": "node app.js"
  },
  "author": "shawn",
  "license": "ISC"
}
```



## Installing 3rd party packages



在npmjs上可以搜索3rd party packages

[nodemon - npm (npmjs.com)](https://www.npmjs.com/package/nodemon/v/1.3.6)

```terminal
npm intall nodemon --save-dev
```

> `--save-dev` is a way to tell `npm` (and other developers) that a package is only necessary during the development phase and not when the application is running in a production environment.

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "nodemon app.js",		// do this
    "start-server": "node app.js"
  },
```

run `npm start`, now that we could use nodemon to autostart our server  by just `ctrl+s` saving the file 



[:bangbang: Global & Local npm Packages](./sub_topics/npm_package.md)

[:bangbang:Global Features vs Core Modules vs Third-Party Modules](./sub_topics/node_module.md)





## Error types



### syntax error

IDE会告诉你





### runtime error

terminal会throw runtime exception, read message and do debugging



Run > start debugging

View > debug



### logical erorr

No exception prompting, not IDE error reminder, just the code execute the way undesired

the most difficult one to debug

+ use debugger
  + which allows you to step through code at certain break point
  + also allows you to watch the value variation of a variable => better alternative than console.log()



## :moon: Use debugger

对于debug logical error  非常有用!  要熟悉用debugger而不是到处打console.log()



launch.json

+ need to config "program": the path of your entry program before start debugging

```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/Udemy/NodeJs/C4/app.js"
        }
    ]
}
```



Under debug mode, when at a certain break point, we can additionally:

+ run code in debug terminal  => very useful and flexible! 
  + and we can even change the value of a variable and affect the subsequent logic flow, be careful
+ pin and watch for a certain variable value changes 



Also, we can use nodemon to enable auto-start after modify our code, add following congfig:

launch.json

```json
{
  // Use IntelliSense to learn about possible attributes.
  // Hover to view descriptions of existing attributes.
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Launch Program",
      "skipFiles": ["<node_internals>/**"],
      "program": "${workspaceFolder}/Udemy/NodeJs/C4/app.js",
      "restart": true,
      "runtimeExecutable": "nodemon",           // this looks for global nodemon, not local nodemon in your package.json
      "console": "integratedTerminal"
    }
  ]
}
```



check more at [Debug Node.js Apps using Visual Studio Code](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)

