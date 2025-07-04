import camelcaseKeys from 'camelcase-keys';
import { TooltipItem } from 'chart.js';

export function splitName(label: string) {
  const regex = /\w+\s\w+(?=\s)|\w+/g;
  return label.toString().trim().match(regex);
}

export function formatXLabel(label: string | number) {
  if (label && typeof label == 'string') {
    const names = splitName(label);
    const name = names[0].split(' ');
    if (names.length == 3) {
      return `${names[0]}`;
    } else if (names.length == 2) {
      if (name.length == 2) {
        return `${names[0][0]} ${name[1]}`;
      } else {
        return `${names[0][0]} ${names[1]}`;
      }
    } else {
      return `${names[0]}`;
    }
  }
  return label;
}

export function formatXTooltipLabel(tooltipItem: TooltipItem<any>) {
  return tooltipItem.parsed.y < 0 ? '- $' : `${tooltipItem.label}: $${tooltipItem.formattedValue}`;
}

export function updateUserData(newUserData: any) {
  const rawAuthData = localStorage.getItem('auth');
  const userData = rawAuthData ? JSON.parse(rawAuthData) : { authUserData: {} };
  localStorage.setItem(
    'auth',
    JSON.stringify(
      camelcaseKeys({ authUserData: { ...userData.authUserData, ...newUserData } }, { deep: true }),
    ),
  );
}
