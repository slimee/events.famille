import {col} from "mongo-registry"
import ENV from "../env"

const events = col(ENV.DB_COLLECTION)

export const saveEvent = event => events.updateOne({_id: event._id}, {$set: event}, {upsert: true})
export const searchEvents = ({name}) => events.findOne({name})
export const deleteEvent = ({_id}) => events.deleteOne({_id})
export const getEvent = ({_id}) => events.findOne({_id})

