export enum PaymentMethod {
    None,
    Paypal,
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