import { col } from 'mongo-registry'
import ENV from '../env'

const events = col(ENV.DB_COLLECTION)

export const saveEvent = event => events.updateOne({ _id: event._id }, { $set: event }, { upsert: true })
export const deleteEvent = ({ _id }) => events.deleteOne({ _id })
export const getEvent = ({ _id }) => events.findOne({ _id })

export const searchEvents = ({}, req) => {
  const filter = {}
  const from = req.query.from && new Date(req.query.from)
  const to = req.query.to && new Date(req.query.to)

  const dateFilters = { date: {} }
  if (from) dateFilters.date.$gte = from
  if (to) dateFilters.date.$lt = to
  if (from || to) Object.assign(filter, dateFilters)

  return events
    .find(filter)
    .sort( { date: 1 } )
    .toArray()
}
