const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');
const minify = require('gulp-minify');
const cleanCSS = require('gulp-clean-css');
const vulcanize = require('gulp-vulcanize');

// Clean dist
gulp.task('clean', () => {
    return del(['dist/*']);
});

// Minify JS
gulp.task('minify-js', () => {
    return gulp.src('js/*.js')
        .pipe(minify({
            ext: {
                min: '.js'
            },
            noSource: true,
            ignoreFiles: ['.combo.js', '-min.js']
        }))
        .pipe(gulp.dest('dist/js/'));
});

// Minify CSS
gulp.task('minify-css', function () {
    return gulp.src('css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css/'));
});

// Vulcanize polymer components
gulp.task('vulcanize', () => {
    return gulp.src('components/elements.html')
        .pipe(vulcanize({
            stripComments: true,
            inlineScripts: true,
            inlineCss: true
        }))
        .pipe(gulp.dest('dist/components'));
});

// Copy assets
gulp.task('copy-assets', function () {
    return gulp.src(['assets/**']).pipe(gulp.dest('dist/assets'));
});

// Copy source
gulp.task('copy-source', function () {
    return gulp.src(['src/**']).pipe(gulp.dest('dist/src'));
});

// Copy images
gulp.task('copy-images', function () {
    return gulp.src(['images/**']).pipe(gulp.dest('dist/images'));
});

// Copy HTML
gulp.task('copy-html', function () {
    return gulp.src([
        'index.html',
        'service-worker.js',
        'sw-precache-config.js'
    ]).pipe(gulp.dest('dist/'));
});

// Default
gulp.task('default', () => {
    runSequence(
        'clean',
        [
            'minify-js',
            'minify-css',
            'vulcanize',
            'copy-assets',
            'copy-source',
            'copy-images',
            'copy-html'
        ]
    );
});