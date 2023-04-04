import bcryptjs from 'bcryptjs';
import { userRepository } from '../model/user-model.js'
import { checkUserEmail } from './loginService.js';

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

export const registerUser = async (data) => {

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
            userData.errMessage = "Register user success!";
            userData.user = newUser
            resolve(userData)
        } catch (e) {
            reject(e)
        }

    })
}