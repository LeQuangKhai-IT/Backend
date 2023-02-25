import { createNewUser, getAllUser, getUser, updateUser, deleteUser } from '../services/service.js'
import gql from 'graphql-tag';

export const resolvers = {

    // Query
    Query: {
        users: async (parent, args) => {
            const users = await getAllUser()
            return users
        },
        user: async (parent, args) => { return await getUser(args.id) }
    },

    // Mutation

    Mutation: {
        createUser: async (parent, args) => {
            let masage = await createNewUser(args)
            console.log(masage)

        },
        updateUser: async (parent, args) => {
            let masage = await updateUser(args)
            console.log(masage)

        },
        deleteUser: async (parent, args) => {
            let masage = await deleteUser(args)
            console.log(masage)

        }
    },


    // Subscription 

}



export const typeDefs = gql`#graphql
type User {
    email: String!
    passWord:String!
    firstName: String!
    lastName: String!
    address: String
    gender: Boolean!
    image: String
    roleId: String!
    phoneNumber: String
    positionId: String!
}

# ROOT TYPE đọc dữ liệu
type Query {
    users:[User]
    user (id: ID!): User
    login (email: String!, passWord: String!): User
}

# Ghi dữ liệu
type Mutation {
    createUser(email: String, passWord:String, firstName: String, lastName: String, address: String, gender: Boolean, image: String, roleId: String, phoneNumber: String, positionId: String ): User
    updateUser(id: ID!,email: String, passWord:String, firstName: String, lastName: String, address: String, gender: Boolean, image: String, roleId: String, phoneNumber: String, positionId: String ): User
    deleteUser(id: ID!) : User
}

 # Ghi dữ liệu realtime

`


