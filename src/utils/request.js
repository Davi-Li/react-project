/*
 * @Author: webcc
 * @Date: 2022-10-29 11:25:04
 * @LastEditTime: 2022-10-29 14:00:10
 * @email: webcc.coder@qq.com
 */
import { Toast } from 'antd-mobile'
import axios from 'axios'

export const baseURL = 'http://geek.itheima.net/v1_0/'
const request = axios.create({
    baseURL,
    timeout: 5000
})

request.interceptors.request.use(
    function (config) {
        return config
    },
    (err) => {
        // 返回失败的Promise
        return Promise.reject(err)
    }
)

request.interceptors.response.use(
    function (res) {
        return res.data;
    },
    function (err) {
        // 错误统一处理
        if (err.response) {
            Toast.show({
                content: err.response.data.message,
            })
        } else {
            Toast.show({
                content: '网络繁忙，请稍后重试',
            })
        }
        // 返回失败的Promise
        return Promise.reject(err)
        // // 配置token过期处理
        // if (err.response.status == 401) {
        //     message.warn("登录信息过期，请重新登录")
        //     removeToken();
        //     // 跳转
        //     history.push('/login')
        // }
    }
)

export default request