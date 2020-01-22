let User = require('./model');

let user
const validUser = { username: 'user', email: 'a@a.com', password: '123456' }

describe('username', () => {
  beforeEach(async () => {
    //user = await User.create({ username: 'user', email: 'a@a.com', password: '123456' })
    user = { username: 'user', email: 'a@a.com', password: '123456' }
  })

  afterEach(async () => {
    User.deleteOne(user)
  })

  it('too short', () => {
    user.username = 'j';
    return expect(User.create(user)).rejects.toThrow('validation failed')
  })

  it('not contain non-alpha-numerical characters', () => {
    user.username = 'john:doe'
    return expect(User.create(user)).rejects.toThrow('validation failed')
  })
})

describe('password', () => {
  afterEach(async () => {
    User.deleteOne({username:'test'})
  })

  it('hashes the password right', async () => {
    var testPassword = 'AnOutSt4ndingPassw0rd'
    User.create({username:'test', password: testPassword}).then((testUser) => expect(testUser.authenticate(testPassword)).toBe(true))
  })
})
