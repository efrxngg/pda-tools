export interface MicroJeisRequest {
    informationService: string
    inputs: Input[]
}

export interface Input {
    key: string
    value: string
}
