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
            const users = await userRepository.find()
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

// Get 1 User
export const getUser = async (id) => {
    console.log(id)
    return new Promise(async (resolve, reject) => {
        try {
            const user = await userRepository.findById(id)
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
            const newUser = new userRepository(data)
            await newUser.save()
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
            const user = await userRepository.findById(data.id)

            user.email = data.email ?? user.email ?? null
            let hashPassWordFromBcryptjs = await hashUserPassWord(data.passWord);
            data.passWord = hashPassWordFromBcryptjs;
            user.passWord = data.passWord ?? user.passWord ?? null
            user.firstName = data.firstName ?? user.firstName ?? null
            user.lastName = data.lastName ?? user.lastName ?? null
            user.address = data.address ?? user.address ?? null
            user.gender = data.gender ?? user.gender ?? null
            user.image = data.image ?? user.image ?? null
            user.roleId = data.roleId ?? user.roleId ?? null
            user.phoneNumber = data.phoneNumber ?? user.phoneNumber ?? null
            user.positionId = data.positionId ?? user.positionId ?? null

            await user.save()
            resolve("Update user success !")
        } catch (e) {
            reject(e)
        }

    })
}

//Delete 1 User
export const deleteUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            await userRepository.findByIdAndDelete(data.id)
            resolve("User have id " + data.id + " deleted!")
        } catch (e) {
            reject(e)
        }
    })
}