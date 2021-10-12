"use strict";

export interface ICommonDataRes {
    data: any;
}

export interface ICommonDataTotalRes  {
    total: number;
}

export interface ICommonResSuccess extends ICommonDataRes {
    id: any | string | number;
}

export interface ICommonResFailed {
    validations: any;
}
