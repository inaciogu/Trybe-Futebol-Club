import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as jwt from 'jsonwebtoken';

import { app } from '../app';
import User from '../database/models/create-user';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota de Login', () => {
  let chaiHttpResponse: Response;
  describe('Em caso de erro', () => {
    describe('Quando o email é invalido', () => {

      before(async () => {
        chaiHttpResponse = await chai.request(app)
          .post('/login')
          .send({ email: 'asdadada', password: '1266666' })
      });

      it('Retorna um status 401', () => {
        expect(chaiHttpResponse).to.have.status(401);
      });

      it('Retorna o objeto esperado no body', () => {
        expect(chaiHttpResponse.body).to.deep.equal({ "message": "Incorrect email or password" });
      })
    })
    
    describe('Quando a senha é invalida', () => {
      before(async () => {
        chaiHttpResponse = await chai.request(app)
          .post('/login')
          .send({ email: 'joao@hotmail.com', password: '123' })
      });

      it('Retorna um status 401', () => {
        expect(chaiHttpResponse).to.have.status(401);
      });

      it('Retorna o objeto esperado no body', () => {
        expect(chaiHttpResponse.body).to.deep.equal({ "message": "Incorrect email or password" });
      })
    })

    describe('Quando o email não é informado', () => {
      before(async () => {
        chaiHttpResponse = await chai.request(app)
          .post('/login')
          .send({ password: '123' })
      });

      it('Retorna o status esperado', () => {
        expect(chaiHttpResponse).to.have.status(401)
      })
      
      it('Retorna o objeto esperado', () => {
        expect(chaiHttpResponse.body).to.deep.equal({ "message": "All fields must be filled" })
      })
    })

    describe('Quando a senha não é informada', () => {
      before(async () => {
        chaiHttpResponse = await chai.request(app)
          .post('/login')
          .send({ email: 'joao@hotmail.com' })
      });

      it('Retorna um status 401', () => {
        expect(chaiHttpResponse).to.have.status(401)
      })

      it('Retorna o objeto esperado', () => {
        expect(chaiHttpResponse.body).to.deep.equal({ "message": "All fields must be filled" })
      })
    })
  })

  describe('Em caso de sucesso', () => {
    const mockedUser = {
      id: 1,
      username: 'joao123',
      role: 'brabo',
      email: 'joao@hotmail.com',
      password: 'senha123'
    }

    const mockedReturn = {
      user: {
        id: 1,
        username: 'joao123',
        role: 'brabo',
        email: 'joao@hotmail.com',
      },
      token: "123.456.789"
    }

    before(async () => {
      sinon.stub(User, "findOne").resolves(mockedUser as User);
      sinon.stub(jwt, "sign").resolves(mockedReturn.token);
      chaiHttpResponse = await chai.request(app)
        .post('/login')
        .send({ email: mockedUser.email, password: mockedUser.password })
    });

    after(() => {
      (User.findOne as sinon.SinonStub).restore();
      (jwt.sign as sinon.SinonStub).restore();
    })

    it('Retorna o status esperado', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
  })
});
