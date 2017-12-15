// this probably does not even exist in dev env
if (process.env.NODE_ENV === 'production') {
  module.exports(require('./prod'));
}
else {
  module.exports(require('./dev'));
}
