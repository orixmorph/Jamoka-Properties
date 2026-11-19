import React, { useEffect, useRef, useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

declare global {
  interface Window {
    google?: {
      translate?: {
        TranslateElement?: {
          new (
            options: {
              pageLanguage: string;
              includedLanguages: string;
              layout: number;
              autoDisplay?: boolean;
            },
            elementId: string
          ): unknown;
          InlineLayout: {
            SIMPLE: number;
            HORIZONTAL: number;
            VERTICAL: number;
          };
        };
      };
    };
    jamokaGoogleTranslateInit?: () => void;
  }
}

interface GoogleTranslateWidgetProps {
  label: string;
  alignEnd?: boolean;
  openSignal?: number;
}

const INCLUDED_LANGUAGES = 'en,ar,fr,de,it,es,nl,ru,pt,sv,no,da,pl,zh-CN,tr';
const ELEMENT_ID = 'jamoka_google_translate_element';

export const GoogleTranslateWidget: React.FC<GoogleTranslateWidgetProps> = ({
  label,
  alignEnd = true,
  openSignal = 0,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (openSignal > 0) {
      setIsOpen(true);
    }
  }, [openSignal]);

  const initTranslateElement = () => {
    if (initializedRef.current) return;
    const host = document.getElementById(ELEMENT_ID);
    const TranslateElement = window.google?.translate?.TranslateElement;
    if (!host || !TranslateElement) return;
    if (host.childElementCount > 0) {
      initializedRef.current = true;
      return;
    }

    try {
      new TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: INCLUDED_LANGUAGES,
          layout: TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false,
        },
        ELEMENT_ID
      );
      initializedRef.current = true;
    } catch {
      // Ignore third-party initialization errors gracefully
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    if (window.google?.translate?.TranslateElement) {
      initTranslateElement();
      setScriptLoaded(true);
      return;
    }

    window.jamokaGoogleTranslateInit = () => {
      initTranslateElement();
      setScriptLoaded(true);
    };

    const existingScript = document.getElementById('jamoka-google-translate-script');
    if (!existingScript) {
      const script = document.createElement('script');
      script.id = 'jamoka-google-translate-script';
      script.src =
        'https://translate.google.com/translate_a/element.js?cb=jamokaGoogleTranslateInit';
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  return (
    <div ref={containerRef} className="relative shrink-0">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label={label}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-slate-200 bg-white hover:border-[#CFA55A] text-slate-700 hover:text-slate-900 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
      >
        <Globe className="w-3.5 h-3.5 text-[#A6833D] shrink-0" />
        <span className="hidden xl:inline">{label}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 text-slate-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      <div
        className={`absolute top-full mt-2 w-60 rounded-lg bg-white border border-slate-200 shadow-lg p-3 z-50 transition-all ${
          alignEnd ? 'end-0' : 'start-0'
        } ${isOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-1'}`}
      >
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-2">
          {label}
        </p>
        <div id={ELEMENT_ID} className="jamoka-gt-container min-h-[34px]" />
        {!scriptLoaded && isOpen && (
          <p className="text-[11px] text-slate-400 mt-1">Loading language selector...</p>
        )}
      </div>
    </div>
  );
};
