import {col} from "mongo-registry"
import ENV from "../env"

const films = col(ENV.DB_COLLECTION)

export const saveFilm = ({film}) => films.update({_id: film._id}, film, {upsert: true})
export const deleteFilm = ({_id}) => films.deleteOne({_id})
export const getFilm = ({_id}) => films.findOne({_id})
export const getFilmByName = ({name}) => films.findOne({"f.name": name})
export const getFilmIntro = async () => {
    const arr = await films.aggregate([
        {$match: {show: true}},
        {$sample: {size: 1}}
    ]).toArray()
    return arr[0]
}
export const getFilms = () => films.find({}, {_id: 1, "f.name": 1}).toArray()