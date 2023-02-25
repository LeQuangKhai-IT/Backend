import { Router } from 'express'
import { getHomePage, getAllUser, getUser, postUser, putUser, deleteUser } from '../controllers/controller-user.js'
import { handleLogin } from '../controllers/controller-auth.js';
let router = Router();

let initWebRouters = (app) => {
    router.get('/', getHomePage)
    router.get('/all', getAllUser)
    router.get('/:id', getUser)
    router.post('/', postUser)
    router.put('/:id', putUser)
    router.delete('/:id', deleteUser)
    router.post('/login', handleLogin)

    return app.use('/api/v1', router)
}

export default initWebRouters;


