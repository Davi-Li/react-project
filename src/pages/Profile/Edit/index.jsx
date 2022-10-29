/*
 * @Author: webcc
 * @Date: 2022-10-29 23:09:33
 * @LastEditTime: 2022-10-30 00:22:05
 * @email: webcc.coder@qq.com
 */
import React, { useState, useCallback } from 'react'
import { List, DatePicker } from 'antd-mobile'
import style from './index.module.scss'
import NavBar from '@/components/NavBar'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getProfile } from '@/store/actions/profile'
import { useSelector } from 'react-redux'
const { Item } = List
export default function Edit() {
    const [visible, setVisible] = useState(false)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch])
    const profile = useSelector(state => state.profile.profile)
    // 自定义日期选择器内容
    const labelRenderer = useCallback((type, data) => {
        switch (type) {
            case 'year':
                return data + '年'
            case 'month':
                return data + '月'
            case 'day':
                return data + '日'
            case 'hour':
                return data + '时'
            case 'minute':
                return data + '分'
            case 'second':
                return data + '秒'
            default:
                return data
        }
    }, [])
    return (
        <div className={style.root}>
            <NavBar>个人信息</NavBar>
            <div className='wrapper'>
                <List className="profile-list">
                    <Item extra={
                        <span className="avatar-wrapper">
                            <img src={profile.photo} alt="" />
                        </span>
                    } onClick={() => { }}>头像</Item>
                    <Item extra={profile.name} onClick={() => { }}>昵称</Item>
                    <Item extra={'未填写'} onClick={() => { }}>简介</Item>
                </List>
                <List className="profile-list">
                    <Item extra={profile.gender == 0 ? '男' : '女'} onClick={() => { }}>性别</Item>
                    <Item extra={profile.birthday} onClick={() => { setVisible(true) }}>生日</Item>
                    <DatePicker
                        title='生日选择'
                        visible={visible}
                        min={new Date('1900-1-1')}
                        max={new Date()}
                        renderLabel={labelRenderer}
                    >
                    </DatePicker>

                </List>
            </div>
            <div className="logout">
                <button className="btn">退出登录</button>
            </div>
        </div>
    )
}
