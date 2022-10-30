/*
 * @Author: webcc
 * @Date: 2022-10-26 19:57:54
 * @LastEditTime: 2022-10-30 22:18:51
 * @email: webcc.coder@qq.com
 */
import React, { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
const Login = lazy(() => import('@/pages/Login'))
const Layout = lazy(() => import('@/pages/Layout'))
const Edit = lazy(() => import('@/pages/Profile/Edit'))
const Chat = lazy(() => import('@/pages/Profile/Chat'))
export default function App() {
    return (
        <Router>
            <div className="app">
                <Suspense fallback={<div>loading....</div>}>
                    <Switch>
                        <Redirect exact from='/' to='/home'></Redirect>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/home' component={Layout}></Route>
                        <Route path='/profile/edit' component={Edit}></Route>
                        <Route path='/profile/chat' component={Chat}></Route>
                    </Switch>
                </Suspense>
            </div>
        </Router>
    )
}
