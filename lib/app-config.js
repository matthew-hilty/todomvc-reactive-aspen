module.exports = process.env.NODE_ENV === 'production' ? {
  dbUri: process.env.MONGOLAB_URI,
  host: 'todomvc-reactive-aspen.herokuapp.com',
  port: process.env.PORT
} : {
  dbUri: 'mongodb://localhost:27017/todoLists',
  host: 'localhost',
  port: 4000
};
