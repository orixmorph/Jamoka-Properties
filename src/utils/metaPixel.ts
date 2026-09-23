/**
 * Meta Pixel helper utility for tracking custom events and standard conversions.
 * Pixel ID: 724770330263678
 */

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: any;
  }
}

export const trackMetaPixel = (
  eventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      if (parameters) {
        window.fbq('track', eventName, parameters);
      } else {
        window.fbq('track', eventName);
      }
    } catch (err) {
      console.warn('Meta Pixel tracking notice:', err);
    }
  }
};

export const trackMetaCustomEvent = (
  customEventName: string,
  parameters?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      if (parameters) {
        window.fbq('trackCustom', customEventName, parameters);
      } else {
        window.fbq('trackCustom', customEventName);
      }
    } catch (err) {
      console.warn('Meta Pixel custom tracking notice:', err);
    }
  }
};
