const gulp = require('gulp');
const pug = require('gulp-pug');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const del = require('del');
const gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const browserSync = require('browser-sync').create();
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const plumber = require('gulp-plumber');
const px2rem = require('gulp-px-to-rem');
const reload = browserSync.reload;

const paths = {
    root: 'build',
    templates: {
        pages: './src/views/pages/*.pug',
        src: './src/views/**/*.pug',
        dest: './build/'
    },
    styles: {
        main: './src/assets/styles/main.scss',
        src: './src/assets/styles/**/*.scss',
        dest: './build/assets/styles/'
    },
    scripts: {
        src: './src/assets/scripts/**/*.js',
        dest: './build/assets/scripts/'
    },
    images: {
        src: './src/assets/images/*.*',
        dest: './build/assets/images/'
    },
    icons: {
        src: './src/assets/images/icons/*.svg',
        dest: './build/assets/images/icons/'
    },
    fonts: {
        src: './src/assets/fonts/*.*',
        dest: './build/assets/fonts/'
    },
    content: {
      src: './src/assets/content/*.*',
      dest: './build/assets/fonts/'
    }
}

//clean
function clean() {
    return del(paths.root);   
}

//pug
function templates() {
    return gulp.src(paths.templates.pages)
        .pipe(pug({ pretty: true }))
        .pipe(gulp.dest(paths.root));
}

// postcss
function styles() {
    return gulp.src(paths.styles.main)
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(postcss(require('./postcss.config')))
        .pipe(px2rem({accuracy:2,rootPX:16}))
        .pipe(rename('main.min.css'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(reload({ stream: true }));
}

// просто переносим картинки
function images() {
    return gulp
      .src([
        paths.images.src
      ])
      .pipe(gulp.dest(paths.images.dest));
}

// просто переносим пользосвательские файлы
function content() {
    return gulp
      .src([
        paths.content.src
      ])
      .pipe(gulp.dest(paths.content.dest));
}

// просто переносим шрифты
function fonts() {
    return gulp
      .src(paths.fonts.src,)
      .pipe(gulp.dest(paths.fonts.dest));
}

// webpack
function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest(paths.scripts.dest));
}

// watch
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.templates.src, templates);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.images.src, images);
    gulp.watch(paths.content.src, content);
    gulp.watch(paths.fonts.src, fonts);
    gulp.watch(paths.icons.src, svgIcons);
}

//server
function server() {
    browserSync.init({
        server: paths.root,
        tunnel: true,
        open: false,
        tunnel: "test-server"
    });
    browserSync.watch(paths.root + '/**/*.*', browserSync.reload);
}

function svgIcons(done) {
    return gulp
    .src(paths.icons.src)
    .pipe(
      svgmin({
        js2svg: {
          pretty: true
        }
      })
    )
    .pipe(
      cheerio({
        run($) {
          $("[fill], [stroke], [style], [width], [height]")
            .removeAttr("fill")
            .removeAttr("stroke")
            .removeAttr("style")
            .removeAttr("width")
            .removeAttr("height");
        },
        parserOptions: { xmlMode: true }
      })
    )
    .pipe(replace("&gt;", ">"))
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            sprite: "../sprite.svg"
          }
        }
      })
    )
    .pipe(gulp.dest(paths.icons.dest));
}

exports.templates = templates;
exports.styles = styles;
exports.clean = clean;
exports.scripts = scripts;
exports.watch = watch;
exports.server = server;
exports.svgIcons = svgIcons;
exports.images = images;
exports.content = content;
exports.fonts = fonts;

// default
gulp.task('default', gulp.series(
    clean,
    gulp.parallel(svgIcons),
    gulp.parallel(images, content, fonts, styles, templates, scripts),
    gulp.parallel(watch, server)
));