import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Seu teste', () => {
  it('Should be able get all teams', async () => {
    const response: Response = await chai.request(app).get('/teams');

    expect(response.status).to.be.eq(200);
  });

  it('Should be able get a team by id', async () => {
    const response: Response = await chai.request(app).get('/teams/4');

    expect(response.status).to.be.eq(200);
  });
});
