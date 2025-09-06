# Cards para Trello - Backend da Imobiliária

## 📋 FASE 1: CONFIGURAÇÃO INICIAL

### Card 1: Configuração do Ambiente
**Descrição:** Configurar ambiente de desenvolvimento do backend
**Checklist:**
- [ ] Escolher tecnologia (Node.js/Python/Java/PHP/.NET)
- [ ] Configurar estrutura inicial do projeto
- [ ] Instalar dependências necessárias
- [ ] Configurar servidor web
- [ ] Testar servidor básico funcionando

**Labels:** Setup, Configuração
**Prazo:** 2 dias

---

### Card 2: Configuração do Banco de Dados
**Descrição:** Configurar e modelar banco de dados
**Checklist:**
- [ ] Escolher SGBD (MySQL/PostgreSQL/MongoDB)
- [ ] Instalar e configurar banco
- [ ] Criar database para o projeto
- [ ] Configurar conexão no backend
- [ ] Testar conectividade

**Labels:** Database, Setup
**Prazo:** 1 dia

---

## 🗃️ FASE 2: MODELAGEM DE DADOS

### Card 3: Criar Tabela Cities
**Descrição:** Implementar tabela de cidades
**Checklist:**
- [ ] Criar tabela `cities` com campos: id, name, created_at, updated_at
- [ ] Inserir dados das 8 cidades do mock
- [ ] Criar índices necessários
- [ ] Testar inserção e consulta

**Labels:** Database, Modelagem
**Prazo:** 0.5 dia

---

### Card 4: Criar Tabela Neighborhoods
**Descrição:** Implementar tabela de bairros
**Checklist:**
- [ ] Criar tabela `neighborhoods` com campos: id, name, city_id, created_at, updated_at
- [ ] Configurar foreign key para cities
- [ ] Inserir dados dos 31 bairros do mock
- [ ] Testar relacionamento com cities

**Labels:** Database, Modelagem
**Prazo:** 0.5 dia

---

### Card 5: Criar Tabela Properties
**Descrição:** Implementar tabela principal de imóveis
**Checklist:**
- [ ] Criar tabela `properties` com todos os campos necessários
- [ ] Configurar foreign keys para cities e neighborhoods
- [ ] Inserir dados dos 8 imóveis do mock
- [ ] Criar índices para otimização de consultas

**Labels:** Database, Modelagem, Core
**Prazo:** 1 dia

---

### Card 6: Criar Tabela Interests
**Descrição:** Implementar tabela de interesses de clientes
**Checklist:**
- [ ] Criar tabela `interests` com dados do cliente e imóvel
- [ ] Configurar foreign key para properties
- [ ] Inserir dados dos 7 interesses do mock
- [ ] Testar relacionamento com properties

**Labels:** Database, Modelagem
**Prazo:** 0.5 dia

---

### Card 7: Criar Tabela Admin Users
**Descrição:** Implementar tabela de usuários administrativos
**Checklist:**
- [ ] Criar tabela `admin_users` para autenticação
- [ ] Implementar hash de senhas
- [ ] Inserir usuário admin padrão (admin@primehomes.com.br)
- [ ] Testar criação e validação de usuários

**Labels:** Database, Auth, Modelagem
**Prazo:** 1 dia

---

## 🔐 FASE 3: AUTENTICAÇÃO

### Card 8: Sistema de Login Admin
**Descrição:** Implementar autenticação JWT para admin
**Checklist:**
- [ ] Criar endpoint POST /api/admin/login
- [ ] Validar email e senha
- [ ] Gerar token JWT
- [ ] Implementar middleware de autenticação
- [ ] Testar login com dados do frontend

**Labels:** Auth, API, Core
**Prazo:** 2 dias

---

### Card 9: Middleware de Proteção
**Descrição:** Criar middleware para proteger rotas admin
**Checklist:**
- [ ] Implementar verificação de token JWT
- [ ] Validar expiração do token
- [ ] Extrair dados do usuário do token
- [ ] Aplicar em todas as rotas protegidas
- [ ] Testar acesso negado sem token

**Labels:** Auth, Middleware, Security
**Prazo:** 1 dia

---

## 🏠 FASE 4: API DE IMÓVEIS (PÚBLICO)

