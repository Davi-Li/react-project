/*
 * @Author: webcc
 * @Date: 2022-10-30 22:12:40
 * @LastEditTime: 2022-10-30 23:27:39
 * @email: webcc.coder@qq.com
 */
import Icon from '@/components/Icon'
import Input from '@/components/Input'
import NavBar from '@/components/NavBar'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from './index.module.scss'
import io from 'socket.io-client'
import { getTokenInfo } from '@/utils/token'
import { useRef } from 'react'
import { getUserInfo } from '@/store/actions/profile'

const Chat = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const clientRef = useRef(null)
    const scrollRef = useRef(null)
    const photo = useSelector((state) => state.profile.user.photo)
    const [messageList, setMessageList] = useState([
        // 放两条初始消息
        { type: 'robot', text: '亲爱的用户您好，小智同学为您服务。' },
        { type: 'user', text: '你好' }
    ])
    const [msg, setMsg] = useState('')
    useEffect(() => {
        dispatch(getUserInfo())
        const client = io('http://toutiao.itheima.net', {
            query: {
                token: getTokenInfo().token
            },
            transports: ['websocket']
        })

        clientRef.current = client

        // 服务器连接成功事件
        client.on('connect', () => {
            setMessageList([
                ...messageList,
                {
                    type: 'robot',
                    text: '我是小智同学，请问有什么要提问的吗'
                }
            ])
        })

        // 服务器接收消息事件
        client.on('message', (e) => {
            setMessageList((messageList) => {
                return [
                    ...messageList,
                    {
                        type: 'robot',
                        text: e.msg
                    }
                ]
            })
        })

        return () => {
            client.close()
        }
    }, [])



    useEffect(() => {
        scrollRef.current.scrollTop = 10000;
    }, [messageList])

    const onChange = (e) => {
        setMsg(e.target.value)
    }

    const sendMsg = (e) => {
        if (e.keyCode != 13) return;
        if (!msg) return;
        clientRef.current.emit('message', {
            msg,
            timestamp: Date.now()
        })
        // 回显
        setMessageList([
            ...messageList,
            {
                type: 'user',
                text: msg
            }
        ])
        setMsg('')
    }

    return (
        <div className={styles.root}>
            {/* 顶部导航栏 */}
            <NavBar className="fixed-header">
                小智同学
            </NavBar>

            {/* 聊天记录列表 */}
            <div className="chat-list" ref={scrollRef}>
                {
                    messageList.map((item, index) => {
                        if (item.type == 'robot') {
                            return (
                                < div className="chat-item" key={index}>
                                    <Icon type="iconbtn_xiaozhitongxue" />
                                    <div className="message">{item.text}</div>
                                </div>
                            )
                        } else {
                            return (
                                <div className="chat-item user" key={index}>
                                    <img src={photo} alt="" />
                                    <div className="message">{item.text}</div>
                                </div>
                            )
                        }
                    })
                }
            </div>

            {/* 底部消息输入框 */}
            <div className="input-footer">
                <Input
                    className="no-border"
                    placeholder="请描述您的问题"
                    value={msg}
                    onChange={onChange}
                    onKeyUp={sendMsg}
                />
                <Icon type="iconbianji" />
            </div>
        </div >
    )
}

export default Chat