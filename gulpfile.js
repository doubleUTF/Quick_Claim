const { series, src, dest } = require("gulp"),
  usemin = require("gulp-usemin"),
  uglify = require("gulp-uglify"),
  minifyHtml = require("gulp-minify-html"),
  minifyCss = require("gulp-minify-css"),
  rev = require("gulp-rev"),
  concat = require("gulp-concat"),
  del = require("del");

function clean(cb) {
  return del("dist");
}

function useMin(cb) {
  return src("app/popup/*.html")
    .pipe(
      usemin({
        css: [rev()],
        html: [minifyHtml({ empty: true })],
        js: [uglify(), rev()]
      })
    )
    .pipe(dest("dist/popup/"));
}

function copyImages(cb) {
  return src("app/img/*").pipe(dest("dist/img/"));
}

function copyManifest(cb) {
  return src("app/manifest.json").pipe(dest("dist"));
}

function copyLib(cb) {
  return src("app/vendor/*.js").pipe(dest("dist/vendor"));
}

function copyContentJs(cb) {
  return src("app/js/content.js")
    .pipe(uglify())
    .pipe(dest("dist/js"));
}
exports.default = series(
  clean,
  useMin,
  copyImages,
  copyManifest,
  copyLib,
  copyContentJs
);
