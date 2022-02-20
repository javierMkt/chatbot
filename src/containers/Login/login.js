import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/layout'
import Card from '../../components/UI/Card/card'
import { signin, isLoggedInUser } from '../../actions/auth.actions'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'

/** 
 * @function Login
*/

const Login = (props) => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if(!auth.authenticated){
      dispatch(isLoggedInUser())
    }
  }, []);

  const userLogin = (e) => {
    e.preventDefault()

    if(email == ""){
      alert("Email is required")
      return
    }
    if(password == ""){
      alert("Email is required")
      return
    }

    dispatch(signin({email, password}))
  }

  if(auth.authenticated){
    return <Redirect to={'/'}/>
  }

  return (
    <Layout>
        <div className='login-container'>
          <Card>
            <form onSubmit={userLogin}>
              <input name="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
              <input name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>

              <div>
                <button>Login</button>
              </div>
            </form>
          </Card>
        </div>
    </Layout>
  )
}

export default Login