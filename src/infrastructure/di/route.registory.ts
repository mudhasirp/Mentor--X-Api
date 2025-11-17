import { container } from "tsyringe";
import { AuthRoutes } from "../../presentation/route/auth/auth";

export class RouteRegistry{
    static registerRoutes():void{
        container.register<AuthRoutes>(AuthRoutes,
            {useClass:AuthRoutes}
        )
    }
}