import { gql } from '@apollo/client';

export const GET_EVENT = gql`
  query getEvent($id: ID!){
  event(id: $id) {
    id
    location{
      name
    }
    user{
      username
    }
  }
}
`;

