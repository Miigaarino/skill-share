export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function toLocaleDate(date: string) {
  return new Date(parseInt(date)).toLocaleDateString();
}
