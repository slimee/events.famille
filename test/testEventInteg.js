import {init, withTest} from "test-api-express-mongo"
import api from "../src"
import ENV from "../src/env"
import {cols} from "../src/collections"
import {event1, event2} from "./database/events"
import {authGod} from "./database/users"

describe('events', function () {

    beforeEach(init(api, ENV, cols))

    describe('GET', function () {
        it('no auth', withTest({
            req: {
                url: `/api/event/${event1._id}`
            },
            res: {
                code: 401
            }
        }))

        it('basic', withTest({
            db: {
                preChange: {
                    colname: cols.EVENT,
                    doc: event1
                }
            },
            req: {
                url: `/api/event/${event1._id.toString()}`,
                headers: authGod
            },
            res: {
                bodypath: [
                    {path: "$._id", value: event1._id},
                    {path: "$.title", value: event1.title},
                    {path: "$.date", value: event1.date.toISOString()},
                ]
            }
        }))
    })

    describe('POST', function () {

        it('basic', withTest({
            req: {
                url: `/api/event`,
                headers: authGod,
                body: event2,
                method: "POST"
            },
            res: {
                bodypath: [
                    {path: "$.n", value: 1},
                    {path: "$.ok", value: 1},
                ]
            },
            db: {
                expected: {
                    colname: cols.EVENT,
                    doc: {
                        title: event2.title,
                        description: event2.description
                    }
                }
            }
        }))
    })

    describe('PUT', function () {

        it('basic', withTest({
            req: {
                url: `/api/event/${event1._id.toString()}`,
                headers: authGod,
                method: "PUT",
                body: {
                    title: "àç'jfà'jçàçàjf'ç)",
                    description: "àç'jfà'jçàçàjf'ç)2",
                }
            },
            db: {
                preChange: {
                    colname: cols.EVENT,
                    doc: event1
                },
                expected: {
                    colname: cols.EVENT,
                    doc: {
                        title: "àç'jfà'jçàçàjf'ç)",
                        description: "àç'jfà'jçàçàjf'ç)2"
                    }
                }
            }
        }))
    })
})