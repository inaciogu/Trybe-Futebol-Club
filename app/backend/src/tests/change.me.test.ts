import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import * as jwt from 'jsonwebtoken';

import { app } from '../app';
import User from '../database/models/create-user';
import Clubs from '../database/models/clubs';
import Matchs from '../database/models/matchs';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

let chaiHttpResponse: Response;

describe('Testes da rota de Login', () => {
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

    describe('Quando os dados não estão corretos', () => {
      const mockedUser = {
        id: 1,
        username: 'joao123',
        role: 'brabo',
        email: 'joao@hotmail.com',
        password: 'senha123'
      }
      const mockedReturn = null;

      before(async () => {
        sinon.stub(User, "findOne").resolves(mockedReturn);
        chaiHttpResponse = await chai.request(app)
          .post('/login')
          .send({ email: mockedUser.email, password: 'aaksdjhas3123' })
      })

      after(() => {
        (User.findOne as sinon.SinonStub).restore();
      })

      it('Retorna o status esperado', () => {
        expect(chaiHttpResponse).to.have.status(401);
      })

      it('Retorna uma mensagem de erro', () => {
        expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'User does not exist' })
      });
    });
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

describe('Testes da rota "/login/validate"', () => {
  describe('Em caso de erro', () => {
    describe('Quando o token não existe', () => {
      before(async () => {
        chaiHttpResponse = await chai.request(app)
          .get('/login/validate')
      })

      it('Retorna o status esperado', () => {
        expect(chaiHttpResponse).to.have.status(401);
      })

      it('Retorna uma mensagem de erro', () => {
        expect(chaiHttpResponse.body).to.be.deep.equal({ error: 'token not found' })
      });
    });

    describe('Quando o usuário não existe', () => {
      const mockedUser = {
        data: {
          id: 1,
          username: 'joao',
          role: 'admin',
          email: 'joao@hotmail.com'
        }
      }
      before(async () => {
        sinon.stub(jwt, "verify").resolves(mockedUser);
        sinon.stub(User, "findOne").resolves(null);
        chaiHttpResponse = await chai.request(app)
          .get('/login/validate')
          .set('Authorization', 'token');
      });

      after(() => {
        (jwt.verify as sinon.SinonStub).restore();
        (User.findOne as sinon.SinonStub).restore();
      });

      it('Retorna uma mensagem de erro', () => {
        expect(chaiHttpResponse.body).to.be.deep.equal({ error: 'User not found' })
      })
    });
  })

  describe('Em caso de sucesso', () => {
    const mockedUser = {
      data: {
        id: 1,
        username: 'joao',
        role: 'admin',
        email: 'joao@hotmail.com'
      }
    }

    before(async () => {
      sinon.stub(jwt, "verify").resolves(mockedUser);
      sinon.stub(User, "findOne").resolves(mockedUser.data as User);
      chaiHttpResponse = await chai.request(app)
        .get('/login/validate')
        .set('Authorization', 'token')
    });

    after(() => {
      (jwt.verify as sinon.SinonStub).restore();
      (User.findOne as sinon.SinonStub).restore();
    });

    it('Retorna status 200', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });
  });
});

describe('Testes da rota "/clubs"', () => {
  describe('Em caso de sucesso', () => {
    const mockedClubs = [
      {
        "id": 1,
        "clubName": "Avaí/Kindermann"
      },
      {
        "id": 2,
        "clubName": "Bahia"
      },
      {
        "id": 3,
        "clubName": "Botafogo"
      },
    ]

    before(async () => {
      sinon.stub(Clubs, "findAll").resolves(mockedClubs as Clubs[]);
      chaiHttpResponse = await chai.request(app)
        .get('/clubs')
    });

    after(() => {
      (Clubs.findAll as sinon.SinonStub).restore();
    });

    it('Retorna um status 200', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('Retorna um array com os objetos esperados', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal(mockedClubs);
    });
  });
});

describe('Testes da rota "/clubs/:id"', () => {
  describe('Em caso de sucesso', () => {
    const mockedClub = {
      id: 5,
      clubName: 'avai'
    };

    before(async () => {
      sinon.stub(Clubs, "findByPk").resolves(mockedClub as Clubs);
      chaiHttpResponse = await chai.request(app)
        .get(`/clubs/:id`)
    });

    after(() => {
      (Clubs.findByPk as sinon.SinonStub).restore();
    });

    it('Retorna um status 200', () => {
      expect(chaiHttpResponse).to.have.status(200);
    });

    it('Retorna um Club', () => {
      expect(chaiHttpResponse.body).to.be.deep.equal(mockedClub);
    });
  });
});

describe('Testes da rota "/matchs"', () => {
  describe('Em caso de sucesso', () => {
    const mockedMatches = [
      {
        "id": 1,
        "homeTeam": 16,
        "homeTeamGoals": 1,
        "awayTeam": 8,
        "awayTeamGoals": 1,
        "inProgress": false,
        "homeClub": {
          "clubName": "São Paulo"
        },
        "awayClub": {
          "clubName": "Grêmio"
        }
      },
      {
        "id": 41,
        "homeTeam": 16,
        "homeTeamGoals": 2,
        "awayTeam": 9,
        "awayTeamGoals": 0,
        "inProgress": true,
        "homeClub": {
          "clubName": "São Paulo"
        },
        "awayClub": {
          "clubName": "Internacional"
        }
      }
    ]

    /* before(async () => {
      sinon.stub(Matchs, "findAll").resolves(mockedMatches as Matchs[]);
    }); */
  });
})
