import {
    makeExecutableSchema
} from "@graphql-tools/schema";
import resolvers from './post.resolvers'
import postType from './post.types'
import commentType from "../comment/comment.types";
import userType from "../user/user.types";

const typeDefs = postType

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default postSchema = {
    schema
};