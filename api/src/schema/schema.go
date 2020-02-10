package schema

var Schema = `
		schema {
			query: Query
			mutation: Mutation
		}
		# The query type, represents all of the entry points into our object graph
		type Query {
			book(id: ID!): Book 
			author(id: ID!): Author
			user(id: ID!): User

			authors(): [Author!]!
			books(): [Book!]!
		}

		type Mutation{
			createComment(bookid: ID!, text: String!): Comment 
			createUser(username: String!, password: String!, firstName: String!, lastName: String!): User
			login(username: String!, password: String!): AuthToken
		}

		interface User{
			id: ID!
			firstName: String!
			lastName: String!
		}

		interface AuthToken{
			token: String!
		}

		interface Author{
			id: ID!
			firstName: String!
			lastName: String!
			biography: String!
			books: [Book!]!
		}

		interface Book{
			id: ID!
			name: String!
			description: String!
			publishDate: String!
			author: Author!
			comments: [Comment!]!
		}

		interface Comment{
			id: ID!
			text: String!
			date: String!
			book: Book!
			user: User!  
		}
	`
