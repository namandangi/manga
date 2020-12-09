/* eslint-disable no-unused-vars */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const Manga = require('../models/manga');
const server = require('../app');

const should = chai.should();
chai.use(chaiHttp);

xdescribe('Mangas', () => {
  Manga.collection.drop();
  beforeEach(async (done) => {
    const newManga = new Manga({
      title: 'The God of High School',
      name: 'the-god-of-high-school',
    });
    await newManga.save();
    done();
  });
  afterEach((done) => {
    Manga.collection.drop();
    done();
  });
});

xdescribe('Manga', () => {
  xit('should get all recently-updated mangas', async () => {
    chai
      .request(server)
      .get('/api/mangas')
      .end((err, response) => {
        response.should.have.a.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body[0].should.have.property('title');
        response.body[0].should.have.property('name');
        response.body[0].should.have.property('mangaUrl');
        response.body[0].should.have.property('imgUrl');
        response.body[0].should.have.property('rating');
        response.body[0].should.have.property('release');
        response.body[0].should.have.property('status');
        response.body[0].should.have.property('author');
        response.body[0].should.have.property('genre');
        response.body[0].should.have.property('chapter');
      });
  });
});
