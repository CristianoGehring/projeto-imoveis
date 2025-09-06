# Projeto Imobiliária - Exercício de Backend

## 📋 Visão Geral

Este é um exercício prático para desenvolvimento de um sistema backend para uma imobiliária. O frontend já está pronto em Vue.js e você deve implementar a API REST que irá alimentar tanto o site público quanto o painel administrativo.

## 🎯 Objetivos de Aprendizagem

- Desenvolver uma API REST completa
- Implementar autenticação e autorização
- Trabalhar com relacionamentos de banco de dados
- Validação de dados
- Estruturação de projetos backend
- Boas práticas de desenvolvimento

## 🏗️ Estrutura do Projeto

O sistema é composto por dois frontends:

1. **Site Público**: Listagem de imóveis com filtros + formulário de interesse
2. **Painel Admin**: CRUD de imóveis + visualização de interesses

## 📊 Modelagem do Banco de Dados

### Tabelas Principais

#### 1. Cities (Cidades)
```sql
- id (PK, auto increment)
- name (VARCHAR, NOT NULL)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### 2. Neighborhoods (Bairros)
```sql
- id (PK, auto increment)
- name (VARCHAR, NOT NULL)
- city_id (FK para cities.id)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### 3. Properties (Imóveis)
```sql
- id (PK, auto increment)
- title (VARCHAR, NOT NULL)
- description (TEXT, NOT NULL)
- price (DECIMAL(10,2), NOT NULL)
- bedrooms (INT, NOT NULL)
- type (ENUM: 'aluguel', 'compra')
- image (VARCHAR, URL da imagem)
- available (BOOLEAN, DEFAULT true)
- city_id (FK para cities.id)
- neighborhood_id (FK para neighborhoods.id)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### 4. Interests (Interesses)
```sql
- id (PK, auto increment)
- name (VARCHAR, NOT NULL)
- email (VARCHAR, NOT NULL)
- phone (VARCHAR, NOT NULL)
- message (TEXT, NULLABLE)
- property_id (FK para properties.id)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

#### 5. Admin_Users (Usuários Admin)
```sql
- id (PK, auto increment)
- name (VARCHAR, NOT NULL)
- email (VARCHAR, UNIQUE, NOT NULL)
- password (VARCHAR, HASH, NOT NULL)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## 🔗 Endpoints da API

### 📱 APIs Públicas (Site)

#### Imóveis
```
GET /api/properties
- Parâmetros de query: city, neighborhood, type, minPrice, maxPrice, bedrooms
- Resposta: Lista de imóveis com dados da cidade e bairro
```

#### Cidades e Bairros
```
GET /api/cities
- Resposta: Lista de todas as cidades

GET /api/neighborhoods?cityId={id}
- Resposta: Lista de bairros de uma cidade específica
```

#### Interesse
```
POST /api/properties/{id}/interests
- Body: { name, email, phone, message? }
- Resposta: Confirmação de interesse criado
```

### 🔐 APIs Administrativas

#### Autenticação
```
POST /api/admin/login
- Body: { email, password }
- Resposta: { token, user }
```

#### Imóveis (CRUD)
```
GET /api/admin/properties
- Headers: Authorization: Bearer {token}
- Resposta: Lista completa de imóveis

POST /api/admin/properties
- Headers: Authorization: Bearer {token}
- Body: { title, description, price, bedrooms, type, cityId, neighborhoodId, image?, available? }

PUT /api/admin/properties/{id}
- Headers: Authorization: Bearer {token}
- Body: Dados a serem atualizados

DELETE /api/admin/properties/{id}
- Headers: Authorization: Bearer {token}
```

#### Cidades e Bairros (Admin)
```
GET /api/admin/cities
POST /api/admin/cities
- Body: { name }

