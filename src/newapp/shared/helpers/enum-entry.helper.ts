type EnumEntry<E> = { key: string; value: E[keyof E] };

export function enumEntries<E extends Record<string, string | number>>(e: E): EnumEntry<E>[] {
  return Object.entries(e)
    .filter(([k, v]) => typeof v !== 'string' || !(e as any)[v])
    .map(([key, value]) => ({ key, value: value as E[keyof E] }));
}
