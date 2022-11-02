/*
 * @Author: webcc
 * @Date: 2022-11-01 15:17:36
 * @LastEditTime: 2022-11-02 15:23:57
 * @email: webcc.coder@qq.com
 */
import React from 'react'
import styles from './index.module.scss'
import ArticleItem from '../ArticleItem'
import { useEffect, useState } from 'react'
// import request from '@/utils/request'
import { useDispatch, useSelector } from 'react-redux'
import { getArticleList } from '@/store/actions/home'
import { PullToRefresh, InfiniteScroll } from 'antd-mobile-v5'

export default function ArticleList({ channelId, aid }) {
    const dispatch = useDispatch()
    const current = useSelector(state => state.home.article[channelId])
    useEffect(() => {
        if (current) return;
        if (aid == channelId) {
            dispatch(getArticleList(channelId, Date.now()))
        }
    }, [channelId, aid])
    // 下拉刷新
    const onRefresh = async () => {
        setHasMore(true)
        await dispatch(getArticleList(channelId, Date.now()))
    }
    // 上拉加载更多数据
    const [hasMore, setHasMore] = useState(true)
    const [loading, setLoading] = useState(false)
    async function loadMore() {
        if (loading) return;
        // 如果不是当前页，不需要加载
        if (channelId != aid) return;
        setLoading(true);
        if (!current.timestamp) {
            setHasMore(false)
            return
        }
        try {
            await dispatch(getArticleList(channelId, current.timestamp, true))
        } finally {
            setLoading(false)
        }
        // const append = await mockRequest()
        // setData(val => [...val, ...append])
        // setHasMore(append.length > 0)
    }
    // 不是当前选中的，不渲染
    if (!current) return null;
    return (
        <div className={styles.root}>
            <PullToRefresh onRefresh={onRefresh}>
                <div className="articles">
                    {
                        current.list.map(item => {
                            return (
                                <div className="article-item" key={item.art_id}>
                                    <ArticleItem channelId={channelId} className="article-item" article={item}></ArticleItem>
                                </div>
                            )
                        })
                    }
                </div>
            </PullToRefresh>
            {/* 上拉加载更多 */}
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>
        </div>
    )
}
