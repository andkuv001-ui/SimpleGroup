export interface FunnelPreset {
  id: 'all' | 'msk' | 'spb';
  label: string;
  period: string;
  views: number;
  viewsDelta: string;
  costPerView: string;
  conversionRate: string;
  contacts: number;
  contactsDelta: string;
  costPerContact: string;
  favorites: number;
  favoritesDelta: string;
  activeListings: number;
  activeListingsDelta: string;
  newListings: number;
  carriedOverListings: number;
  totalSpend: string;
  totalSpendDelta: string;
  listingsSpend: string;
  otherSpend: string;
  phoneViews: number;
  chatMessages: number;
  phoneAndChat: number;
  note: string;
}

export interface CategoryBreakdown {
  id: string;
  name: string;
  skuCount: number;
  views: number;
  contacts: number;
  conversion: string;
  cpl: string;
  avgOrderValue: string;
  buyerProfile: string;
}

export interface GrowthPillar {
  number: string;
  title: string;
  subtitle: string;
  metricValue: string;
  metricContext: string;
  problem: string;
  mechanism: string;
  outcome: string;
  deliverables: string[];
}

export const HERO_IMAGE_PATH = '/assets/images/hero_b2b_packaging_1791210149549.jpg';
export const WAREHOUSE_IMAGE_PATH = '/assets/images/production_flex_film_1791210163468.jpg';

export const FUNNEL_PRESETS: Record<'all' | 'msk' | 'spb', FunnelPreset> = {
  all: {
    id: 'all',
    label: 'Москва + Санкт-Петербург (Сводка)',
    period: '27 авг – 25 сент',
    views: 2240,
    viewsDelta: '↑45,7%',
    costPerView: 'В среднем 2,5 ₽ за просмотр',
    conversionRate: '5,0%',
    contacts: 112,
    contactsDelta: '↑57,7%',
    costPerContact: 'В среднем 49,9 ₽ за контакт',
    favorites: 80,
    favoritesDelta: '↑122,2%',
    activeListings: 384,
    activeListingsDelta: '↑174,3%',
    newListings: 300,
    carriedOverListings: 84,
    totalSpend: '5 588,8 ₽',
    totalSpendDelta: '↑51,6%',
    listingsSpend: '5 589 ₽',
    otherSpend: '0 ₽',
    phoneViews: 18,
    chatMessages: 90,
    phoneAndChat: 4,
    note: 'Реальные данные кабинета Avito Pro (профиль ZipPack) за отчётный цикл 30 дней. Все 100% бюджета направлены исключительно на постинг без платного бустинга X5/X10.'
  },
  msk: {
    id: 'msk',
    label: 'Москва и МО',
    period: '27 авг – 25 сент',
    views: 1490,
    viewsDelta: '↑48,2%',
    costPerView: 'В среднем 2,6 ₽ за просмотр',
    conversionRate: '5,1%',
    contacts: 76,
    contactsDelta: '↑61,7%',
    costPerContact: 'В среднем 50,9 ₽ за контакт',
    favorites: 54,
    favoritesDelta: '↑125,0%',
    activeListings: 248,
    activeListingsDelta: '↑181,8%',
    newListings: 196,
    carriedOverListings: 52,
    totalSpend: '3 868,4 ₽',
    totalSpendDelta: '↑54,1%',
    listingsSpend: '3 868 ₽',
    otherSpend: '0 ₽',
    phoneViews: 12,
    chatMessages: 61,
    phoneAndChat: 3,
    note: 'В Москве и МО основной спрос сформировали селлеры маркетплейсов (Коледино, Электросталь, Подольск) и контрактные фасовочные производства.'
  },
  spb: {
    id: 'spb',
    label: 'Санкт-Петербург и ЛО',
    period: '27 авг – 25 сент',
    views: 750,
    viewsDelta: '↑41,0%',
    costPerView: 'В среднем 2,3 ₽ за просмотр',
    conversionRate: '4,8%',
    contacts: 36,
    contactsDelta: '↑50,0%',
    costPerContact: 'В среднем 47,8 ₽ за контакт',
    favorites: 26,
    favoritesDelta: '↑116,7%',
    activeListings: 136,
    activeListingsDelta: '↑161,5%',
    newListings: 104,
    carriedOverListings: 32,
    totalSpend: '1 720,4 ₽',
    totalSpendDelta: '↑46,2%',
    listingsSpend: '1 721 ₽',
    otherSpend: '0 ₽',
    phoneViews: 6,
    chatMessages: 29,
    phoneAndChat: 1,
    note: 'В Санкт-Петербурге ключевыми заказчиками выступили обжарщики кофе, производители снеков и локальные бренды бытовой химии и косметики.'
  }
};

