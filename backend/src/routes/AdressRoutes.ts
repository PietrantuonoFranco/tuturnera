import { AdressController } from "../controller/AdressController.ts"
import { Route } from "../interface/RouteInterface.ts"

export const AdressRoutes: Route[] = [{
    method: "get",
    route: "/adresses",
    controller: AdressController,
    action: "all"
}, {
    method: "get",
    route: "/adresses/:id",
    controller: AdressController,
    action: "one"
}, {
    method: "post",
    route: "/adresses",
    controller: AdressController,
    action: "save"
}, {
    method: "delete",
    route: "/adresses/:id",
    controller: AdressController,
    action: "remove"
}]