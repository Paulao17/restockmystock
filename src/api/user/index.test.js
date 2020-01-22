let request = require('supertest')
let express = require('../../services/express')
let routes = require('./index')
let config = require('../../../config')
let mongoose = require('mongoose')
let User = require('./model')

const app = () => express('', routes)

let user1 = {
  username: 'test1',
  password: '654321'
}

beforeAll(() => {
  mongoose.connect(config.mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
})

afterAll(() => {
  mongoose.disconnect()
})

test('sum', () => {
})
/*describe('Test auth', () => {
  beforeEach(async () => {
    await User.create(user1)
  })

  afterEach(async () => {
    await User.deleteOne({username: user1.username})
  })

  test('GET /user correctly', (done) => {
    request(app()).get('/')
      .set('Authorization', 'Bearer ' + token1)
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})/*

  /*describe('Invalid tokens', () => {
    test('GET /user with invalid token', (done) => {
      request(app()).get('/')
        .set('Authorization', 'Bearer ' + 'An invalid token')
        .expect(401, done)
    })

    test('GET /user with invalid token', (done) => {
      request(app()).get('/')
        .set('Authorization', 'Bearer ' + jwt.sign('nottest1'))
        .expect(401, done)
    })

    test('GET /user without any token', (done) => {
      request(app()).get('/')
        .expect(401, done)
    })
  })
})

describe('POST /user', () => {
  test('POST /user with no body', (done) => {
    request(app())
      .post('/')
      .expect(400, done)
  });

  test('POST /user create new user', (done) => {
    request(app())
      .post('/')
      .send(user1)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201, done)
  })

  test('POST /user but user already exists', (done) => {
    request(app())
      .post('/')
      .send(user1)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(409, done)
  })
})*/
