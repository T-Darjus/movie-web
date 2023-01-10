import Signin from "./components/signin/Signin";
import Movies from "./components/movies/Movies";
import { useSelector } from "react-redux";
import { State } from "./state";

function App() {
  const signinState = useSelector((state: State) => state.signedIn);

  return <>{signinState ? <Movies /> : <Signin />}</>;
}

export default App;
