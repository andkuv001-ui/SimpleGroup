import React, { useState } from 'react';
import { Copy, Check, Download, RotateCcw } from 'lucide-react';
import { COPY_TEMPLATES } from '../data/caseData';

type TemplateKey = keyof typeof COPY_TEMPLATES;

export const CopyTemplatesSection: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState<TemplateKey>('telegram');
  const [customTexts, setCustomTexts] = useState<Record<TemplateKey, string>>({
    telegram: COPY_TEMPLATES.telegram.text,
    vcru: COPY_TEMPLATES.vcru.text,
    pitch: COPY_TEMPLATES.pitch.text
  });
  const [copied, setCopied] = useState(false);

  const currentMeta = COPY_TEMPLATES[selectedKey];
  const currentText = customTexts[selectedKey];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = currentText;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleReset = () => {
    setCustomTexts((prev) => ({
      ...prev,
      [selectedKey]: COPY_TEMPLATES[selectedKey].text
    }));
  };

  const handleDownloadText = () => {
    const blob = new Blob([currentText], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `case_b2b_upakovka_${selectedKey}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="text-xs text-slate-500">
            Готовые материалы для публикации · 3 формата упаковки кейса
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mt-1">
            Тексты кейса для соцсетей, портфолио и КП
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Выберите площадку, при необходимости отредактируйте текст прямо в окне и скопируйте в один клик.
          </p>
        </div>

        {/* Segmented Format Selector */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg self-start lg:self-auto">
          <button
            type="button"
            onClick={() => setSelectedKey('telegram')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              selectedKey === 'telegram'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Telegram / TenChat
          </button>
          <button
            type="button"
            onClick={() => setSelectedKey('vcru')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              selectedKey === 'vcru'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Статья VC.ru / Сайт
          </button>
          <button
            type="button"
            onClick={() => setSelectedKey('pitch')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              selectedKey === 'pitch'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Выжимка для КП
          </button>
        </div>
      </div>

      {/* Editor Header + Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h4 className="text-base font-display font-bold text-slate-900">{currentMeta.title}</h4>
          <p className="text-xs text-slate-500 mt-0.5">{currentMeta.subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Сбросить</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadText}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Скачать .MD</span>
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors whitespace-nowrap"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Скопировано в буфер</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Скопировать текст</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Editable Case Textarea */}
      <div>
        <textarea
          value={currentText}
          onChange={(e) =>
            setCustomTexts((prev) => ({
              ...prev,
              [selectedKey]: e.target.value
            }))
          }
          rows={16}
          aria-label="Готовый текст кейса"
          className="w-full p-4 sm:p-5 bg-slate-50 border border-slate-200 rounded-xl font-sans text-sm text-slate-800 leading-relaxed focus:outline-none focus:border-slate-900 transition-colors resize-y"
        />
        <div className="mt-2 flex items-center justify-between text-xs text-slate-500 font-mono tabular-nums">
          <span>Символов: {currentText.length}</span>
          <span>Бюджет по кейсу: 5 588,8 ₽ · CPL: 49,9 ₽ · Рост: ×10</span>
        </div>
      </div>
    </div>
  );
};
