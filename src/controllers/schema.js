import { createNewUser, getAllUser, getUser, updateUser, deleteUser } from '../services/userService.js'
import { handleLogin } from '../controllers/controller-auth.js'
import { gql } from 'graphql-tag';

export const resolvers = {


    // Query
    Query: {
        users: async (parent, args) => {
            const users = await getAllUser()
            return users
        },
        user: async (parent, args) => {
            return await getUser(args.email)
        },
        login: async (parent, args) => {
            const user = await handleLogin(args.email, args.passWord)
            return user
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
    image: String
    roleId: String
    phoneNumber: String
    positionId: String
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
    login (email: String!, passWord: String!): MessageUser     
}

# Ghi dữ liệu
type Mutation {
    createUser(email: String!, passWord:String, firstName: String, lastName: String, address: String, gender: Boolean, image: String, roleId: String, phoneNumber: String, positionId: String ): Message
    updateUser(email: String!, passWord:String, firstName: String, lastName: String, address: String, gender: Boolean, image: String, roleId: String, phoneNumber: String, positionId: String ): Message
    deleteUser(email: String! ) : Message
}

 # Ghi dữ liệu realtime

`


