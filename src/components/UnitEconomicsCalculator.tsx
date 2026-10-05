import React, { useState } from 'react';
import { Check } from 'lucide-react';

export const UnitEconomicsCalculator: React.FC = () => {
  // Grounded defaults from ZipPack case: 384 listings -> ~5589 RUB spend -> 112 contacts -> ~1M RUB monthly B2B revenue
  const [listingsCount, setListingsCount] = useState<number>(384);
  const [cplValue, setCplValue] = useState<number>(50);
  const [closeRate, setCloseRate] = useState<number>(14); // 14% lead-to-wholesale-contract conversion
  const [avgInvoice, setAvgInvoice] = useState<number>(68000);

  // Lead capture form state with validation
  const [companyName, setCompanyName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [city, setCity] = useState('Москва / Санкт-Петербург');
  const [formError, setFormError] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Derived metrics
  const estimatedBudget = Math.round(listingsCount * 14.55);
  const estimatedContacts = Math.round(estimatedBudget / cplValue);
  const estimatedContracts = Math.max(1, Math.round((estimatedContacts * closeRate) / 100));
  const estimatedRevenue = estimatedContracts * avgInvoice;
  const drrPercent = ((estimatedBudget / estimatedRevenue) * 100).toFixed(2);

  const handleResetToCase = () => {
    setListingsCount(384);
    setCplValue(50);
    setCloseRate(14);
    setAvgInvoice(68000);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedPhone = contactPhone.replace(/\D/g, '');
    if (!companyName.trim()) {
      setFormError('Укажите название компании или нишу (например, производство упаковки).');
      return;
    }
    if (cleanedPhone.length < 10) {
      setFormError('Введите корректный номер телефона (минимум 10 цифр) для отправки расчёта.');
      return;
    }
    setFormError('');
    setFormSubmitted(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left 7 Cols: Interactive Unit Economics Simulator */}
      <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2 pb-4 border-b border-slate-200">
          <div>
            <div className="text-xs text-slate-500">
              Математическая модель кейса ZipPack · Точка А → Точка Б
            </div>
            <h3 className="text-xl font-display font-bold text-slate-900 mt-1">
              Калькулятор юнит-экономики B2B на Авито
            </h3>
          </div>
          <button
            type="button"
            onClick={handleResetToCase}
            className="text-xs font-medium text-slate-600 hover:text-slate-900 underline underline-offset-4 whitespace-nowrap"
          >
            Вернуть эталонные значения ZipPack
          </button>
        </div>

        {/* Sliders */}
        <div className="space-y-5">
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label htmlFor="slider-listings" className="font-medium text-slate-700">
                Количество активных объявлений в масспостинге
              </label>
              <span className="font-mono tabular-nums font-bold text-slate-900">
                {listingsCount} шт.
              </span>
            </div>
            <input
              id="slider-listings"
              type="range"
              min={50}
              max={1000}
              step={10}
              value={listingsCount}
              onChange={(e) => setListingsCount(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono tabular-nums mt-1">
              <span>50 (Точка А: 84)</span>
              <span>Эталон кейса: 384</span>
              <span>1 000 лотов</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <label htmlFor="slider-cpl" className="font-medium text-slate-700">
                Стоимость целевого контакта (CPL в коридоре 40–60 ₽)
              </label>
              <span className="font-mono tabular-nums font-bold text-slate-900">
                {cplValue} ₽
              </span>
            </div>
            <input
              id="slider-cpl"
              type="range"
              min={35}
              max={120}
              step={1}
              value={cplValue}
              onChange={(e) => setCplValue(Number(e.target.value))}
              className="w-full accent-slate-900 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono tabular-nums mt-1">
              <span>35 ₽</span>
              <span>Факт Avito Pro: 49,9 ₽</span>
              <span>120 ₽</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <label htmlFor="slider-cr" className="font-medium text-slate-700">
                  Конверсия из лида в оптовый счёт
                </label>
                <span className="font-mono tabular-nums font-bold text-slate-900">
                  {closeRate}%
                </span>
              </div>
              <input
                id="slider-cr"
                type="range"
                min={5}
                max={30}
                step={1}
                value={closeRate}
                onChange={(e) => setCloseRate(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <label htmlFor="slider-check" className="font-medium text-slate-700">
                  Средний оптовый чек партии
                </label>
                <span className="font-mono tabular-nums font-bold text-slate-900">
                  {avgInvoice.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <input
                id="slider-check"
                type="range"
                min={25000}
                max={150000}
                step={5000}
                value={avgInvoice}
                onChange={(e) => setAvgInvoice(Number(e.target.value))}
                className="w-full accent-slate-900 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Output Summary Grid */}
        <div className="pt-5 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-slate-500">Бюджет на постинг</div>
            <div className="text-lg font-display font-bold font-mono tabular-nums text-slate-900 mt-1">
              {estimatedBudget.toLocaleString('ru-RU')} ₽
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">за 30 дней</div>
          </div>

          <div>
            <div className="text-xs text-slate-500">Обращений / мес.</div>
            <div className="text-lg font-display font-bold font-mono tabular-nums text-slate-900 mt-1">
              {estimatedContacts}
            </div>
            <div className="text-[11px] text-emerald-700 font-mono tabular-nums mt-0.5">
              ×{(estimatedContacts / 15).toFixed(1)} к Точке А
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-500">Оптовых отгрузок</div>
            <div className="text-lg font-display font-bold font-mono tabular-nums text-slate-900 mt-1">
              {estimatedContracts} сделок
            </div>
            <div className="text-[11px] text-slate-400 font-mono tabular-nums mt-0.5">
              ДРР {drrPercent}%
            </div>
          </div>

          <div>
            <div className="text-xs text-slate-500">Прогноз выручки</div>
            <div className="text-lg font-display font-bold font-mono tabular-nums text-emerald-700 mt-1">
              ≈ {(estimatedRevenue / 1000000).toFixed(2)} млн ₽
            </div>
            <div className="text-[11px] text-slate-400 font-mono tabular-nums mt-0.5">
              {estimatedRevenue.toLocaleString('ru-RU')} ₽ / мес.
            </div>
          </div>
        </div>
      </div>

      {/* Right 5 Cols: Validated Lead Capture / Request Similar B2B Funnel */}
      <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-6 sm:p-8 space-y-5">
        <div>
          <div className="text-xs text-slate-400">
            Расчёт стратегии под вашу B2B-нишу
          </div>
          <h3 className="text-xl font-display font-bold text-white mt-1">
            Запросить декомпозицию масспостинга и SEO-ядра
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
            Подготовим расчёт ёмкости спроса на Авито в Москве, Санкт-Петербурге или по РФ, составим медиаплан и покажем связки для старта даже с 0 отзывов.
          </p>
        </div>

        {formSubmitted ? (
          <div className="p-5 rounded-xl bg-slate-800/90 border border-emerald-500/40 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400 text-sm font-semibold">
              <Check className="w-4 h-4 shrink-0" />
              <span>Заявка на расчёт стратегии принята</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Мы подготовим расчёт матрицы объявлений для компании{' '}
              <span className="font-semibold text-white">{companyName}</span> ({city}) с ориентиром{' '}
              <span className="font-mono tabular-nums text-emerald-300">
                {estimatedContacts} лидов/мес
              </span>{' '}
              и свяжемся по номеру <span className="font-mono tabular-nums">{contactPhone}</span>.
            </p>
            <button
              type="button"
              onClick={() => {
                setFormSubmitted(false);
                setCompanyName('');
                setContactPhone('');
              }}
              className="text-xs font-medium text-slate-300 hover:text-white underline underline-offset-4"
            >
              Отправить ещё один запрос
            </button>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
            <div>
              <label htmlFor="input-company" className="block text-xs text-slate-300 mb-1.5">
                Компания или продукт (например, производство упаковки, сырьё, оборудование)
              </label>
              <input
                id="input-company"
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="ООО ПакСервис / Гибкая упаковка"
                className="w-full px-3.5 py-2.5 text-sm bg-slate-800/90 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="input-phone" className="block text-xs text-slate-300 mb-1.5">
                  Телефон / Telegram
                </label>
                <input
                  id="input-phone"
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="+7 (999) 000-00-00"
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-800/90 border border-slate-700 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:border-emerald-400 transition-colors font-mono tabular-nums"
                />
              </div>

              <div>
                <label htmlFor="input-city" className="block text-xs text-slate-300 mb-1.5">
                  Регион продвижения
                </label>
                <select
                  id="input-city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-800/90 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-emerald-400 transition-colors"
                >
                  <option value="Москва / Санкт-Петербург">Москва / Санкт-Петербург</option>
                  <option value="Вся Россия (ЦФО + СЗФО + Урал)">Вся Россия (мульти-гео)</option>
                  <option value="Только Москва и МО">Только Москва и МО</option>
                  <option value="Только Санкт-Петербург и ЛО">Только Санкт-Петербург и ЛО</option>
                </select>
              </div>
            </div>

            {formError && (
              <div className="text-xs text-rose-400 bg-rose-950/50 border border-rose-800/60 rounded-lg px-3 py-2">
                {formError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 px-4 text-xs sm:text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Получить медиаплан и расчёт матрицы SKU
            </button>

            <div className="text-[11px] text-slate-400 leading-normal">
              Расчёт включает прогноз CPL, подбор 100+ B2B-ключей и схему обхода барьера «0 отзывов».
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
