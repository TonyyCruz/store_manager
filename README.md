<h1 align="center">Projeto Store Manager</h1>
<p align="center">Desenvolvimento de uma API utilizando a arquitetura MSC (model-service-controller)</p>


### 📃 Sobre o Projeto

---

<p align="center">A API desenvolvida é um sistema de gerenciamento de vendas no formato dropshipping em que será possível criar, visualizar, deletar e atualizar produtos e vendas. A API é <b>RESTful</b> e a gestão de dados é feita com o <b>MySQL</b>.
</p>

<p align="center">Utilize os caminhos</p>

- GET `/products` ou `/sales` para receber todos os produtos ou vendas.

- GET `/products/:id` ou `/sales/:id` para receber de acordo com o id.

- GET `/products/search?q=<busca>` para buscar produto por palavra chave.

- DELETE `/products/:id` ou `/sales/:id` para deletar de acordo com o id.

- PUT `/products/:id` para atualizar o nome do produto.
```jsx
  body
  {
    "name": "ProductName"
  }
```

- PUT `/sales/:id` para atualizar a venda.
```jsx
  body
  [
    {
      "productId": 1,
      "quantity":1
    },
  ]
```

---

### 🛠 Tecnologias e Bibliotecas utilizadas no desenvolvimento do projeto

- **[Node.js](https://nodejs.org/en/)**

- **[MySQL](https://www.mysql.com/products/workbench/)**

- **[Mysql2](https://www.npmjs.com/package/mysql2)**

- **[Express](http://expressjs.com/pt-br/)**

- **[Nodemon](https://www.npmjs.com/package/nodemon)**


---

### 🚀 Como executar o projeto

_Pré-requisitos_

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com),
[Node.js](https://nodejs.org/en/).

É recomendado utilizar algum cliente HTTP, como [Postman](https://www.postman.com/) ou o [Insomnia](https://insomnia.rest/download).

Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

---

_1- Clonar o repositorio_

```jsx
git clone git@github.com:TonyyCruz/store_manager.git
```

---


<details>
  <summary><strong>:whale: Rodando no Docker</strong></summary><br />
  
  ## Com Docker
 
 
_Rode o serviço `node` com o comando_

```jsx
docker-compose up -d
```

- Esse serviço irá inicializar dois containers chamados `store_manager e store_manager_db`, respectivamente.
  - A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.

_Via CLI use o comando_
```jsx
docker exec -it store_manager bash
```
- Ele te dará acesso ao terminal interativo do container store_manager(node) criado pelo compose, que está rodando em segundo plano.

_Instale as dependências `dentro do container` com_

```jsx
npm install
```

⚠️Atenção: Caso opte por utilizar o Docker, TODOS os scripts disponíveis no package.json devem ser executados DENTRO do container, ou seja, no terminal que aparece após a execução do comando docker exec.
  
  </details>
  
---
  
<details>
  <summary><strong>:computer: Rodando Localmente</strong></summary><br />
 
 _Instale as dependências com o comando_
 
 ```jsx
npm install
```
- Para rodar o projeto desta forma, **obrigatoriamente** você deve ter o `node` instalado em seu computador.
  - Recomenda-se a versão `^16`
  
 ⚠️Atenção: Não esqueça de renomear/configurar o arquivo .env.example
</details>

---


### 💡 Scripts prontos
<details>
  <summary><strong>Scripts</strong></summary><br />

  - Criar o banco de dados e gerar as tabelas:
  ```sh
    npm run migration
  ```

  - Limpar e popular o banco de dados:
  ```sh
    npm run seed
  ```

  - Iniciar o servidor Node:
  ```sh
    npm start
  ```

  - Iniciar o servidor Node com nodemon:
  ```sh
    npm run dev
  ```

  - Executar os testes de unidade:
  ```sh
    npm run test:mocha
  ```

  <br />
</details>

---
