const {src, dest, series, watch} = require('gulp')

const htmlMin = require('gulp-htmlmin')
const autoP = require('gulp-autoprefixer') 
const cleanCss = require('gulp-clean-css')
const uglify = require('gulp-uglify-es').default
const babel = require('gulp-babel')
const notify = require('gulp-notify')
const del = require('del')
const sourceMap = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create()


// Dev

const cleanDev = () => {
  return del('dev/**', {force:true})
}

const htmlDev = () => {
  return src('src/**/*.html')
  .pipe(dest('dev'))
  .pipe(browserSync.stream())
}

const fontsDev = () => {
  return src('src/fonts/**')
  .pipe(dest('dev/fonts'))
}

const stylesDev = () => {
  return src([
    'src/css/**/*.css',
    'src/css/**/*.scss',
    'src/css/**/*.css.map',
  ])
  .pipe(sourceMap.init())
  .pipe(sourceMap.write())
  .pipe(dest('dev/css'))
  .pipe(browserSync.stream())
}

const imagesDev = () => {
  return src([
    'src/img/**/*.jpg',
    'src/img/**/*.jpeg',
    'src/img/**/*.png',
    'src/img/**/*.svg',
    'src/img/**/*.webp',
  ])
  .pipe(dest('dev/img'))
}

const scriptsDev = () => {
  return src('src/js/**/*.js')
  .pipe(sourceMap.init())
  .pipe(sourceMap.write())
  .pipe(dest('dev/js'))
  .pipe(browserSync.stream())
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: 'dev'
    }
  })
}

watch('src/**/*.html', htmlDev)
watch('src/css/**/*.css', stylesDev)
watch('src/js/**/*.js', scriptsDev)

exports.cleanDev = cleanDev
exports.html = htmlDev
exports.styles = stylesDev
exports.scripts = scriptsDev
exports.default = series(cleanDev, htmlDev, fontsDev, stylesDev, imagesDev, scriptsDev, watchFiles)


// Build

const clean = () => {
  return del('build/**', {force:true})
}

const htmlMinify = () => {
  return src('src/**/*.html')
  // .pipe(htmlMin({
  //   collapseWhitespace: true,
  // }))
  .pipe(dest('build'))
}

const fonts = () => {
  return src('src/fonts/**')
  .pipe(dest('build/fonts'))
}

const styles = () => {
  return src('src/css/**/*.css')
    .pipe(autoP({
      cascade: false
    }))
    .pipe(cleanCss({
      level: 2
    }))
    .pipe(dest('build/css'))
}

const images = () => {
  return src([
    'src/img/**/*.jpg',
    'src/img/**/*.jpeg',
    'src/img/**/*.png',
    'src/img/**/*.svg',
    'src/img/**/*.webp',
  ])
  .pipe(dest('build/img'))
}

const scripts = () => {
  return src('src/js/**/*.js')
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(uglify().on('error', notify.onError()))
  .pipe(dest('build/js'))
}


exports.build = series(clean, htmlMinify, fonts, styles, images, scripts)