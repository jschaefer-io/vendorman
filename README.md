# Vendorman
Vendorman is a small helper. It helps you to install dependencies for small websites and assists in providing your build tools with all paths. Install via `npm install vendorman -g`

- `vendorman add <packages...>` Add a dependency - uses `npm install`
- `vendorman remove <packages...>` Remove a dependency - uses `npm remove`
- `vendorman list` List dependencies
- `vendorman file <package> <files...>` Adds or deletes (-d) the given filepaths from the given package

## Why?
Small websites often need standard libraries like jQuery. Integrating these in your build task can be tedious. Vendorman provies an easy to use command line interface to integrate these dependencies in you build task.

## vendorman gives me the wrong files
Vendorman by default returns the main package file. For basic frontend-vendors this is usally the right one. Filepaths can be added or removed with the `vendorman file <package> <files...>` command.

## Use in a build task
```javascript
const vendorman = require('vendorman');

// Returns an array with all vendor files
vendorman.all();

// Returns the vendor files of the given package
vendorman.package('jquery');
```

### Example: gulp
```javascript
const gulp = require('gulp');
const vendorman = require('vendorman');
 
gulp.task('vendor', function() {
  return gulp.src(vendorman.all())
    .pipe(gulp.dest('./vendors/'));
});
```