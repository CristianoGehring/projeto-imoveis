// Dados de exemplo para desenvolvimento - substituir por API real

export const mockCities = [
  { id: 1, name: 'São Paulo' },
  { id: 2, name: 'Rio de Janeiro' },
  { id: 3, name: 'Belo Horizonte' },
  { id: 4, name: 'Curitiba' },
  { id: 5, name: 'Porto Alegre' },
  { id: 6, name: 'Salvador' },
  { id: 7, name: 'Brasília' },
  { id: 8, name: 'Fortaleza' }
]

export const mockNeighborhoods = [
  // São Paulo
  { id: 1, name: 'Vila Madalena', cityId: 1 },
  { id: 2, name: 'Pinheiros', cityId: 1 },
  { id: 3, name: 'Jardins', cityId: 1 },
  { id: 4, name: 'Moema', cityId: 1 },
  { id: 5, name: 'Brooklin', cityId: 1 },
  { id: 6, name: 'Itaim Bibi', cityId: 1 },
  
  // Rio de Janeiro
  { id: 7, name: 'Copacabana', cityId: 2 },
  { id: 8, name: 'Ipanema', cityId: 2 },
  { id: 9, name: 'Leblon', cityId: 2 },
  { id: 10, name: 'Botafogo', cityId: 2 },
  { id: 11, name: 'Tijuca', cityId: 2 },
  
  // Belo Horizonte
  { id: 12, name: 'Savassi', cityId: 3 },
  { id: 13, name: 'Funcionários', cityId: 3 },
  { id: 14, name: 'Lourdes', cityId: 3 },
  { id: 15, name: 'Centro', cityId: 3 },
  
  // Curitiba
  { id: 16, name: 'Batel', cityId: 4 },
  { id: 17, name: 'Água Verde', cityId: 4 },
  { id: 18, name: 'Centro', cityId: 4 },
  { id: 19, name: 'Bigorrilho', cityId: 4 },
  
  // Porto Alegre
  { id: 20, name: 'Moinhos de Vento', cityId: 5 },
  { id: 21, name: 'Auxiliadora', cityId: 5 },
  { id: 22, name: 'Petrópolis', cityId: 5 },
  
  // Salvador
  { id: 23, name: 'Barra', cityId: 6 },
  { id: 24, name: 'Ondina', cityId: 6 },
  { id: 25, name: 'Pituba', cityId: 6 },
  
  // Brasília
  { id: 26, name: 'Asa Sul', cityId: 7 },
  { id: 27, name: 'Asa Norte', cityId: 7 },
  { id: 28, name: 'Lago Sul', cityId: 7 },
  
  // Fortaleza
  { id: 29, name: 'Aldeota', cityId: 8 },
  { id: 30, name: 'Meireles', cityId: 8 },
  { id: 31, name: 'Cocó', cityId: 8 }
]

