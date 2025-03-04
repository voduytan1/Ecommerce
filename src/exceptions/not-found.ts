import { HttpException, ErrorCode } from './root';
export class NotFoundException extends HttpException {
    constructor(message: string, errorCode: ErrorCode) {
        super(message, 404, errorCode, null);
    }
}