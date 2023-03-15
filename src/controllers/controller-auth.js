import { handleUserLogin } from "../services/loginService.js"
export const handleLogin = (email, password) => {
    let userData = {};

    return new Promise(async (resolve, reject) => {
        try {
            if (!email || !password) {
                userData.errCode = 1;
                userData.errMessage = 'Missing inputs parameter!';
            }
            else {
                userData = await handleUserLogin(email, password)
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}