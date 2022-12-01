import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import App from '../app';

import { Response } from 'superagent';

import IMatches from '../interfaces/IMatches';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Seu teste', () => {
  it('Should return all matches', async () => {
    const response: Response = await chai.request(app).get('/matches');

    expect(response.status).to.be.eq(200);
  });

  it('Should return all matches that are not in progress', async () => {
    const res: Response = await chai.request(app).get('/matches/?inProgress=false');

    expect(res.status).to.be.eq(200);
    
    const { body } = res;

    body.forEach((item: IMatches) => {
      expect(item.inProgress).to.be.false;
    })

  });

  it('Should return all in progress matches', async () => {
    const res: Response = await chai.request(app).get('/matches/?inProgress=true');

    expect(res.status).to.be.eq(200);
    
    const { body } = res;

    body.forEach((item: IMatches) => {
      expect(item.inProgress).to.be.true;
    })

  });

  it('Should finish a match', async () => {
    const res: Response = await chai.request(app).patch('/matches/48/finish');

    expect(res.status).to.be.eq(200);
    expect(res.body.message).to.be.eq('Finished');
  });

  it('Should edit a match score', async () => {
    const res: Response = await chai.request(app).patch('/matches/48').send({
      homeTeamGoals: 5, 
      awayTeamGoals: 7
    });

    expect(res.status).to.be.eq(200);
    expect(res.body.message).to.be.eq('updated!');
  });
});
