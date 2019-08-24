import { Router, run } from 'express-blueforest'
import { check } from 'express-validator/check'
import { deleteEvent, getEvent, saveEvent, searchEvents } from '../service/eventService'
import { mongoId, setCreatedAt, setOid, setUpdatedAt, validOwner, validUser } from '../validations'
import { col } from 'mongo-registry'
import ENV from '../env'

const router = Router()
const events = col(ENV.DB_COLLECTION)

router.post('/api/event',
  mongoId('_id'),
  mongoId('tid'),
  check('title').isString().isLength({ min: 3, max: 100 }).withMessage('3c. min, 100c. max'),
  check('date').isISO8601().toDate().withMessage('ISO8601 date ex. 2019-07-13T12:11:32.570Z'),
  validUser,
  run(setCreatedAt),
  run(setOid),
  run(saveEvent),
)

router.put('/api/event',
  mongoId('_id'),
  mongoId('tid').optional(),
  check('title').isString().isLength({ min: 3, max: 100 }).withMessage('5c. min, 100c. max').optional(),
  check('date').isISO8601().toDate().withMessage('ISO8601 date ex. 2019-07-13T12:11:32.570Z').optional(),
  validUser,
  validOwner(events),
  run(setUpdatedAt),
  run(saveEvent),
)

router.get('/api/events', validUser, run(searchEvents))

router.get('/api/event/:_id',
  mongoId('_id'),
  validUser,
  run(getEvent),
)

router.delete('/api/event/:_id',
  mongoId('_id'),
  validUser,
  validOwner(events),
  run(deleteEvent),
)

module.exports = router