import { Product } from '../types/types';

export const products: Product[] = [
  // --- COMBOS & KITS (3 items) ---
  {
    id: 'combo-1',
    name: 'Kit Esquenta Absolut',
    price: 160.00,
    category: 'Combos & Kits',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=400&h=400&fit=crop',
    description: '1x Vodka Absolut 1L\n4x Red Bull 250ml\n1x Gelo 5kg',
    badge: '🔥 Sugestão'
  },
  {
    id: 'combo-2',
    name: 'Kit Churrasco Econômico',
    price: 95.00,
    category: 'Combos & Kits',
    image: 'https://images.unsplash.com/photo-1535958636474-b021ee887b13?w=400&h=400&fit=crop',
    description: '2x Pack Heineken (12un)\n1x Saco Carvão 3kg',
    badge: '💰 Economia'
  },
  {
    id: 'combo-3',
    name: 'Kit Gin Tônica',
    price: 140.00,
    category: 'Combos & Kits',
    image: 'https://images.unsplash.com/photo-1609951651556-5334e2706168?w=400&h=400&fit=crop',
    description: '1x Tanqueray\n4x Tônicas\n1x Especiarias',
    badge: '⭐ Premium'
  },

  // --- CERVEJAS (12 items) ---
  {
    id: 'beer-1',
    name: 'Heineken Long Neck 330ml',
    price: 7.50,
    category: 'Cervejas',
    image: '/images/heineken_long_neck_1766181156470.png',
    description: 'A clássica verdinha, sempre gelada.',
    badge: '🔥 Mais Vendido'
  },
  {
    id: 'beer-2',
    name: 'Heineken Lata 350ml',
    price: 5.50,
    category: 'Cervejas',
    image: '/images/heineken_lata_1766181170372.png'
  },
  {
    id: 'beer-3',
    name: 'Heineken 600ml',
    price: 14.00,
    category: 'Cervejas',
    image: '/images/heineken_600ml_1766181186399.png'
  },
  {
    id: 'beer-4',
    name: 'Brahma Duplo Malte Lata 350ml',
    price: 4.20,
    category: 'Cervejas',
    image: '/images/brahma_duplo_malte_lata_1766181202274.png'
  },
  {
    id: 'beer-5',
    name: 'Brahma Duplo Malte 600ml',
    price: 10.00,
    category: 'Cervejas',
    image: '/images/brahma_duplo_malte_600ml_1766181215293.png'
  },
  {
    id: 'beer-6',
    name: 'Stella Artois Long Neck 330ml',
    price: 6.50,
    category: 'Cervejas',
    image: '/images/stella_artois_1766181237001.png'
  },
  {
    id: 'beer-7',
    name: 'Spaten Long Neck 330ml',
    price: 6.00,
    category: 'Cervejas',
    image: '/images/spaten_beer_1766181250518.png',
    badge: '❄️ Gelada'
  },
  {
    id: 'beer-8',
    name: 'Corona Extra 330ml',
    price: 7.90,
    category: 'Cervejas',
    image: '/images/corona_extra_1766181264428.png'
  },
  {
    id: 'beer-9',
    name: 'Budweiser Long Neck 330ml',
    price: 5.50,
    category: 'Cervejas',
    image: '/images/budweiser_beer_1766181278606.png'
  },
  {
    id: 'beer-10',
    name: 'Amstel Lata 350ml',
    price: 4.00,
    category: 'Cervejas',
    image: '/images/amstel_lata_1766181292810.png'
  },
  {
    id: 'beer-11',
    name: 'Skol Beats Senses 269ml',
    price: 11.00,
    category: 'Cervejas',
    image: '/images/skol_beats_senses_1766181316627.png'
  },
  {
    id: 'beer-12',
    name: 'Skol Beats GT 269ml',
    price: 11.00,
    category: 'Cervejas',
    image: '/images/skol_beats_gt_1766181331234.png'
  },

  // --- VINHOS (10 items) ---
  {
    id: 'wine-1',
    name: 'Pérgola Tinto Suave',
    price: 25.00,
    category: 'Vinhos',
    image: '/images/vinho_tinto_suave_1766181346413.png',
    description: 'Vinho tinto de mesa suave.'
  },
  {
    id: 'wine-2',
    name: 'Pérgola Tinto Seco',
    price: 25.00,
    category: 'Vinhos',
    image: '/images/vinho_tinto_seco_1766181364567.png',
    description: 'Vinho tinto de mesa seco.'
  },
  {
    id: 'wine-3',
    name: 'Sangue de Boi Tinto',
    price: 22.00,
    category: 'Vinhos',
    image: '/images/sangue_de_boi_1766181380082.png'
  },
  {
    id: 'wine-4',
    name: 'Casillero del Diablo Cabernet',
    price: 55.00,
    category: 'Vinhos',
    image: '/images/casillero_del_diablo_1766181406918.png',
    description: 'Cabernet Sauvignon Seco.'
  },
  {
    id: 'wine-5',
    name: 'Concha y Toro Reservado',
    price: 35.00,
    category: 'Vinhos',
    image: '/images/concha_y_toro_1766181422240.png',
    description: 'Carmenere de alta qualidade.'
  },
  {
    id: 'wine-6',
    name: 'Reservado Chardonnay',
    price: 35.00,
    category: 'Vinhos',
    image: '/images/reservado_chardonnay_1766181436351.png',
    description: 'Vinho branco Chardonnay seco.'
  },
  {
    id: 'wine-7',
    name: 'Vinho Rosé Piscine',
    price: 110.00,
    category: 'Vinhos',
    image: '/images/vinho_rose_piscine_1766181450996.png',
    description: 'Francês, ideal com gelo.'
  },
  {
    id: 'wine-8',
    name: 'Quinta do Morgado Tinto',
    price: 18.00,
    category: 'Vinhos',
    image: '/images/quinta_do_morgado_tinto_1766181464672.png'
  },
  {
    id: 'wine-9',
    name: 'Quinta do Morgado Branco',
    price: 18.00,
    category: 'Vinhos',
    image: '/images/quinta_morgado_branco_1766181490928.png'
  },
  {
    id: 'wine-10',
    name: 'Salton Moscatel Espumante',
    price: 45.00,
    category: 'Vinhos',
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?w=400&h=400&fit=crop'
  },

  // --- DESTILADOS (10 items) ---
  {
    id: 'spirit-1',
    name: 'Vodka Absolut 1L',
    price: 95.00,
    category: 'Destilados',
    image: '/images/vodka_absolut_1766062849693.png',
    description: 'Vodka sueca pura e icônica.'
  },
  {
    id: 'spirit-2',
    name: 'Vodka Smirnoff 1L',
    price: 45.00,
    category: 'Destilados',
    image: '/images/vodka_smirnoff_1766062864267.png'
  },
  {
    id: 'spirit-3',
    name: 'Whisky Red Label 1L',
    price: 90.00,
    category: 'Destilados',
    image: '/images/whisky_red_label_1766062879052.png',
    badge: '📉 Oferta'
  },
  {
    id: 'spirit-4',
    name: 'Whisky Black Label 1L',
    price: 165.00,
    category: 'Destilados',
    image: '/images/whisky_black_label_1766062912200.png'
  },
  {
    id: 'spirit-5',
    name: 'Whisky Jack Daniels 1L',
    price: 145.00,
    category: 'Destilados',
    image: '/images/whisky_jack_daniels_1766062926153.png'
  },
  {
    id: 'spirit-6',
    name: 'Whisky Old Parr 12 Anos',
    price: 155.00,
    category: 'Destilados',
    image: '/images/whisky_old_parr_1766062940192.png'
  },
  {
    id: 'spirit-7',
    name: 'Whisky Chivas Regal 12 Anos',
    price: 150.00,
    category: 'Destilados',
    image: '/images/whisky_chivas_1766062954592.png'
  },
  {
    id: 'spirit-8',
    name: 'Gin Tanqueray 750ml',
    price: 120.00,
    category: 'Destilados',
    image: '/images/gin_tanqueray_1766062969760.png'
  },
  {
    id: 'spirit-9',
    name: 'Cachaça 51 965ml',
    price: 15.00,
    category: 'Destilados',
    image: 'https://images.unsplash.com/photo-1598018553943-93659c48ef8d?w=400&h=400&fit=crop'
  },
  {
    id: 'spirit-10',
    name: 'Gin Bombay Sapphire',
    price: 135.00,
    category: 'Destilados',
    image: 'https://images.unsplash.com/photo-1606767444459-2a2c94e0d0e2?w=400&h=400&fit=crop'
  },

  // --- REFRIGERANTES (8 items) ---
  {
    id: 'soda-1',
    name: 'Coca-Cola 2L',
    price: 12.00,
    category: 'Refrigerantes',
    image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=400&fit=crop'
  },
  {
    id: 'soda-2',
    name: 'Coca-Cola Zero 2L',
    price: 12.00,
    category: 'Refrigerantes',
    image: 'https://images.unsplash.com/photo-1624552184280-9e9631bbeee9?w=400&h=400&fit=crop'
  },
  {
    id: 'soda-3',
    name: 'Guaraná Antarctica 2L',
    price: 10.00,
    category: 'Refrigerantes',
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&h=400&fit=crop'
  },
  {
    id: 'soda-4',
    name: 'Guaraná Antarctica Zero 2L',
    price: 10.00,
    category: 'Refrigerantes',
    image: 'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?w=400&h=400&fit=crop'
  },
  {
    id: 'soda-5',
    name: 'Fanta Laranja 2L',
    price: 10.00,
    category: 'Refrigerantes',
    image: 'https://images.unsplash.com/photo-1624517452488-04869289c4ca?w=400&h=400&fit=crop'
  },
  {
    id: 'soda-6',
    name: 'Fanta Uva 2L',
    price: 10.00,
    category: 'Refrigerantes',
    image: 'https://images.unsplash.com/photo-1632818924360-68d4994cfdb2?w=400&h=400&fit=crop'
  },
  {
    id: 'soda-7',
    name: 'Sprite 2L',
    price: 10.00,
    category: 'Refrigerantes',
    image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=400&h=400&fit=crop'
  },
  {
    id: 'soda-8',
    name: 'Schweppes Citrus 350ml',
    price: 6.00,
    category: 'Refrigerantes',
    image: 'https://images.unsplash.com/photo-1581006852262-e4307cf6283a?w=400&h=400&fit=crop'
  },

  // --- ENERGÉTICOS (5 items) ---
  {
    id: 'energy-1',
    name: 'Red Bull Tradicional 250ml',
    price: 12.00,
    category: 'Energéticos',
    image: '/images/redbull_tradicional_1766062550119.png'
  },
  {
    id: 'energy-2',
    name: 'Red Bull Tropical 250ml',
    price: 12.00,
    category: 'Energéticos',
    image: '/images/redbull_tropical_1766062479393.png'
  },
  {
    id: 'energy-3',
    name: 'Red Bull Melancia 250ml',
    price: 12.00,
    category: 'Energéticos',
    image: '/images/redbull_melancia_1766062493813.png'
  },
  {
    id: 'energy-4',
    name: 'Red Bull Sugarfree 250ml',
    price: 12.00,
    category: 'Energéticos',
    image: '/images/redbull_sugarfree_1766062509038.png'
  },
  {
    id: 'energy-5',
    name: 'Monster Energy 473ml',
    price: 10.00,
    category: 'Energéticos',
    image: '/images/monster_energy_1766062523699.png'
  },

  // --- GELO (5 items) ---
  {
    id: 'ice-1',
    name: 'Gelo Cubo 5kg',
    price: 15.00,
    category: 'Gelo',
    image: '/images/gelo_cubo_1766062565561.png',
    description: 'Gelo de água mineral filtrada.'
  },
  {
    id: 'ice-2',
    name: 'Gelo Escama 10kg',
    price: 18.00,
    category: 'Gelo',
    image: '/images/gelo_escama_1766062579940.png'
  },
  {
    id: 'ice-3',
    name: 'Gelo Saborizado Coco',
    price: 5.00,
    category: 'Gelo',
    image: '/images/gelo_coco_1766062593050.png',
    description: 'Perfeito para drinks com Gin.'
  },
  {
    id: 'ice-4',
    name: 'Gelo Saborizado Morango',
    price: 5.00,
    category: 'Gelo',
    image: '/images/gelo_morango_1766062608057.png'
  },
  {
    id: 'ice-5',
    name: 'Gelo Saborizado Maçã Verde',
    price: 5.00,
    category: 'Gelo',
    image: '/images/gelo_maca_verde_1766062637146.png'
  }
];
