import bcryptjs from 'bcryptjs';
import { userRepository } from '../model/user-model.js'
const salt = bcryptjs.genSaltSync(10);

// Hash Password
const hashUserPassWord = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassWord = await bcryptjs.hashSync(password, salt);
            resolve(hashPassWord)
        } catch (e) {
            reject(e)
        }

    })
}

// Get All User
export const getAllUser = async () => {

    return new Promise(async (resolve, reject) => {
        try {
            const users = await userRepository.search().return.all()
            resolve(users)
        } catch (e) {
            reject(e)
        }

    })
}

// Get 1 User
export const getUser = async (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            const user = await userRepository.fetch(data)
            resolve(user)
        } catch (e) {
            reject(e)
        }

    })
}

// Create 1 User
export const createNewUser = async (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            let hashPassWordFromBcryptjs = await hashUserPassWord(data.passWord);
            data.passWord = hashPassWordFromBcryptjs;
            await userRepository.createAndSave(data)
            resolve(" Create user success !")
        } catch (e) {
            reject(e)
        }

    })
}

// Update 1 User
export const updateUser = async (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            const user = await userRepository.fetch(data)

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
            resolve("Update user thành công !")
        } catch (e) {
            reject(e)
        }

    })
}

//Delete 1 User
export const deleteUser = async (data) => {

    return new Promise(async (resolve, reject) => {
        try {
            await userRepository.remove(data)
            resolve("User có id " + data + " đã bị xoá!")
        } catch (e) {
            reject(e)
        }

    })
}