import { userRepository } from '../model/user-model.js'
import bcryptjs from 'bcryptjs';

export const handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            const isExist = await checkUserEmail(email)
            if (isExist) {
                const user = await userRepository.findOne({ email: email })
                if (user) {
                    let check = await bcryptjs.compareSync(password, user.passWord);

                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = "USER_LOGIN_SUCCESS";
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found!`;
                }
            }
            else {
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in your system. please try other email!`;
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

export const checkUserEmail = (userEmail) => {

    return new Promise(async (resolve, reject) => {
        try {
            const user = await userRepository.findOne({ email: userEmail })
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


