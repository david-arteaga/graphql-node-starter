const gulp = require('gulp');
const ts = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];
const runGraphql = require('./generate-graphql-types');
const tsProject = ts.createProject('tsconfig.json');

gulp.task('ts', ['graphql'], () => {
  return tsProject
    .src()
    .pipe(sourcemaps.init())
    .pipe(tsProject())
    .on('error', onError)
    .js.pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
    .on('error', onError);
});

gulp.task('json', () => {
  return gulp
    .src(JSON_FILES)
    .pipe(gulp.dest('dist'))
    .on('error', onError);
});

gulp.task('graphql', callback => {
  runGraphql(tsProject.config.compilerOptions.rootDir, callback, onError);
});

gulp.task('watch', ['graphql', 'ts', 'json'], () => {
  gulp.watch('src/**/*.ts', ['graphql', 'ts']);
  gulp.watch('src/**/*.json', ['json']);
});

gulp.task('watch-graphql', ['graphql'], () => {
  gulp.watch('src/**/*.ts', ['graphql']);
  gulp.watch('src/**/*.json', ['json']);
});

gulp.task('build', ['graphql', 'ts', 'json']);

gulp.task('default', ['watch']);

function onError(e) {
  console.error(e);
  if (process.env.BUILDING) {
    process.exit(1);
  }

  this && this.emit && this.emit('end');
}
