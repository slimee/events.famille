import jwt from "jsonwebtoken"
import {X_ACCESS_TOKEN} from "./headers"
import {run} from 'express-blueforest'
import {objectNoEx} from "mongo-registry"
import {check} from 'express-validator/check'

const throwit = ex => {
    throw ex
}

export const validUser = run((o, req) => {
    let token = jwt.decode(req.headers[X_ACCESS_TOKEN])

    return !token || !token.user ?
        throwit({code: "bf401"})
        :
        !token.user.rights || token.user.rights.charAt(0) !== 'G' ?
            throwit({code: "bf403"})
            :
            o
})

export const mongoId = field => {
    return check(field).exists()
        .withMessage("missing").isMongoId()
        .withMessage("invalid mongo id").customSanitizer(objectNoEx)
}


export const setDate = field => o => {
    o[field] = new Date()
    return o
}

export const setCreatedAt = setDate("createdAt")
export const setUpdatedAt = setDate("updatedAt")
