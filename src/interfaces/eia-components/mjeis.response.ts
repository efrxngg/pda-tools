export interface MicroJeisResponse<T> {
	code: number
	status: string
	message: string
	response?: T[]
	internalCorrelationId: string
}