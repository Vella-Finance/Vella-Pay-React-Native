import { PaymentChannels } from './types/index';
type AmountValue = string | number;
export declare function isValidStringAmount(stringAmount: string): boolean;
export declare function isValidDecimalMonetaryValue(amountValue: AmountValue | any): boolean;
export declare function isNegative(amountValue: AmountValue): boolean;
export declare function toNumber(string: string): number;
export declare function toString(amountValue: AmountValue): AmountValue;
export declare function toAmountInKobo(amountValue: AmountValue): number;
export declare const getAmountValue: (amount: AmountValue) => number;
export declare const getChannels: (channelsArrary: PaymentChannels[]) => string;
export {};
//# sourceMappingURL=helper.d.ts.map