export const mockProperties = [
  {
    id: 1,
    title: 'Apartamento Moderno na Vila Madalena',
    description: 'Apartamento completamente reformado com acabamentos de primeira linha. Possui sala ampla com sacada, cozinha planejada, 2 dormitórios sendo 1 suíte, e 1 vaga na garagem. Prédio com portaria 24h, salão de festas e academia.',
    price: 850000,
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    parkingSpaces: 1,
    type: 'compra',
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop'
    ],
    features: ['Portaria 24h', 'Academia', 'Salão de Festas', 'Sacada', 'Cozinha Planejada', 'Armários Embutidos'],
    available: true,
    cityId: 1,
    neighborhoodId: 1,
    city: { id: 1, name: 'São Paulo' },
    neighborhood: { id: 1, name: 'Vila Madalena' },
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: 2,
    title: 'Casa de Luxo em Ipanema',
    description: 'Casa de alto padrão a 2 quadras da praia. 4 suítes, sala de estar, jantar, varanda gourmet, piscina e churrasqueira. Área de lazer completa. Localização privilegiada próximo ao metrô.',
    price: 12000,
    bedrooms: 4,
    bathrooms: 5,
    area: 280,
    parkingSpaces: 2,
    type: 'aluguel',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop'
    ],
    features: ['Piscina', 'Churrasqueira', 'Varanda Gourmet', 'Próximo à Praia', '4 Suítes', 'Área de Lazer'],
    available: true,
    cityId: 2,
    neighborhoodId: 8,
    city: { id: 2, name: 'Rio de Janeiro' },
    neighborhood: { id: 8, name: 'Ipanema' },
    createdAt: '2024-01-14T14:30:00Z'
  },
  {
    id: 3,
    title: 'Studio Compacto em Pinheiros',
    description: 'Studio bem localizado, ideal para jovens profissionais. Ambiente integrado otimizado, cozinha americana, banheiro completo. Prédio novo com coworking, bike space e rooftop.',
    price: 450000,
    bedrooms: 1,
    bathrooms: 1,
    area: 35,
    parkingSpaces: 1,
    type: 'compra',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop'
    ],
    features: ['Coworking', 'Bike Space', 'Rooftop', 'Cozinha Americana', 'Prédio Novo', 'Bem Localizado'],
    available: true,
    cityId: 1,
    neighborhoodId: 2,
    city: { id: 1, name: 'São Paulo' },
    neighborhood: { id: 2, name: 'Pinheiros' },
    createdAt: '2024-01-13T09:15:00Z'
  },
  {
    id: 4,
    title: 'Cobertura Duplex nos Jardins',
    description: 'Cobertura exclusiva com terraço de 200m². Living integrado, lavabo social, 3 suítes, escritório, cozinha gourmet e área de serviço. Vista panorâmica da cidade. 2 vagas cobertas.',
    price: 2800000,
    bedrooms: 3,
    bathrooms: 4,
    area: 350,
    parkingSpaces: 2,
    type: 'compra',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop'
    ],
    features: ['Terraço 200m²', 'Vista Panorâmica', 'Cozinha Gourmet', 'Escritório', 'Duplex', '2 Vagas Cobertas'],
    available: true,
    cityId: 1,
    neighborhoodId: 3,
    city: { id: 1, name: 'São Paulo' },
    neighborhood: { id: 3, name: 'Jardins' },
    createdAt: '2024-01-12T16:45:00Z'
  },
  {
    id: 5,
    title: 'Apartamento Familiar em Copacabana',
    description: 'Apartamento clássico a 1 quadra da praia. 3 quartos, 2 banheiros, sala ampla com varanda e vista parcial para o mar. Cozinha e área de serviço. Portaria 24h.',
    price: 4500,
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    parkingSpaces: 0,
    type: 'aluguel',
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
    ],
    features: ['Vista Parcial Mar', 'Próximo à Praia', 'Portaria 24h', 'Varanda', 'Apartamento Clássico', '1 Quadra da Praia'],
    available: true,
    cityId: 2,
    neighborhoodId: 7,
    city: { id: 2, name: 'Rio de Janeiro' },
    neighborhood: { id: 7, name: 'Copacabana' },
    createdAt: '2024-01-11T11:20:00Z'
  },
  {
    id: 6,
    title: 'Loft Industrial no Batel',
    description: 'Loft diferenciado com pé-direito duplo, estilo industrial. Mezanino com quarto, banheiro com hidro, cozinha integrada. Condomínio com academia e espaço gourmet.',
    price: 680000,
    bedrooms: 1,
    bathrooms: 1,
    area: 75,
    parkingSpaces: 1,
    type: 'compra',
    image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop'
    ],
    features: ['Pé-direito Duplo', 'Estilo Industrial', 'Mezanino', 'Hidromassagem', 'Academia', 'Espaço Gourmet'],
    available: true,
    cityId: 4,
    neighborhoodId: 16,
    city: { id: 4, name: 'Curitiba' },
    neighborhood: { id: 16, name: 'Batel' },
    createdAt: '2024-01-10T13:10:00Z'
  },
  {
    id: 7,
    title: 'Casa de Condomínio em Moema',
    description: 'Casa térrea em condomínio fechado. 3 suítes, sala de TV, living, cozinha gourmet, área de lazer com piscina. Segurança 24h, playground, quadra de tênis.',
    price: 8500,
    bedrooms: 3,
    bathrooms: 3,
    area: 220,
    parkingSpaces: 2,
    type: 'aluguel',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop'
    ],
    features: ['Condomínio Fechado', 'Piscina', 'Playground', 'Quadra de Tênis', 'Segurança 24h', 'Cozinha Gourmet'],
    available: false,
    cityId: 1,
    neighborhoodId: 4,
    city: { id: 1, name: 'São Paulo' },
    neighborhood: { id: 4, name: 'Moema' },
    createdAt: '2024-01-09T08:30:00Z'
  },
  {
    id: 8,
    title: 'Apartamento Novo no Savassi',
    description: 'Apartamento novo, nunca habitado. 2 suítes, sala integrada com cozinha, lavabo, varanda gourmet. Prédio com piscina, sauna, espaço fitness e salão de festas.',
    price: 750000,
    bedrooms: 2,
    bathrooms: 3,
    area: 95,
    parkingSpaces: 2,
    type: 'compra',
    image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=400&h=300&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1615873968403-89e068629265?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop'
    ],
    features: ['Apartamento Novo', 'Nunca Habitado', 'Piscina', 'Sauna', 'Espaço Fitness', 'Varanda Gourmet'],
    available: true,
    cityId: 3,
    neighborhoodId: 12,
    city: { id: 3, name: 'Belo Horizonte' },
    neighborhood: { id: 12, name: 'Savassi' },
    createdAt: '2024-01-08T15:45:00Z'
  }
]

