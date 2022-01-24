const resolvers = {
    Query: {
        async author(root, {id}, context, info) {
            // Fetch an author by ID here...
        },
        async authors(root, args, context, info) {
            // Fetch all authors here...
        },
        async book(root, {id}, context, info) {
            // Fetch an book by ID here...
        },
        async books(root, args, context, info) {
            // Fetch all books here...
        }
    }
}

export const resolvers;