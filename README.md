# PinPad App

Implementation of the pin pad as described in the Frontend code challenge instructions.

## Requirements

- Buttons should work with either touch or clicks
- The pin should be hidden except for the last number
- Hardcode somewhere in the code right PIN (which eventually could be
read from an API)
- The pin is always max 4 digits long
- When the user inputs 4 digits the pin is checked
- If the inserted PIN is correct the screen displays OK and the pin is reset
- If the inserted PIN is wrong the screen displays ERROR and the pin is
reset

## Bonus requirements
- After 3 wrong attempts the pin pad locks for 30 secs, showing LOCKED
on the display


## JS Libraries stack

- [react](https://github.com/facebook/react)
- [babel](https://github.com/babel/babel)
- [eslint](https://github.com/eslint/eslint)
- [jest](https://jestjs.io/)
- [react-testing-library](https://testing-library.com/docs/react-testing-library/intro)


## JS Concepts

### Babel

Babel is essentially a compiler used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript (https://babeljs.io/docs/en/learn). It ships with a set of ES2015 syntax transformers with built-in support for [JSX](https://jsx.github.io/).

### React

[React](https://github.com/mikechau/react-primer-draft) is a JavaScript library for creating user interfaces developed by Facebook. Its purpose is to **solve the problem of building large applications with data that changes over time**.

React is trying to solve the problem of the DOM in a refreshingly way. This library is all about building reusable components that provide a render method, which returns a virtual DOM structure. Upon state changes, this structure is reconciled against the real DOM (applying only the minimal set of DOM manipulations to update any changes).


## CSS Libraries stack

- [SASS](http://sass-lang.com/) to give superpowers to CSS via [node-sass](https://github.com/sass/node-sass) a node wrapper for [LibSass](https://github.com/sass/libsass)
- [PostCSS / Autoprefixer](https://github.com/postcss/autoprefixer) to stop worrying about CSS vendor prefixes
- [normalize.css](https://necolas.github.io/normalize.css/) A modern CSS reset


## SASS

Allows the creation of a modular, reusable and fast CSS while combining well with React components concept.


### Code Styleguides

This application uses [Airbnb CSS / SASS Styleguideline](https://github.com/airbnb/css).

And [Sass Guidelines](https://sass-guidelin.es/) an opinionated styleguide for writing sane, maintainable and scalable SASS.


### Methodologies: [OCSS and BEM](https://github.com/airbnb/css#oocss-and-bem)


### Directory pattern

Following the [7-1 architecture pattern](http://sass-guidelin.es/#architecture), abstracts have been located in the root styles folder. The abstracts/ folder gathers all SASS tools and helpers used across the project.

```
./src/
	└── styles
        ├──abstracts/
        │   ├── _fonts.sass        # Sass font import and variables
        │   ├── _variables.sass    # Sass variables
        │   └── _mixins.sass       # Sass Mixins
        │
        └── resources.sass              # Global resources Sass file
```

And `resources.sass` load all scss files and modules (sass-rem):

```SASS
@charset 'UTF-8';

@import "~sass-rem",
@import "./config/variables"
@import "./config/fonts"
@import "./config/mixins"

```

## Installation

### Install Node.js >= v12.17.x

If Node.js version v12.17.x is not already installed on your system, install it so you can run this app.

```
$ node --version
v12.17.0
```

### Install yarn

[yarn install guide](https://yarnpkg.com/en/docs/install)

### Run yarn install to install all dependencies

From application root execute:

```
$ yarn install
```

Alternatively the following shorthand can also be used to install all dependencies:

```
$ yarn
```

NOTE: If the node version is changed, yarn modules will need to be rebuild. Another option would be to execute the following commands:

```
$ rm -Rf node_modules
$ yarn install
```


## How to

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app), which comes with some predefined scripts. New scripts have been added to support code linting.

### Run development mode

```
$ yarn start
```

### Run build

```
$ yarn build
```

### Lint your code

#### Run JS/SASS linters

```
$ yarn lint
```

#### Run JS linter

```
$ yarn run lint:js
```

This script runs [eslint](https://github.com/eslint/eslint) over `src/**/*.js` files using the config file located in `./.eslintrc`.

#### Fix JS linter errors

```
$ yarn run lint:js:fix
```

Fix the lint errors/warnings automatically when possible. [More info](http://eslint.org/docs/user-guide/command-line-interface#fix)

#### Run SASS linter

```
$ yarn run lint:sass
```

This script executes [sass-lint](https://github.com/sasstools/sass-lint) over `src/**/*.sass`. The config file can be found in `./sasslintrc`.  


### Run tests

```
$ yarn test
```

## TODOS

The correct pin is currently defined in ./src/App.js. Ideally, this pin could be fetched from an API. To implement this feature, a local API server could be set up using express (https://expressjs.com/) or an external platform such as Firebase (https://firebase.google.com/).