GET /api/admin/neighborhoods?cityId={id}
POST /api/admin/neighborhoods
- Body: { name, cityId }
```

#### Interesses
```
GET /api/admin/interests
- Headers: Authorization: Bearer {token}
- Resposta: Lista de todos os interesses com dados do imóvel
```

## 📝 Tasks de Implementação

### Fase 1: Configuração Inicial
- [ ] Configurar projeto Node.js com Express
- [ ] Instalar dependências necessárias (express, cors, mysql2, bcryptjs, jsonwebtoken, etc.)
- [ ] Configurar conexão com banco de dados (MySQL)
- [ ] Criar estrutura de pastas organizada
- [ ] Configurar middleware básicos (cors, express.json, helmet)

### Fase 2: Banco de Dados
- [ ] Criar migrations para todas as tabelas
- [ ] Configurar relacionamentos (foreign keys)
- [ ] Criar seeds com dados iniciais
- [ ] Criar um usuário admin padrão

### Fase 3: Modelos e Validações
- [ ] Implementar modelos de dados (usando ORM ou queries SQL)
- [ ] Criar validações para cada entidade
- [ ] Implementar sanitização de dados

### Fase 4: Autenticação
- [ ] Implementar sistema de login para admin
- [ ] Criar middleware de autenticação JWT
- [ ] Hash de senhas com bcrypt
- [ ] Middleware de verificação de token

### Fase 5: APIs Públicas
- [ ] Endpoint para listar imóveis com filtros
- [ ] Endpoint para listar cidades
- [ ] Endpoint para listar bairros por cidade
- [ ] Endpoint para criar interesse em imóvel
- [ ] Validação e sanitização dos dados de interesse

### Fase 6: APIs Administrativas
- [ ] CRUD completo de imóveis
- [ ] Endpoints para criar cidades e bairros
- [ ] Endpoint para listar interesses
- [ ] Proteção de rotas administrativas

### Fase 7: Melhorias e Finalização
- [ ] Tratamento de erros centralizado
- [ ] Logging das operações
- [ ] Validação de tipos de arquivo para imagens
- [ ] Paginação nos endpoints que retornam listas
- [ ] Rate limiting
- [ ] Documentação da API

## 🛠️ Tecnologias

Você pode usar qualquer linguagem e framework de sua escolha para implementar o backend. Alguns exemplos:

- **Node.js**: Express, Fastify, NestJS
- **Python**: Django, Flask, FastAPI
- **Java**: Spring Boot, Quarkus
- **C#**: ASP.NET Core
- **PHP**: Laravel, Symfony
- **Go**: Gin, Fiber, Echo
- **Ruby**: Rails, Sinatra

### Requisitos Técnicos

Independente da tecnologia escolhida, o backend deve implementar:
- API REST com endpoints especificados
- Autenticação JWT para rotas administrativas
- Conexão com banco de dados relacional
- Validação de dados de entrada
- Tratamento de erros HTTP apropriados
- CORS configurado para permitir requisições do frontend

## 📁 Estrutura de Pastas Sugerida

Organize seu projeto de forma clara. Exemplo genérico:

```
backend/
├── src/
│   ├── config/           # Configurações (DB, auth, etc)
│   ├── controllers/      # Controladores das rotas
│   ├── middlewares/      # Middlewares (auth, validação, etc)
│   ├── models/           # Modelos de dados
│   ├── routes/           # Definição das rotas
│   ├── services/         # Lógica de negócio
│   └── main.*            # Arquivo principal
├── migrations/           # Migrations do banco (se usar)
├── seeds/               # Seeds de dados iniciais
├── .env                 # Variáveis de ambiente
└── README.md
```

*Adapte conforme os padrões da sua linguagem/framework escolhido*

## 🔒 Variáveis de Ambiente

Configure as variáveis necessárias para sua aplicação. Exemplo:

```env
PORT=3000
DATABASE_URL=sua_string_de_conexao_do_banco
JWT_SECRET=seu_jwt_secret_muito_seguro_e_longo
```

*Adapte conforme sua tecnologia e banco de dados escolhido*

## ✅ Critérios de Avaliação

### Funcionalidade (40%)
- [ ] Todas as APIs funcionando corretamente
- [ ] Filtros de busca funcionais
- [ ] CRUD completo de imóveis
- [ ] Sistema de autenticação funcionando

### Código (30%)
- [ ] Código limpo e organizado
- [ ] Separação de responsabilidades
- [ ] Uso de middleware apropriados
- [ ] Tratamento de erros adequado

### Segurança (20%)
- [ ] Autenticação JWT implementada
- [ ] Validação de dados de entrada
- [ ] Sanitização contra SQL Injection
- [ ] Proteção de rotas administrativas

### Boas Práticas (10%)
- [ ] Estrutura de pastas organizada
- [ ] Uso de variáveis de ambiente
- [ ] Comentários e documentação
- [ ] Commits organizados

## 🚀 Como Testar

1. Configure o projeto na linguagem escolhida
2. Configure o banco de dados e variáveis de ambiente
3. Execute migrações/criação das tabelas
4. Execute seeds com dados iniciais
5. Inicie o servidor
6. Teste os endpoints com Postman/Insomnia ou ferramenta similar

## 📚 Recursos Úteis

- [JWT.io](https://jwt.io/) - Para entender JWT
- [HTTP Status Codes](https://httpstatuses.com/) - Códigos de resposta HTTP
- [REST API Best Practices](https://restfulapi.net/) - Boas práticas de APIs REST

## 🎯 Desafios Extras (Opcionais)

Para quem quiser ir além:

- [ ] Upload real de imagens (multer + storage)
- [ ] Envio de e-mails automáticos
- [ ] Cache com Redis
- [ ] Testes automatizados
- [ ] Deploy na nuvem
- [ ] Swagger/OpenAPI documentation
- [ ] WebSockets para notificações em tempo real

## ❓ Dúvidas Frequentes

**Q: Posso usar qualquer linguagem?**
A: Sim! Use a linguagem e framework que preferir ou que foi indicado pelo professor.

**Q: Qual banco de dados usar?**
A: Qualquer banco relacional (MySQL, PostgreSQL, SQLite, etc). O importante é manter a estrutura de dados especificada.

**Q: Preciso implementar upload de imagens?**
A: Não é obrigatório. Pode trabalhar apenas com URLs de imagens.

**Q: Como criar o primeiro usuário admin?**
A: Use um seed/migração inicial ou crie um endpoint temporário para cadastro.

**Q: Preciso usar JWT obrigatoriamente?**
A: JWT é recomendado, mas pode usar outro sistema de autenticação desde que funcione com o frontend.

---

**Bom desenvolvimento! 🚀**

*Lembre-se: o importante é praticar e aprender. Não hesite em pesquisar e tirar dúvidas!*