export interface IResponse<T> {
    StatusCode: number
    IsSuccess: boolean
    Data: T
}