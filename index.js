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
        events: [Event!]!
    }

    type Participant {
        id: ID!
        user_id: ID!
        event_id: ID!
    }

  type Query {
    # Event
    events: [Event!]!
    event(id: ID!): Event!

    # Location
    locations: [Location!]!
    location(id: ID!): Location!

    # User
    users: [User!]!
    user(id: ID!): User!

    # Participant
    participants: [Participant!]!
    participant(id: ID!): Participant!
  }
`;

const resolvers = {
    Query: {
      // Event
      events: () => events,
      event: (parent, args) => events.find((event) => event.id === args.id),

      // Location
      locations: () => locations,
      location: (parent, args) => locations.find((location) => location.id === args.id),

      // User
      users: () => users,
      user: (parent, args) => users.find((user) => user.id === args.id),

      // Participant
      participants: () => participants,
      participant: (parent, args) => participants.find((participant) => participant.id === args.id),
    },

    User: {
        events: (parents) => events.filter((event) => event.user_id === parents.id),
    }
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
