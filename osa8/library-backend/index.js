const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const jwt = require("jsonwebtoken")

const mongoose = require("mongoose")
mongoose.set("strictQuery", false)

const User = require("./models/user")
const Book = require("./models/book")
const Author = require("./models/author")
require("dotenv").config()

const MONGODB_URI = process.env.MONGODB_URI

console.log("connecting to", MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]
    me: User
  }

  type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]
    ): Book

    addAuthor(
      name: String!
      born: Int
    ): Author

    editAuthor(
        name: String!
        setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let query = {}
      if (args.author) {
        const author = await Author.findOne({ name: args.author })
        if (author) {
          query.author = author._id
        } else {
          return []
        }
      }
      if (args.genre) {
        query.genres = { $in: [args.genre] }
      }

      const books = await Book.find(query).populate('author')
      if (args.genre) {
        return books.filter((book) => book.genres.includes(args.genre));
      }
      return books;
    },
    allAuthors: async () => {
      return Author.find({})
    },
    me: (root, args, context) => {
      return context.currentUser
    }    
  },
  Author: {
    bookCount: async (root) => {
        const books = await Book.find({author: root._id})
        return books.length
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("not authenticated")
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError("Validation error: " + error.message)
        }
      }
      const book = new Book({ ...args, author: author._id })
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError("Validation error: " + error.message);
      }
      const populatedBook = await Book.findById(book._id).populate('author');
      return populatedBook
    },
    addAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("not authenticated")
      }
      const author = new Author({
        name: args.name,
        born: args.born
      })
      try {
        await author.save()
        return author
      } catch (error) {
        throw new GraphQLError("Validation error: " + error.message)
      }
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new GraphQLError("not authenticated");
      }
      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      try {
        return await author.save()
      } catch (error) {
        throw new GraphQLError("Validation error: " + error.message)
      }
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })
      try {
        await user.save()
        return user
      } catch (error) {
        throw new GraphQLError("Validation error: " + error.message)
      }
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
    
      if (!user || args.password !== "secret") {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' },
        })
      }
    
      const userForToken = {
        username: user.username,
        id: user._id,
      }
    
      return { value: jwt.sign(userForToken, process.env.SECRET) }
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith("Bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
});