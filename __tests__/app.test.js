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
