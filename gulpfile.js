var gulp = require('gulp');
var exec = require('child_process').exec;
var browserSync = require('browser-sync');

gulp.task('compile', function () {
    
    exec('rm -rf dist && tsc -p src');
});

gulp.task('watch', ['compile'], function () {
    
    return gulp.watch('./src/**/*.ts', ['compile']);
});

gulp.task('test', ['watch'], function () {
    
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