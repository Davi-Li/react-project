/*
 * @Author: Flockmaster
 * @Date: 2022-11-05 21:46:30
 * @LastEditTime: 2022-11-05 23:11:00
 * @Language: JavaScript | TypeScript
 */
import NavBar from '@/components/NavBar'
import ArticleItem from '@/pages/Home/components/ArticleItem'
import { RootState } from '@/store'
import { saveResults } from '@/store/actions/search'
import { InfiniteScroll } from 'antd-mobile-v5'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styles from './index.module.scss'

let page = 1

const SearchResult = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    // URLSearchParams可以用来操作query字符串
    let usp = new URLSearchParams(location.search)
    let key = usp.get('key')!
    const results = useSelector((state: RootState) => {
        return state.search.results
    })
    useEffect(() => {
        // dispatch(saveResults(key, page))
    }, [])

    const [hasMore, setHasMore] = useState(true)
    const loadMore = async () => {
        await dispatch(saveResults(key, page))
        page = page + 1
        if (page > 5) {
            setHasMore(false)
        }
    }

    return (
        <div className={styles.root}>
            {/* 顶部导航栏 */}
            <NavBar className="navBar">搜索结果</NavBar>

            <div className="article-list">
                {
                    results.map((item, index) => {
                        return (
                            <ArticleItem key={index} channelId={-1} article={item} />
                        )
                    })
                }
            </div>
            <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
        </div>
    )
}

export default SearchResult