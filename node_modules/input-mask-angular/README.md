# InputMaskAngular

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.png?v=101)](https://github.com/ellerbrock/typescript-badges/)

## Description

`InputMaskAngular` is an Angular library that uses [`ts-input-mask`](https://github.com/gaarutyunov/ts-input-mask) allowing to format user input on the fly. 

Based on [RadMadRobot's Input Mask Library](https://github.com/RedMadRobot/input-mask-android)

## Mask examples

1. International phone numbers: `+1 ([000]) [000] [00] [00]`
2. Local phone numbers: `([000]) [000]-[00]-[00]`
3. Names: `[A][-----------------------------------------------------]` 
4. Text: `[A…]`
5. Dates: `[00]{.}[00]{.}[9900]`
6. Serial numbers: `[AA]-[00000099]`
7. IPv4: `[099]{.}[099]{.}[099]{.}[099]`
8. Visa card numbers: `[0000] [0000] [0000] [0000]`
9. MM/YY: `[00]{/}[00]`


## Installation

```
npm install input-mask-angular --save
```

## Usage

### Directive

#### 1. Import InputMaskAngularModule

```
import { InputMaskAngularModule } from 'input-mask-angular';
```

#### 2. Apply the mask to HTMLInputElement in your template

```
<input type="text" [mask]="'{+7} ([000]) [000] [00] [00]'">

```

#### 3. Add methods to listen for changes and options

```
<input type="text"
  [mask]="'{+7} ([000]) [000] [00] [00]'"
  (formattedText)="logValue($event)" \\ text formatted by the mask: +7 (000) 000 00 00
  (extractedValue)="logValue($event)" \\ text extracted from the mask: +70000000000
  (maskFilled)="logValue($event)" \\ emits true when mask has been filled with correct value, else emits false
  [options]="options" options of type InputMaskOptions
  >

```

#### 4. You can pass default value

```
<input type="text"
  [mask]="'{+7} ([000]) [000] [00] [00]'"
  (formattedText)="logValue($event)" \\ text formatted by the mask: +7 (000) 000 00 00
  (extractedValue)="logValue($event)" \\ text extracted from the mask: +70000000000
  (maskFilled)="logValue($event)" \\ emits true when mask has been filled with correct value, else emits false
  [options]="options" options of type InputMaskOptions
  [value]="'0000000000'"
  >

```

### Pipe

Pipe allows you to format any string with the mask you provide

It is used like this: mask:'(format of mask)'

```
{{ value | mask:'{+7} ([000]) [000] [00] [00]' }}

```


## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Authors

* [**German Arutyunov**](https://github.com/gaarutyunov)

## License

This project is licensed under the [MIT License](https://github.com/gaarutyunov/input-mask-angular/blob/master/LICENSE) 

## Acknowledgments

* RadMadRobot's Android [Input Mask Library](https://github.com/RedMadRobot/input-mask-android)
* RadMadRobot's iOS [Input Mask Library](https://github.com/RedMadRobot/input-mask-ios)

## See also

* [ts-input-mask](https://github.com/gaarutyunov/ts-input-mask) TypeScript library used by the directive





