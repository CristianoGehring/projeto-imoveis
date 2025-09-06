# 🏠 Sistema de Imobiliária - Exercício Prático

## 📋 Sobre o Projeto

Este é um exercício prático completo para desenvolvimento de um sistema de imobiliária, dividido em duas partes:

- **Frontend**: Desenvolvido em Vue.js 3 + Vite (✅ COMPLETO)
- **Backend**: Para ser desenvolvido pelo aluno em Node.js + Express (📝 EXERCÍCIO)

## 🎯 Objetivos Pedagógicos

Este exercício foi criado para praticar:

- **Frontend**: Vue.js 3, Composition API, Pinia, Vue Router
- **Backend**: Node.js, Express, APIs REST, Autenticação JWT
- **Banco de Dados**: Modelagem, relacionamentos, queries
- **Integração**: Frontend ↔ Backend via API REST

## 🏗️ Arquitetura do Sistema

### Frontend (Vue.js) - PRONTO ✅

**Site Público:**
- 🏠 Listagem de imóveis com filtros avançados
- 🔍 Busca por cidade, bairro, tipo, preço, quartos
- 💌 Formulário de interesse no imóvel
- 📱 Design responsivo

**Painel Administrativo:**
- 🔐 Sistema de login
- 📊 Dashboard com estatísticas
- ➕ CRUD completo de imóveis
- 🏙️ Gerenciamento de cidades e bairros
- 📧 Visualização de interesses dos clientes

### Backend - EXERCÍCIO 📝

O aluno deve implementar (em qualquer linguagem):
- API REST completa
- Sistema de autenticação JWT
- CRUD de imóveis, cidades e bairros
- Sistema de interesses
- Validações e segurança

## 📂 Estrutura do Projeto

```
projeto-imoveis/
├── frontend/                 # Vue.js 3 + Vite (PRONTO)
│   ├── src/
│   │   ├── views/           # Páginas
│   │   ├── components/      # Componentes reutilizáveis
│   │   ├── stores/          # Pinia stores
│   │   └── router/          # Vue Router
│   └── package.json
├── backend/                 # Backend em qualquer linguagem (EXERCÍCIO)
│   └── EXERCICIO_BACKEND.md # Instruções detalhadas
└── README.md               # Este arquivo
```

## 🚀 Como Executar o Frontend

```bash
# Navegar para o diretório do frontend
cd frontend

# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Compilar para produção
npm run build
```

O frontend estará disponível em: `http://localhost:5173`

## 📱 Páginas Implementadas

### Site Público
- **Home** (`/`): Listagem de imóveis com filtros

### Painel Administrativo
- **Login** (`/admin/login`): Autenticação
- **Dashboard** (`/admin/dashboard`): Visão geral
- **Imóveis** (`/admin/properties`): Listagem e gerenciamento
- **Novo Imóvel** (`/admin/properties/new`): Cadastro
- **Editar Imóvel** (`/admin/properties/:id/edit`): Edição
- **Interesses** (`/admin/interests`): Visualização de contatos

## 🔗 APIs Esperadas pelo Frontend

O frontend faz requisições para estas URLs:

### APIs Públicas
```
GET /api/properties              # Listar imóveis (com filtros)
GET /api/cities                  # Listar cidades
GET /api/neighborhoods           # Listar bairros por cidade
POST /api/properties/:id/interests # Criar interesse
```

### APIs Admin
```
POST /api/admin/login            # Login
GET /api/admin/properties        # Listar imóveis
POST /api/admin/properties       # Criar imóvel
PUT /api/admin/properties/:id    # Atualizar imóvel
DELETE /api/admin/properties/:id # Excluir imóvel
GET /api/admin/cities            # Listar cidades
POST /api/admin/cities           # Criar cidade
GET /api/admin/neighborhoods     # Listar bairros
POST /api/admin/neighborhoods    # Criar bairro
GET /api/admin/interests         # Listar interesses
```

## 📊 Estrutura de Dados Esperada

### Imóvel (Property)
```json
{
  "id": 1,
  "title": "Apartamento 3 quartos no Centro",
  "description": "Apartamento amplo...",
  "price": 350000.00,
  "bedrooms": 3,
  "type": "compra",
  "image": "https://exemplo.com/imagem.jpg",
  "available": true,
  "city": {
    "id": 1,
    "name": "São Paulo"
  },
  "neighborhood": {
    "id": 1,
    "name": "Centro"
  }
}
```

### Interesse (Interest)
```json
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@email.com",
  "phone": "(11) 99999-9999",
  "message": "Tenho interesse...",
  "property": {
    "id": 1,
    "title": "Apartamento 3 quartos..."
  },
  "createdAt": "2024-01-15T10:30:00Z"
}
```

## 🎨 Funcionalidades do Frontend

### ✅ Implementadas

**Site Público:**
- [x] Hero section com título
- [x] Filtros por tipo, cidade, bairro, quartos, preço
- [x] Grid responsivo de imóveis
- [x] Cards de imóveis com foto, preço, localização
- [x] Modal de interesse com formulário
- [x] Estados de loading e erro
- [x] Formatação de preços em R$

**Painel Admin:**
- [x] Tela de login com validação
- [x] Dashboard com estatísticas
- [x] Lista de imóveis com ações (editar/excluir)
- [x] Formulário de cadastro/edição de imóveis
- [x] Gerenciamento de cidades e bairros
- [x] Lista de interesses com dados de contato
- [x] Botões de ação (email, telefone, WhatsApp)
- [x] Sistema de autenticação com JWT
- [x] Guards de rota para proteção

## 🛠️ Tecnologias Utilizadas (Frontend)

- **Vue.js 3** - Framework reativo
- **Composition API** - API moderna do Vue
- **TypeScript** - Tipagem estática
- **Vite** - Build tool rápido
- **Vue Router** - Roteamento SPA
- **Pinia** - Gerenciamento de estado
- **CSS3** - Estilização customizada
- **Responsive Design** - Layout adaptativo

## 📝 Próximos Passos

1. **Implementar Backend** - Seguir o guia em `backend/EXERCICIO_BACKEND.md`
2. **Testar Integração** - Conectar frontend com backend
3. **Melhorias** - Upload de imagens, notificações, etc.

## 📚 Para o Professor/Instrutor

Este exercício foi projetado para:

- **Nível**: Intermediário a avançado
- **Duração**: 2-4 semanas
- **Pré-requisitos**: JavaScript, Node.js básico, SQL básico
- **Avaliação**: Ver critérios em `EXERCICIO_BACKEND.md`

O frontend está completamente funcional e faz as requisições corretas. O aluno precisa apenas implementar o backend seguindo a especificação.

## 🤝 Contribuição

Este é um projeto educacional. Sugestões de melhorias são bem-vindas!

## 📄 Licença

MIT License - Use livremente para fins educacionais.

---

**Desenvolvido para fins educacionais** 🎓  
*Frontend completo em Vue.js + exercício de Backend em Node.js*