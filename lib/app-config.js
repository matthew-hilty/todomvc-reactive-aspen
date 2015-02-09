module.exports = process.env.NODE_ENV === 'production' ? {
  host: 'todomvc-reactive-aspen.herokuapp.com',
  port: process.env.PORT
} : {
  host: 'localhost',
  port: 4000
};
