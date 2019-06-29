import {Router} from "express-blueforest"
import {check} from 'express-validator/check'
import {run} from "express-blueforest"
import {deleteFilm, getFilm, getFilmByName, getFilmIntro, getFilms, saveFilm} from "../service/filmService"
import {validDrawer} from "../validations"

const router = Router()

router.get('/api/film/all', run(getFilms))
router.get('/api/film/_id/:_id', check("_id"), run(getFilm))
router.get('/api/film/random', run(getFilmIntro))
router.get('/api/film/name/:name', check("name"), run(getFilmByName))
router.delete('/api/film/:_id', check("_id"), validDrawer, run(deleteFilm))
router.post('/api/film', check("film"), validDrawer, run(saveFilm))

module.exports = router