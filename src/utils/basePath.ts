export function getBasePath(): string {
  const raw = import.meta.env.BASE_URL || '/';
  return raw.endsWith('/') ? raw : `${raw}/`;
}

export function withBasePath(path: string): string {
  if (!path) return getBasePath();
  if (/^(https?:|data:|blob:|mailto:|tel:|#)/i.test(path)) {
    return path;
  }
  const base = getBasePath();
  const clean = path.replace(/^\/+/, '');
  return `${base}${clean}`;
}

export function stripBasePath(pathname: string): string {
  const base = getBasePath().replace(/\/+$/, '');
  if (base && base !== '/') {
    const lowerPath = pathname.toLowerCase();
    const lowerBase = base.toLowerCase();
    if (lowerPath === lowerBase) {
      return '/';
    }
    if (lowerPath.startsWith(`${lowerBase}/`)) {
      return pathname.slice(base.length) || '/';
    }
  }
  return pathname || '/';
}
