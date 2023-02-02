import Habit from "./components/Habit"
import './styles/global.css';
import logoImage from './assets/logo.svg';

function App() {
  return (
    <div className="v-sscren h-screen flex justify-center items-center">
      <div className="h-full max-w-5xl px-6 flex flex-col gap-16">
        <img src={logoImage} alt="habits" ></img>
      </div>
    </div>
  )
}
export default App
