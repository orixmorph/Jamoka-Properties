import { useCallback, useEffect, useState } from 'react';

export type SupportedCurrency = 'AED' | 'EUR' | 'USD';

export interface LiveRates {
  AED: number;
  EUR: number;
  USD: number;
}

const DEFAULT_RATES: LiveRates = {
  AED: 1,
  USD: 0.272294, // Official AED/USD peg (1 USD = 3.6725 AED)
  EUR: 0.2515,   // Live fallback if API temporarily unreachable
};

const EUROPEAN_COUNTRIES = new Set([
  'AL', 'AD', 'AT', 'BE', 'BA', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR',
  'DE', 'GR', 'HU', 'IS', 'IE', 'IT', 'XK', 'LV', 'LI', 'LT', 'LU', 'MT', 'MD',
  'MC', 'ME', 'NL', 'MK', 'NO', 'PL', 'PT', 'RO', 'SM', 'RS', 'SK', 'SI', 'ES',
  'SE', 'CH', 'UA', 'GB', 'VA',
]);

const UAE_GCC_COUNTRIES = new Set(['AE', 'SA', 'QA', 'KW', 'BH', 'OM']);

function mapCountryToCurrency(countryCode?: string): SupportedCurrency {
  if (!countryCode) return 'AED';
  const code = countryCode.toUpperCase().trim();
  if (UAE_GCC_COUNTRIES.has(code)) return 'AED';
  if (EUROPEAN_COUNTRIES.has(code)) return 'EUR';
  return 'USD';
}

function guessCurrencyFromTimezone(): SupportedCurrency {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
    if (tz.startsWith('Europe/')) return 'EUR';
    if (
      tz.includes('Dubai') ||
      tz.includes('Riyadh') ||
      tz.includes('Qatar') ||
      tz.includes('Kuwait') ||
      tz.includes('Bahrain') ||
      tz.includes('Muscat')
    ) {
      return 'AED';
    }
    if (tz.startsWith('America/') || tz.startsWith('Pacific/') || tz.startsWith('US/')) {
      return 'USD';
    }
  } catch {
    // Ignore Intl errors
  }
  return 'AED';
}

export function useLiveCurrency() {
  const [currency, setCurrencyState] = useState<SupportedCurrency>(() =>
    guessCurrencyFromTimezone()
  );
  const [userOverridden, setUserOverridden] = useState(false);
  const [rates, setRates] = useState<LiveRates>(DEFAULT_RATES);
  const [detectedCountry, setDetectedCountry] = useState<string>('');
  const [ratesLive, setRatesLive] = useState(false);

  const setCurrency = useCallback((next: SupportedCurrency) => {
    setUserOverridden(true);
    setCurrencyState(next);
  }, []);

  // 1. Fetch real-time FX rates (base AED)
  useEffect(() => {
    let active = true;

    const fetchRates = async () => {
      try {
        const res = await fetch('https://open.er-api.com/v6/latest/AED');
        if (res.ok) {
          const json = await res.json();
          const eur = Number(json?.rates?.EUR);
          const usd = Number(json?.rates?.USD);
          if (active && eur > 0 && usd > 0) {
            setRates({ AED: 1, EUR: eur, USD: usd });
            setRatesLive(true);
            return;
          }
        }
      } catch {
        // Try secondary live FX endpoint
      }

      try {
        const res2 = await fetch('https://api.frankfurter.app/latest?from=AED&to=EUR,USD');
        if (res2.ok) {
          const json2 = await res2.json();
          const eur = Number(json2?.rates?.EUR);
          const usd = Number(json2?.rates?.USD);
          if (active && eur > 0 && usd > 0) {
            setRates({ AED: 1, EUR: eur, USD: usd });
            setRatesLive(true);
          }
        }
      } catch {
        // Keep reliable fallback rates
      }
    };

    fetchRates();
    return () => {
      active = false;
    };
  }, []);

  // 2. Detect visitor's country automatically via lightweight geo-IP
  useEffect(() => {
    let active = true;

    const detectLocation = async () => {
      try {
        const res = await fetch('https://get.geojs.io/v1/ip/country.json');
        if (res.ok) {
          const data = await res.json();
          const code = typeof data?.country === 'string' ? data.country : '';
          if (active && code) {
            setDetectedCountry(data?.name || code);
            if (!userOverridden) {
              setCurrencyState(mapCountryToCurrency(code));
            }
            return;
          }
        }
      } catch {
        // Try backup geo endpoint
      }

      try {
        const res2 = await fetch('https://ipapi.co/json/');
        if (res2.ok) {
          const data2 = await res2.json();
          const code = typeof data2?.country_code === 'string' ? data2.country_code : '';
          if (active && code) {
            setDetectedCountry(data2?.country_name || code);
            if (!userOverridden) {
              setCurrencyState(mapCountryToCurrency(code));
            }
          }
        }
      } catch {
        // Timezone guess already applied
      }
    };

    detectLocation();
    return () => {
      active = false;
    };
  }, [userOverridden]);

  const formatAmount = useCallback(
    (aedValue: number, lang: 'en' | 'ar' = 'en'): string => {
      const rate = rates[currency] ?? 1;
      const rawConverted = aedValue * rate;
      // Exact value for AED; round converted EUR/USD cleanly to nearest 1,000 for crisp readability
      const displayValue =
        currency === 'AED' ? Math.round(rawConverted) : Math.round(rawConverted / 1000) * 1000;

      const formattedNumber = displayValue.toLocaleString('en-US');

      if (currency === 'EUR') return `€${formattedNumber}`;
      if (currency === 'USD') return `$${formattedNumber}`;
      return lang === 'ar' ? `${formattedNumber} درهم` : `AED ${formattedNumber}`;
    },
    [currency, rates]
  );

  const formatShort = useCallback(
    (aedValue: number, lang: 'en' | 'ar' = 'en'): string => {
      const rate = rates[currency] ?? 1;
      const converted = aedValue * rate;
      const millions = converted / 1_000_000;

      if (currency === 'AED') {
        const whole = Number.isInteger(millions) ? millions.toFixed(0) : millions.toFixed(1);
        return lang === 'ar' ? `${whole} مليون درهم` : `AED ${whole}M`;
      }
      const roundedM = millions >= 1 ? `${millions.toFixed(2)}M` : `${Math.round(converted / 1000)}K`;
      if (currency === 'EUR') return `€${roundedM}`;
      return `$${roundedM}`;
    },
    [currency, rates]
  );

  return {
    currency,
    setCurrency,
    rates,
    ratesLive,
    detectedCountry,
    formatAmount,
    formatShort,
  };
}
