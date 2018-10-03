var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var cssNano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');

gulp.task('default', function(){
	console.log('Hello World..');
});

gulp.task('sass',function(){
	console.log('sass')
	return gulp.src('app/assets/sass/*.scss')
	.pipe(sass())
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('app/assets/css'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

gulp.task('browserSync', function(){
	browserSync.init({
		server:{
			baseDir: 'dist'
		},
	})
});

gulp.task('useref', function(){
	return gulp.src('app/*.html')
	.pipe(useref())
	.pipe(gulpif('*.js',uglify()))
	.pipe(gulpif('*.css',cssNano()))
	.pipe(gulp.dest('dist/'))
});

gulp.task('images', function(){
	return gulp.src('app/images/*.+(png|jpg|gif|svg|jpeg)')
	.pipe(imagemin({
	    // Setting interlaced to true
	    interlaced: true
    }))
	.pipe(imagemin([
	    imagemin.gifsicle({interlaced: true}),
	    imagemin.jpegtran({progressive: true}),
	    imagemin.optipng({optimizationLevel: 5}),
	    imagemin.svgo({
	        plugins: [
	            {removeViewBox: true},
	            {cleanupIDs: false}
	        ]
	    })
	]))
	.pipe(gulp.dest('dist/'))
});

gulp.task('watch', ['sass','useref','browserSync','images'], function(){
	gulp.watch('app/sass/*.scss', ['sass']);
	gulp.watch('app/*.html', browserSync.reload);
	gulp.watch('app/js/*.js', browserSync.reload);
});

gulp.task('build',['watch'], function(){
	console.log('building files');
})