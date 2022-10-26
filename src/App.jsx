/*
 * @Author: webcc
 * @Date: 2022-10-26 19:57:54
 * @LastEditTime: 2022-10-27 00:50:50
 * @email: webcc.coder@qq.com
 */
import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom'
const Login = React.lazy(() => import('@/pages/Login'))
const Home = React.lazy(() => import('@/pages/Home'))
export default function App() {
    return (
        <Router>
            <div className="app">
                <Suspense fallback={<div>loading....</div>}>
                    <Switch>
                        <Redirect exact from='/' to='/home'></Redirect>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/home' component={Home}></Route>
                    </Switch>
                </Suspense>
            </div>
        </Router>
    )
}
