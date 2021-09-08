import { useEffect, useState } from 'react';
import { authService } from '../fbInstance';
import AppRouter from './Router';



const App = () => {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);

  // userObj 셋팅을 어떻게 할 것인지에 대한 문제
  useEffect(() => {
    authService.onAuthStateChanged(user => {
      if(user) {
        console.log(authService.currentUser);
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
        // 나중에 폰트어썸에서 움직이는 이미지로 수정 예정
        <AppRouter
          isLoggedIn={Boolean(userObj)}
          userObj={userObj}
        />
        ) : (
          "Loading..."
        )
      }

    </div>
  );
}

export default App;
