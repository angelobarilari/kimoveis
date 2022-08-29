import { ICategoryRequest } from "../categories"

export interface IAddressRequest {
    district: string
    zipCode: string
    number?: string
    city: string
    state: string
}

export interface IPropertyRequest {
    value: number
    size: number
    address: IAddressRequest
    categoryId: string
}

export interface IPropertyResponse {
    value: number
    size: number
    address: IAddressRequest
    category: ICategoryRequest,
    sold: boolean
}