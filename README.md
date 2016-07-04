Front-end Baseplate
===========================

The [Engage Interactive](http://www.engageinteractive.co.uk/) website baseplate.

### Features

- Auto-prefixed CSS compiled from Sass, written using the [BEM methodology](http://getbem.com/)
- [ESLint](https://github.com/eslint/eslint)-ed JavaScript with source map support and native error notifications
- Image compression using the [TinyPNG API](https://tinypng.com/developers)
- SVG sprite generator
- [Browsersync](https://www.browsersync.io/)-based watch script

### Another?

We've all played with the latest baseplate/boilerplate/bootstrap but were never truly happy with them. We've produced somewhat of a halfway house between the [HTML5 Boilerplate](https://github.com/h5bp/html5-boilerplate) and something like [Foundation](https://github.com/zurb/foundation-sites). It contains the usual basics, plus some really useful core files and project settings.

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/en/download/)
  - Long-term Support (LTS) build is fine
  - Check your [npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions#option-1-change-the-permission-to-npms-default-directory) (typically option 1)
- [Gulp](http://gulpjs.com/)
  - Installed globally by running `npm install --global gulp-cli` in Terminal
- [TinyPNG Developer API](https://tinypng.com/developers) Key
  - Setup as an environment variable with key `TINYPNG_KEY`
  - Run `echo "export TINYPNG_KEY=YOUR_KEY_HERE" >> ~/.bash_profile && source ~/.bash_profile` in Terminal (replacing `YOUR_KEY_HERE` with your key)

### Initial Project Setup

1. Navigate to your project's root directory in Terminal([?!?](#termnial))
2. `npm install`
  - installs the dependencies for this project
  - can take several minutes
  - will output a lot of debugging information (including occasional deprecation warnings) that can be ignored
3. Open `gulpfile.js` and check/update the `config` object
  - **note** - non-static projects (i.e. PHP) still require setting up in Apache/NGINX

### Typical Development Process

- `gulp` - recompiles everything (optional)
- `gulp watch` - starts [Browsersync](https://www.browsersync.io/) and watches for file changes
  - you can `⌘` + double-click the local address shown in Terminal to open the link
  - you can alternatively use your machine's network name, e.g. `joe.local:5757`
  - keep an eye on Terminal if it seems like changes aren't showing up in your browser
  - stop the process using `ctrl + c`
- `gulp clean` - deletes all compiled assets

## Source Files

### Sass

`main.scss` is the top-level Sass file, which typically just imports the `_variables` and `_import` partials. This split allows for the [fixed width](#fixed-width) functionality.

#### _import.scss

References all of the Sass partials to be included in the project.

#### _variables.scss

Everything from font sizes, to colours, to easing function timings.

#### Utility

##### Functions

The functions file is new. We will be using this more in the future, for now it just contains a copy of the foundation rem-calc function.

##### Mixins, extenders & animations

These are some really generic mixins and extenders that we use on nearly every website we create. The animations file is empty as animations tend to be very specific, but we usually end up adding them, so the file exists simply for convenience.

##### Grids

Initially based off the Foundation grid, we've produced a stripped down version of our own.

##### Resets - Normalise & Formalise

Our English spelling version of the Normalize.css file with a few very slight modifications.

##### Helper Classes

Useful, commonly-used classes that can be used throughout the project. If the element will never change, use a class. If you're using a helper after a certain breakpoints, it would be better to call the relevant mixin.

##### Fonts

This file should contain any `@font-face` rules or remote file URL's. By default we include Open Sans.

#### Core

These files contain the very basic building blocks to the project. They contain really low-specificity elements and/or classes. Examples includes form inputs, basic image styling, and base typographic styles.

#### Modules

The modules category should be used to style up site-wide self-contained elements. For example, forms, modal overlays, login forms, lists, pagination, twitter includes.

#### Layout

The layout category should contains files that affect the structure of the site, for example the navigation, site header and footer. Essentially, any distinguishable section of a design that isn't re-used elsewhere.

#### Pages

Finally, the pages category is used to style up page-unique content/layout. When you include the project into a framework, a kind developer will add a class to the body of the site. You can use this to namespace your styles so that you don't affect any other content.

### Javascript

We've included the usual here, jQuery and Modernizr, along with some in-house plugins:

- fitvids.js
- loadImg.js
- preload.js
- simpleSelect.js

##### Site.js

This contains a basic JavaScript file structure with a few bits of functionality and plugins we always use. The noteable parts are:
- Window scroll and resize listeners which keep a global object storing site metric information up-to-date.
- External and internal link handling
- Simple select plugin which allows you a large amount of control over the visuals of a select dropdown.
- Buffered window resize callback.

If you don't need something, just remove it.

### HTML

Included in the baseplate is a very, very, very simple example of the grid and site structure we like to start with in a lot of cases. This is by no means what we always use though, so feel free to delete it all and start again!

## Other

### <a name="fixed-width"></a>IE8 Support

The optional `fixed-width.scss` Sass file outputs CSS with all the media queries removed. Set `fixed-width-limit` to adjust the max-width used.

### <a name="termnial"></a>Termnial Shortcut

Check you've enabled `System Preferences > Keyboard > Shortcuts > Services > New Terminal at Folder`, then you can right-click the project folder, choose services (at the bottom) and just click `New Terminal at Folder`.
