
/**
 * class used to store the xhr error response
 */
export class ResponseError {

    status = 0;
    message = '';
    constructor ( 
        status: number,
        message: string
    ) {
        this.status = status;
        this.message = message;
    }
}