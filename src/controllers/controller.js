import { createNewUser, getAllUser, getUser, updateUser, deleteUser } from '../services/userService.js'
import { getAllService, getService, createNewService, updateService, deleteService } from '../services/service.js'
import { getAllAppointment, getAppointment, createNewAppointment, updateAppointment, deleteAppointment } from '../services/appointmentService.js'
import { sendEmail } from '../services/send-mail.js'
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

        // Appointment Query

        appointments: async (parent, args) => {
            const appointment = await getAllAppointment()
            return appointment
        },

        appointment: async (parent, args, context, info) => {
            let appointment = {}
            appointment = await getAppointment(args.idApp)
            return appointment;
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

        // Appointment
        createAppointment: async (parent, args) => {
            let masage = await createNewAppointment(args)
            return masage
        },
        updateAppointment: async (parent, args) => {
            let masage = await updateAppointment(args)
            return masage
        },
        deleteAppointment: async (parent, args) => {
            let masage = await deleteAppointment(args.idApp)
            return masage
        },
        sendMail: async (parent, args) => {
            let masage = await sendEmail(args)
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

type Appointment {
    idApp: String!
    name:String!
    email: String!
    phone: String!
    product: String!
    time: String!
    note: String!
    check: Boolean!
}

type Sendmail {
    idApp: String!
    nameFrom: String!
    nameTo:String!
    emailFrom: String!
    emailTo: String!
    phoneFrom: String!
    time: String!
    content: String!
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

type MessageEmail implements MutationResponse {
    errCode: String!
    errMessage: String!
    idApp : String!
}

type MessageService implements MutationResponse {
    errCode: String!
    errMessage: String!
    service : Service
}

type MessageAppointment implements MutationResponse {
    errCode: String!
    errMessage: String!
    appointment : Appointment
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

type MessageAllAppointment implements MutationResponse {
    errCode: String!
    errMessage: String!
    appointments:[Appointment]
}

# ROOT TYPE đọc dữ liệu
type Query {
    users: MessageAllUser
    user (email: String!):  MessageUser
    services: MessageAllService   
    service (idSer: String!):  MessageService  
    appointments: MessageAllAppointment   
    appointment (idApp: String!):  MessageAppointment  
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

     
    createAppointment(idApp: String!, name:String, email: String, phone: String, product: String, time: String, note: String, check: Boolean): Message
    updateAppointment(idApp: String!, name:String, email: String, phone: String, product: String, time: String, note: String, check: Boolean): Message
    deleteAppointment(idApp: String! ) : Message

    sendMail(idApp :String! ,nameFrom: String!, nameTo:String ,emailFrom: String ,emailTo: String ,phoneFrom: String ,time: String ,content: String): MessageEmail
}

 # Ghi dữ liệu realtime

`


