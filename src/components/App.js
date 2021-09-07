import firebase from '../fbInstance'
import AppRouter from './Router';

const App = () => {
  console.log(firebase);
  return (
    <div>
      <AppRouter></AppRouter>
    </div>
  );
}

export default App;
