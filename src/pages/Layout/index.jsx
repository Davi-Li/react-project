/*
 * @Author: webcc
 * @Date: 2022-10-27 00:41:41
 * @LastEditTime: 2022-10-29 17:08:59
 * @email: webcc.coder@qq.com
 */
import React, { Suspense, lazy } from 'react'
import style from './index.module.scss'
import classnames from 'classnames'
import Icon from '@/components/Icon'
import { useHistory, useLocation } from 'react-router-dom'
import { Route, Switch, NavLink, Link } from 'react-router-dom'
const tabBar = [
    {
        title: '首页',
        icon: 'iconbtn_home',
        path: '/home'
    },
    {
        title: '问答',
        icon: 'iconbtn_qa',
        path: '/home/qa'
    },
    {
        title: '视频',
        icon: 'iconbtn_video',
        path: '/home/video'
    },
    {
        title: '我的',
        icon: 'iconbtn_mine',
        path: '/home/profile'
    },
]
const Home = lazy(() => import('@/pages/Home'))
const Video = lazy(() => import('@/pages/Video'))
const QA = lazy(() => import('@/pages/QA'))
const Profile = lazy(() => import('@/pages/Profile'))
export default function Layout() {
    let history = useHistory();
    let location = useLocation();
    return (
        <div className={style.root}>
            <div className="tab-content">
                <Suspense fallback={<div>loading....</div>}>
                    <Switch>
                        <Route path="/home" exact component={Home}></Route>
                        <Route path="/home/video" component={Video}></Route>
                        <Route path="/home/qa" component={QA}></Route>
                        <Route path="/home/profile" component={Profile}></Route>
                    </Switch>
                </Suspense>
            </div>
            {/* 按钮区域 */}
            <div className="tabbar">
                {
                    tabBar.map(item => {
                        return (
                            <div className={classnames("tabbar-item", location.pathname == item.path ? "tabbar-item-active" : "")} key={item.title} onClick={() => { history.push(item.path) }}>
                                <Icon type={item.icon + (location.pathname == item.path ? '_sel' : "")}></Icon>
                                <span>{item.title}</span>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
