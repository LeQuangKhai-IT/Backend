import { Router } from 'express'
import { getHomePage, getStaff, postStaff, putStaff, deleteStaff } from '../controllers/controller.js'

let router = Router();

let initWebRouters = (app) => {
    router.get('/', getHomePage)
    router.get('/:id', getStaff)
    router.post('/', postStaff)
    router.put('/', putStaff)
    router.delete('/:id', deleteStaff)

    return app.use('/', router)
}

export default initWebRouters;


