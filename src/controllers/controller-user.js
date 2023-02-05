import { userRepository } from '../model/user-model.js'
import { createNewUser } from '../middleware/auth-user.js'

export const getHomePage = async (req, res) => {
    return res.render('homePage.ejs');
}

//Get all User
export const getAllUser = async (req, res) => {
    try {
        const users = await userRepository.search().return.all()
        return res.status(200).json({
            status: 'success',
            data: { users }
        });
    } catch (error) {
        res.json(error)
    }
}

//Get user
export const getUser = async (req, res) => {
    try {
        const user = await userRepository.fetch(req.params.id)
        return res.status(200).json({
            status: 'success',
            data: { user }
        });
    } catch (error) {
        res.json(error)
    }
}

// Create user///////////////////////////////////////////////////////////////
export const postUser = async (req, res) => {

    try {
        let message = await createNewUser(req.body)
        console.log(message)
        return res.status(200).json({
            status: 'success',
            data: { user }
        });
    } catch (error) {
        res.json(error)
    }
}


// Update user
export const putUser = async (req, res) => {
    try {
        const user = await userRepository.fetch(req.params.id)

        user.email = req.body.email ?? null
        user.passWord = req.body.passWord ?? null
        user.firstName = req.body.passWord ?? null
        user.lastName = req.body.fullName ?? null
        user.address = req.body.address ?? null
        user.gender = req.body.gender ?? null
        user.image = req.body.gender ?? null
        user.roleId = req.body.roleId ?? null
        user.phoneNumber = req.body.phoneNumber ?? null
        user.positionId = req.body.gender ?? null


        await userRepository.save(user)
        return res.status(200).json({
            status: 'success',
            data: { user }
        });
    } catch (error) {
        res.json(error)
    }
}

//Delete user
export const deleteUser = async (req, res) => {

    try {
        await userRepository.remove(req.params.id)
        return res.status(200).json({
            status: 'success',
            message: { entityId: req.params.id }
        });
    } catch (error) {
        res.json(error)
    }
}


