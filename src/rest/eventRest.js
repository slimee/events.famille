import {Router, run} from "express-blueforest"
import {check} from 'express-validator/check'
import {deleteEvent, getEvent, saveEvent, searchEvents} from "../service/eventService"
import {mongoId, setCreatedAt, setDate, setUpdatedAt, validUser} from "../validations"

const router = Router()

router.post('/api/event',
    mongoId("_id"),
    check("title").isString().isLength({min: 5, max: 100}).withMessage("5c. min, 100c. max"),
    check("description").isString().isLength({min: 5, max: 1000}).withMessage("5c. min, 1000c. max"),
    check("date").isISO8601().toDate().withMessage("ISO8601 date ex. 2019-07-13T12:11:32.570Z"),
    validUser,
    run(setCreatedAt),
    run(saveEvent)
)

router.put('/api/event/:_id',
    mongoId("_id"),
    check("title").isString().isLength({min: 5, max: 100}).withMessage("5c. min, 100c. max").optional(),
    check("description").isString().isLength({min: 5, max: 1000}).withMessage("5c. min, 1000c. max").optional(),
    check("date").isISO8601().toDate().withMessage("ISO8601 date ex. 2019-07-13T12:11:32.570Z").optional(),
    validUser,
    run(setUpdatedAt),
    run(saveEvent)
)

router.get('/api/events', validUser, run(searchEvents))

router.get('/api/event/:_id',
    mongoId("_id"),
    validUser,
    run(getEvent)
)

router.delete('/api/event/:_id', check("_id"), validUser, run(deleteEvent))

module.exports = router