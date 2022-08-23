export class HttpResponse {

    timestamp: Date;
    statusCode: number;
    status: string;
    reasone: string;
    message: string;
    data: { values: Object[], value: Object }; // ovo mora da ima isti naziv kao naziv mape iz JSON-a!!!

    constructor(timestamp: Date, statusCode: number, status: string, reasone: string, message: string, data: { values: Object[], value: Object }) {
        this.timestamp = timestamp;
        this.statusCode = statusCode;
        this.status = status;
        this.reasone = reasone;
        this.message = message;
        this.data = data;
    }

}