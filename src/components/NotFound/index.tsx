/*
 * @Author: webcc
 * @Date: 2022-10-31 18:51:05
 * @LastEditTime: 2022-11-03 23:30:36
 * @email: webcc.coder@qq.com
 */
import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';

export default function NotFound() {
    const [time, setTime] = useState(3)
    const history = useHistory()
    useEffect(() => {
        let timer = window.setTimeout(() => {
            setTime(time - 1)
        }, 1000);
        if (time == 0) {
            clearTimeout(timer)
            history.push('/home')
        }
    }, [time])
    return (
        <div>
            <h1>对不起，你访问的内容不存在...</h1>
            <p>
                {time} 秒后，返回<Link to="/home">首页</Link>
            </p>
        </div>
    )
}
