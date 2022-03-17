var gulp         = require('gulp'),
		sass         = require('gulp-sass')(require('sass')),
		browserSync  = require('browser-sync').create(),
		concat       = require('gulp-concat'),
		uglify       = require('gulp-uglify-es').default,
		cleanCSS     = require('gulp-clean-css'),
		rename       = require('gulp-rename'),
		del          = require('del'),
		imagecomp    = require("compress-images"),
		cache        = require('gulp-cache'),
		autoprefixer = require('gulp-autoprefixer'),
		ftp          = require('vinyl-ftp'),
		notify       = require("gulp-notify");

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: 'app'
		},
		notify: false,
		// online: false, // Work offline without internet connection
		// tunnel: true, tunnel: 'projectname', // Demonstration page: http://projectname.localtunnel.me
	})
});
function bsReload(done) { browserSync.reload(); done() };

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({outputStyle: 'expanded'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer({
		// grid: true, // Optional. Enable CSS Grid
		overrideBrowserslist: ['last 1 versions']
	}))
	// .pipe(cleanCSS()) // Закомментировать, если без сжатия
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});


gulp.task('js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/magnific-popup/jquery.magnific-popup.js',
		'app/libs/slick/slick.min.js',
		'app/js/common.js', // Всегда в конце
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }));
});

gulp.task('imagemin', async function() {
	imagecomp(
		"app/img/**/*",
		"dist/img/",
		{ compress_force: false, statistic: true, autoupdate: true }, false,
		{ jpg: { engine: "mozjpeg", command: ["-quality", "75"] } },
		{ png: { engine: "pngquant", command: ["--quality=75-100", "-o"] } },
		{ svg: { engine: "svgo", command: "--multipass" } },
		{ gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
		function (err, completed) {
			if (completed === true) {
				// browserSync.reload()
			}
		}
	)
});

gulp.task('removedist', function() { return del(['dist'], { force: true }) });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('buildFiles', function() { return gulp.src(['app/*.html', 'app/.htaccess']).pipe(gulp.dest('dist')) });
gulp.task('buildCss', function() { return gulp.src(['app/css/main.min.css']).pipe(gulp.dest('dist/css')) });
gulp.task('buildJs', function() { return gulp.src(['app/js/scripts.min.js']).pipe(gulp.dest('dist/js')) });
gulp.task('buildFonts', function() { return gulp.src(['app/fonts/**/*']).pipe(gulp.dest('dist/fonts')) });

gulp.task('build', gulp.series('removedist', 'imagemin', 'sass', 'js', 'buildFiles', 'buildCss', 'buildJs', 'buildFonts'));

gulp.task('deploy', function() {
	var conn = ftp.create({
		host:      'hostname.com',
		user:      'username',
		password:  'userpassword',
		parallel:  10
	});

	var globs = [
	'dist/**',
	'dist/.htaccess',
	];
	return gulp.src(globs, {buffer: false})
	.pipe(conn.dest('/path/to/folder/on/server'));
});

gulp.task('code', function() {
	return gulp.src('app/**/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('js'));
	gulp.watch('app/*.html', gulp.parallel('code'));
});

gulp.task('default', gulp.parallel('sass', 'js', 'browser-sync', 'watch'));
