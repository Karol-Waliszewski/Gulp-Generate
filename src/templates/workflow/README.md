# Gulp Workflow Template

## About
This is convenient template to work on pages which are not that advanced (not React etc.).

## Getting Started :bulb:

### Installation

Install globally gulp with [npm](https://www.npmjs.com/):

```
npm install -g gulp
```

### Development :wrench:

To enable Development version with live preview and changes catching, simply write:

```
gulp
```

or

```
gulp dev
```

To skip image optimization on start, type:

```
gulp lite
```


### Production :inbox_tray:

To build your website write:

```
gulp build
```

### Configuration :gear:

Simply change values in ```gulpfile.js```:

```javascript
// ------- EDIT SECTION ------- //

var distDir = "dist",
  buildDir = "docs",
  srcDir = "src",
  assetsDir = "img";

var imageQuality = {
  jpg: 80, // 0 - 100%
  png: 6 // 1 - 7
};

// ----------- END ----------- //
```

## Meta

Karol Waliszewski – [karolwaliszewski@gmail.com](mailto:karolwaliszewski@gmail.com)

https://github.com/Karol-Waliszewski