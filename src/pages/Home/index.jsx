/*
 * @Author: webcc
 * @Date: 2022-10-29 16:53:27
 * @LastEditTime: 2022-10-31 22:46:32
 * @email: webcc.coder@qq.com
 */
import React, { useEffect, useState } from 'react'
import { Drawer } from 'antd-mobile'
import styles from './index.module.scss'
import Tabs from '@/components/Tabs'
import { useDispatch } from 'react-redux'
import { getAllChannels, getUserChannel } from '@/store/actions/home'
import { useSelector } from 'react-redux'
import Icon from '@/components/Icon'
import Channels from './components/Channels'

export default function Home() {
    const dispatch = useDispatch()
    const tabs = useSelector(state => state.home.userChannel)
    const [open, setOpen] = useState(false)
    useEffect(() => {
        dispatch(getUserChannel())
        dispatch(getAllChannels())
    }, [])
    const onClose = () => {
        setOpen(false)
    }
    return (
        <div className={styles.root}>
            <Tabs tabs={tabs}></Tabs>
            <div className="tabs-opration">
                <Icon type="iconbtn_search" />
                <Icon type="iconbtn_channel" onClick={() => { setOpen(true) }}></Icon>
            </div>
            <Drawer
                className='my-drawer'
                position='left'
                children={''}
                sidebar={open && <Channels onClose={onClose}></Channels>}
                open={open}
            >
            </Drawer>
        </div>
    )
}
