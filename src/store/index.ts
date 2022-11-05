/*
 * @Author: Flockmaster
 * @Date: 2022-10-27 21:17:58
 * @LastEditTime: 2022-11-05 23:52:40
 * @Language: JavaScript | TypeScript
 */
import { createStore, applyMiddleware } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'
import { getTokenInfo } from '@/utils/token'
import { HomeAction } from '@/store/reducers/home'
import { SearchAction } from '@/store/reducers/search'
import { LoginAction } from '@/store/reducers/login'
import { ProfileAction } from '@/store/reducers/profile'
import { getLocalHistories } from '@/utils/histories'
import { ArticleAction } from './reducers/article'

export const list = [
    {
        art_id: "8080",
        title: "31_网络编程（Socket套接字编程）_讲义",
        aut_id: "1111",
        comm_count: 0,
        pubdate: "2019-03-11 09:00:00",
        aut_name: "黑马后退",
        is_top: 0,
        cover: {
            type: 1,
            images: ["http://geek.itheima.net/resources/images/57.jpg"]
        }
    },
    {
        art_id: "8080",
        title: "31_网络编程（Socket套接字编程）_讲义",
        aut_id: "1111",
        comm_count: 0,
        pubdate: "2019-03-11 09:00:00",
        aut_name: "黑马后退",
        is_top: 0,
        cover: {
            type: 1,
            images: ["http://geek.itheima.net/resources/images/57.jpg"]
        }
    },
    {
        art_id: "8080",
        title: "31_网络编程（Socket套接字编程）_讲义",
        aut_id: "1111",
        comm_count: 0,
        pubdate: "2019-03-11 09:00:00",
        aut_name: "黑马后退",
        is_top: 0,
        cover: {
            type: 1,
            images: ["http://geek.itheima.net/resources/images/57.jpg"]
        }
    },
    {
        art_id: "8080",
        title: "31_网络编程（Socket套接字编程）_讲义",
        aut_id: "1111",
        comm_count: 0,
        pubdate: "2019-03-11 09:00:00",
        aut_name: "黑马后退",
        is_top: 0,
        cover: {
            type: 1,
            images: ["http://geek.itheima.net/resources/images/57.jpg"]
        }
    },
    {
        art_id: "8080",
        title: "31_网络编程（Socket套接字编程）_讲义",
        aut_id: "1111",
        comm_count: 0,
        pubdate: "2019-03-11 09:00:00",
        aut_name: "黑马后退",
        is_top: 0,
        cover: {
            type: 1,
            images: ["http://geek.itheima.net/resources/images/57.jpg"]
        }
    },
    {
        art_id: "8080",
        title: "31_网络编程（Socket套接字编程）_讲义",
        aut_id: "1111",
        comm_count: 0,
        pubdate: "2019-03-11 09:00:00",
        aut_name: "黑马后退",
        is_top: 0,
        cover: {
            type: 1,
            images: ["http://geek.itheima.net/resources/images/57.jpg"]
        }
    },
    {
        art_id: "8080",
        title: "31_网络编程（Socket套接字编程）_讲义",
        aut_id: "1111",
        comm_count: 0,
        pubdate: "2019-03-11 09:00:00",
        aut_name: "黑马后退",
        is_top: 0,
        cover: {
            type: 1,
            images: ["http://geek.itheima.net/resources/images/57.jpg"]
        }
    },
    {
        art_id: "8080",
        title: "31_网络编程（Socket套接字编程）_讲义",
        aut_id: "1111",
        comm_count: 0,
        pubdate: "2019-03-11 09:00:00",
        aut_name: "黑马后退",
        is_top: 0,
        cover: {
            type: 1,
            images: ["http://geek.itheima.net/resources/images/57.jpg"]
        }
    }
]

const store = createStore(reducer, {
    login: getTokenInfo(),
    search: {
        suggestions: ['aaa', 'vvv', 'javescript', 'java'],
        histories: getLocalHistories(),
        results: list
    }
}, composeWithDevTools(applyMiddleware(thunk)))

export type RootAction = HomeAction | LoginAction | SearchAction | ProfileAction | ArticleAction

// 获取RootState类型
export type RootState = ReturnType<typeof store.getState>
//指定action类型   
export type RootThunkAction = ThunkAction<void, RootState, unknown, RootAction>

export default store