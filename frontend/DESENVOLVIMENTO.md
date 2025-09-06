# 🚀 Guia de Desenvolvimento - Frontend PrimeHomes

## 📊 Dados de Demonstração

Este frontend está configurado com **dados mockados** para que você possa ver como funciona antes de implementar o backend. 

### 🏠 Dados Disponíveis

- **8 imóveis** de exemplo (apartamentos, casas, lofts)
- **8 cidades** (São Paulo, Rio, BH, Curitiba, etc.)
- **31 bairros** distribuídos pelas cidades
- **7 interesses** de clientes simulados

### 🔐 Login do Painel Admin

Para acessar `/admin/dashboard`, use:
- **E-mail**: `admin@primehomes.com.br`
- **Senha**: `123456`

## 🎯 Como Funciona

### Site Público (`/`)
- ✅ Listagem de imóveis funcionando
- ✅ Filtros por cidade, bairro, tipo, preço, quartos
- ✅ Modal de interesse (dados são logados no console)
- ✅ Estados de loading e empty

### Painel Admin (`/admin/dashboard`)
- ✅ Login simulado
- ✅ Dashboard com estatísticas
- ✅ Lista de imóveis
- ✅ Lista de interesses dos clientes
- ⚠️ CRUD de imóveis (apenas visual, sem persistência)

## 🔧 Transição para Backend Real

### 1. Localização dos Dados Mockados
```
frontend/src/data/mockData.js
```

### 2. Stores com Lógica Híbrida
- `frontend/src/stores/properties.js` - Site público
- `frontend/src/stores/admin.js` - Painel administrativo

### 3. Padrão de Implementação

Cada função tem esta estrutura:

```javascript
async function fetchProperties() {
  try {
    // MODO DESENVOLVIMENTO: Usando dados mockados
    await simulateApiDelay(600)
    properties.value = mockProperties
    
    /* CÓDIGO PARA PRODUÇÃO:
    const response = await fetch(`${API_BASE_URL}/properties`)
    if (!response.ok) throw new Error('Erro ao carregar imóveis')
    const data = await response.json()
    properties.value = data.properties || []
    */
  } catch (err) {
    // tratamento de erro...
  }
}
```

### 4. Migração Step-by-Step

#### Passo 1: Configure o Backend
1. Implemente as APIs REST conforme especificado em `/backend/EXERCICIO_BACKEND.md`
2. Execute o servidor em `http://localhost:3000`

#### Passo 2: Migre as Stores
1. Abra cada store (`properties.js` e `admin.js`)
2. Para cada função:
   - Descomente o bloco `/* CÓDIGO PARA PRODUÇÃO: */`
   - Comente ou remova o bloco `// MODO DESENVOLVIMENTO:`
3. Teste cada endpoint individualmente

#### Passo 3: Remova Dados Mockados (Opcional)
1. Remova a importação: `import { mockData... } from '@/data/mockData'`
2. Delete o arquivo: `frontend/src/data/mockData.js`

## 📋 Checklist de Migração

### Site Público
- [ ] `GET /api/properties` - Listar imóveis
- [ ] `GET /api/cities` - Listar cidades  
- [ ] `GET /api/neighborhoods?cityId=X` - Listar bairros
- [ ] `POST /api/properties/:id/interests` - Enviar interesse

### Painel Admin  
- [ ] `POST /api/admin/login` - Autenticação
- [ ] `GET /api/admin/properties` - Listar imóveis (admin)
- [ ] `POST /api/admin/properties` - Criar imóvel
- [ ] `PUT /api/admin/properties/:id` - Editar imóvel
- [ ] `DELETE /api/admin/properties/:id` - Excluir imóvel
- [ ] `GET /api/admin/interests` - Listar interesses
- [ ] `GET /api/admin/cities` - Listar cidades (admin)
- [ ] `POST /api/admin/cities` - Criar cidade
- [ ] `GET /api/admin/neighborhoods` - Listar bairros (admin)  
- [ ] `POST /api/admin/neighborhoods` - Criar bairro

## 🎨 Recursos Visuais Inclusos

- **Imagens**: URLs do Unsplash para demonstração
- **Ícones**: Emojis para compatibilidade universal  
- **Loading states**: Spinners e mensagens
- **Empty states**: Ícones e mensagens amigáveis
- **Responsivo**: Layout adaptável mobile/desktop

## 🐛 Debug e Desenvolvimento

### Console do Navegador
- Interesses enviados são logados no console
- Filtros aplicados são visíveis na URL
- Erros de rede aparecem no console

### DevTools Vue
- Estados da Pinia são inspecionáveis
- Componentes têm nomes claros
- Props e emits documentados

### Hot Reload
```bash
npm run dev
```
Qualquer mudança é refletida imediatamente.

## 📱 Teste a Interface

### Fluxo Público
1. Acesse `http://localhost:5173`
2. Use os filtros (cidade → bairro)
3. Clique em "Tenho Interesse"
4. Preencha o formulário

### Fluxo Admin  
1. Acesse `http://localhost:5173/admin/login`
2. Login: `admin@primehomes.com.br` / `123456`
3. Navegue pelo dashboard
4. Teste os formulários de imóvel

## 🎯 Próximos Passos

1. **Implemente o backend** seguindo `EXERCICIO_BACKEND.md`
2. **Teste cada endpoint** com Postman/Insomnia
3. **Migre as stores** função por função
4. **Adicione funcionalidades**: upload de imagens, paginação, etc.

---

**Boa sorte com o desenvolvimento!** 🚀

*A interface está pronta e funcionando. Agora é só conectar com seus dados reais!*