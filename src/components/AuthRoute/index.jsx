/*
 * @Author: webcc
 * @Date: 2022-10-30 23:45:19
 * @LastEditTime: 2022-10-31 13:17:05
 * @email: webcc.coder@qq.com
 */
import { hasToken } from '@/utils/token'
import React from 'react'
import { Redirect, Route } from 'react-router-dom'

export default function AuthRoute({ component: Component, ...rest }) {
    return <Route {...rest} render={({ location }) => {
        if (hasToken()) {
            return <Component></Component>
        } else {
            return (
                <Redirect
                    to={{
                        pathname: '/login',
                        // 不用state传参刷新会丢失信息
                        state: {
                            from: location.pathname
                        }
                    }}>
                </Redirect>
            )
        }
    }}></Route>
}
