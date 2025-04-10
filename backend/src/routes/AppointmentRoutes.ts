import { AppointmentController } from "../controller/AppointmentController.ts"
import { Route } from "../interface/RouteInterface.ts"

export const AppointmentRoutes: Route[] = [{
    method: "get",
    route: "/appointments",
    controller: AppointmentController,
    action: "all"
}, {
    method: "get",
    route: "/appointments/:id",
    controller: AppointmentController,
    action: "one"
}, {
    method: "post",
    route: "/appointments",
    controller: AppointmentController,
    action: "save"
}, {
    method: "delete",
    route: "/appointments/:id",
    controller: AppointmentController,
    action: "remove"
}]