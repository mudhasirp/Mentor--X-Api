import { ISuccessResponseHandler } from "../../../../shared/utils/sucessResponeHandler";

export interface IRegisterUserUseCase {
    execute(email: string): Promise<ISuccessResponseHandler>;
}
