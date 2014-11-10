# Boilerplate for Work/Personal Related Projects

Includes Modernizr (always make a custom build before production), Respond.js, Gulp for compiling + running a Server and LESS for CSS compiling.

## Get Started

Simple as ``npm install``. Make sure you have gulp installed globally beforehand.

Gulp comes with 3 tasks:

```
gulp less
```
for compiling LESS to CSS, minifying and saving to /CSS/style.css
```
gulp uglify
```
for compiling both plugins.js and scripts.js to /js/main.min.js. (Keeping it simple. Use Require.js or Browserify if you're building a web app)
```
gulp watch
```
Exactly what it says on the tin. Watch for changes to both js and less files and run both ``Less`` and ``Uglify``
```
gulp run
```
Everything together. Fires up the webserver on ``localhost:8000`` and listens for changes. Fires livereload when everything is compiled.

Fork away!