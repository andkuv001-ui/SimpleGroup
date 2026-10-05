import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Printer, X } from 'lucide-react';
import { CATEGORY_BREAKDOWN, GROWTH_PILLARS } from '../data/caseData';

interface PresentationSlideModalProps {
  onClose: () => void;
}

export const PresentationSlideModal: React.FC<PresentationSlideModalProps> = ({ onClose }) => {
  const [slideIndex, setSlideIndex] = useState(0);
  const [darkSlide, setDarkSlide] = useState(false);

  const totalSlides = 3;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-xs flex flex-col justify-between p-3 sm:p-6 overflow-y-auto">
      {/* Top Controls Bar (hidden when printing) */}
      <div className="no-print max-w-6xl w-full mx-auto flex flex-wrap items-center justify-between gap-3 bg-slate-900 border border-slate-800 text-white px-4 py-3 rounded-xl mb-4">
        <div className="flex items-center gap-4">
          <span className="font-display font-bold text-sm">
            Презентационный режим 16:9 · Слайд {slideIndex + 1} из {totalSlides}
          </span>
          <div className="hidden md:flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
            <button
              type="button"
              onClick={() => setSlideIndex(0)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                slideIndex === 0 ? 'bg-white text-slate-900' : 'text-slate-300 hover:text-white'
              }`}
            >
              01. Главный слайд (One-Pager)
            </button>
            <button
              type="button"
              onClick={() => setSlideIndex(1)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                slideIndex === 1 ? 'bg-white text-slate-900' : 'text-slate-300 hover:text-white'
              }`}
            >
              02. Инструменты и матрица
            </button>
            <button
              type="button"
              onClick={() => setSlideIndex(2)}
              className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                slideIndex === 2 ? 'bg-white text-slate-900' : 'text-slate-300 hover:text-white'
              }`}
            >
              03. Детализация по категориям
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDarkSlide(!darkSlide)}
            className="px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg transition-colors whitespace-nowrap"
          >
            {darkSlide ? 'Светлая тема слайда' : 'Тёмная тема слайда'}
          </button>
          <button
            type="button"
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors whitespace-nowrap"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Печать / PDF</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors whitespace-nowrap"
          >
            <X className="w-3.5 h-3.5" />
            <span>Закрыть</span>
          </button>
        </div>
      </div>

      {/* 16:9 Slide Canvas Container */}
      <div className="my-auto max-w-6xl w-full mx-auto">
        <div
          className={`w-full rounded-2xl border overflow-hidden transition-colors p-6 sm:p-10 lg:p-12 flex flex-col justify-between min-h-[640px] ${
            darkSlide
              ? 'bg-slate-900 border-slate-800 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {slideIndex === 0 && (
            <>
              {/* Slide 1 Header: Direct high-design upgrade of original PDF slide */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-current/10">
                <div>
                  <div
                    className={`text-xs font-medium mb-2 ${
                      darkSlide ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    Кейс продвижения на Авито · Профиль ZipPack · Срез 27 авг – 25 сент
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-display font-extrabold tracking-tight">
                    B2B УПАКОВКА
                  </h2>
                  <p
                    className={`text-base sm:text-lg mt-1 ${
                      darkSlide ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    Москва / Санкт-Петербург · Гибкая упаковка для бизнеса
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <div
                    className={`text-xs ${darkSlide ? 'text-slate-400' : 'text-slate-500'}`}
                  >
                    Инструменты реализации
                  </div>
                  <div className="text-sm font-medium mt-1">
                    Масспостинг · SEO-ядро · Гео МСК/СПб · Тестирование связок
                  </div>
                </div>
              </div>

              {/* Slide 1 Center: Structured Avito Pro Funnel Evidence */}
              <div className="my-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                {/* Funnel Metrics Grid */}
                <div
                  className={`lg:col-span-8 p-6 rounded-xl border ${
                    darkSlide
                      ? 'bg-slate-950/60 border-slate-800'
                      : 'bg-slate-50/80 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-current/10">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex gap-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="w-2 h-2 rounded-full bg-sky-500" />
                        <span className="w-2 h-2 rounded-full bg-rose-500" />
                        <span className="w-2 h-2 rounded-full bg-purple-500" />
                      </span>
                      <span className="font-display font-bold text-sm">
                        Avito Pro · Статистика (ZipPack)
                      </span>
                    </div>
                    <span className="text-xs font-mono tabular-nums opacity-70">
                      27 авг – 25 сент (30 дней)
                    </span>
                  </div>

                  {/* Funnel Row */}
                  <div className="grid grid-cols-3 gap-4 pb-5 border-b border-current/10">
                    <div>
                      <div className="text-xs opacity-65">Просмотры</div>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-2xl font-display font-bold font-mono tabular-nums">
                          2 240
                        </span>
                        <span className="text-xs font-mono tabular-nums text-emerald-500 font-semibold">
                          ↑45,7%
                        </span>
                      </div>
                      <div className="text-[11px] opacity-60 font-mono tabular-nums mt-0.5">
                        В среднем 2,5 ₽ за просмотр
                      </div>
                    </div>

                    <div>
                      <div className="text-xs opacity-65">Контакты (CR 5,0%)</div>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-2xl font-display font-bold font-mono tabular-nums">
                          112
                        </span>
                        <span className="text-xs font-mono tabular-nums text-emerald-500 font-semibold">
                          ↑57,7%
                        </span>
                      </div>
                      <div className="text-[11px] opacity-60 font-mono tabular-nums mt-0.5">
                        В среднем 49,9 ₽ за контакт
                      </div>
                    </div>

                    <div>
                      <div className="text-xs opacity-65">Избранное</div>
                      <div className="mt-1 flex items-baseline gap-2">
                        <span className="text-2xl font-display font-bold font-mono tabular-nums">
                          80
                        </span>
                        <span className="text-xs font-mono tabular-nums text-emerald-500 font-semibold">
                          ↑122,2%
                        </span>
                      </div>
                      <div className="text-[11px] opacity-60 mt-0.5">
                        Отложенный спрос снабженцев
                      </div>
                    </div>
                  </div>

                  {/* Bottom Sub-metrics inside cabinet */}
                  <div className="grid grid-cols-3 gap-4 pt-4 text-xs">
                    <div>
                      <div className="opacity-65">Активные объявления</div>
                      <div className="text-base font-bold font-mono tabular-nums mt-0.5">
                        384 <span className="text-emerald-500 text-xs">↑174,3%</span>
                      </div>
                      <div className="text-[11px] opacity-60 font-mono tabular-nums mt-0.5">
                        300 новых · 84 с прошл. периода
                      </div>
                    </div>
                    <div>
                      <div className="opacity-65">Расходы в кабинете</div>
                      <div className="text-base font-bold font-mono tabular-nums mt-0.5">
                        5 588,8 ₽ <span className="text-sky-500 text-xs">↑51,6%</span>
                      </div>
                      <div className="text-[11px] opacity-60 font-mono tabular-nums mt-0.5">
                        На объявления: 5 589 ₽ · Буст: 0 ₽
                      </div>
                    </div>
                    <div>
                      <div className="opacity-65">Каналы обращений</div>
                      <div className="text-base font-bold font-mono tabular-nums mt-0.5">
                        90 чат · 18 звонки
                      </div>
                      <div className="text-[11px] opacity-60 font-mono tabular-nums mt-0.5">
                        + 4 телефон и чат (всего 112)
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column Key Insights */}
                <div className="lg:col-span-4 space-y-4">
                  <div
                    className={`p-5 rounded-xl border ${
                      darkSlide
                        ? 'bg-slate-950/60 border-slate-800'
                        : 'bg-slate-50/80 border-slate-200'
                    }`}
                  >
                    <div className="text-xs opacity-65">За счёт чего пробили «0 отзывов»</div>
                    <div className="text-sm font-semibold mt-1">
                      Оффер быстрого расчёта тиража в чате + отправка бесплатных образцов
                    </div>
                    <p className="text-xs opacity-75 mt-2 leading-relaxed">
                      83,9% всех контактов прошли через чат Avito: снабженцам проще отправить размеры пакета и получить КП за 10 минут.
                    </p>
                  </div>

                  <div
                    className={`p-5 rounded-xl border ${
                      darkSlide
                        ? 'bg-slate-950/60 border-slate-800'
                        : 'bg-slate-50/80 border-slate-200'
                    }`}
                  >
                    <div className="text-xs opacity-65">География охвата</div>
                    <div className="text-sm font-semibold mt-1">
                      Москва (248 лотов) и Санкт-Петербург (136 лотов)
                    </div>
                    <p className="text-xs opacity-75 mt-2 leading-relaxed">
                      Товарная сетка покрыла фулфилмент-центры, обжарщиков кофе и пищевые производства двух столиц.
                    </p>
                  </div>
                </div>
              </div>

              {/* Slide 1 Bottom Strip: ТОЧКА А / ТОЧКА Б / РЕЗУЛЬТАТ (Exact upgrade of original PDF footer) */}
              <div className="pt-6 border-t border-current/15 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="text-xs font-semibold tracking-wide opacity-60">ТОЧКА А</div>
                  <div className="text-3xl sm:text-4xl font-display font-extrabold font-mono tabular-nums mt-1">
                    15
                  </div>
                  <div className="text-sm font-medium mt-1">обращений / мес. · 0 отзывов</div>
                  <div className="text-xs opacity-65 mt-1">
                    Инструменты: масспостинг · SEO · гео · тестирование связок
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold tracking-wide opacity-60">ТОЧКА Б</div>
                  <div className="text-3xl sm:text-4xl font-display font-extrabold font-mono tabular-nums mt-1">
                    100–150
                  </div>
                  <div className="text-sm font-medium mt-1">
                    обращений / мес. · ≈ 1 млн ₽ / мес.
                  </div>
                  <div className="text-xs opacity-65 mt-1">
                    Стабильный поток оптовых заказов от юрлиц и селлеров
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold tracking-wide opacity-60">РЕЗУЛЬТАТ</div>
                  <div className="text-3xl sm:text-4xl font-display font-extrabold font-mono tabular-nums text-emerald-600 mt-1">
                    ×10
                  </div>
                  <div className="text-sm font-medium mt-1">
                    рост обращений · CPL 40–60 ₽
                  </div>
                  <div className="text-xs opacity-65 font-mono tabular-nums mt-1">
                    Фактический средний CPL по Avito Pro: 49,9 ₽
                  </div>
                </div>
              </div>
            </>
          )}

          {slideIndex === 1 && (
            <div className="space-y-6 my-auto">
              <div className="pb-4 border-b border-current/10 flex items-end justify-between">
                <div>
                  <div className="text-xs opacity-60">Слайд 02 · Архитектура продвижения</div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold mt-1">
                    4 инструмента, давших рост ×10 без платного бустинга
                  </h2>
                </div>
                <span className="text-xs font-mono tabular-nums opacity-70">
                  ZipPack · Москва / Санкт-Петербург
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {GROWTH_PILLARS.map((pillar) => (
                  <div
                    key={pillar.number}
                    className={`p-5 rounded-xl border ${
                      darkSlide
                        ? 'bg-slate-950/60 border-slate-800'
                        : 'bg-slate-50/80 border-slate-200'
                    }`}
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-xs font-mono tabular-nums opacity-60">
                        {pillar.number}. Инструмент
                      </span>
                      <span className="text-xs font-mono tabular-nums font-semibold text-emerald-500">
                        {pillar.metricValue}
                      </span>
                    </div>
                    <h3 className="text-base font-display font-bold mt-1">{pillar.title}</h3>
                    <p className="text-xs opacity-75 mt-2 leading-relaxed">{pillar.mechanism}</p>
                    <div className="mt-3 pt-3 border-t border-current/10 text-xs font-medium">
                      Итог: {pillar.outcome}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {slideIndex === 2 && (
            <div className="space-y-6 my-auto">
              <div className="pb-4 border-b border-current/10 flex items-end justify-between">
                <div>
                  <div className="text-xs opacity-60">Слайд 03 · Товарная матрица B2B</div>
                  <h2 className="text-2xl sm:text-3xl font-display font-bold mt-1">
                    Детализация 384 объявлений и конверсии по продуктам
                  </h2>
                </div>
                <span className="text-xs font-mono tabular-nums opacity-70">
                  Средний CPL: 49,9 ₽ · Выручка ≈ 1 млн ₽/мес
                </span>
              </div>

              <div className="overflow-x-auto border border-current/15 rounded-xl">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-current/15 opacity-70">
                      <th className="py-3.5 px-4 font-medium">Продуктовый кластер</th>
                      <th className="py-3.5 px-4 font-medium text-right">Лотов</th>
                      <th className="py-3.5 px-4 font-medium text-right">Просмотры</th>
                      <th className="py-3.5 px-4 font-medium text-right">Контакты</th>
                      <th className="py-3.5 px-4 font-medium text-right">CR</th>
                      <th className="py-3.5 px-4 font-medium text-right">CPL</th>
                      <th className="py-3.5 px-4 font-medium text-right">Средний чек</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-current/10">
                    {CATEGORY_BREAKDOWN.map((cat) => (
                      <tr key={cat.id}>
                        <td className="py-3.5 px-4">
                          <div className="font-semibold">{cat.name}</div>
                          <div className="text-xs opacity-65 mt-0.5">{cat.buyerProfile}</div>
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono tabular-nums">
                          {cat.skuCount}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono tabular-nums">
                          {cat.views}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono tabular-nums font-bold">
                          {cat.contacts}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono tabular-nums text-emerald-500 font-semibold">
                          {cat.conversion}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono tabular-nums">
                          {cat.cpl}
                        </td>
                        <td className="py-3.5 px-4 text-right font-mono tabular-nums font-semibold">
                          {cat.avgOrderValue}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Slide Navigation Bar */}
      <div className="no-print max-w-6xl w-full mx-auto flex items-center justify-between mt-4 text-xs text-slate-400">
        <div>
          Совет: нажмите «Печать / PDF», чтобы сохранить текущий слайд 16:9 в векторный PDF.
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSlideIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1))}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg border border-slate-800 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Предыдущий</span>
          </button>
          <button
            type="button"
            onClick={() => setSlideIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0))}
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg border border-slate-800 transition-colors"
          >
            <span>Следующий</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
