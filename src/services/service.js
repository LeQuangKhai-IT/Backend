import bcryptjs from 'bcryptjs';
import { serviceRepository } from '../model/service-model'

// Get All User
export const getAllUser = async () => {

    return new Promise(async (resolve, reject) => {
        let userData = {}
        try {
            const users = await userRepository.find()
            userData.errCode = 0;
            userData.errMessage = "OK";
            userData.users = users;
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}

// Get 1 User
export const getUser = async (email) => {

    return new Promise(async (resolve, reject) => {
        let userData = {}
        try {
            const user = await userRepository.findOne({ email: email })

            userData.errCode = 0;
            userData.errMessage = "OK";
            userData.user = user;
            resolve(userData)

        } catch (e) {
            userData.errCode = 1;
            userData.errMessage = "User's not found!";
            resolve(userData)
        }

    })
}

// Create 1 User
export const createNewUser = async (data) => {

    return new Promise(async (resolve, reject) => {
        let userData = {}
        try {

            let check = await checkUserEmail(data.email);
            if (check === true) {
                userData.errCode = 1;
                userData.errMessage = "Your email is to used, please try another email!";
                resolve(userData)
            }
            let hashPassWordFromBcryptjs = await hashUserPassWord(data.passWord);
            data.passWord = hashPassWordFromBcryptjs;
            const newUser = new userRepository(data)
            await newUser.save()
            userData.errCode = 0;
            userData.errMessage = "Create user success !";
            resolve(userData)
        } catch (e) {
            reject(e)
        }

    })
}

// Update 1 User
export const updateUser = async (data) => {

    return new Promise(async (resolve, reject) => {
        let userData = {}
        try {
            const user = await userRepository.findOne({ email: data.email })
            let hashPassWordFromBcryptjs = undefined;
            if (data.passWord != null) {
                hashPassWordFromBcryptjs = await hashUserPassWord(data.passWord);
            }
            data.passWord = hashPassWordFromBcryptjs;
            user.passWord = data.passWord ?? user.passWord ?? undefined
            user.firstName = data.firstName ?? user.firstName ?? null
            user.lastName = data.lastName ?? user.lastName ?? null
            user.address = data.address ?? user.address ?? null
            user.gender = data.gender ?? user.gender ?? null
            user.role = data.role ?? user.role ?? null
            user.phoneNumber = data.phoneNumber ?? user.phoneNumber ?? null

            await user.save()
            userData.errCode = 0;
            userData.errMessage = "Update user success!";
            resolve(userData)
        } catch (e) {
            userData.errCode = 1;
            userData.errMessage = "User's not found!";
            resolve(userData)
        }
    })
}

//Delete 1 User
export const deleteUser = async (email) => {

    let userData = {}
    return new Promise(async (resolve, reject) => {
        try {
            let user = await userRepository.findOne({ email: email })
            if (user === null) {
                userData.errCode = 1;
                userData.errMessage = "The user is not exit!";
                resolve(userData)
            }
            await userRepository.findOneAndDelete({ email: email })
            userData.errCode = 0;
            userData.errMessage = "User have id " + email + " deleted!";
            resolve(userData)
        } catch (e) {
            reject(e)
        }
    })
}