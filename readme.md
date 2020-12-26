# API 

## Code 
`api.ts`: Main class
`dnaManager.ts`: Manager for the dna process
`dbManager.ts`: Manager for database
`dnaManager.test.ts`: Tests for dnaManager
`dbManager.test.ts`: Tests for dbManager
    
## Installation
This API requires node.js and npm, you can get both with the following commands:

```sh
$ sudo apt update
$ sudo apt install nodejs
$ sudo apt install npm
```

Install dependencies: 
```sh
$ cd xmen
$ npm install
```
## Run
Compile and run 

```sh
$ npm start
```

Compile and run in a production environment
```sh
$ npm run tsc
$ node build/app.js
```
## Test
Run test 

```sh
$ npm run test
```

Check test coverage

```sh
$ npm run coverage
```
## Fix possible problems
If you get 
> tsc is not a recognized as an internal or external command 

You can run :
```sh
$ npm install -g typescript
```

If you get 
> Maximum call stack size exceeded

You can run:
```sh
$ npm cache clean --force
```