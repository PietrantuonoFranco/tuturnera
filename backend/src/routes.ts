import { AdressRoutes } from "./routes/AdressRoutes.ts"
import { AppointmentRoutes } from "./routes/AppointmentRoutes.ts"
import { RoleRoutes } from "./routes/RoleRoutes.ts"
import { ServiceRoutes } from "./routes/ServiceRoutes.ts"
import { TimetableRoutes } from "./routes/TimetableRoutes.ts"
import { UserRoutes } from "./routes/UserRoutes.ts"
import { Route } from "./interface/RouteInterface.ts"

export const Routes: Route[][] = [
    AdressRoutes,
    AppointmentRoutes,
    RoleRoutes,
    ServiceRoutes,
    TimetableRoutes,
    UserRoutes
]