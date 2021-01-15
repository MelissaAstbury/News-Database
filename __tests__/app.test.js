process.env.NODE_ENV = 'test';
const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');

afterAll(() => {
  return connection.destroy();
});

beforeEach(() => {
  return connection.seed.run();
});

describe('/api/topics', () => {
  describe('GET', () => {
    it('status 200 - responds with an array of topics', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          expect(body.topics.length).toBe(3);
        });
    });
  });
  describe('ERROR HANDLING', () => {
    it('status 404 - return when a url does not exist', () => {
      return request(app).get('/api/topic').expect(404);
    });
    it('status 400 - returns an error message when a topic property does not exist', () => {
      return request(app)
        .get('/api/topics?sort_by=age')
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe(' column "age" does not exist');
        });
    });
  });
});

describe('/api/users', () => {
  describe('GET', () => {
    it('status 200 - responds with an array of users', () => {
      return request(app)
        .get('/api/users')
        .expect(200)
        .then(({ body }) => {
          expect(body.users.length).toBe(4);
          expect(body.users[0].username).toBe('lurker');
        });
    });
    it('status 200 - returns a user object that matches the username requested', () => {
      const expectedBody = {
        username: 'butter_bridge',
        name: 'jonny',
        avatar_url:
          'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
      };
      return request(app)
        .get('/api/users/user/butter_bridge')
        .expect(200)
        .then((response) => {
          expect(response.body).toStrictEqual(expectedBody);
        });
    });
  });
  describe('ERROR HANDLING', () => {
    it('status 404 - return when a url does not exist', () => {
      return request(app).get('/api/user').expect(404);
    });
    it('status 400 - returns an error message when a user property does not exist', () => {
      return request(app)
        .get('/api/users?sort_by=age')
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe(' column "age" does not exist');
        });
    });
  });
});

describe('/api/articles', () => {
  describe('GET', () => {
    it('status 200 - returns a article object that matches the article_id requested', () => {
      const expectedBody = {
        article_id: 1,
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: '2018-11-15T12:21:54.171Z',
        votes: 100,
      };
      return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then((response) => {
          expect(response.body).toStrictEqual(expectedBody);
        });
    });
  });
  describe('GET', () => {
    it('status 200 - returns an array of comments for that particular article', () => {
      return request(app)
        .get('/api/articles/1/comments')
        .expect(200)
        .then(({ body: { comment } }) => {
          expect(comment).toEqual(
            expect.objectContaining({
              created_by: expect.any(String),
              body: expect.any(String),
              comment_id: expect.any(Number),
              created_at: expect.any(String),
              votes: expect.any(Number),
            })
          );
        });
    });
  });
  describe('POST', () => {
    it('status 201 - returns a new comment', () => {
      const input = {
        username: 'butter_bridge',
        body: 'This is my first comment',
      };
      const expected = {
        comment_id: 19,
        body: 'This is my first comment',
        article_id: 2,
        created_by: 'butter_bridge',
        votes: 0,
        created_at: expect.any(String),
      };
      return request(app)
        .post('/api/articles/2/comments')
        .send(input)
        .expect(201)
        .then(({ body: { comment } }) => {
          expect(comment).toEqual(expected);
        });
    });
  });
  describe('PATCH', () => {
    it('status 201 - updates object - increases the vote count', () => {
      const input = { voteIncrease: 1 };
      return request(app)
        .patch('/api/articles/1')
        .send(input)
        .expect(201)
        .then((response) => {
          expect(response.body).toEqual({
            articleVoteIncreased: {
              article_id: 1,
              title: expect.any(String),
              author: expect.any(String),
              body: expect.any(String),
              created_at: expect.any(String),
              topic: expect.any(String),
              votes: 101,
            },
          });
        });
    });
  });
  describe('ERROR HANDLING', () => {
    it('status 204 - deletes an article object when given an id that exists', () => {
      return request(app).delete('/api/articles/1').expect(204);
    });
    it('status 404 - returns and err msg when article_id object does not exists', () => {
      return request(app)
        .delete('/api/articles/30')
        .expect(404)
        .then((response) => {
          expect(response.body.message).toBe('This article_id does not exist');
        });
    });
    it('status 404 - returns err message when article_id does not exist for a patch request', () => {
      const input = { voteIncrease: 1 };
      return request(app)
        .patch('/api/articles/50')
        .send(input)
        .expect(404)
        .then((response) => {
          expect(response.body.message).toBe('This article_id does not exist');
        });
    });
  });
});
