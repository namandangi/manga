/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const { expect } = require('chai');
const { dbConnection } = require('../config/db');
const Manga = require('../models/manga');
const User = require('../models/user');
const server = require('../app');

const should = chai.should();
chai.use(chaiHttp);

describe('UserDB Connection', async () => {
  before(async () => {
    await dbConnection();
  });

  beforeEach(async () => {
    await Manga.deleteMany({});
    await User.deleteMany({});
    const newManga = new Manga({
      title: 'The God of High School',
      name: 'the-god-of-high-school',
    });
    await newManga.save();
    const newUser = new User({
      username: 'namandangi',
      password: 'password',
    });
    await newUser.save();
  });

  afterEach(async () => {
    await Manga.deleteMany({});
    await User.deleteMany({});
  });

  describe('User', async () => {
    it('should throw an error for an existing user', async () => {
      chai
        .request(server)
        .post('/api/mangas/user/register')
        .send({ username: 'namandangi', password: 'password' })
        .end((err, response) => {
          response.should.have.a.status(400);
          response.should.be.json;
          expect(response.body)
            .to.be.an('object')
            .to.include({ msg: 'User already exists!' });
        });
    });

    it('should register a new user', async () => {
      chai
        .request(server)
        .post('/api/mangas/user/register')
        .send({ username: 'test', password: 'password' })
        .end((err, response) => {
          response.should.have.a.status(201);
          response.should.be.json;
          response.body.doc.should.have.property('username');
          response.body.doc.should.have.property('password');
          response.body.doc.should.have.property('subscribedMangas');
          response.body.doc.should.have.property('likedChapters');
          response.body.doc.should.have.property('genres');
          response.body.should.have.property('token');
        });
    });

    it('should throw an error for login using an unregistered username', async () => {
      chai
        .request(server)
        .post('/api/mangas/user/login')
        .send({ username: 'test', password: 'password' })
        .end((err, response) => {
          response.should.have.a.status(401);
          response.should.be.json;
          expect(response.body)
            .to.be.an('object')
            .to.include({ msg: 'User not found' });
        });
    });

    it('should login an existing user', async () => {
      chai
        .request(server)
        .post('/api/mangas/user/login')
        .send({ username: 'namandangi', password: 'password' })
        .end((err, response) => {
          response.should.have.a.status(201);
          response.should.be.json;
          response.body.user.should.have.property('username');
          response.body.user.should.have.property('password');
          response.body.user.should.have.property('subscribedMangas');
          response.body.user.should.have.property('likedChapters');
          response.body.user.should.have.property('genres');
          response.body.should.have.property('token');
        });
    });

    it('should get a user', async () => {
      chai
        .request(server)
        .get('/api/mangas/user/get/namandangi')
        .send({ username: 'namandangi', password: 'password' })
        .end((err, response) => {
          response.should.have.a.status(200);
          response.should.be.json;
          response.body.should.have.property('username');
          response.body.should.have.property('password');
          response.body.should.have.property('subscribedMangas');
          response.body.should.have.property('likedChapters');
          response.body.should.have.property('genres');
        });
    });

    it('should delete a user', async () => {
      const doc = await chai
        .request(server)
        .post('/api/mangas/user/register')
        .send({ username: 'test', password: 'password' });
      const { token } = doc.body;
      chai
        .request(server)
        .delete('/api/mangas/user/delete/test')
        .set('Authorization', `Bearer ${token}`)
        .send()
        .end((err, response) => {
          response.should.have.a.status(200);
          response.should.be.json;
          expect(response.body).to.be.an('object').to.include({ msg: 'ok' });
        });
    });
  });
});
