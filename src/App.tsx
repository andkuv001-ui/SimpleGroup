import React, { useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Copy,
  FileSpreadsheet,
  Presentation
} from 'lucide-react';
import {
  HERO_IMAGE_PATH,
  WAREHOUSE_IMAGE_PATH,
  GROWTH_PILLARS,
  COPY_TEMPLATES
} from './data/caseData';
import { AvitoProInteractive } from './components/AvitoProInteractive';
import { PresentationSlideModal } from './components/PresentationSlideModal';
import { CopyTemplatesSection } from './components/CopyTemplatesSection';
import { UnitEconomicsCalculator } from './components/UnitEconomicsCalculator';

export default function App() {
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);
  const [quickCopied, setQuickCopied] = useState(false);
  const [activePillarIndex, setActivePillarIndex] = useState<number>(0);
  const [heroImgError, setHeroImgError] = useState(false);
  const [warehouseImgError, setWarehouseImgError] = useState(false);

  const handleQuickCopyCase = async () => {
    try {
      await navigator.clipboard.writeText(COPY_TEMPLATES.telegram.text);
      setQuickCopied(true);
      setTimeout(() => setQuickCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = COPY_TEMPLATES.telegram.text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setQuickCopied(true);
      setTimeout(() => setQuickCopied(false), 2500);
    }
  };

  return (
    <div id="top" className="min-h-screen flex flex-col bg-[#F8F8F6] text-slate-900">
      {/* Strict 3-Zone Top Bar Contract */}
      <header className="no-print sticky top-0 z-30 bg-[#F8F8F6]/95 backdrop-blur-xs border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-display font-extrabold text-base sm:text-lg tracking-tight text-slate-900 whitespace-nowrap shrink-0"
          >
            ZipPack · B2B Кейс
          </a>

          {/* Zone 2: 5 clean text navigation links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
            <a
              href="#context"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Точка А и Б
            </a>
            <a
              href="#mechanics"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Инструменты
            </a>
            <a
              href="#avito-pro"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Кабинет Avito Pro
            </a>
            <a
              href="#economics"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Юнит-экономика
            </a>
            <a
              href="#copy-studio"
              className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap"
            >
              Готовые тексты
            </a>
          </nav>

          {/* Zone 3: 2 primary actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              type="button"
              onClick={handleQuickCopyCase}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-800 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              {quickCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Кейс скопирован</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Скопировать пост</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => setIsSlideModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              <Presentation className="w-3.5 h-3.5" />
              <span>Слайд 16:9 / PDF</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* SECTION 1: HERO & EXECUTIVE SUMMARY */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-14 lg:pt-14 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left 7 Cols: Editorial Proposition */}
            <div className="lg:col-span-7 space-y-6">
              {/* Unboxed Metadata with Typographic Separators (Zero-Pill Rule) */}
              <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
                <span>Кейс лидогенерации Avito Pro</span>
                <span aria-hidden="true">·</span>
                <span>Москва и Санкт-Петербург</span>
                <span aria-hidden="true">·</span>
                <span>Гибкая упаковка для бизнеса (ZipPack)</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-display font-extrabold tracking-tight text-slate-900 leading-[1.08]">
                Рост оптовых обращений ×10 в B2B-упаковке с 0 отзывов и CPL 49,9 ₽
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
                Как перестроить кабинет поставщика гибкой упаковки (дой-пак, зип-пакеты, барьерная плёнка) в Москве и Санкт-Петербурге: увеличить число обращений с{' '}
                <span className="font-mono tabular-nums font-semibold text-slate-900">15</span> до{' '}
                <span className="font-mono tabular-nums font-semibold text-slate-900">100–150</span> в месяц и выйти на оборот{' '}
                <span className="font-mono tabular-nums font-semibold text-slate-900">
                  ≈ 1 000 000 ₽ / мес.
                </span>{' '}
                при бюджете на размещение всего{' '}
                <span className="font-mono tabular-nums font-semibold text-slate-900">
                  5 588,8 ₽
                </span>.
              </p>

              {/* Unboxed Method Summary Line */}
              <div className="pt-2 border-t border-slate-200/80 text-xs sm:text-sm text-slate-600">
                <span className="font-semibold text-slate-900">Инструменты кейса: </span>
                <span>масспостинг (384 объявления)</span>
                <span className="mx-2 text-slate-400">·</span>
                <span>поисковое B2B SEO</span>
                <span className="mx-2 text-slate-400">·</span>
                <span>гео-кластеризация МСК / СПб</span>
                <span className="mx-2 text-slate-400">·</span>
                <span>тестирование связок в чате</span>
              </div>

              {/* Single Primary CTA + Secondary Text Link */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#avito-pro"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
                >
                  <span>Изучить отчёт Avito Pro</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <button
                  type="button"
                  onClick={() => setIsSlideModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-700 hover:text-slate-900 underline underline-offset-4 transition-colors whitespace-nowrap cursor-pointer"
                >
                  Открыть как презентационный слайд 16:9
                </button>
              </div>
            </div>

            {/* Right 5 Cols: 16:9 Hero Visual Carrier with Measured Scrim */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 aspect-16/10 sm:aspect-16/9 lg:aspect-4/3">
                {!heroImgError ? (
                  <img
                    src={HERO_IMAGE_PATH}
                    alt="Гибкая упаковка для бизнеса: пакеты дой-пак с замком zip-lock и промышленная рулонная плёнка ZipPack"
                    referrerPolicy="no-referrer"
                    onError={() => setHeroImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
                    <FileSpreadsheet className="w-12 h-12 text-slate-500" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent flex flex-col justify-end p-5 sm:p-6 text-white">
                  <div className="text-xs text-slate-300 font-mono tabular-nums">
                    Профиль: ZipPack · Срез 27 авг – 25 сент
                  </div>
                  <div className="text-lg sm:text-xl font-display font-bold mt-1">
                    Гибкая упаковка оптом: Дой-пак, Зип-лок, Рулонная плёнка
                  </div>
                  <div className="mt-2 pt-2 border-t border-white/15 flex items-center justify-between text-xs text-slate-200 font-mono tabular-nums">
                    <span>Конверсия в контакт: 5,0%</span>
                    <span>Средний чек: 42 000 – 145 000 ₽</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CLAIM-TO-PROOF ADJACENCY: ТОЧКА А / ТОЧКА Б / РЕЗУЛЬТАТ STRIP */}
          <div
            id="context"
            className="mt-12 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 lg:p-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:divide-x md:divide-slate-200">
              {/* ТОЧКА А */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-500 tracking-wide">
                  01. ТОЧКА А (СТАРТ ПРОЕКТА)
                </div>
                <div className="text-4xl sm:text-5xl font-display font-extrabold font-mono tabular-nums text-slate-900">
                  15
                </div>
                <div className="text-base font-semibold text-slate-900">
                  обращений / мес. · 0 отзывов
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  Отсутствие социального доказательства (рейтинг 0 ★ в профиле ZipPack), узкая выкладка из 84 общих объявлений и смешение розничного и оптового трафика.
                </p>
              </div>

              {/* ТОЧКА Б */}
              <div className="md:pl-8 space-y-2">
                <div className="text-xs font-semibold text-slate-500 tracking-wide">
                  02. ТОЧКА Б (ПОСЛЕ МАСШТАБИРОВАНИЯ)
                </div>
                <div className="text-4xl sm:text-5xl font-display font-extrabold font-mono tabular-nums text-slate-900">
                  100–150
                </div>
                <div className="text-base font-semibold text-slate-900">
                  обращений / мес. · ≈ 1 млн ₽ / мес.
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  Системный поток квалифицированных заявок от селлеров WB/Ozon, обжарщиков кофе и пищевых производств Москвы и Санкт-Петербурга с высокой долей повторных заказов.
                </p>
              </div>

              {/* РЕЗУЛЬТАТ */}
              <div className="md:pl-8 space-y-2">
                <div className="text-xs font-semibold text-emerald-700 tracking-wide">
                  03. ИТОГОВЫЙ РЕЗУЛЬТАТ
                </div>
                <div className="text-4xl sm:text-5xl font-display font-extrabold font-mono tabular-nums text-emerald-600">
                  ×10
                </div>
                <div className="text-base font-semibold text-slate-900">
                  рост обращений · CPL 40–60 ₽
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                  В подтверждённом 30-дневном срезе Avito Pro получено{' '}
                  <span className="font-mono tabular-nums font-semibold text-slate-900">
                    112 контактов
                  </span>{' '}
                  по средней цене{' '}
                  <span className="font-mono tabular-nums font-semibold text-slate-900">
                    49,9 ₽
                  </span>{' '}
                  при расходе{' '}
                  <span className="font-mono tabular-nums font-semibold text-slate-900">
                    5 588,8 ₽
                  </span>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: CORE MECHANICS (4 PILLARS: МАССПОСТИНГ • SEO • ГЕО • ТЕСТИРОВАНИЕ СВЯЗОК) */}
        <section
          id="mechanics"
          className="border-t border-slate-200 bg-white py-14 lg:py-20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="space-y-2 max-w-2xl">
                <div className="text-xs text-slate-500">
                  Архитектура результата · Масспостинг · SEO · Гео · Тестирование связок
                </div>
                <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900">
                  За счёт каких решений выросли в 10 раз без платного продвижения
                </h2>
              </div>
              <div className="text-xs sm:text-sm text-slate-600 font-mono tabular-nums">
                Расход на услуги продвижения X5/X10: 0 ₽
              </div>
            </div>

            {/* Interactive Pillar Selector + Deep Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 5 Cols: Numbered Editorial Service List */}
              <div className="lg:col-span-5 space-y-2.5">
                {GROWTH_PILLARS.map((pillar, idx) => {
                  const isActive = activePillarIndex === idx;
                  return (
                    <button
                      key={pillar.number}
                      type="button"
                      onClick={() => setActivePillarIndex(idx)}
                      className={`w-full text-left p-5 rounded-xl border transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-slate-900 text-white border-slate-900'
                          : 'bg-[#F8F8F6] text-slate-900 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span
                          className={`text-xs font-mono tabular-nums font-semibold ${
                            isActive ? 'text-emerald-400' : 'text-slate-500'
                          }`}
                        >
                          {pillar.number}. Инструмент
                        </span>
                        <span
                          className={`text-xs font-mono tabular-nums font-semibold ${
                            isActive ? 'text-slate-300' : 'text-emerald-700'
                          }`}
                        >
                          {pillar.metricValue}
                        </span>
                      </div>
                      <div className="text-base font-display font-bold mt-1.5">
                        {pillar.title}
                      </div>
                      <div
                        className={`text-xs mt-1 ${
                          isActive ? 'text-slate-300' : 'text-slate-600'
                        }`}
                      >
                        {pillar.subtitle}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Right 7 Cols: Active Pillar Analytical Card + Warehouse Proof Image */}
              <div className="lg:col-span-7 bg-[#F8F8F6] border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
                <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-slate-200">
                  <div>
                    <div className="text-xs text-slate-500 font-mono tabular-nums">
                      Этап {GROWTH_PILLARS[activePillarIndex].number} из 04 ·{' '}
                      {GROWTH_PILLARS[activePillarIndex].metricContext}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mt-1">
                      {GROWTH_PILLARS[activePillarIndex].title}
                    </h3>
                  </div>
                  <div className="text-lg font-display font-extrabold font-mono tabular-nums text-emerald-700">
                    {GROWTH_PILLARS[activePillarIndex].metricValue}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-500">
                      Проблема в Точке А
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {GROWTH_PILLARS[activePillarIndex].problem}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-900">
                      Реализованная механика
                    </div>
                    <p className="text-sm text-slate-700 leading-relaxed">
                      {GROWTH_PILLARS[activePillarIndex].mechanism}
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 space-y-3">
                  <div className="text-xs font-semibold text-slate-900">
                    Что конкретно было внедрено:
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                    {GROWTH_PILLARS[activePillarIndex].deliverables.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="font-mono text-xs text-emerald-700 font-semibold mt-0.5">
                          0{i + 1}.
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="w-full sm:w-40 h-24 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-900">
                    {!warehouseImgError ? (
                      <img
                        src={WAREHOUSE_IMAGE_PATH}
                        alt="Склад гибкой упаковки и рулонной плёнки ZipPack для оптовых отгрузок"
                        referrerPolicy="no-referrer"
                        onError={() => setWarehouseImgError(true)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-800" />
                    )}
                  </div>
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-emerald-700">
                      Измеримый результат этапа
                    </div>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                      {GROWTH_PILLARS[activePillarIndex].outcome}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: INTERACTIVE AVITO PRO ANALYTICS CABINET */}
        <section id="avito-pro" className="py-14 lg:py-20 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-2 max-w-3xl">
              <div className="text-xs text-slate-500">
                Документальное подтверждение · Статистика Avito Pro (27 авг – 25 сент)
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900">
                Интерактивный разбор воронки продаж из кабинета ZipPack
              </h2>
            </div>

            <AvitoProInteractive />
          </div>
        </section>

        {/* SECTION 4: B2B UNIT ECONOMICS & SCALING CALCULATOR */}
        <section
          id="economics"
          className="py-14 lg:py-20 border-t border-slate-200 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="space-y-2 max-w-3xl">
              <div className="text-xs text-slate-500">
                Финансовая модель · От стоимости просмотра 2,5 ₽ до 1 000 000 ₽ / мес.
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-900">
                Юнит-экономика кейса и калькулятор масштабирования
              </h2>
            </div>

            <UnitEconomicsCalculator />
          </div>
        </section>

        {/* SECTION 5: READY-TO-PUBLISH CASE COPY TEMPLATES */}
        <section id="copy-studio" className="py-14 lg:py-20 border-t border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <CopyTemplatesSection />
          </div>
        </section>
      </main>

      {/* Quiet Editorial Footer */}
      <footer className="no-print border-t border-slate-200 bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            <span className="font-display font-bold text-slate-900">ZipPack · B2B Кейс</span>
            <span className="mx-2">·</span>
            <span>Гибкая упаковка для бизнеса (Москва / Санкт-Петербург)</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setIsSlideModalOpen(true)}
              className="hover:text-slate-900 underline underline-offset-4 cursor-pointer"
            >
              Презентационный слайд 16:9
            </button>
            <span>·</span>
            <a href="#top" className="hover:text-slate-900 underline underline-offset-4">
              Наверх
            </a>
          </div>
        </div>
      </footer>

      {/* 16:9 Presentation Slide Modal */}
      {isSlideModalOpen && (
        <PresentationSlideModal onClose={() => setIsSlideModalOpen(false)} />
      )}
    </div>
  );
}
