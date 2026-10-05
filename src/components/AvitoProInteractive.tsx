import React, { useState } from 'react';
import {
  Download,
  ChevronDown,
  Info,
  Check,
  SlidersHorizontal
} from 'lucide-react';
import { FUNNEL_PRESETS, CATEGORY_BREAKDOWN, FunnelPreset } from '../data/caseData';

type TabMode = 'summary' | 'details' | 'expenses';
type GeoFilter = 'all' | 'msk' | 'spb';
type HighlightedMetric = 'views' | 'contacts' | 'favorites' | 'listings' | 'spend' | 'channels';

const METRIC_INSIGHTS: Record<
  HighlightedMetric,
  { title: string; figure: string; analysis: string; takeaway: string }
> = {
  views: {
    title: 'Просмотры карточек (2 240 · ↑45,7%)',
    figure: '2,5 ₽ за просмотр',
    analysis:
      'За счёт точных B2B-заголовков с указанием оптовой партии и размеров в карточки переходили только целевые снабженцы, селлеры маркетплейсов и производства.',
    takeaway: 'Отсечение розницы на уровне поискового сниппета снизило цену целевого контакта.'
  },
  contacts: {
    title: 'Конверсия в контакт (5,0% → 112 лидов)',
    figure: '49,9 ₽ за контакт',
    analysis:
      'В B2B-упаковке средняя конверсия по рынку на Авито составляет 1,8–2,5%. Конверсия 5,0% достигнута за счёт оффера «Расчёт тиража в 3 плотностях за 10 минут + бесплатные образцы».',
    takeaway: 'Рост полученных контактов составил ↑57,7% за один расчётный период.'
  },
  favorites: {
    title: 'Добавления в Избранное (80 · ↑122,2%)',
    figure: '+122,2% прирост базы',
    analysis:
      'В B2B цикл сделки длиннее розничного: закупщики сохраняют проверенные позиции в «Избранное», чтобы вернуться при плановой закупке плёнки или дой-паков в следующем месяце.',
    takeaway: 'Формирует отложенный спрос и доводит общий поток до 100–150 обращений/мес.'
  },
  listings: {
    title: 'Активные объявления (384 · ↑174,3%)',
    figure: '300 новых · 84 с прошлого периода',
    analysis:
      'Товарная матрица разбита по форм-факторам (дой-пак, трёхшовные, вакуумные, рулонная плёнка), материалам (крафт, БОПП, ПЭТ) и объёмам (от 50 г до 5 кг).',
    takeaway: 'Масспостинг занял ключевую полку выдачи в Москве и Санкт-Петербурге без платного продвижения.'
  },
  spend: {
    title: 'Структура расходов (5 588,8 ₽ · ↑51,6%)',
    figure: '0 ₽ на платные услуги продвижения',
    analysis:
      'Вся сумма 5 589 ₽ потрачена исключительно на публикацию 384 целевых объявлений. Платные услуги (XL, выделение, x5/x10) не применялись.',
    takeaway: 'Сверхнизкий CPL (49,9 ₽) при среднем оптовом чеке от 42 000 до 145 000 ₽.'
  },
  channels: {
    title: 'Структура каналов связи (112 контактов)',
    figure: '90 чат · 18 телефон · 4 телефон + чат',
    analysis:
      '83,9% закупщиков предпочитают письменный расчёт в чате Avito: туда удобно сразу скинуть ТЗ, размеры пакета, фото текущей упаковки и реквизиты юрлица для счёта.',
    takeaway: 'Быстрый ответ в чате (до 5 минут) нивелировал отсутствие отзывов (0 ★) на старте.'
  }
};

