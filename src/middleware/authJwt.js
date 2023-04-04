import jwt from 'jsonwebtoken';
import 'dotenv/config.js'

export const verifyUser = (token) => {
    if (token) {
        try {
            // return the user information from the token
            return jwt.verify(token, 'secrettoken')
        } catch (err) {

            // if there's a problem with the token, throw an error

            return { error: true, msg: "Session invalid" };

        }

    }

};
