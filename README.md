# Boas vindas ao repositório do projeto Trybe Futebol Clube! ⚽️


# Sobre
O projeto foi desenvolvido no ambiente de estudos da Trybe e teve como objetivo desenvolver uma API REST utilizando Node.js, express, sequelizeORM e JWT.
A aplicação foi feita usando o método TDD (Test Driven Development ou desenvolvimento orientado a testes) juntamento com POO (programação orientada a objetos), ela está totalmente dockerizada, tanto no front end quanto no back end, pois é uma aplicação web full stack, onde o front end já havia sido desenvolvido pela Trybe inicialmente. Os testes de integração foram feitos utilizando mocha e chai, e a biblioteca sinon para realizar os mocks das funções e têm uma taxa de cobertura de cerca de 98%. Após finalizar o projeto eu também realizei o deploy dele utilizando a AWS (amazon web service) e o docker-compose para rodar a aplicação na maquina virtual.

# Tecnologias utilizadas
- Node.js
- Express
- JWT
- Sequelize
- MySql
- Docker
- Mocha e Chai
- AWS
- Typescript

# Testes de Integração

![Testes](./test-coverage.png)

# Como rodar o projeto localmente:
  - Faça o clone do repositório na sua maquina (`git clone git@github.com:inaciogu/Trybe-Futebol-Club.git`).
  - Rode o comando `npm install` para instalar as dependências.
    ## Frontend:
    - Entre no diretório "frontend" `cd app/frontend` e execute o comando `npm start` para iniciar o front end da aplicação.
    - Acesse o seu navegador no endereço localhost:3000.

    ## Backend:
    - Mude o nome do arquivo ".env.example" para ".env" e preencha com as informações do seu usuario MySQL
    - Case não tenha o MySql instalado, siga o [Tutorial](https://www.alura.com.br/artigos/mysql-do-download-e-instalacao-ate-sua-primeira-tabela?gclid=Cj0KCQjw06OTBhC_ARIsAAU1yOXB1KimL-aPJ6uv3yx6-rOoWZ5AGiEr4ewdQNHQNuy1IphJU_mO77kaAn3qEALw_wcB)
    - Entre no diretório "backend" `cd app/backend` e execute o comando `npm start` para iniciar o back end da aplicação
    - O backend será iniciado no endereço localhost:3001

# Como acessar a aplicação online
- Acesse o link: [Trybe Futebol Club](http://ec2-15-228-73-111.sa-east-1.compute.amazonaws.com:3000/)

# Exemplo da aplicação rodando na web:
![TFC foto](./front-example.png)
