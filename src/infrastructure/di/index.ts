import { RepositoryRegistry } from "./repository.registory";
import { RouteRegistry } from "./route.registory";
import { ServiceRegistry } from "./service.register";
import { UseCaseRegistry } from "./useCase.registry";

export class DependecyInjection {
    static registerAll():void {
        RepositoryRegistry.registerRepositories();
        UseCaseRegistry.registerUsecases();
        RouteRegistry.registerRoutes()
        ServiceRegistry.registerService()
    }
}