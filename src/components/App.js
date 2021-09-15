import { useEffect, useState } from 'react';
import { authService } from '../fbInstance';
import AppRouter from './Router';
import "./App.css";
import "./Reset.css";

const App = () => {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if(user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          photoUrl: user.photoURL,
          updateProfile: (args) => user.updateProfile(args)
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
          // 나중에 폰트어썸에서 움직이는 이미지로 수정 예정
          "Loading..."
        )
      }
    </div>
  );
}

export default App;
