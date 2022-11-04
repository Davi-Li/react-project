/*
 * @Author: webcc
 * @Date: 2022-10-26 19:57:54
 * @LastEditTime: 2022-11-04 20:00:15
 * @email: webcc.coder@qq.com
 */
import React, { lazy, Suspense } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import AuthRoute from '@/components/AuthRoute'
import history from './utils/history'
const Login = lazy(() => import('@/pages/Login'))
const Layout = lazy(() => import('@/pages/Layout'))
const Edit = lazy(() => import('@/pages/Profile/Edit'))
const Chat = lazy(() => import('@/pages/Profile/Chat'))
const NotFound = lazy(() => import('@/components/NotFound'))
const Feedback = lazy(() => import('@/pages/Profile/Feedback'))
const Search = lazy(() => import('@/pages/Search'))

export default function App() {
    return (
        <Router history={history}>
            <div className="app">
                <Suspense fallback={<div>loading....</div>}>
                    <Switch>
                        <Redirect exact from='/' to='/home'></Redirect>
                        <Route path='/login' component={Login}></Route>
                        <Route path='/home' component={Layout}></Route>
                        <Route path='/search' component={Search}></Route>
                        {/* 需要登录才能访问 */}
                        <AuthRoute path='/profile/edit' component={Edit}></AuthRoute>
                        <AuthRoute path='/profile/chat' component={Chat}></AuthRoute>
                        <AuthRoute path='/profile/feedback' component={Feedback}></AuthRoute>
                        <Route component={NotFound}></Route>
                    </Switch>
                </Suspense>
            </div>
        </Router>
    )
}
