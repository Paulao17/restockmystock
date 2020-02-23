let request = require('supertest')
let express = require('../../../services/express')
require('../../../services/passport')
let routes = require('./index')
let User = require('../../user/model')
let config = require('../../../../config')
let mongoose = require('mongoose')

const app = () => express('', routes)

let user1 = {
  username: 'testy',
  password: '654321'
}

beforeAll(() => {
  mongoose.connect(config.mongo.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
})

afterAll(() => {
  mongoose.disconnect()
})

describe('POST /auth/login', () => {
  beforeEach(async () => {
    await User.create(user1)
  })

  afterEach(async () => {
    await User.deleteOne({
      username: 'testy'
    })
  })

  it('works', (done) => {
    request(app()).post('/')
      .send(user1)
      .expect('Content-Type', /json/)
      .expect(JSON.stringify(user1))
      .expect(200, done)
  })

  it('doesn\'t recognize the username', (done) => {
    request(app()).post('/')
      .send({
        username: 'nottesty',
        password: '654321'
      })
      .expect('Unauthorized')
      .expect(401, done)
  })

  it('doesn\'t recognize the password', (done) => {
    request(app()).post('/')
      .send({
        username: 'testy',
        password: 'nottherightpasswordeh'
      })
      .expect('Unauthorized')
      .expect(401, done)
  })
})
