import {
    makeExecutableSchema
} from "@graphql-tools/schema";
import resolvers from './user.resolvers'
import userType from './user.types'
import commentType from "../comment/comment.types";
import postType from "../post/post.types";

const typeDefs = userType

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default userSchema = {
    schema
};