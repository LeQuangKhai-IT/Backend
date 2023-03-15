import { Router } from 'express'
import { resolvers } from '../controllers/schema.js'
import { handleLogin } from '../controllers/controller-auth.js';
let router = Router();

let initWebRouters = (app) => {
    router.get('/all', resolvers.Query.users)
    router.get('/:id', resolvers.Query.user)
    router.post('/', postUser)
    router.put('/:id', putUser)
    router.delete('/:id', deleteUser)
    router.post('/login', handleLogin)

    return app.use('/', router)
}

export default initWebRouters;


