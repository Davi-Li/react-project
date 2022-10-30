/*
 * @Author: webcc
 * @Date: 2022-10-29 11:25:04
 * @LastEditTime: 2022-10-30 09:16:43
 * @email: webcc.coder@qq.com
 */
import { Toast } from 'antd-mobile'
import axios from 'axios'
import { getTokenInfo } from './token'

export const baseURL = 'http://geek.itheima.net/v1_0/'
const request = axios.create({
    baseURL,
    timeout: 5000
})

request.interceptors.request.use(
    function (config) {
        let token = getTokenInfo().token
        if (token) {
            config.headers.Authorization = 'Bearer ' + token
        }
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
            Toast.info(err.response.data.message, 1);
        } else {
            Toast.info('网络繁忙，请稍后重试', 1);
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