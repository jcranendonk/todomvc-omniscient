# TodoMVC - Omniscient

An implementation of [TodoMVC](http://todomvc.com/) using [Omniscient.js](http://omniscientjs.github.io/). It is written in ES6. It uses [webpack](https://webpack.github.io/) for bundling and [6to5](http://6to5.org/) for ES6 transpilation.

## Running the code

Have webpack-dev-server installed:

```sh
$ npm -g install webpack-dev-server
```

Start webpack-dev-server either with npm:

```sh
$ npm start
```

or manually:

```sh
$ webpack-dev-server -d --colors --progress
```

This will start webpack-dev-server at its default port [here](http://localhost:8080/webpack-dev-server/).

If you just want to build the code:

```sh
$ npm -g install webpack
...
$ webpack -d --colors --progress
```
