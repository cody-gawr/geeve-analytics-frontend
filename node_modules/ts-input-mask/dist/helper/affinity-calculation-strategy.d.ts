import { Mask } from './mask';
import { CaretString } from '../model';
import '../util/string';
export declare enum AffinityCalculationStrategy {
    WHOLE_STRING = 0,
    PREFIX = 1
}
export declare class AffinityCalculation {
    readonly strategy: AffinityCalculationStrategy;
    constructor(strategy: AffinityCalculationStrategy);
    calculateAffinityOfMask(mask: Mask, text: CaretString, autocomplete: boolean): number;
}
