import {
  LineHoverOptions,
  LineOptions,
  ScriptableAndArrayOptions,
  ScriptableContext,
} from 'chart.js';
import { _DeepPartialObject } from 'chart.js/dist/types/utils';

export const JeeveLineFillOptions: _DeepPartialObject<
  ScriptableAndArrayOptions<LineOptions & LineHoverOptions, ScriptableContext<any>>
> = {
  fill: true,
  backgroundColor: 'rgba(34,127,127, 0.5)',
  borderColor: '#00695C',
  borderCapStyle: 'round',
  tension: 0.3,
};
