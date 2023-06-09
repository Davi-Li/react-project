/*
 * @Author: webcc
 * @Date: 2022-10-29 16:53:27
 * @LastEditTime: 2022-11-04 12:09:36
 * @email: webcc.coder@qq.com
 */
import React, { useEffect } from 'react'
import Icon from '@/components/Icon'
import { Link, useHistory } from 'react-router-dom'
import styles from './index.module.scss'
import { useDispatch } from 'react-redux'
import { getUserInfo } from '@/store/actions/profile'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

export default function Profile() {
    const history = useHistory()
    const dispatch = useDispatch()
    // 泛型参数1：state类型 参数2：返回值类型
    const userInfo = useSelector<RootState, RootState['profile']['user']>(state => state.profile.user)
    useEffect(() => {
        dispatch(getUserInfo())
    }, [dispatch])
    return (
        <div className={styles.root}>
            <div className="profile">
                {/* 顶部个人信息区域 */}
                <div className="user-info">
                    <div className="avatar">
                        <img src={userInfo.photo} alt="" />
                    </div>
                    <div className="user-name">{userInfo.name}</div>
                    <Link to="/profile/edit">
                        个人信息 <Icon type="iconbtn_right" />
                    </Link>
                </div>

                {/* 今日阅读区域 */}
                <div className="read-info">
                    <Icon type="iconbtn_readingtime" />
                    今日阅读 <span>10</span> 分钟
                </div>

                {/* 统计信息区域 */}
                <div className="count-list">
                    <div className="count-item">
                        <p>{userInfo.art_count}</p>
                        <p>动态</p>
                    </div>
                    <div className="count-item">
                        <p>{userInfo.follow_count}</p>
                        <p>关注</p>
                    </div>
                    <div className="count-item">
                        <p>{userInfo.fans_count}</p>
                        <p>粉丝</p>
                    </div>
                    <div className="count-item">
                        <p>{userInfo.like_count}</p>
                        <p>被赞</p>
                    </div>
                </div>

                {/* 主功能菜单区域 */}
                <div className="user-links">
                    <div className="link-item">
                        <Icon type="iconbtn_mymessages" />
                        <div>消息通知</div>
                    </div>
                    <div className="link-item">
                        <Icon type="iconbtn_mycollect" />
                        <div>收藏</div>
                    </div>
                    <div className="link-item">
                        <Icon type="iconbtn_history1" />
                        <div>浏览历史</div>
                    </div>
                    <div className="link-item">
                        <Icon type="iconbtn_myworks" />
                        <div>我的作品</div>
                    </div>
                </div>
            </div>

            {/* 更多服务菜单区域 */}
            <div className="more-service">
                <h3>更多服务</h3>
                <div className="service-list">
                    <div className="service-item" onClick={() => history.push('/profile/feedback')}>
                        <Icon type="iconbtn_feedback" />
                        <div>用户反馈</div>
                    </div>
                    <div className="service-item" onClick={() => history.push('/profile/chat')}>
                        <Icon type="iconbtn_xiaozhitongxue" />
                        <div>小智同学</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
