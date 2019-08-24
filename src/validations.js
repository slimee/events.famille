import jwt from 'jsonwebtoken'
import { X_ACCESS_TOKEN } from './headers'
import { run } from 'express-blueforest'
import { object, objectNoEx } from 'mongo-registry'
import { check } from 'express-validator/check'

const throwit = ex => {
  throw ex
}

export const validGod = run((o, req) => {
  let token = jwt.decode(req.headers[X_ACCESS_TOKEN])

  return !token || !token.user ?
    throwit({ code: 'bf401' })
    :
    !token.user.rights || token.user.rights.charAt(0) !== 'G' ?
      throwit({ code: 'bf403' })
      :
      o
})

export const validUser = run((o, req) => {
  let token = jwt.decode(req.headers[X_ACCESS_TOKEN])
  if (!token || !token.user) {
    throw { code: 'bf401' }
  }
  req.user = token.user
  req.user._id = object(req.user._id)
  return o
})

export const validOwner = (col, field = "_id") => run(async (o, req) => {
  const doc = await col.findOne({_id: o[field]})
  const validOwner =
    (!doc && "no doc")
    ||
    (req.user._id.equals(doc.oid) && "owner")
    ||
    (req.user.rights && req.user.rights.charAt(0) === 'G' && "god")

  validOwner || throwit({code: "bf403"})

  return o
})

export const setOid = (o, req) => (o.oid = req.user._id) && o

export const validOptionalDate = field => check(field).optional().isISO8601().toDate()

export const mongoId = field => {
  return check(field).exists()
    .withMessage('missing').isMongoId()
    .withMessage('invalid mongo id').customSanitizer(objectNoEx)
}


export const setDate = field => o => {
  o[field] = new Date()
  return o
}

export const setCreatedAt = setDate('createdAt')
export const setUpdatedAt = setDate('updatedAt')
