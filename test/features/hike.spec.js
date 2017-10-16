const expect = require('expect');
const should = require('should');
const request = require('supertest');

const helpers = require('../helpers');
const app = require('../../app');
const Hike = require('../../models/hike');

describe('Hike', () => {
     it('User can create a new hike', async () => {
        const hikeParams = {
             name: 'Wilson',
            distance: '50 km',
            location: 'Cochin',
            weather: 'Good',
        };
    
        const hike = await Hike.create(hikeParams);
        const res = await request(app)
          .get('/hikes')
          .send()
          .expect(200);
        res.text.should.match(/Wilson/);
        res.text.should.match(/Cochin/);
        res.text.should.match(/Good/);
      });    
});