import { useEffect, useState } from 'react';
import { authService } from '../fbInstance';
import AppRouter from './Router';

const App = () => {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    userInformation();
  }, []);


  const userInformation = async () => {
    await authService.onAuthStateChanged(user => {
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
  }

  // const refreshUser = () => {
  //   const user = authService.currentUser;
  //   setUserObj({
  //     displayName: user.displayName,
  //     uid: user.uid,
  //     updateProfile: (args) => user.updateProfile(args)
  //   });
  // }

  return (
    <div>
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
