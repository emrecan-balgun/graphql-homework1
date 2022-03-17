const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const { events, locations, users, participants } = require('./data');


const typeDefs = gql`
    type Event {
        id: ID!
        title: String!
        desc: String!
        date: String!
        from: String!
        to: String!
        location_id: ID!
        user_id: ID!
    }

    type Location {
        id: ID!
        name: String!
        desc: String!
        lat: Float!
        lng: Float!
    }

    type User {
        id: ID!
        username: String!
        email: String!
    }

    type Participant {
        id: ID!
        user_id: ID!
        event_id: ID!
    }

  type Query {
    # Event
    events: [Event!]!

    # Location
    locations: [Location!]!

    # User
    users: [User!]!

    # Participant
    participants: [Participant!]!
  }
`;

const resolvers = {
    Query: {
      // Event
      events: () => events,

      // Location
      locations: () => locations,

      // User
      users: () => users,

      // Participant
      participants: () => participants,
    },
};

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({})
    ]
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
