import { useState } from "react";
import { login } from "./api/users";
import { useNavigate } from "react-router-dom";

function App() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const[showMessage, setShowMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleLogin = async () => {

    if(username == '' || password == '') {
      setErrorMessage("Username and Password is Required");
      setShowMessage(true);
    

    }

    else {
      const response = await login(username, password);

      if(response) {
       navigate('/inventory');
       
      }
    else {
      setErrorMessage("Invalid Username and Password");
      

    }  
    setShowMessage(true);
    }
  }


  return (
    <>

<main class="container mx-auto p-4 mt-12 bg-white flex flex-col items-center justify-center text-gray-700">
    <div class="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-4">
        <h1 class="text-4xl font-semibold">Log In</h1>
    </div>
{
          showMessage &&
          (
            <div className= "m-2 text-center rounded bg-red-200 text-red-700">
              { errorMessage}
        </div>
          )
        }
    <div class="w-10/12 sm:w-8/12 md:w-6/12 lg:w-5/12 xl:w-4/12 mb-6">
        <input value={username}onChange={(e) => setUsername(e.target.value)} type="text" class="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500" type="text" placeholder="Email"/>
        <input value={password}onChange={(e) => setPassword(e.target.value)} type="password"  class="mb-4 p-2 appearance-none block w-full bg-gray-200 placeholder-gray-900 rounded border focus:border-teal-500" placeholder="Password"/>
        <div class="flex items-center">
            <div class="w-1/2 flex items-center">
                <input id="remember-me" type="checkbox" class="mt-1 mr-2" />
                <label for="remember-me">Remember me!</label>
            </div>
            <button onClick={handleLogin} class="ml-auto w-1/2 bg-gray-800 text-white p-2 rounded font-semibold hover:bg-gray-900" type="submit">Log In</button>
        </div>
    </div>
</main>




</>
  )
}

export default App