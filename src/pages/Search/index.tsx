import Icon from '@/components/Icon'
import NavBar from '@/components/NavBar'
import { RootState } from '@/store'
import { clearHistory, clearSuggestionList, getSuggestionList, saveHistories } from '@/store/actions/search'
import classnames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import styles from './index.module.scss'

const Search = () => {
    const history = useHistory()
    const dispatch = useDispatch()

    const [keyword, setKeyword] = useState('')
    const timerRef = useRef(-1)
    const [isSearching, setIsSearching] = useState(false)
    const { suggestions, histories } = useSelector((state: RootState) => {
        return state.search
    })
    const onKeyWordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let text = e.target.value.trim()
        setKeyword(text)
        window.clearTimeout(timerRef.current)
        timerRef.current = window.setTimeout(() => {
            console.log(text)
            if (text) {
                setIsSearching(true)
                dispatch(getSuggestionList(text))
            } else {
                setIsSearching(false)
            }
        }, 500)
    }
    /**
     * 让字符串中的关键字高亮
     * @param str 
     * @param keyword 
     */
    const heightLight = (str: string, keyword: string): string => {
        // new RegExp为创建一个正则表达式
        return str.replace(new RegExp(keyword, "gi"), (match: string) => {
            return `<span style="color: red">${match}</span>`
        })
    }
    /**
     * 清空搜索框
     */
    const clear = (): void => {
        setKeyword('')
        setIsSearching(false)
        dispatch(clearSuggestionList())
    }
    /**
     * 搜索
     * @param key 
     */
    const onSearch = (key: string) => {
        // console.log(key)
        if (!key) return
        dispatch(saveHistories(key))
        // 跳转
        history.push('/search/result?key=' + key)
    }
    /**
     * 删除历史记录
     */
    const onClearHistory = () => {
        dispatch(clearHistory())
    }
    useEffect(() => {
        return () => {
            // 清除最后的定时器
            clearTimeout(timerRef.current)
        }
    }, [])

    return (
        <div className={styles.root}>
            {/* 顶部导航栏 */}
            <NavBar
                className="navbar"
                onLeftClick={() => history.go(-1)}
                extra={
                    <span className="search-text" onClick={() => onSearch(keyword)}>搜索</span>
                }
            >
                <div className="navbar-search">
                    <Icon type="iconbtn_search" className="icon-search" />

                    <div className="input-wrapper">
                        {/* 输入框 */}
                        <input type="text" value={keyword} onChange={onKeyWordChange} placeholder="请输入关键字搜索" />
                        {/* 清空输入框按钮 */}
                        <Icon type="iconbtn_tag_close" className="icon-close" onClick={clear} />
                    </div>
                </div>
            </NavBar>

            {/* 搜索历史 */}
            <div className="history" style={{ display: isSearching ? 'none' : 'block' }}>
                <div className="history-header">
                    <span>搜索历史</span>
                    <span onClick={onClearHistory}>
                        <Icon type="iconbtn_del" />清除全部
                    </span>
                </div>

                <div className="history-list">
                    {
                        histories.map((item, index) => {
                            return (
                                <span className="history-item" key={index} onClick={() => onSearch(item)}>
                                    {index != 0 && <span className="divider"></span>}
                                    {item}
                                </span>
                            )
                        })
                    }
                </div>
            </div>

            {/* 搜素建议结果列表 */}
            <div className={classnames('search-result', {
                show: isSearching
            })}>
                {
                    suggestions.map((item, index) => {
                        return (
                            <div className="result-item" key={index} onClick={() => onSearch(item)}>
                                <Icon className="icon-search" type="iconbtn_search" />
                                {/* dangerouslySetInnerHTML可以把内容当成html来渲染 */}
                                <div className="result-value" dangerouslySetInnerHTML={{
                                    __html: heightLight(item, keyword)
                                }}>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Search