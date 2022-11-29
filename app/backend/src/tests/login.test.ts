import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import App from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Seu teste', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  // let chaiHttpResponse: Response;

  // before(async () => {
  //   sinon
  //     .stub(Example, "findOne")
  //     .resolves({
  //       ...<Seu mock>
  //     } as Example);
  // });

  // after(()=>{
  //   (Example.findOne as sinon.SinonStub).restore();
  // })

  // it('...', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      ...

  //   expect(...)
  // });

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
});
