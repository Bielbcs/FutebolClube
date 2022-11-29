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
  it('Should be able to Login with corrects credentials', async () => {
    const response: Response = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin'
    })

    expect(response.status).to.be.eq(200);
  });

  it("Shouldn't be able to Login with incorrects credentials", async () => {
    const response: Response = await chai.request(app).post('/login').send({
      email: 'invalid@email.com',
      password: '123456'
    });

    expect(response.status).to.be.eq(401);
    expect(response.body.message).to.be.eq('Incorrect email or password');
  });

  it('Should return error if one credential dont be sended', async () => {
    const response: Response = await chai.request(app).post('/login').send({
      email: 'invalid@email.com'
    });

    expect(response.status).to.be.eq(400);
    expect(response.body.message).to.be.eq('All fields must be filled');
  });

  it('Should be able to validate the login with correct token', async () => {
    const { body: {token} } = await chai.request(app).post('/login').send({
      email: 'admin@admin.com',
      password: 'secret_admin'
    })

    const response = await chai.request(app).get('/login/validate')
    .set('authorization', token);

    expect(response.status).to.be.eq(200);
    expect(response.body.role).to.be.eq('admin');
  });

  it("Should't be able to validate the login with incorrect token", async () => {
    const response = await chai.request(app).get('/login/validate')
    .set('authorization', 'wrong');

    expect(response.status).to.be.eq(404);
    expect(response.body.message).to.be.eq('jwt malformed');
  });
});
