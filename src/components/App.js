import React, { useEffect, useState } from 'react';
import { authService } from '../fbInstance';
import AppRouter from './Router';
import "./App.css";
import "boxicons";
import { getTwitterData } from '../common/FirestoreAPI';

const App = () => {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if(user) {
        getTwitterData(user.providerData[0].uid, process.env.REACT_APP_DB_TWITTER_INFO).then(data => {
          setUserObj({
            displayName: data.name,
            uid: user.uid,
            photoUrl: data.profile_image_url,
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
