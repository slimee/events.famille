import {createObjectId} from "test-api-express-mongo"


export const event1 = {
    _id: createObjectId(),
    title: "Barbecue",
    description: "bla bla bla",
    date: new Date(),
    updatedAt: new Date()
}

export const event2 = {
    _id: createObjectId(),
    title: "Barbecue 2",
    description: "bla bla bla 2",
    date: new Date(),
    updatedAt: new Date()
}