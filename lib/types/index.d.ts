import * as React from 'react';
export type Currency = 'NGN' | 'NGNT' | 'USDT' | 'USDC' | 'BUSD' | 'GBP' | 'USD';
export type PaymentChannels = 'bank' | 'card' | 'vella' | 'crypto' | 'mobile_money';
interface Response {
    status: string;
}
interface SuccessResponse extends Response {
    transactionRef?: string;
    data?: any;
}
export interface VellaProps {
    vellaKey: string;
    billingEmail: string;
    firstName?: string;
    lastName?: string;
    phone?: string | number;
    amount: string | number;
    currency?: Currency;
    channels?: PaymentChannels[];
    reference?: string;
    merchantId: string;
    billingName?: string;
    handleWebViewMessage?: (string: string) => void;
    onCancel: (Response: Response) => void;
    onSuccess: (SuccessResponse: SuccessResponse) => void;
    autoStart?: boolean;
    activityIndicatorColor?: string;
    ref: React.ReactElement;
}
export interface VellaRef {
    startTransaction: () => void;
    endTransaction: () => void;
}
export {};
//# sourceMappingURL=index.d.ts.map