export const mockInterests = [
  {
    id: 1,
    name: 'Marina Silva Santos',
    email: 'marina.santos@email.com',
    phone: '(11) 99876-5432',
    message: 'Olá! Tenho muito interesse neste apartamento. Gostaria de agendar uma visita para esta semana se possível. Sou executiva e trabalho na região.',
    propertyId: 1,
    property: {
      id: 1,
      title: 'Apartamento Moderno na Vila Madalena',
      image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop',
      price: 850000,
      city: { name: 'São Paulo' },
      neighborhood: { name: 'Vila Madalena' }
    },
    createdAt: '2024-01-15T16:30:00Z'
  },
  {
    id: 2,
    name: 'Carlos Eduardo Lima',
    email: 'carlos.lima@empresa.com.br',
    phone: '(21) 98765-4321',
    message: 'Interesse na casa de Ipanema para locação. Tenho referências comerciais e posso apresentar comprovantes de renda. Quando podemos conversar?',
    propertyId: 2,
    property: {
      id: 2,
      title: 'Casa de Luxo em Ipanema',
      image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=300&fit=crop',
      price: 12000,
      city: { name: 'Rio de Janeiro' },
      neighborhood: { name: 'Ipanema' }
    },
    createdAt: '2024-01-15T14:20:00Z'
  },
  {
    id: 3,
    name: 'Ana Paula Rodrigues',
    email: 'ana.rodrigues@gmail.com',
    phone: '(11) 97654-3210',
    message: 'Oi! Estou procurando um studio para comprar como investimento. Este em Pinheiros me interessou muito. Aceita financiamento bancário?',
    propertyId: 3,
    property: {
      id: 3,
      title: 'Studio Compacto em Pinheiros',
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop',
      price: 450000,
      city: { name: 'São Paulo' },
      neighborhood: { name: 'Pinheiros' }
    },
    createdAt: '2024-01-15T11:45:00Z'
  },
  {
    id: 4,
    name: 'Roberto Mendes',
    email: 'roberto.mendes@hotmail.com',
    phone: '(11) 96543-2109',
    message: 'Cobertura nos Jardins - exatamente o que estava procurando! Gostaria de uma visita ainda hoje se possível. Compra à vista.',
    propertyId: 4,
    property: {
      id: 4,
      title: 'Cobertura Duplex nos Jardins',
      image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
      price: 2800000,
      city: { name: 'São Paulo' },
      neighborhood: { name: 'Jardins' }
    },
    createdAt: '2024-01-14T19:10:00Z'
  },
  {
    id: 5,
    name: 'Fernanda Costa',
    email: 'fe.costa@outlook.com',
    phone: '(21) 95432-1098',
    message: 'Apartamento em Copacabana para minha filha que vai estudar na UFRJ. Ela pode visitar amanhã?',
    propertyId: 5,
    property: {
      id: 5,
      title: 'Apartamento Familiar em Copacabana',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop',
      price: 4500,
      city: { name: 'Rio de Janeiro' },
      neighborhood: { name: 'Copacabana' }
    },
    createdAt: '2024-01-14T13:25:00Z'
  },
  {
    id: 6,
    name: 'João Victor Almeida',
    email: 'jv.almeida@tech.com',
    phone: '(41) 94321-0987',
    message: 'Loft no Batel é perfeito para mim! Sou desenvolvedor e trabalho home office. Podemos negociar?',
    propertyId: 6,
    property: {
      id: 6,
      title: 'Loft Industrial no Batel',
      image: 'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop',
      price: 680000,
      city: { name: 'Curitiba' },
      neighborhood: { name: 'Batel' }
    },
    createdAt: '2024-01-13T17:50:00Z'
  },
  {
    id: 7,
    name: 'Luciana Pereira',
    email: 'luciana.pereira@advocacia.com.br',
    phone: '(31) 93210-9876',
    message: 'Interessada no apartamento no Savassi. Estou me mudando para BH a trabalho. Aceita pets?',
    propertyId: 8,
    property: {
      id: 8,
      title: 'Apartamento Novo no Savassi',
      image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?w=400&h=300&fit=crop',
      price: 750000,
      city: { name: 'Belo Horizonte' },
      neighborhood: { name: 'Savassi' }
    },
    createdAt: '2024-01-13T10:15:00Z'
  }
]

// Dados de usuário admin para exemplo
export const mockAdminUser = {
  id: 1,
  name: 'Administrador PrimeHomes',
  email: 'admin@primehomes.com.br'
}

// Função para simular delay da API
export const simulateApiDelay = (ms = 800) => {
  return new Promise(resolve => setTimeout(resolve, ms))
}