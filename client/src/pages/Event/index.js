// import { useParams } from 'react-router-dom';
// import { useQuery } from '@apollo/client';
// import { GET_EVENT } from './queries';

// function Event() {
//     const { id } = useParams();
    
//     const { loading, error, data } = useQuery(GET_EVENT, {
//         variables: {
//             id: id
//         }
//     });

//   return (
//     <div>
//         Event
//     </div>
//   )
// }

// export default Event

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_EVENT } from './queries';


function Event() {
    const { id } = useParams();

    const { loading, error, data } = useQuery(GET_EVENT, {
        variables: {
            id,
        },
    });
    
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }
    
  return (
    <div>
        <h3>User name: {data.event.user.username}</h3>
        <h3>Location name: {data.event.location.name}</h3>
    </div>
  )
}

export default Event