import { userRepository } from '../model/user-model.js'
import { getAllUser, getUser, createNewUser, updateUser, deleteUser } from '../services/service.js'

export const getHomePage = async (req, res) => {
    return res.render('homePage.ejs');
}

//Get all User
export const getAllUser = async (req, res) => {
    try {
        const users = await getAllUser()
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
        const user = await getUser(req.params.id)
        return res.status(200).json({
            status: 'success',
            data: { user }
        });
    } catch (error) {
        res.json(error)
    }
}

// Create user
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

        let message = await updateUser(req.params.id)
        console.log(message)
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
        let message = await deleteUser(req.params.id)
        console.log(message)
        return res.status(200).json({
            status: 'success',
            message: { entityId: req.params.id }
        });
    } catch (error) {
        res.json(error)
    }
}


