var expect = require('chai').expect;
var request = require('supertest');
var app = require('../server');
var db = require('../models');

before(function(done) {
  db.sequelize.sync({ force: true }).then(function() {
    done();
  });
});

describe('Auth Controller', function() {
  describe('GET /signup', function() {
    it('should return a 200 response', function(done) {
      request(app).get('/signup').expect(200, done);
    });
  });

  describe('POST /signup', function() {
    it('should redirect to / on success', function(done) {
      request(app).post('/signup')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        email: 'test@butts.co',
        name: 'Mike Schull',
        password: '123123123'
      })
      .expect('Location', '/')
      .expect(302, done);
    });

    it('should redirect to /signup on failure', function(done) {
      request(app).post('/signup')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        email: 'new',
        name: 'Brian',
        password: 'p'
      })
      .expect('Location', '/signup')
      .expect(302, done);
    });
  });

  describe('GET /login', function() {
    it('should return a 200 response', function(done) {
      request(app).get('/login')
      .expect(200, done);
    });
  });

  describe('POST /login', function() {
    it('should redirect to / on success', function(done) {
      request(app).post('/login')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        email: 'test@butts.co',
        password: '123123123'
      })
      .expect('Location', '/')
      .expect(302, done);
    });

    it('should redirect to /login on failure', function(done) {
      request(app).post('/login')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        email: 'new@new.co',
        password: 'p'
      })
      .expect('Location', '/login')
      .expect(302, done);
    });
  });

  describe('GET /logout', function() {
    it('should redirect to /', function(done) {
      request(app).get('/logout')
      .expect('Location', '/')
      .expect(302, done);
    });
  });
});