export const AvitoProInteractive: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabMode>('summary');
  const [geoFilter, setGeoFilter] = useState<GeoFilter>('all');
  const [selectedMetric, setSelectedMetric] = useState<HighlightedMetric>('contacts');
  const [downloaded, setDownloaded] = useState(false);

  const data: FunnelPreset = FUNNEL_PRESETS[geoFilter];
  const activeInsight = METRIC_INSIGHTS[selectedMetric];

  const handleDownloadReport = () => {
    const csvRows = [
      ['Показатель', 'Значение', 'Динамика', 'Комментарий'],
      ['Профиль', 'ZipPack', '0 отзывов на старте', 'B2B Гибкая упаковка'],
      ['Период', data.period, '', data.label],
      ['Просмотры', String(data.views), data.viewsDelta, data.costPerView],
      ['Конверсия в контакт', data.conversionRate, '', 'Воронка продаж Avito Pro'],
      ['Полученные контакты', String(data.contacts), data.contactsDelta, data.costPerContact],
      ['Избранное', String(data.favorites), data.favoritesDelta, 'Отложенный B2B-спрос'],
      ['Активные объявления', String(data.activeListings), data.activeListingsDelta, `Новые: ${data.newListings}, С прошлого периода: ${data.carriedOverListings}`],
      ['Расходы всего', data.totalSpend, data.totalSpendDelta, `На объявления: ${data.listingsSpend}, Другие: ${data.otherSpend}`],
      ['Канал: Посмотрели телефон', String(data.phoneViews), '', 'Прямые звонки в отдел продаж'],
      ['Канал: Написали в чат', String(data.chatMessages), '', 'Запросы расчёта партии в чате'],
      ['Канал: Посмотрели телефон и написали в чат', String(data.phoneAndChat), '', 'Комбинированные обращения']
    ];
    const csvContent =
      '\uFEFF' + csvRows.map((row) => row.map((cell) => `"${cell}"`).join(';')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `avito_pro_zippack_${geoFilter}_27aug_25sep.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Control Bar above the reconstructed cabinet */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="space-y-1">
          <div className="text-xs text-slate-500">
            Верифицированный срез кабинета Avito Pro · Профиль ZipPack · 27 авг – 25 сент
          </div>
          <p className="text-sm text-slate-700">
            Нажмите на любой блок показателей внутри интерфейса Avito Pro, чтобы открыть комментарий маркетолога по механике.
          </p>
        </div>

        {/* Geo Filter Segmented Control (Functional Buttons) */}
        <div className="flex items-center gap-1 p-1 bg-slate-200/70 rounded-lg self-start lg:self-auto">
          <button
            type="button"
            onClick={() => setGeoFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              geoFilter === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Все города (МСК + СПб)
          </button>
          <button
            type="button"
            onClick={() => setGeoFilter('msk')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              geoFilter === 'msk'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Москва
          </button>
          <button
            type="button"
            onClick={() => setGeoFilter('spb')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              geoFilter === 'spb'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Санкт-Петербург
          </button>
        </div>
      </div>

      {/* Main Reconstructed Avito Pro Frame */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        {/* Avito Pro Top Utility Header */}
        <div className="border-b border-slate-100 bg-slate-50/70 px-4 sm:px-6 py-2.5 flex items-center justify-between text-[11px] text-slate-500">
          <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap">
            <span>Для бизнеса</span>
            <span>Карьера в Авито</span>
            <span>Помощь</span>
            <span>Каталоги</span>
            <span>#яПомогаю</span>
          </div>
          <div className="hidden md:flex items-center gap-4 whitespace-nowrap">
            <span className="text-sky-600 font-medium">+ Разместить объявление</span>
            <span>Мои объявления</span>
            <span className="font-medium text-slate-700">ZipPack</span>
          </div>
        </div>

        {/* Avito Pro Brand Subheader */}
        <div className="border-b border-slate-100 px-4 sm:px-6 py-3 flex items-center gap-6 overflow-x-auto">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="inline-flex gap-0.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="w-2 h-2 rounded-full bg-sky-500" />
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="w-2 h-2 rounded-full bg-purple-500" />
            </span>
            <span className="font-display font-bold text-base tracking-tight text-slate-900">
              Avito Pro
            </span>
          </div>
          <div className="flex items-center gap-5 text-xs text-slate-500 whitespace-nowrap">
            <span>Бизнес 360</span>
            <span>Авто</span>
            <span>Недвижимость</span>
            <span>Работа</span>
            <span className="text-slate-900 font-medium">Услуги и B2B</span>
            <span>Ещё</span>
          </div>
        </div>

        {/* Cabinet Body: Left Sidebar + Right Main Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left Sidebar (Replica of ZipPack Avito Pro Sidebar) */}
          <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-slate-100 p-4 sm:p-5 bg-white">
            {/* Profile Lockup */}
            <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center font-display font-bold text-xs shrink-0">
                ZP
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-slate-900 truncate">ZipPack</div>
                <div className="text-[11px] text-slate-500 flex items-center gap-1 font-mono tabular-nums">
                  <span>0</span>
                  <span className="text-amber-500">★</span>
                  <span className="font-sans underline decoration-slate-300">Нет отзывов</span>
                </div>
              </div>
            </div>

            {/* Wallet & Advance mini-boxes */}
            <div className="grid grid-cols-2 gap-2 my-4">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <div className="text-[10px] text-slate-500">Кошелёк</div>
                <div className="text-xs font-mono font-semibold tabular-nums text-slate-900 mt-0.5">
                  0,00 ₽
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">Нет бонусов</div>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                <div className="text-[10px] text-slate-500">Аванс</div>
                <div className="text-xs font-mono font-semibold tabular-nums text-slate-900 mt-0.5">
                  73 ₽
                </div>
                <div className="text-[10px] text-amber-600 mt-0.5 font-mono tabular-nums">
                  ≈ 1 день
                </div>
              </div>
            </div>

            {/* Sidebar Nav Items */}
            <ul className="space-y-2 text-xs text-slate-600 hidden sm:block">
              <li className="py-1 text-slate-500">Главное</li>
              <li className="py-1 text-slate-500">Мои объявления</li>
              <li className="py-1 text-slate-500">Сообщения</li>
              <li className="py-1 text-slate-500">Заказы</li>
              <li className="py-1 text-slate-500">Работа с объявлениями</li>
              <li className="py-1 font-semibold text-slate-900 flex items-center justify-between">
                <span>Аналитика</span>
                <span className="text-[10px] font-mono text-emerald-700">Статистика</span>
              </li>
              <li className="py-1 text-slate-500">Продвижение</li>
              <li className="py-1 text-slate-500">Тариф</li>
              <li className="py-1 text-slate-500">Финансы и отчёты</li>
              <li className="py-1 text-slate-500">Профиль и настройки</li>
            </ul>
          </div>

          {/* Right Main Analytics Viewport */}
          <div className="lg:col-span-9 p-5 sm:p-7 space-y-6">
            {/* Title + Download Report CTA */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="text-xl font-display font-bold text-slate-900">Статистика</h3>
              <button
                type="button"
                onClick={handleDownloadReport}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors whitespace-nowrap"
              >
                {downloaded ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Отчёт CSV скачан</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span>Скачать отчёт</span>
                  </>
                )}
              </button>
            </div>

            {/* Avito Pro Sub-Tabs: Сводка / Детализация / Расходы */}
            <div className="flex items-center gap-6 border-b border-slate-200 text-sm">
              <button
                type="button"
                onClick={() => setActiveTab('summary')}
                className={`pb-2.5 font-medium transition-colors whitespace-nowrap border-b-2 -mb-px ${
                  activeTab === 'summary'
                    ? 'border-slate-900 text-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Сводка
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('details')}
                className={`pb-2.5 font-medium transition-colors whitespace-nowrap border-b-2 -mb-px ${
                  activeTab === 'details'
                    ? 'border-slate-900 text-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Детализация по матрице
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('expenses')}
                className={`pb-2.5 font-medium transition-colors whitespace-nowrap border-b-2 -mb-px ${
                  activeTab === 'expenses'
                    ? 'border-slate-900 text-slate-900'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Расходы и юнит-отчёт
              </button>
            </div>

            {/* Filter Bar Replica */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="flex items-center justify-between px-3 py-2 bg-slate-100/80 rounded-lg text-xs text-slate-800 font-medium">
                <span className="truncate font-mono tabular-nums">{data.period}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </div>
              <button
                type="button"
                onClick={() => setActiveTab(activeTab === 'details' ? 'summary' : 'details')}
                className="flex items-center justify-between px-3 py-2 bg-slate-100/80 hover:bg-slate-200/70 rounded-lg text-xs text-slate-700 transition-colors"
              >
                <span className="truncate">Категории (4)</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>
              <button
                type="button"
                onClick={() =>
                  setGeoFilter(geoFilter === 'all' ? 'msk' : geoFilter === 'msk' ? 'spb' : 'all')
                }
                className="flex items-center justify-between px-3 py-2 bg-slate-100/80 hover:bg-slate-200/70 rounded-lg text-xs text-slate-800 font-medium transition-colors"
              >
                <span className="truncate">
                  {geoFilter === 'all'
                    ? 'МСК + СПб'
                    : geoFilter === 'msk'
                    ? 'Москва'
                    : 'Санкт-Петербург'}
                </span>
                <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              </button>
              <button
                type="button"
                onClick={() => setSelectedMetric('listings')}
                className="flex items-center justify-between px-3 py-2 bg-slate-100/80 hover:bg-slate-200/70 rounded-lg text-xs text-slate-700 transition-colors"
              >
                <span className="truncate font-mono tabular-nums">
                  Объявления ({data.activeListings})
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              </button>
            </div>

            {activeTab === 'summary' && (
              <>
                {/* ВОРОНКА ПРОДАЖ */}
                <div className="space-y-3 pt-1">
                  <h4 className="text-sm font-display font-bold text-slate-900">Воронка продаж</h4>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-stretch">
                    {/* Просмотры */}
                    <button
                      type="button"
                      onClick={() => setSelectedMetric('views')}
                      className={`md:col-span-4 text-left p-4 rounded-xl border transition-colors ${
                        selectedMetric === 'views'
                          ? 'border-slate-900 bg-slate-50/80'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="text-xs font-medium text-slate-700 border-b border-dashed border-slate-300 inline-block pb-0.5">
                        Просмотры
                      </div>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-2xl font-display font-bold font-mono tabular-nums text-slate-900">
                          {data.views.toLocaleString('ru-RU')}
                        </span>
                        <span className="text-xs font-mono tabular-nums font-semibold text-emerald-600">
                          {data.viewsDelta}
                        </span>
                      </div>
                      <div className="mt-1 text-[11px] text-slate-500 font-mono tabular-nums">
                        {data.costPerView}
                      </div>
                    </button>

                    {/* Conversion Arrow Badge */}
                    <div className="md:col-span-1 flex items-center justify-center">
                      <div className="px-2 py-1 text-xs font-mono tabular-nums font-semibold text-slate-600 bg-slate-100 rounded-md whitespace-nowrap">
                        {data.conversionRate} &gt;
                      </div>
                    </div>

                    {/* Контакты */}
                    <button
                      type="button"
                      onClick={() => setSelectedMetric('contacts')}
                      className={`md:col-span-4 text-left p-4 rounded-xl border transition-colors ${
                        selectedMetric === 'contacts'
                          ? 'border-slate-900 bg-slate-50/80'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="text-xs font-medium text-slate-700 border-b border-dashed border-slate-300 inline-block pb-0.5">
                        Контакты
                      </div>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-2xl font-display font-bold font-mono tabular-nums text-slate-900">
                          {data.contacts}
                        </span>
                        <span className="text-xs font-mono tabular-nums font-semibold text-emerald-600">
                          {data.contactsDelta}
                        </span>
                      </div>
                      <div className="mt-1 text-[11px] text-slate-500 font-mono tabular-nums">
                        {data.costPerContact}
                      </div>
                    </button>

                    {/* Избранное */}
                    <button
                      type="button"
                      onClick={() => setSelectedMetric('favorites')}
                      className={`md:col-span-3 text-left p-4 rounded-xl border transition-colors ${
                        selectedMetric === 'favorites'
                          ? 'border-slate-900 bg-slate-50/80'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="text-xs font-medium text-slate-700 border-b border-dashed border-slate-300 inline-block pb-0.5">
                        Избранное
                      </div>
                      <div className="mt-2 flex items-baseline gap-2">
                        <span className="text-2xl font-display font-bold font-mono tabular-nums text-slate-900">
                          {data.favorites}
                        </span>
                        <span className="text-xs font-mono tabular-nums font-semibold text-emerald-600">
                          {data.favoritesDelta}
                        </span>
                      </div>
                      <div className="mt-1 text-[11px] text-slate-500">
                        База снабженцев B2B
                      </div>
                    </button>
                  </div>
                </div>

                {/* ПОКАЗАТЕЛИ */}
                <div className="space-y-4 pt-3 border-t border-slate-100">
                  <h4 className="text-sm font-display font-bold text-slate-900">Показатели</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Активные объявления */}
                    <button
                      type="button"
                      onClick={() => setSelectedMetric('listings')}
                      className={`text-left p-4 rounded-xl border transition-colors ${
                        selectedMetric === 'listings'
                          ? 'border-slate-900 bg-slate-50/80'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-xs font-semibold text-slate-900">
                          Активные объявления
                        </span>
                        <div className="flex items-baseline gap-1.5 font-mono tabular-nums">
                          <span className="text-[11px] font-semibold text-emerald-600">
                            {data.activeListingsDelta}
                          </span>
                          <span className="text-base font-bold text-slate-900">
                            {data.activeListings}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 space-y-2.5 text-xs">
                        <div>
                          <div className="flex items-center justify-between text-slate-600 mb-1">
                            <span>Новые и опубликованные заново</span>
                            <span className="font-mono tabular-nums font-medium text-slate-900">
                              {data.newListings}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-lime-500 rounded-full"
                              style={{
                                width: `${Math.round((data.newListings / data.activeListings) * 100)}%`
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-slate-600 mb-1">
                            <span>Активны с прошлого периода</span>
                            <span className="font-mono tabular-nums font-medium text-slate-900">
                              {data.carriedOverListings}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-lime-500/70 rounded-full"
                              style={{
                                width: `${Math.round(
                                  (data.carriedOverListings / data.activeListings) * 100
                                )}%`
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </button>

                    {/* Расходы */}
                    <button
                      type="button"
                      onClick={() => setSelectedMetric('spend')}
                      className={`text-left p-4 rounded-xl border transition-colors ${
                        selectedMetric === 'spend'
                          ? 'border-slate-900 bg-slate-50/80'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-xs font-semibold text-slate-900">Расходы</span>
                        <div className="flex items-baseline gap-1.5 font-mono tabular-nums">
                          <span className="text-[11px] font-semibold text-sky-600">
                            {data.totalSpendDelta}
                          </span>
                          <span className="text-base font-bold text-slate-900">
                            {data.totalSpend}
                          </span>
                        </div>
                      </div>

                      <div className="mt-3 space-y-2.5 text-xs">
                        <div>
                          <div className="flex items-center justify-between text-slate-600 mb-1">
                            <span>На объявления</span>
                            <span className="font-mono tabular-nums font-medium text-slate-900">
                              {data.listingsSpend}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-sky-500 rounded-full w-full" />
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center justify-between text-slate-600 mb-1">
                            <span>Другие (платное продвижение)</span>
                            <span className="font-mono tabular-nums font-medium text-slate-500">
                              {data.otherSpend}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                            <div className="h-full bg-sky-500 rounded-full w-0" />
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Полученные контакты */}
                  <button
                    type="button"
                    onClick={() => setSelectedMetric('channels')}
                    className={`w-full md:w-1/2 text-left p-4 rounded-xl border transition-colors ${
                      selectedMetric === 'channels'
                        ? 'border-slate-900 bg-slate-50/80'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs font-semibold text-slate-900">
                        Полученные контакты
                      </span>
                      <div className="flex items-baseline gap-1.5 font-mono tabular-nums">
                        <span className="text-[11px] font-semibold text-emerald-600">
                          {data.contactsDelta}
                        </span>
                        <span className="text-base font-bold text-slate-900">{data.contacts}</span>
                      </div>
                    </div>

                    <div className="mt-3 space-y-2 text-xs">
                      <div>
                        <div className="flex items-center justify-between text-slate-600 mb-1">
                          <span>Посмотрели телефон</span>
                          <span className="font-mono tabular-nums font-medium text-slate-900">
                            {data.phoneViews}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-sky-500 rounded-full"
                            style={{
                              width: `${Math.round((data.phoneViews / data.contacts) * 100)}%`
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-slate-600 mb-1">
                          <span>Написали в чат</span>
                          <span className="font-mono tabular-nums font-medium text-slate-900">
                            {data.chatMessages}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-sky-500 rounded-full"
                            style={{
                              width: `${Math.round((data.chatMessages / data.contacts) * 100)}%`
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between text-slate-600 mb-1">
                          <span>Посмотрели телефон и написали в чат</span>
                          <span className="font-mono tabular-nums font-medium text-slate-900">
                            {data.phoneAndChat}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-sky-500 rounded-full"
                            style={{
                              width: `${Math.max(
                                4,
                                Math.round((data.phoneAndChat / data.contacts) * 100)
                              )}%`
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </button>
                </div>
              </>
            )}

            {activeTab === 'details' && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-display font-bold text-slate-900">
                    Детализация 384 объявлений по товарным категориям ZipPack
                  </h4>
                  <span className="text-xs text-slate-500 font-mono tabular-nums">
                    Всего контактов: 112 · Средний CPL: 49,9 ₽
                  </span>
                </div>
                <div className="overflow-x-auto border border-slate-200 rounded-lg">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50 text-slate-600">
                        <th className="py-2.5 px-3 font-medium">Товарный кластер</th>
                        <th className="py-2.5 px-3 font-medium text-right">Объявлений</th>
                        <th className="py-2.5 px-3 font-medium text-right">Просмотры</th>
                        <th className="py-2.5 px-3 font-medium text-right">Контакты</th>
                        <th className="py-2.5 px-3 font-medium text-right">CR</th>
                        <th className="py-2.5 px-3 font-medium text-right">CPL</th>
                        <th className="py-2.5 px-3 font-medium text-right">Средний чек B2B</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {CATEGORY_BREAKDOWN.map((cat) => (
                        <tr key={cat.id} className="hover:bg-slate-50/80">
                          <td className="py-3 px-3">
                            <div className="font-medium text-slate-900">{cat.name}</div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              {cat.buyerProfile}
                            </div>
                          </td>
                          <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-700">
                            {cat.skuCount}
                          </td>
                          <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-700">
                            {cat.views}
                          </td>
                          <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold text-slate-900">
                            {cat.contacts}
                          </td>
                          <td className="py-3 px-3 text-right font-mono tabular-nums text-emerald-700 font-medium">
                            {cat.conversion}
                          </td>
                          <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-900">
                            {cat.cpl}
                          </td>
                          <td className="py-3 px-3 text-right font-mono tabular-nums font-medium text-slate-900">
                            {cat.avgOrderValue}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'expenses' && (
              <div className="space-y-4 pt-2">
                <h4 className="text-sm font-display font-bold text-slate-900">
                  Разбор рекламного бюджета ({data.totalSpend}) и возврата инвестиций
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50">
                    <div className="text-xs text-slate-500">Стоимость 1 размещения / просмотра</div>
                    <div className="text-lg font-display font-bold font-mono tabular-nums text-slate-900 mt-1">
                      14,55 ₽ / лот · 2,5 ₽ / просм.
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5">
                      384 активных объявления обошлись в 5 588,8 ₽ за 30 дней без платных бустов.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50">
                    <div className="text-xs text-slate-500">Фактический CPL по кабинету</div>
                    <div className="text-lg font-display font-bold font-mono tabular-nums text-emerald-700 mt-1">
                      49,9 ₽ за контакт
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5">
                      Укладывается в целевой коридор 40–60 ₽ при 112 верифицированных контактах.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50">
                    <div className="text-xs text-slate-500">Доля ДРР (Доля рекламных расходов)</div>
                    <div className="text-lg font-display font-bold font-mono tabular-nums text-slate-900 mt-1">
                      0,56% от выручки
                    </div>
                    <p className="text-xs text-slate-600 mt-1.5">
                      При выходе на оборот ≈ 1 000 000 ₽/мес затраты на трафик в кабинете менее 1%.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Marketer's Analytical Callout Bar (updates dynamically when clicking metrics) */}
      <div className="p-5 bg-slate-900 text-white rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span>Комментарий по выбранному узлу воронки</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono text-emerald-400 tabular-nums">{activeInsight.figure}</span>
          </div>
          <div className="text-base font-display font-bold text-white">{activeInsight.title}</div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {activeInsight.analysis}
          </p>
        </div>
        <div className="md:border-l md:border-slate-800 md:pl-5 shrink-0 md:max-w-xs">
          <div className="text-[11px] text-slate-400">Бизнес-вывод</div>
          <div className="text-xs font-medium text-emerald-300 mt-1 leading-snug">
            {activeInsight.takeaway}
          </div>
        </div>
      </div>
    </div>
  );
};
