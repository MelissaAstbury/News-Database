process.env.NODE_ENV = 'test';
const request = require('supertest');
const { createLookup, formatArticleData } = require('../db/utils/data-manipulation');

describe('createLookup', () => {
  it('Returns empty object when passed no value', () => {
    expect(createLookup([])).toEqual({});
  });
  it('Returns the data given as a lookup object', () => {
    expect(
      createLookup(
        [
          {
            a: 1,
            b: 2,
            c: 3,
          },
        ],
        'a',
        'b'
      )
    ).toEqual({ 1: 2 });
  });
  it('Returns the data given when passed multiple objects', () => {
    expect(
      createLookup(
        [
          {
            a: 1,
            b: 2,
            c: 3,
          },
          {
            a: 10,
            b: 35,
            c: 60,
          },
        ],
        'a',
        'b'
      )
    ).toEqual({ 1: 2, 10: 35 });
  });
});

describe('formatArticleData', () => {
  it('Returns a new empty array when passed an empty array', () => {
    const input = [];
    expect(formatArticleData(input)).toEqual([]);
    expect(formatArticleData(input)).not.toBe(input);
  });
  it('Returns new objects that matches the data given without mutating original', () => {
    const input = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: 1471522072389,
      }
    ];
    const expected = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: 1471522072389,
      }
    ]
    formatArticleData(input);
    expect(input).toEqual(expected)
  })
  it('Returns a formatted object (changed timestamp) when passed a single object', () => {
    const input = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: 1471522072389,
      }
    ];
    const expected = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: '2016-08-18T12:07:52.389Z',
      }
    ]
    expect(formatArticleData(input)).toEqual(expected)
  })
});