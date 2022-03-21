const { ApolloServer, gql } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

const { events, locations, users, participants } = require('./data');
const { nanoid } = require('nanoid');

const typeDefs = gql`
    # Event
    type Event {
        id: ID!
        title: String!
        desc: String!
        date: String!
        from: String!
        to: String!
        location_id: ID!
        user_id: ID!
        user: User!
        location: Location!
        participants: [Participant!]!
    }

    input addEventInput {
        title: String!
        desc: String!
        date: String!
        from: String!
        to: String!
        location_id: ID!
        user_id: ID!
    }

    input updateEventInput {
        id: ID!
        title: String!
        desc: String!
        date: String!
        from: String!
        to: String!
        location_id: ID!
        user_id: ID!
    }

    # Location
    type Location {
        id: ID!
        name: String!
        desc: String!
        lat: Float!
        lng: Float!
    }

    input addLocationInput {
        name: String!
        desc: String!
        lat: Float!
        lng: Float!
    }

    # User
    type User {
        id: ID!
        username: String!
        email: String!
        events: [Event!]!
    }

    input addUserInput {
        username: String!
        email: String!
    }

    # Participant
    type Participant {
        id: ID!
        user_id: ID!
        event_id: ID!
    }

    input addParticipantInput {
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

  type Mutation {
      # Event
      addEvent(data: addEventInput!): Event!
      updateEvent(id: ID!, data: addEventInput!): Event!

      # Location
      addLocation(data: addLocationInput!): Location!

      # User
      addUser(data: addUserInput!): User!
      
      # Participant
      addParticipant(data: addParticipantInput!): Participant!
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
    },

    Event: {
        user: (parents) => users.find((user) => user.id === parents.user_id),

        location: (parents) => locations.find((location) => location.id === parents.location_id),
        
        participants: (parents) => participants.filter((participant) => participant.event_id === parents.id)
    },

    Mutation: {
        // Event
        addEvent: (parent, { data }) => {
            const event = {
                id: nanoid(),
                ...data
            }

            events.push(event);

            return event;
        },
        updateEvent: (parent, { id, data }) => {
            const event_index = events.findIndex((event) => event.id === id);

            if (event_index === -1) {
                throw new Error("Event not found");
            }

            const updated_event = events[event_index] = {
                ...events[event_index],
                ...data
            }

            return updated_event;
        },

        // Location
        addLocation: (parent, { data }) => {
            const location = {
                id: nanoid(),
                ...data
            }

            locations.push(location);

            return location;
        },

        // User
        addUser: (parent, { data }) => {
            const user = {
                id: nanoid(),
                ...data
            }

            users.push(user);

            return user;
        },

        // Participant
        addParticipant: (parent, { data }) => {
            const participant = {
                id: nanoid(),
                ...data
            }

            participants.push(participant);

            return participant;
        }
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
