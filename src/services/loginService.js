import { userRepository } from '../model/user-model.js'
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken'
import 'dotenv/config.js'

export const handleUserLogin = (email, password, role) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            const isExist = await checkUserEmail(email)
            if (isExist) {
                const user = await userRepository.findOne({ email: email, role: role })
                if (user) {
                    let check = await bcryptjs.compareSync(password, user.passWord);

                    if (check) {

                        userData.errCode = 0;
                        userData.errMessage = "Login success!";
                        const accessToken = jwt.sign({
                            email: user.email,
                            role: user.role
                        },
                            process.env.ACCESS_TOKEN_SECRET,
                            {
                                expiresIn: "2h"
                            });

                        userData.accessToken = accessToken;

                        const { passWord, ...others } = user._doc;
                        userData.user = others;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password";
                        userData.accessToken = "";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found!`;
                    userData.accessToken = "";
                }
            }
            else {
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in your system. please try other email!`;
                userData.accessToken = "";
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

export const handleAdminLogin = (email, password) => {
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
                        userData.errMessage = "Login success!";
                        const accessToken = jwt.sign({
                            email: user.email,
                            role: user.role
                        },
                            process.env.ACCESS_TOKEN_SECRET,
                            {
                                expiresIn: "2h"
                            });

                        userData.accessToken = accessToken;

                        const { passWord, ...others } = user._doc;
                        userData.user = others;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = "Wrong password";
                        userData.accessToken = "";
                    }
                } else {
                    userData.errCode = 2;
                    userData.errMessage = `User's not found!`;
                    userData.accessToken = "";
                }
            }
            else {
                userData.errCode = 1;
                userData.errMessage = `Your's Email isn't exist in your system. please try other email!`;
                userData.accessToken = "";
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}



export const handleLogin = (email, password, role) => {
    let userData = {};

    return new Promise(async (resolve, reject) => {
        try {
            if (!email || !password) {
                userData.errCode = 1;
                userData.errMessage = 'Missing inputs parameter!';
            }
            else if (role === "admin") {
                userData = await handleAdminLogin(email, password)
            } else if (role === "Customer") {
                userData = await handleUserLogin(email, password, role)
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


