export enum PaymentMethod {
    None = 0,
    Paypal = 1,
}

export type Payment = {
    paymentMethod: PaymentMethod
    parameters: object
    id_client:number
}

export type Paypal = {
    paymentID:string,
    payerID:string,
    amount:number
}