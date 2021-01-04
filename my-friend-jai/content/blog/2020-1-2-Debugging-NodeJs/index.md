---
title: Debugging NodeJS
date: "2021-01-02"
template: post
---

There is an easy way to debug your NodeJS applications with VS Code without the use of console.log statements littered all over your codebase.

VS Code comes with a built in debugger which can start NodeJS apps in debug mode, pause execution with the help of a breakpoint, step over lines of code, and output the value of variable at any given time.

The answer lies in creating a launch.json file and VS Code will create one for you.

## How to create a launch.json file in VS Code

Open your NodeJS project and then from the toolbar click on **View** and **Run**. You will see an option to **create a launch.json file** under **Run and Debug**. Click on that link and VS Code will ask you to select the type of app you want to debug. In this case, you will select **Node.js (preview)**. This action will create a directory called **.vscode** and inside that directory you will find a file called **launch.json**.

Do not exclude .vscode from git so others using your code can also debug your app.

First step is done.

## Configure your launch.json file

The initial file should look something like
```
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "type": "pwa-node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/index.js"
        }
    ]
}
```

Let's give a name to our debug file and let's call it **Debug**. The file should look like below now
```
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug",
            "type": "pwa-node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/index.js"
        }
    ]
}
```

If your index.js file is located at the root and that is the entry point for your app then you do not need to change the **program**. For example, in an express app, the index.js file is usually located at the root and it is named **index.js**.

In the above file you can pass runtime arguments, and an option telling the server to restart, automatically open th console, and to start your project with nodemon instead of node. Nodemon is an helpful npm package which will restart your server after you have modified a file. The final file should look like below
```
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Debug",
            "type": "pwa-node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/index.js",
            "runtimeArgs": [
                "--trace-deprecation",
                "--inspect",
                "--unhandled-rejections=strict"
            ],
            "restart": true,
            "runtimeExecutable": "${workspaceFolder}/node_modules/nodemon/bin/nodemon.js",
            "console": "integratedTerminal",
            "internalConsoleOptions": "neverOpen"
        }
    ]
}
```

Now you can hit **F5** on your keyboard to debug your app and you can add breakpoints by clicking before the line number in VS Code. Breakpoint is represented by a red circle and your code will stop executing giving you the control to inspect data or execute your code line by line with the help of a debugger toolbar available at the top center of VS Code.

We added three runtime arguments but what do they mean?

1. <a href="https://nodejs.org/api/cli.html#cli_trace_deprecation" target="_blank" rel="noreferrer noopener">--trace-deprecation</a> Shows a stack trace of where the deprecation warning originated so you can make an informed decision of using or not using that function. Better to not use it since it will be removed from future versions.
2. <a href="https://nodejs.org/api/cli.html#cli_inspect_host_port" target="_blank" rel="noreferrer noopener">--trace-deprecation</a> Allows IDEs (Integrated Development Environment) to debug and profile Node.js instances.
3. <a href="https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode" target="_blank" rel="noreferrer noopener">--trace-deprecation</a> This is here to so that our debugger will error out when it encounters an error that we have not caucght. It can be easy to not catch errors when using async/await.

## Peek inside your variables

A breakpoint has been added, VS Code has stopped the execution at that breakpoint, and the line before that breakpoint is a variable with some value and we want to know what is in that variable, how do we do that? 

The integrated console should be open in your VS Code and in that you should see a tab named **DEBUG CONSOLE** click on that and you will find your cursor blinking. Enter the name of your variable and you will see what is inside that variable. Another way to see what is inside a variable is by hovering over the variable and a pop up window will show the value in that variable.

## One more thing

This is helpful than adding a bunch of console.log statements and using the debug toolbar you can step into or step over a function call. Get in the habit of debugging your applications with a debugger and it might make you a better programmer.
