/*
 * @Author: webcc
 * @Date: 2022-10-29 11:25:04
 * @LastEditTime: 2022-11-03 17:35:24
 * @email: webcc.coder@qq.com
 */
import store from '@/store'
import { logout, saveToken } from '@/store/actions/login'
import { Toast } from 'antd-mobile'
import axios, { AxiosError, AxiosResponse } from 'axios'
import history from './history'
import { getTokenInfo, setTokenInfo } from './token'


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
    function (res: AxiosResponse) {
        return res.data;
    },
    async function (err: AxiosError<{ message: string }>) {
        // 错误统一处理
        /**
         * 网络问题
         */
        if (!err.response) {
            Toast.info('网络繁忙，请稍后重试', 1);
            return Promise.reject(err)
        }
        /**
         * 网络没问题，且不是401
         */
        const { response, config } = err
        if (response.status != 401) {
            Toast.info(err.response.data.message, 1);
            return Promise.reject(err)
        }
        /**
         * 是401，token过期
         */
        const { token, refresh_token } = getTokenInfo();
        // 没有刷新token，直接返回到登录页
        if (!refresh_token) {
            history.push({
                pathname: '/login',
                state: {
                    from: history.location.pathname
                }
            })
            return Promise.reject(err)
        }
        /**
         * 刷新token
         */
        try {
            // 用刷新token换取token
            const { data: res } = await axios({
                url: baseURL + 'authorizations',
                method: 'put',
                headers: {
                    Authorization: 'Bearer ' + refresh_token
                }
            })
            console.log(res)
            // 存储新的token
            let tokenInfo = {
                token: res.data.token,
                refresh_token: refresh_token
            }
            store.dispatch(saveToken(tokenInfo))
            setTokenInfo(tokenInfo)
            // 重新发请求
            return request(config)
        } catch (error) {
            // 退出登录并返回到登录页
            store.dispatch(logout())
            history.push({
                pathname: '/login',
                state: {
                    from: history.location.pathname
                }
            })
            Toast.info('登录信息过期，请重新登录')
            return Promise.reject(err)
        }

    }
)

export default request