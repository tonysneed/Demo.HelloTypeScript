var gulp = require('gulp'),
    glob = require('glob'),
    path = require('path'),
    exec = require('child_process').exec,
    browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')({ lazy: true });

gulp.task('help', $.taskListing.withFilters(/:/));
gulp.task('default', ['help']);

gulp.task('compile', function () {
    
    exec('rm -rf dist && tsc -p src');
});

gulp.task('watch', ['compile'], function () {
    
    return gulp.watch('./src/**/*.ts', ['compile']);
});

gulp.task('test', ['specs:inject', 'imports:inject', 'watch'], function () {
    
    var options = {
        port: 3000,
        server: './',
        files: ['./dist/**/*.js',
                './dist/**/*.spec.js',
                '!./dist/**/*.js.map'],
        logFileChanges: true,
        logLevel: 'info',
        logPrefix: 'spec-runner',
        notify: true,
        reloadDelay: 1000,
        startPath: 'SpecRunner.html'
    };
    
    browserSync(options);
});

gulp.task('specs:inject', function () {

    var source = [
        './dist/**/*.js',
        '!./dist/**/*.js.map',
        '!./dist/**/*.spec.js'];
        
    var specs = ['./dist/**/*.spec.js'];

    return gulp
        .src('./specrunner.html')
        .pipe(injectScripts(source, ''))
        .pipe(injectScripts(specs, 'specs'))
        .pipe(gulp.dest('./'));
});

gulp.task('imports:inject', function(){
    
    gulp.src('./util/system.template.js')
        .pipe(injectImports(['./dist/**/*.spec.js'], 'import'))
        .pipe($.rename('./util/system.imports.js'))
        .pipe(gulp.dest('./'));
});

function injectScripts(src, label) {
    
    var options = { read: false, addRootSlash: false };
    if (label) {
        options.name = 'inject:' + label;
    }
    return $.inject(gulp.src(src), options);
}

function injectImports(src, label) {
    
    var search = '/// inject:' + label;
    var first = '\n    System.import(\'';
    var last = '\')';
    var specNames = [];

    src.forEach(function(pattern) {
        glob.sync(pattern)
            .forEach(function(file) {
                var fileName = path.basename(file, path.extname(file));
                var specName = path.join(path.dirname(file), fileName);
                specNames.push(first + specName + last);
            });
    });

    return $.injectString.after(search, specNames);
}