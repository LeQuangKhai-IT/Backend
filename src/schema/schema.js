import { users } from "../data/staticdata.js"
import { createNewUser, getAllUser } from '../services/service.js'
import gql from 'graphql-tag';

export const resolvers = {

    // Query
    Query: {
        users: async (parent, args) => {
            const users = await getAllUser()
            console.log(users)
            return users
        },
        user: (parent, args) => users.find(user => user.id.toString() === args.id)
    },

    // Mutation

    Mutation: {
        createUser: async (parent, args) => {
            let masage = await createNewUser(args)
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
}

# Ghi dữ liệu
type Mutation {
    createUser(email: String, passWord:String, firstName: String, lastName: String, address: String, gender: Boolean, image: String, roleId: String, phoneNumber: String, positionId: String ): User
}

 # Ghi dữ liệu realtime

`


