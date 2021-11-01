import {
    makeExecutableSchema
} from "@graphql-tools/schema";
import postType from "../post/post.types";
import userType from "../user/user.types";
import resolvers from './comment.resolvers'
import commentType from './comment.types'

const typeDefs = commentType

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
});

export default commentSchema = {
    schema
};