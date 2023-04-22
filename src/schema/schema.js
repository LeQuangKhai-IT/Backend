import { createNewUser, getAllUser, getUser, updateUser, deleteUser } from '../services/userService.js'
import { getAllService, getService, createNewService, updateService, deleteService } from '../services/service.js'
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
        // Services Query
        services: async (parent, args) => {
            const service = await getAllService()
            return service
        },
        service: async (parent, args, context, info) => {
            let service = {}
            service = await getService(args.idSer)
            return service;
        },
    },

    // Mutation

    Mutation: {
        //User
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
        //Service
        createService: async (parent, args) => {
            let masage = await createNewService(args)
            return masage
        },
        updateService: async (parent, args) => {
            let masage = await updateService(args)
            return masage
        },
        deleteService: async (parent, args) => {
            let masage = await deleteService(args.idSer)

            return masage
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

type Service {
    idSer: String!
    title:String!
    image: String!
    fee: String!
    descript: String!
    type: Type!
}

enum Type {
    Hardware
    Software
    Orther
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

type MessageService implements MutationResponse {
    errCode: String!
    errMessage: String!
    service : Service
}

type MessageAllUser implements MutationResponse {
    errCode: String!
    errMessage: String!
    users:[User]
}

type MessageAllService implements MutationResponse {
    errCode: String!
    errMessage: String!
    services:[Service]
}

# ROOT TYPE đọc dữ liệu
type Query {
    users: MessageAllUser
    user (email: String!):  MessageUser
    services: MessageAllService   
    service (idSer: String!):  MessageService    
}

# Ghi dữ liệu
type Mutation {
    createUser(email: String!, passWord:String, firstName: String, lastName: String, address: String, gender: Boolean, role: Role, phoneNumber: String): Message
    updateUser(email: String!, passWord:String, firstName: String, lastName: String, address: String, gender: Boolean, role: Role, phoneNumber: String ): Message
    deleteUser(email: String! ) : Message
    register (email: String!, passWord:String, firstName: String, lastName: String, address: String, gender: Boolean, role: Role, phoneNumber: String ):Message
    login (email: String!, passWord: String!, role: String!): MessageUser
    createService(idSer: String!, title:String, image: String, fee: String, descript: String, type: Type): Message
    updateService(idSer: String!, title:String, image: String, fee: String, descript: String, type: Type): Message
    deleteService(idSer: String! ) : Message

}

 # Ghi dữ liệu realtime

`


