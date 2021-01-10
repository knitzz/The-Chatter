import React, {useEffect,useState} from 'react'
import NavBar from './NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './Login';
import {UserInfoProvider,useUserInfo} from '../contexts/UserInfoProvider'
import Dashboard from './Dashboard';
import { library } from '@fortawesome/fontawesome-svg-core'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import About from './About'
import Contact from './Contact'
export default function App() {

  const {userInfo} = useUserInfo();
    console.log(userInfo)
  return (
    <Router>
    <NavBar></NavBar> 
    <Switch>
    <Route exact path="/about" component={About}></Route>
    <Route exact path='/contact' component={Contact}></Route>
    <Route exact path='/' render={()=>{return (userInfo==null)?<Login />:(<Dashboard/>)}}></Route>
    </Switch>
  </Router>
  )
}
