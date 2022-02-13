export enum ResponseCodes {
    unAuthorized = 1,
    wrongInputs = 2,
    unExpectedError = 3,
    dbError = 4,
    dbErrorCustomError = 5,
    success = 0,
    internalServerError = 500,
}

export enum ResponseStatus {
    unAuthorized = 'error',
    wrongInputs = 'error',
    unExpectedError = 'error',
    dbError = 'error',
    dbErrorCustomError = 'error',
    success = 'success',
    internalServerError = 'Internal Server Error',
}

export enum ResponseMessage {
    unAuthorized = 'UNAUTHORIZED',
    wrongInputs = 'WRONG_INPUTS',
    unExpectedError = 'UNEXPECTED_ERROR',
    success = '',
    internalServerError = 'Internal Server Error',
}

export class ReturnResponses {
    errorCode: number;
    status: string;
    message: string;
    data?: any;

    emitSuccess(data: any) {
        return {
            errorCode: ResponseCodes.success,
            status: ResponseStatus.success,
            message: ResponseMessage.success,
            data: data,
        };
    }

    emitInternalServerError() {
        return {
            errorCode: ResponseCodes.internalServerError,
            status: ResponseStatus.internalServerError,
            message: ResponseMessage.internalServerError,
            data: null,
        };
    }

    emitUnAuthorized(data: any) {
        return {
            errorCode: ResponseCodes.unAuthorized,
            status: ResponseStatus.unAuthorized,
            message: ResponseMessage.unAuthorized,
            data: data,
        };
    }

    emitWrongInputs(data: any) {
        return {
            errorCode: ResponseCodes.wrongInputs,
            status: ResponseStatus.wrongInputs,
            message: ResponseMessage.wrongInputs,
            data: data,
        };
    }

    emitUnExpectedError() {
        return {
            errorCode: ResponseCodes.unExpectedError,
            status: ResponseCodes.unExpectedError,
            message: ResponseMessage.unExpectedError,
            data: null,
        };
    }

    emitDBError(message: string) {
        return {
            errorCode: ResponseCodes.dbError,
            status: ResponseStatus.dbError,
            message: message,
            data: null,
        };
    }

    emitDBCustomError(message: string) {
        return {
            errorCode: ResponseCodes.dbErrorCustomError,
            status: ResponseStatus.dbErrorCustomError,
            message: message,
            data: null,
        };
    }
}

export interface Responses {
    errorCode: number;
    status: string;
    message: string;
    data?: any;
}