### Card 10: Listar Imóveis Públicos
**Descrição:** Endpoint para listagem pública de imóveis
**Checklist:**
- [ ] Criar GET /api/properties
- [ ] Implementar filtros (cidade, bairro, tipo, preço, quartos)
- [ ] Incluir dados relacionados (city, neighborhood)
- [ ] Implementar paginação
- [ ] Testar todos os filtros

**Labels:** API, Properties, Core
**Prazo:** 2 dias

---

### Card 11: Detalhes do Imóvel
**Descrição:** Endpoint para visualizar imóvel específico
**Checklist:**
- [ ] Criar GET /api/properties/:id
- [ ] Retornar dados completos do imóvel
- [ ] Incluir todas as imagens e características
- [ ] Tratar erro 404 para imóvel não encontrado
- [ ] Testar com IDs válidos e inválidos

**Labels:** API, Properties
**Prazo:** 1 dia

---

### Card 12: Listar Cidades e Bairros
**Descrição:** Endpoints para popular filtros do frontend
**Checklist:**
- [ ] Criar GET /api/cities
- [ ] Criar GET /api/cities/:id/neighborhoods
- [ ] Otimizar consultas com relacionamentos
- [ ] Testar retorno de dados corretos

**Labels:** API, Filters
**Prazo:** 1 dia

---

### Card 13: Registrar Interesse
**Descrição:** Endpoint para clientes manifestarem interesse
**Checklist:**
- [ ] Criar POST /api/interests
- [ ] Validar dados do formulário (nome, email, telefone, mensagem)
- [ ] Associar interesse ao imóvel
- [ ] Implementar validação de email
- [ ] Testar criação de interesse

**Labels:** API, Interests, Core
**Prazo:** 1.5 dias

---

## ⚙️ FASE 5: API ADMINISTRATIVA

### Card 14: CRUD Completo de Imóveis
**Descrição:** Operações administrativas para imóveis
**Checklist:**
- [ ] GET /api/admin/properties (listar com paginação)
- [ ] POST /api/admin/properties (criar)
- [ ] GET /api/admin/properties/:id (detalhar)
- [ ] PUT /api/admin/properties/:id (editar)
- [ ] DELETE /api/admin/properties/:id (excluir)
- [ ] Validar todos os campos obrigatórios
- [ ] Testar todas as operações

**Labels:** API, Admin, CRUD, Core
**Prazo:** 3 dias

---

### Card 15: Gerenciar Interesses
**Descrição:** Visualização administrativa de interesses
**Checklist:**
- [ ] GET /api/admin/interests (listar todos)
- [ ] GET /api/admin/interests/:id (detalhar)
- [ ] PUT /api/admin/interests/:id/status (marcar como contatado)
- [ ] Incluir dados do imóvel relacionado
- [ ] Implementar filtros por status

**Labels:** API, Admin, Interests
**Prazo:** 2 dias

---

### Card 16: Dashboard Administrativo
**Descrição:** Endpoints para estatísticas do dashboard
**Checklist:**
- [ ] GET /api/admin/stats/overview (totais gerais)
- [ ] Contar imóveis por tipo e status
- [ ] Contar interesses por período
- [ ] Calcular valor médio dos imóveis
- [ ] Listar atividades recentes

**Labels:** API, Admin, Dashboard
**Prazo:** 1.5 dias

---

### Card 17: Gerenciar Cidades e Bairros
**Descrição:** CRUD administrativo para localidades
**Checklist:**
- [ ] POST /api/admin/cities (criar cidade)
- [ ] POST /api/admin/neighborhoods (criar bairro)
- [ ] Validar dados de entrada
- [ ] Verificar duplicatas
- [ ] Testar criação via interface admin

**Labels:** API, Admin, Locations
**Prazo:** 1.5 dias

---

## 🔒 FASE 6: SEGURANÇA E VALIDAÇÃO

### Card 18: Validação de Dados
**Descrição:** Implementar validação robusta em todos os endpoints
**Checklist:**
- [ ] Validar tipos de dados
- [ ] Sanitizar inputs para prevenir XSS
- [ ] Validar formato de email e telefone
- [ ] Implementar rate limiting
- [ ] Validar tamanho máximo de uploads

**Labels:** Security, Validation
**Prazo:** 2 dias

---

### Card 19: Tratamento de Erros
**Descrição:** Padronizar respostas de erro da API
**Checklist:**
- [ ] Criar middleware de tratamento de erros
- [ ] Padronizar formato de resposta de erro
- [ ] Implementar logs de erro
- [ ] Tratar erros de validação
- [ ] Tratar erros de banco de dados

