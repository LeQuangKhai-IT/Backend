import { userRepository } from '../model/user-model.js'
import bcryptjs from 'bcryptjs';

export const handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            const isExist = await checkUserEmail(email)
            if (isExist) {
                const user = await userRepository.search().where('email').equals(email).return.all()
                if (user) {
                    let check = await bcryptjs.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "OK";
                        userData.user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found!`
                }
            }
            else {
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in your system. please try other email!`;
                resolve(userData)
            }
        } catch (error) {
            reject(error)
        }
    })
}

export const checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await userRepository.search().where('email').equals(userEmail).return.all()
            if (user) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
}