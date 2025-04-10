import { TimetableController } from "../controller/TimetableController.ts"
import { Route } from "../interface/RouteInterface.ts"

export const TimetableRoutes: Route[] = [{
    method: "get",
    route: "/timetables",
    controller: TimetableController,
    action: "all"
}, {
    method: "get",
    route: "/timetables/:id",
    controller: TimetableController,
    action: "one"
}, {
    method: "post",
    route: "/timetables",
    controller: TimetableController,
    action: "save"
}, {
    method: "delete",
    route: "/timetables/:id",
    controller: TimetableController,
    action: "remove"
}]