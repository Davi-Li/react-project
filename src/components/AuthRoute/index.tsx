/*
 * @Author: webcc
 * @Date: 2022-10-30 23:45:19
 * @LastEditTime: 2022-11-03 23:23:33
 * @email: webcc.coder@qq.com
 */
import { hasToken } from '@/utils/token'
import React from 'react'
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom'

interface Props extends RouteProps {
    // any是props类型
    component: React.ComponentType<any>
}

export default function AuthRoute({ component: Component, ...rest }: Props) {
    const location = useLocation()
    return (
        <Route
            {...rest}
            render={() => {
                if (hasToken()) {
                    return <Component></Component>
                } else {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: {
                                    // 从哪儿来的
                                    from: location.pathname,
                                },
                            }}
                        ></Redirect>
                    )
                }
            }}
        ></Route>
    )
}
