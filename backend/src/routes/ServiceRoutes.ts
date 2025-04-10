import { ServiceController } from "../controller/ServiceController.ts"
import { Route } from "../interface/RouteInterface.ts"

export const ServiceRoutes: Route[] = [{
    method: "get",
    route: "/services",
    controller: ServiceController,
    action: "all"
}, {
    method: "get",
    route: "/services/:id",
    controller: ServiceController,
    action: "one"
}, {
    method: "post",
    route: "/services",
    controller: ServiceController,
    action: "save"
}, {
    method: "delete",
    route: "/services/:id",
    controller: ServiceController,
    action: "remove"
}]