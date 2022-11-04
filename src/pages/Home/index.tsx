/*
 * @Author: webcc
 * @Date: 2022-10-29 16:53:27
 * @LastEditTime: 2022-11-04 19:56:12
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
import ArticleList from './components/ArticleList'
import MoreAction from './components/MoreAction'
import { RootState } from '@/store'
import { useHistory } from 'react-router-dom'

export default function Home() {
    const dispatch = useDispatch()
    const history = useHistory()
    const tabs = useSelector((state: RootState) => state.home.userChannel)
    const [open, setOpen] = useState(false)
    const [active, setActive] = useState(0)
    useEffect(() => {
        dispatch(getUserChannel())
        dispatch(getAllChannels())
    }, [])
    const onClose = () => {
        setOpen(false)
    }
    const onChangeActive = (i: number) => {
        setActive(i)
    }
    return (
        <div className={styles.root}>
            <Tabs tabs={tabs} index={active} onChange={onChangeActive}>
                {
                    tabs.map(item => {
                        return (
                            <ArticleList key={item.id} channelId={item.id} aid={tabs[active].id}></ArticleList>
                        )
                    })
                }
            </Tabs>
            <div className="tabs-opration">
                <Icon type="iconbtn_search" onClick={() => history.push('/search')} />
                <Icon type="iconbtn_channel" onClick={() => { setOpen(true) }}></Icon>
            </div>
            <Drawer
                className='my-drawer'
                position='left'
                sidebar={open && <Channels onChangeActive={onChangeActive} onClose={onClose} tabActiveIndex={active}></Channels>}
                open={open}
            />
            <MoreAction></MoreAction>
        </div>
    )
}
