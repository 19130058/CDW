import {Routes, Route} from 'react-router-dom';
import './App.css';
import Entertainment from './routes/Entertainment';
import Home from './routes/Home';
import LifeStyle from './routes/LifesStyle';
import Sport from './routes/Sport';
import World from './routes/World';
import Business from './routes/Business';
import Login from './routes/Login';import Signup from './routes/SignUp';
import Admin from './admin/Admin';
import NewsDetail from './routes/NewsDetail';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element= {<Home/>}></Route>
        <Route path='/world' element= {<World/>}></Route>
        <Route path='/business' element= {<Business/>}></Route>
        <Route path='/sport' element= {<Sport/>}></Route>
        <Route path='/entertainment' element= {<Entertainment/>}></Route>
        <Route path='/lifestyle' element= {<LifeStyle/>}></Route>
        <Route path='/login' element= {<Login/>}></Route>
        <Route path='/signup' element= {<Signup/>}></Route>
        <Route path='/news' element= {<NewsDetail/>}></Route>
        <Route path='/api/' element= {<Admin/>}></Route>

     
      </Routes>
    </div>
  );
}

export default App;