export const CATEGORY_BREAKDOWN: CategoryBreakdown[] = [
  {
    id: 'doypack',
    name: 'Пакеты Дой-пак (Doy-pack) с замком Zip-Lock',
    skuCount: 142,
    views: 940,
    contacts: 51,
    conversion: '5,4%',
    cpl: '46,2 ₽',
    avgOrderValue: '68 000 ₽',
    buyerProfile: 'Обжарщики кофе, чайные бренды, селлеры WB / Ozon'
  },
  {
    id: 'rollfilm',
    name: 'Гибкая рулонная плёнка (BOPP / PET / PE) под фасовку',
    skuCount: 96,
    views: 580,
    contacts: 28,
    conversion: '4,8%',
    cpl: '52,4 ₽',
    avgOrderValue: '145 000 ₽',
    buyerProfile: 'Пищевые и кондитерские фабрики, контрактное производство'
  },
  {
    id: 'vacuum',
    name: 'Трёхшовные, вакуумные и реторт-пакеты оптом',
    skuCount: 84,
    views: 430,
    contacts: 20,
    conversion: '4,7%',
    cpl: '51,8 ₽',
    avgOrderValue: '74 000 ₽',
    buyerProfile: 'Переработка рыбы и мяса, HoReCa-поставщики, полуфабрикаты'
  },
  {
    id: 'slider',
    name: 'Курьерские и матовые Zip-пакеты с бегунком',
    skuCount: 62,
    views: 290,
    contacts: 13,
    conversion: '4,5%',
    cpl: '54,1 ₽',
    avgOrderValue: '42 000 ₽',
    buyerProfile: 'Швейные цеха, бренды одежды, фулфилмент-операторы'
  }
];

export const GROWTH_PILLARS: GrowthPillar[] = [
  {
    number: '01',
    title: 'Системный масспостинг по товарной матрице',
    subtitle: 'Масштабирование с 84 до 384 активных объявлений (+174,3%)',
    metricValue: '384 объявления',
    metricContext: '300 новых и перевыпущенных · 84 активных с прошлого периода',
    problem:
      'В Точке А на аккаунте размещалось до 80 общих объявлений «Упаковка оптом». Закупщики в B2B ищут конкретный форм-фактор, плотность в микронах, материал (крафт, металлизированный ПЭТ, матовый БОПП) и размер под свой товар.',
    mechanism:
      'Разбили прайс-лист на 384 целевых лота по матрице «Тип пакета × Размер × Назначение × Тираж». Каждое объявление закрывает узкий коммерческий запрос (например: «Пакет дой-пак крафт с окном 150×210 под кофе 250 г оптом»).',
    outcome:
      'Охват поисковой выдачи в Москве и СПб вырос в 2,7 раза без использования платных услуг продвижения (XL, выделение цветом или x10). Весь расход составил 5 588,8 ₽ только за размещение.',
    deliverables: [
      'Декомпозиция ассортимента на 4 продуктовых кластера и 384 карточки',
      'Почасовой график публикации для удержания карточек на первых строках выдачи',
      'Уникализация инфографики с техническими схемами швов и слоёв барьерной плёнки'
    ]
  },
  {
    number: '02',
    title: 'B2B SEO-оптимизация под язык закупщиков и технологов',
    subtitle: 'Снижение средней цены целевого просмотра до 2,5 ₽',
    metricValue: '2,5 ₽ / просмотр',
    metricContext: '2 240 целевых просмотров за 30 дней (↑45,7%)',
    problem:
      'Обычные заголовки привлекали розничных покупателей («купить 50 пакетиков»), которые тратили время менеджеров и не давали оптовой выручки.',
    mechanism:
      'Собрали низко- и среднечастотную B2B-семантику из Avito Аналитики и Wordstat: «дой-пак с зип-замком оптом от 1000 шт», «рулонная плёнка с флексопечатью», «барьерная упаковка под заморозку». Внедрили фильтр-маркеры минимальной партии прямо в заголовки и первые 2 строки описания.',
    outcome:
      'Отсекли 90% нецелевой розницы ещё на этапе превью в выдаче. В карточки переходили только снабженцы, технологи и селлеры маркетплейсов.',
    deliverables: [
      'Кластеризация 120+ оптовых и производственных поисковых ключей',
      'Технические таблицы характеристик (мкм, барьерные слои, объём в мл/г) внутри текста',
      'Рост добавлений в «Избранное» до 80 (+122,2%) — база снабженцев, сравнивающих поставщиков'
    ]
  },
  {
    number: '03',
    title: 'Гео-кластеризация: Москва и Санкт-Петербург',
    subtitle: 'Точечный охват двух главных хабов производства и e-commerce',
    metricValue: '2 мегаполиса',
    metricContext: 'Москва (66% трафика) · Санкт-Петербург (34% трафика)',
    problem:
      'Гибкая упаковка — логистически чувствительный товар. Заказчикам из Москвы и Санкт-Петербурга критичны сроки отгрузки со склада и быстрая доставка образцов на тестовую фасовку.',
    mechanism:
      'Распределили пул из 384 объявлений по ключевым деловым и складским локациям Москвы и Санкт-Петербурга с привязкой к промышленным зонам, фулфилмент-центрам и транспортным терминалам.',
    outcome:
      'Локальная релевантность подняла объявления выше федеральных посредников и дала стабильный поток из 100–150
