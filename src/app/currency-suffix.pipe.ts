import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencySuffix',
})
export class CurrencySuffixPipe implements PipeTransform {
  transform(input: any, args?: any): any {
    let exp;
    const suffixes = ['K', 'M', 'B', 'T', 'P', 'E'];
    const isNagtiveValues = input < 0;
    if (
      Number.isNaN(input) ||
      (input < 1000 && input >= 0) ||
      !this.isNumeric(input) ||
      (input < 0 && input > -1000)
    ) {
      if (!!args && this.isNumeric(input) && !(input < 0) && input != 0) {
        return input.toFixed(args);
      } else {
        return input;
      }
    }

    if (!isNagtiveValues) {
      exp = Math.floor(Math.log(input) / Math.log(1000));
      if (exp === 1) {
        return Math.round(input / Math.pow(1000, exp)) + suffixes[exp - 1];
      }
      let shortenedNumber = (input / Math.pow(1000, exp))
        .toFixed(args)
        .toString();
      let failsafe = 10;
      while (failsafe > 0) {
        const lastCharIndex = shortenedNumber.length - 1;
        if (
          shortenedNumber[lastCharIndex] === '0' ||
          shortenedNumber[lastCharIndex] === '.'
        ) {
          shortenedNumber = shortenedNumber.slice(0, -1);
        } else {
          break;
        }
        failsafe--;
      }
      return shortenedNumber + suffixes[exp - 1];
    } else {
      input = input * -1;
      exp = Math.floor(Math.log(input) / Math.log(1000));
      return (
        ((input * -1) / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1]
      );
    }
  }
  isNumeric(value): boolean {
    if (value < 0) value = value * -1;
    if (/^-{0,1}\d+$/.test(value)) {
      return true;
    } else if (/^\d+\.\d+$/.test(value)) {
      return true;
    } else {
      return false;
    }
  }
}
