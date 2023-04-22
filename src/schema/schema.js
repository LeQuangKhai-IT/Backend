import { createNewUser, getAllUser, getUser, updateUser, deleteUser } from '../services/userService.js'
import { handleLogin } from '../services/loginService.js';
import { registerUser } from '../services/registerService.js'
import { verifyUser } from '../middleware/authJwt.js';
import { gql } from 'graphql-tag';

export const resolvers = {

    // Query
    Query: {
        // Users Query
        users: async (parent, args) => {
            const users = await getAllUser()
            return users
        },
        user: async (parent, args, context, info) => {
            let userData = {}
            let userauth = {}
            console.log(context.token)
            if (context.token) {
                var parts = context.token.split(" ");

                var bearer = parts[0];

                var token = parts[1];

                if (bearer == "Bearer") {
                    userauth = verifyUser(token);
                    console.log(userauth)
                    if (userauth) {
                        userData.user = await getUser(userauth.email)
                    }

                } else {
                    userData.errCode = 1;
                    userData.errMessage = "Authentication must use Bearer.";
                }
            }
            else {
                userData.errCode = 2;
                userData.errMessage = "User must be authenticated.";
            }

            return userData
        },

    },

    // Mutation

    Mutation: {
        createUser: async (parent, args) => {
            let masage = await createNewUser(args)
            return masage
        },
        updateUser: async (parent, args) => {
            let masage = await updateUser(args)
            return masage
        },
        deleteUser: async (parent, args) => {
            let masage = await deleteUser(args.email)
            return masage
        },
        login: async (parent, args) => {
            const user = await handleLogin(args.email, args.passWord, args.role)
            return user
        },
        register: async (parent, args) => {
            const user = await registerUser(args)
            return user
        },
    },


    // Subscription 

}



export const typeDefs = gql`
type User {
    email: String!
    passWord:String!
    firstName: String!
    lastName: String!
    address: String
    gender: Boolean!
    role: Role!
    phoneNumber: String 
}

enum Role {
    Admin
    Staff
    Customer
  }

interface MutationResponse {
    errCode: String!
    errMessage: String!
  }

type Message implements MutationResponse {
    errCode: String!
    errMessage: String!
}

type MessageUser implements MutationResponse {
    errCode: String!
    errMessage: String!
    accessToken: String
    user : User
}

type MessageAllUser implements MutationResponse {
    errCode: String!
    errMessage: String!
    users:[User]
}

# ROOT TYPE đọc dữ liệu
type Query {
    users: MessageAllUser
    user (email: String!):  MessageUser        
}

# Ghi dữ liệu
type Mutation {
    createUser(email: String!, passWord:String, firstName: String, lastName: String, address: String, gender: Boolean, role: Role, phoneNumber: String): Message
    updateUser(email: String!, passWord:String, firstName: String, lastName: String, address: String, gender: Boolean, role: Role, phoneNumber: String ): Message
    register (email: String!, passWord:String, firstName: String, lastName: String, address: String, gender: Boolean, role: Role, phoneNumber: String ):Message
    login (email: String!, passWord: String!, role: String!): MessageUser
    deleteUser(email: String! ) : Message
}

 # Ghi dữ liệu realtime

`


