import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs, resolvers } from "./schema/schema.js"
import { connectDB } from "./config/connectDB.js"
import { verifyUser } from "./middleware/authJwt.js";

import 'dotenv/config.js'
let PORT = process.env.PORT || 8751;

/* create an express app and use JSON */
const app = new express();
const httpServer = http.createServer(app)

await connectDB()

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    context: async ({ req }) => {

        // We will verify the user's identity here.

        if (req.headers && req.headers.authorization) {

            var auth = req.headers.authorization;

            var parts = auth.split(" ");

            var bearer = parts[0];

            var token = parts[1];

            if (bearer == "Bearer") {

                const user = verifyUser(token);

                if (user.error) {

                    throw Error(user.msg);

                } else return { user };

            } else {

                throw Error("Authentication must use Bearer.");

            }

        } else {

            throw Error("User must be authenticated.");

        }

    },

})

await server.start()

app.use(
    '/graphql',
    cors(),
    bodyParser.json(),
    bodyParser.urlencoded({ extended: true }),
    expressMiddleware(server, {
        context: async ({ req }) => ({
            token: req.headers.authorization || '',
        }),
    }),
);

await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
