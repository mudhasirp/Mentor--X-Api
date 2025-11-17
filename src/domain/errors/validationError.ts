

import { ERROR_MESSAGE,HTTP_STATUS } from "../../shared/constants";
import { CustomError } from "./customErrors";

export class ValidationError extends CustomError {
  constructor(message: string = ERROR_MESSAGE.VALIDATION) {
    super(HTTP_STATUS.BAD_REQUEST, message);
    this.name = "ValidationError";
  }
}
