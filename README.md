Desktop baseplate
===========================

The [Engage Interactive](http://www.engageinteractive.co.uk/) baseplate for responsive websites.

**Including**

 * IE9+ Support
 * Scss
 * jQuery
 
## Another baseplate/boilerplate/bootstrap?

Yes! But not quite. Over time, we've played about and used various boilerplates and bootstraps - and we were never fully happy with them. There always seemed far too much bloat.

What we've done is somewhat of a halfway house between the HTML5 Boilerplate and a full-blown bootstrap like Foundation. It contains the basics, plus some really useful core files and project settings.

## Setup

Setup is pretty simple. Download all the files and place them into your project folder. If you are working with a framework like Laravel, place all the files into their logical locations and update all your paths accordingly.

## Included files

### Scss

#### main.scss

This styles for the baseplate all compile using `main.scss`. This file compiles all the core, content, layout and module styles into `main.css`.

#### fixed-width.scss

While this project initially supports IE9+ (due to jQuery), the Scss can also be compiled in to `fixed-width.css`. The fixed-width variable in this file, in combination with the media query mixin will produce a CSS file without any media queries, up to the breakpoint specified.

===========================

#### _core.scss

#### _demo.scss

Just a couple of quick and dirty presentational styles for the demo.

#### _import.scss

References all of the Scss files to be included in the project.

#### _variables.scss

Everything from font sizes, to colours, to easing function timings.

===========================

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

Files within the content category should be used to style blocks of generic content on a page that are used around the site. For example, buttons and typography.

===========================

#### Core

These files contain the very basic building blocks to the project. They contain really low-specificity elements and/or classes. Examples includes form inputs, basic image styling, and base typographic styles.

===========================

#### Modules

The modules category should be used to style up site-wide self-contained elements. For example, forms, modal overlays, login forms, lists, pagination, twitter includes.

===========================

#### Layout

The layout category should contains files that affect the structure of the site, for example the navigation, site header and footer. Essentially, any distinguishable section of a design that isn't re-used elsewhere.

===========================

#### Pages

Finally, the pages category is used to style up page-unique content/layout. When you include the project into a framework, a kind developer will add a class to the body of the site. Usually something along the lines of `page-home` or `page-locations`. You can use this to namespace your styles so that you don't affect any other content.

===========================

### Javascript

We've included the basics here.

##### Libs
 * jquery-2.1.4.x.js (you'll need to swap to jquery-1.11.x.js to support IE*)
 * fastclick.js
 * enquire.js
 * matchMeida.js
 * TweenLite.js

##### Plugins
 * Various TweenLite functions
 * loadImg.js
 * preload.js
 * simpleSelect.js

##### Site.js

This contains a basic JavaScript file structure with a few bits of functionality and plugins we always use. The noteable parts are:
 * Window scroll and resize listeners which keep a global object storing site metric information up-to-date.
 * External and internal link handling
 * Simple select plugin which allows you a large amount of control over the visuals of a select dropdown.
 * Buffered window resize callback that stops Chrome and IE from going nuts on browser resize.
 * Fastclick activation (for touch based devices)

If you don't need something, just remove it.

===========================

### HTML

Included in the baseplate is a very, very, very simple example of the grid and site structure we like to start with in a lot of cases. This is by no means what we always use though, so feel free to delete it all and start again!