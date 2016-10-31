/*!
 * gulp
 * npm install gulp-ruby-sass gulp-autoprefixer gulp-cssnano gulp-jshint gulp-concat gulp-uglify gulp-imagemin gulp-notify gulp-rename gulp-livereload gulp-cache del --save-dev
 */

// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano = require('gulp-cssnano'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');
    connect = require('gulp-connect');
    htmlmin = require('gulp-htmlmin');
    gulp_sass= require('gulp-sass')


// 編譯scss
gulp.task('compile_scss', function() {
  return gulp.src('scss/*.scss')
    .pipe(gulp_sass())
    .pipe(gulp.dest('css'))
    .pipe(notify({ message: 'compiled scss' }));
});

// 開啟含 livereload的 web_server
gulp.task('server_on',function(){
	connect.server({
		livereload:true,
	});
});

// 重新整理頁面
gulp.task('reload',function(){
	return gulp.src('index.html')
		.pipe(connect.reload())
    .pipe(notify({message:'reload completed'}));
});


// Default task
// gulp.task('default', ['clean'], function() {
//   gulp.start('combine_css', 'optimize_js', 'images','html');
// });

// Watch
gulp.task('watch', ['server_on'], function() {

  // Watch .scss files
  gulp.watch('scss/*.scss', ['compile_scss']);

  // Watch any files in dist/, reload on change
  gulp.watch('css/*.css',['reload']);
  gulp.watch('index.html',['reload']);

});


/*目前這種配置的問題在於 watch監看檔案變化時，無法在適當的時機
reload。因為我單獨把 reload寫成一個 task，而在 watch後只能執
行一個 task...


本來希望：
  watch監看
    檔案變化 -> 先處理（編譯scss或壓縮合併之類的） -> reload

*/
