import bcryptjs from 'bcryptjs';
import { userRepository } from '../model/user-model.js'
const salt = bcryptjs.genSaltSync(10);


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