**Labels:** Error Handling, API
**Prazo:** 1 dia

---

## 📤 FASE 7: UPLOAD E STORAGE

### Card 20: Upload de Imagens
**Descrição:** Sistema para upload de fotos dos imóveis
**Checklist:**
- [ ] Implementar POST /api/admin/properties/:id/images
- [ ] Validar tipos de arquivo (JPEG, PNG)
- [ ] Redimensionar imagens automaticamente
- [ ] Salvar múltiplas imagens por imóvel
- [ ] DELETE /api/admin/properties/:id/images/:imageId

**Labels:** Upload, Images, Storage
**Prazo:** 3 dias

---

## 🧪 FASE 8: TESTES E DEPLOY

### Card 21: Testes da API
**Descrição:** Criar testes automatizados
**Checklist:**
- [ ] Configurar ambiente de testes
- [ ] Testar todos os endpoints públicos
- [ ] Testar autenticação admin
- [ ] Testar validações e tratamento de erros
- [ ] Implementar testes de integração

**Labels:** Testing, Quality
**Prazo:** 3 dias

---

### Card 22: Documentação da API
**Descrição:** Documentar todos os endpoints
**Checklist:**
- [ ] Criar documentação Swagger/OpenAPI
- [ ] Documentar parâmetros e responses
- [ ] Incluir exemplos de uso
- [ ] Documentar códigos de erro
- [ ] Criar guia de integração com frontend

**Labels:** Documentation
**Prazo:** 2 dias

---

### Card 23: Deploy e Configuração
**Descrição:** Preparar aplicação para produção
**Checklist:**
- [ ] Configurar variáveis de ambiente
- [ ] Configurar CORS para o frontend
- [ ] Implementar logs de produção
- [ ] Configurar backup automático do banco
- [ ] Testar deploy em ambiente de produção

**Labels:** Deploy, Production
**Prazo:** 2 dias

---

## 📊 RESUMO DO PROJETO

**Total de Cards:** 23
**Prazo Estimado:** 30-35 dias
**Fases:** 8 fases bem definidas
**Pontos Críticos:** Autenticação, CRUD de Imóveis, Upload de Imagens

**Dados para Frontend:**
- Email: admin@primehomes.com.br  
- Senha: 123456
- 8 cidades, 31 bairros, 8 imóveis, 7 interesses

## 🎯 CRITÉRIOS DE AVALIAÇÃO

### Funcionalidades Obrigatórias (70% da nota)
- [ ] Sistema de autenticação JWT funcionando
- [ ] CRUD completo de imóveis na área administrativa
- [ ] Listagem pública de imóveis com filtros
- [ ] Sistema de manifestação de interesse
- [ ] Dashboard com estatísticas básicas

### Qualidade do Código (20% da nota)
- [ ] Código organizado e bem estruturado
- [ ] Tratamento adequado de erros
- [ ] Validação de dados de entrada
- [ ] Seguir padrões REST para API

### Extras (10% da nota)
- [ ] Upload de imagens funcionando
- [ ] Testes automatizados
- [ ] Documentação da API
- [ ] Deploy em produção
- [ ] Melhorias de UX/Performance

## 📝 INSTRUÇÕES PARA O TRELLO

### Configuração das Listas:
1. **📋 Backlog** - Cards ainda não iniciados
2. **🚧 Em Progresso** - Cards sendo desenvolvidos
3. **🧪 Em Teste** - Cards prontos aguardando teste
4. **✅ Concluído** - Cards finalizados
5. **🚫 Bloqueado** - Cards com impedimentos

### Labels Sugeridas:
- 🔴 **Critical** - Funcionalidades essenciais
- 🟡 **Important** - Funcionalidades importantes
- 🟢 **Nice to Have** - Melhorias opcionais
- 🔵 **API** - Desenvolvimento de endpoints
- 🟣 **Database** - Trabalho com banco de dados
- 🟠 **Auth** - Autenticação e segurança

### Power-Ups Recomendados:
- **Calendar** - Para visualizar prazos
- **Burndown Chart** - Para acompanhar progresso
- **Time Tracking** - Para controlar tempo gasto
- **Custom Fields** - Para pontuação/complexidade