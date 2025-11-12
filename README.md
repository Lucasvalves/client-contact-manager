# ConnectCRM

Sistema completo de gerenciamento de clientes e contatos, desenvolvido com Node.js, React e TypeScript, aplicando arquitetura em camadas e boas práticas de desenvolvimento.
O projeto tem como objetivo demonstrar a capacidade de implementação de um CRUD completo com autenticação, associação entre entidades e geração de relatórios.

## Tecnologias Utilizadas

### Backend

- **Node.js** + **Express**
- **TypeScript**
- **Prisma ORM**
- **SQLite (banco local)**
- **JWT (autenticação)**
- **bcrypt (criptografia)**
- **CORS (controle de acesso)**

### Frontend

- **React** + **Vite**
- **TypeScript**
- **React Router DOM**
- **TailwindCSS + shadcn/ui**
- **React Hook Form + Zod (validação)**
- **Axios + SWR**
- **jsPDF (relatórios em PDF)**
- **Notistack (notificações)**

## Estrutura do Projeto

```
connect-crm/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   └── src/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── routes/
│       ├── middleware/
│       ├── interfaces/
│       └── server.ts
│
└── frontend/
    └── src/
        ├── api/
        ├── components/
        │   └── ui/
        ├── contexts/
        ├── pages/
        ├── services/
        └── interfaces/
```

## Modelo de Dados

O sistema utiliza os seguintes modelos principais:

- **User**: Usuários do sistema (autenticação)
- **Customer**: Clientes cadastrados
- **CustomerEmail**: E-mails dos clientes (relação 1:N)
- **CustomerPhone**: Telefones dos clientes (relação 1:N)
- **Contact**: Contatos vinculados aos clientes
- **ContactEmail**: E-mails dos contatos (relação 1:N)
- **ContactPhone**: Telefones dos contatos (relação 1:N)

## Pré-requisitos

- **Node.js versão 18+**
- **npm** ou **yarn**
- **Git**

## Instalação e Configuração

### 1. Clone o repositório:

```bash
git clone git@github.com:Lucasvalves/connect-crm.git
cd connect-crm
```

### 2. Configuração do Backend

```bash
cd backend
npm install
```

Crie um arquivo `.env`:

```env
DATABASE_URL="file:./prisma/dev.db"
JWT_SECRET="seu-secret-jwt-aqui"
PORT=3333
```

Execute as migrações do Prisma:

```bash
npx prisma migrate dev
```

Inicie o servidor:

```bash
npm run dev
```

Servidor ficará disponível em `http://localhost:3333`

### 3. Configuração do Frontend

```bash
cd ../frontend
npm install
```

Crie o arquivo .env:

```env
VITE_API_URL=http://localhost:3333
```

Execute o frontend:

```bash
npm run dev
```

A aplicação estará acessível em `http://localhost:5173`.

## Funcionalidades

### Autenticação

- Registro e login de usuários
- Geração e validação de token JWT
- Proteção de rotas autenticadas

### Clientes

- CRUD completo de clientes
- Múltiplos e-mails e telefones por cliente
- Associação com contatos

### Contatos

- CRUD completo de contatos
- Vínculo direto com o cliente associado
- Múltiplos e-mails e telefones por contato

### Relatórios

- Listagem consolidada de clientes e seus contatos
- Geração de relatórios em PDF

## Endpoints da API

### Autenticação

```
POST   /auth/register    -> Registrar novo usuário
POST   /auth/login       -> Fazer login
```

### Clientes

```
GET    /customers        -> Listar todos os clientes
GET    /customers/:id    -> Obter cliente específico
POST   /customers        -> Criar novo cliente
PUT    /customers/:id    -> Atualizar cliente
DELETE /customers/:id    -> Deletar cliente
```

### Contatos

```
GET    /contacts         -> Listar todos os contatos
GET    /contacts/:id     -> Obter contato específico
POST   /contacts         -> Criar novo contato vinculado a cliente
PUT    /contacts/:id     -> Atualizar contato
DELETE /contacts/:id     -> Deletar contato
```

**Observação:** As rotas de clientes e contatos exigem autenticação via JWT no header: `Authorization: Bearer <token>`

## Arquitetura

O projeto segue uma arquitetura em camadas:

### Backend

- **Controllers**: Recebem requisições HTTP e delegam para services
- **Services**: Contêm a lógica de negócio
- **Repositories**: Abstraem o acesso ao banco de dados
- **Routes**: Definem os endpoints da API
- **Middleware**: Interceptam requisições (autenticação, validação)

### Frontend

- **Pages**: Páginas principais da aplicação
- **Components**: Componentes reutilizáveis
- **Services**: Comunicação com a API
- **Contexts**: Gerenciamento de estado global (Auth)
- **Hooks**: Lógica reutilizável
