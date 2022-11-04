/*
 * @Author: webcc
 * @Date: 2022-10-29 23:09:33
 * @LastEditTime: 2022-11-04 16:49:02
 * @email: webcc.coder@qq.com
 */
import React, { useState, useRef } from 'react'
import { List, DatePicker, Drawer, Toast, Modal } from 'antd-mobile';
import style from './index.module.scss'
import NavBar from '@/components/NavBar'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getProfile, updateUserProfile, updatePhoto } from '@/store/actions/profile'
import { useSelector } from 'react-redux'
import classnames from 'classnames'
import EditInput from './components/EditInput';
import EditList from './components/EditList';
// 处理日期格式
import dayjs from 'dayjs'
import { logout } from '@/store/actions/login';
import { useHistory } from 'react-router-dom';
import { removeTokenInfo } from '@/utils/token';

export default function Edit() {
    let dispatch = useDispatch()
    let history = useHistory()
    const fileRef = useRef(null)
    const [open, setOpen] = useState({
        visible: false,
        type: ''
    })
    const [listOpen, setListOpen] = useState({
        visible: false,
        type: ''
    })
    const config = {
        photo: [
            {
                title: '拍照',
                onClick: () => {

                }
            },
            {
                title: '本地选择',
                onClick: () => {
                    fileRef.current.click()
                }
            }
        ],
        gender: [
            {
                title: '男',
                onClick: () => {
                    onSubmit('gender', 0)
                }
            },
            {
                title: '女',
                onClick: () => {
                    onSubmit('gender', 1)
                }
            }
        ]
    }
    // 上传文件发生改变
    const fileChange = async (e) => {
        const file = e.target.files[0]
        // 上传文件必须是formData格式
        let fd = new FormData()
        fd.append('photo', file);
        await dispatch(updatePhoto(fd))
        Toast.success("上传图片成功", 1)
        onClose()
    }
    const onDateChange = (e) => {
        onSubmit('birthday', dayjs(e).format("YYYY-MM-DD"))
    }
    const onClose = () => {
        setOpen({
            visible: false,
            type: ''
        })
        setListOpen({
            visible: false,
            type: ''
        })
    }
    const onSubmit = async (type, value) => {
        await dispatch(updateUserProfile({
            [type]: value
        }))
        Toast.success("修改成功", 1)
        onClose()
    }
    // 退出登录
    const logoutFn = () => {
        Modal.alert('温馨提示', '你确定退出吗？', [
            // 取消按钮
            { text: '取消' },
            // 确认按钮
            {
                text: '确认',
                style: { color: '#FC6627' },
                onPress: () => {
                    dispatch(logout({
                        token: "",
                        refresh_token: "",
                    }))
                    removeTokenInfo()
                    Toast.success("退出登录成功", 1)
                    history.replace('/login')
                }
            }
        ])
    }
    useEffect(() => {
        dispatch(getProfile())
    }, [dispatch])
    const profile = useSelector(state => state.profile.profile)
    return (
        <div className={style.root}>
            <div className="content">
                <NavBar>个人信息</NavBar>
                <div className='wrapper'>
                    <List className="profile-list">
                        <List.Item arrow="horizontal" extra={
                            <span className="avatar-wrapper">
                                <img src={profile.photo} alt="" />
                            </span>
                        } onClick={() => { setListOpen({ visible: true, type: 'photo' }) }}>头像</List.Item>
                        <List.Item arrow="horizontal" extra={profile.name} onClick={() => { setOpen({ visible: true, type: 'name' }) }}>昵称</List.Item>
                        <List.Item arrow="horizontal" extra={
                            <span className={classnames("intro", profile.intro ? 'normal' : '')}>
                                {profile.intro || '未填写'}
                            </span>
                        } onClick={() => { setOpen({ visible: true, type: 'intro' }) }}>简介</List.Item>
                    </List>
                    <List className="profile-list">
                        <List.Item arrow="horizontal" extra={profile.gender == 0 ? '男' : '女'} onClick={() => { setListOpen({ visible: true, type: 'gender' }) }}>性别</List.Item>
                        <DatePicker
                            mode="date"
                            title="选择年月日"
                            value={new Date(profile.birthday)}
                            minDate={new Date(1900, 1, 1, 0, 0, 0)}
                            maxDate={new Date()}
                            onChange={onDateChange}
                        >
                            <List.Item arrow="horizontal" extra={profile.birthday}>生日</List.Item>
                        </DatePicker>
                    </List>
                    <div className="logout">
                        <button className="btn" onClick={logoutFn}>退出登录</button>
                    </div>
                </div>
            </div>
            <Drawer
                position="right"
                className="drawer"
                style={{ minHeight: document.documentElement.clientHeight }}
                sidebar={open.visible && <EditInput onClose={onClose} onSubmit={onSubmit} type={open.type}></EditInput>}
                children={''}
                open={open.visible}
            />
            <Drawer
                className="drawer-list"
                position="bottom"
                sidebar={listOpen.visible && <EditList config={config} type={listOpen.type} onClose={onClose}></EditList>}
                open={listOpen.visible}
                onOpenChange={onClose}
            >
                {''}
            </Drawer>
            {/* type为file可以选择文件上传 */}
            <input type="file" ref={fileRef} hidden onChange={fileChange} />
        </div>
    )
}
