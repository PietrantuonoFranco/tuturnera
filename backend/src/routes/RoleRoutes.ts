import { RoleController } from "../controller/RoleController.ts"
import { Route } from "../interface/RouteInterface.ts"

export const RoleRoutes: Route[] = [{
    method: "get",
    route: "/roles",
    controller: RoleController,
    action: "all"
}, {
    method: "get",
    route: "/roles/:id",
    controller: RoleController,
    action: "one"
}, {
    method: "post",
    route: "/roles",
    controller: RoleController,
    action: "save"
}, {
    method: "delete",
    route: "/roles/:id",
    controller: RoleController,
    action: "remove"
}]