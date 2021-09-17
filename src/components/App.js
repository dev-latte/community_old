import React, { useEffect, useState } from 'react';
import { authService } from '../fbInstance';
import AppRouter from './Router';
import "./App.css";
import "boxicons";
import { getData } from '../common/FirestoreAPI';

const App = () => {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if(user) {
        getData(user.providerData[0].uid, process.env.REACT_APP_DB_TWITTER_INFO).then(data => {
          setUserObj({
            displayName: user.displayName,
            uid: user.uid,
            photoUrl: user.photoURL,
            twitterId: data.screen_name,
            updateProfile: (args) => user.updateProfile(args)
          });
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);

  return (
    <div className="container">
      {init ? (
        <AppRouter
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
        ) : (
          <box-icon name='loader' animation='spin'/>
        )
      }
    </div>
  )
}

export default App;
