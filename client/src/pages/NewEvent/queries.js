import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query getAllUsers {
    users{
        id
        username
    }
}
`;

export const GET_LOCATIONS = gql`
  query getAllLocations {
    locations{
        id
        name
    }
}
`;

export const NEW_EVENT_MUTATION = gql`
  mutation addNewEvent($data: addEventInput!) {
  addEvent(data: $data){
    id
    title
    desc
    date
  }
}
`;