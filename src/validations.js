import {object} from "mongo-registry"
import jwt from "jsonwebtoken"
import {X_ACCESS_TOKEN} from "./headers"
import {run} from 'express-blueforest'

const throwit = ex => {
    throw ex
}

export const validDrawer = run((o, req) => {
    let token = jwt.decode(req.headers[X_ACCESS_TOKEN])

    return !token || !token.user ?
        throwit({code: "bf401"})
        :
        !token.user.rights || token.user.rights.charAt(0) !== 'G' ?
            throwit({code: "bf403"})
            :
            o
})