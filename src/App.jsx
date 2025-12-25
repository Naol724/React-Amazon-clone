import React, { useEffect, useContext } from 'react';
import { DataContext } from './Components/DataProvider/DataProvider';
import Routing from './Router'; 
import { Type }  from './Utility/action.Type';
import { auth } from './Utility/firebase';

function App() {
  const [{user}, dispatch] = useContext(DataContext); 
  
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser);
        // user is logged in
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        })
      } else {
        // user is logged out
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });
  }, []);
  return ( <Routing />
  );
}

export default App;
