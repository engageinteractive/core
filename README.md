Desktop baseplate
===========================

The [Engage Interactive](http://www.engageinteractive.co.uk/) baseplate for desktop sites. Including all the very basic needs for a mobile first responsive grid-based website.

#### Including
 * ie9+ Support
 * Foundation 5 grid - modified for our purposes
 * SCSS
 * jQuery

## Setup

Setup is pretty simple. Download all the files and place them into your project folder. If you are working with a framework like Laravel, place all the files into their logical locations and update all your paths accordingly.

## Included files

### SCSS

This styles for the baseplate all compile using site.scss. This file compiles all the core, content, layout and module styles into site.css. You probably wont need to change anything in the core category, but if you need to add any content, layout, page or module styles, you'll reference them in here.

Site.scss also includes the foundation grid framework. We use a lightly customised version of foundation which only contains the grid and no other styles.

===========================

#### Core

These files will nearly always be included with every project we do. They all contain very basic content that can be added to as you build your website.

##### Functions

The functions file is new. We will be using this more in the future, for now it just contains a copy of the foundation rem-calc function.

##### Variables

The variables file should be used to store any SCSS variables you may need. It is pre-populated with our most commonly used variables including transition timing functions. Please maintain the variable naming convention.

##### Normalise

Our English spelling version of the Normalize.css file with a few very slight modifications.

##### Mixins, extenders & animations

These are some really generic mixins and extenders that we use on nearly every website we create. The animations file is empty as animations tend to be very specific, but we usually end up adding them, so the file exists simply for convenience.

##### Fonts

This file should contain any `@font-face` rules or remote file URL's. By default we include Open Sans.

===========================

#### Content

Files within the content category should be used to style blocks of generic content on a page that are used around the site. For example, buttons and typography.

===========================

#### Layout

The layout category should contains files that affect the structure of the site, for example the navigation, site header and footer. The Foundation grid is also included at this point.

The global file should be used to style any site-wide structures. In the baseplate, this is where we control the container. If your site doesn't need to be responsive, you could change this container to be a fixed width.

===========================

#### Modules

The modules category should be used to style up site-wide self-contained elements. For example, forms, modal overlays, login forms, twitter includes.

===========================

#### Pages

Finally, the pages category is used to style up page-unique content/layout. When you include the project into a framework, a kind developer will add a class to the body of the site. Usually something along the lines of `page-home` or `page-locations`. You can use this to namespace your styles so that you don't affect any other content.

===========================

### Javascript

We've included the basics here.

When developing locally, the site will include a minified version of site.js which concatinates all these files into one. This should be set up in whatever pre-processor you are comfortable with (we use Codekit and PrePros)

##### Libs
 * jquery.2.x.js
 * fastclick.js

##### Plugins
 * jquery-simpleselect.js

##### global.js

This contains a basic javascript file structure with a few bits of functionality and plugins we always use. The noteable parts are:
 * Window scroll and resize listeners which keep a global object storing site metric information up-to-date.
 * External and internal link handling
 * Simple select plugin which allows you a large amount of control over the visuals of a select dropdown.
 * An easing functions for `jQuery.animate()`
 * Buffered window resize callback that stops Chrome and IE from going nuts on browser resize.
 * Fastclick activation (for touch based devices)
 * busy and quiet functions for tracking click bans

If you don't need something, just remove it.

===========================

### HTML

Included in the baseplate is a very, very, very simple example of the grid and site structure we like to start with in a lot of cases. This is by no means what we always use though, so feel free to delete it all and start again!

In the head we include a link to site.css along with some basic meta tags, scripts and links:
 * Favicon
 * Viewport size (for mobile devices)
 * Format detection to stop phone numbers from being styled by the browser without permission

 All other scripts are included last thing in the footer.
