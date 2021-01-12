const express = require('express');
const app = express();

const userRoutes = require('./routes/userRoutes');
const topicRoutes = require('./routes/topicRoutes');
const articleRoutes = require('./routes/articleRoutes');
const commentRoutes = require('./routes/commentRoutes');

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api.articles', articleRoutes);
app.use('/api/comments', commentRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).send({ message: err.message.split('-')[1] });
});

module.exports = app;
