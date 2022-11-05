/*
 * @Author: Flockmaster
 * @Date: 2022-11-05 23:25:26
 * @LastEditTime: 2022-11-06 00:15:40
 * @Language: JavaScript | TypeScript
 */
import Icon from '@/components/Icon'
import NavBar from '@/components/NavBar'
import { RootState } from '@/store'
import { getArticleInfo } from '@/store/actions/article'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import styles from './index.module.scss'
// 防止xss攻击
import DOMPurify from 'dompurify'

const Article = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const params = useParams<{ id: string }>()

    const art_id = params.id
    useEffect(() => {
        dispatch(getArticleInfo(art_id))
    }, [])

    const { detail } = useSelector((state: RootState) => state.article)

    return (
        <div className={styles.root}>
            <div className="root-wrapper">
                {/* 顶部导航栏 */}
                <NavBar
                    onLeftClick={() => history.go(-1)}
                    extra={
                        <span>
                            <Icon type="icongengduo" />
                        </span>
                    }
                >
                    {/* <div className="nav-author">
            <img src={''} alt="" />
            <span className="name">{'张三'}</span>
            <span className="follow">关注</span>
          </div> */}
                    11
                </NavBar>

                <>
                    <div className="wrapper">
                        <div className="article-wrapper">
                            {/* 文章描述信息栏 */}
                            <div className="header">
                                <h1 className="title">{detail.title}</h1>

                                <div className="info">
                                    <span>{detail.pubdate}</span>
                                    <span>{detail.read_count} 阅读</span>
                                    <span>{detail.comm_count} 评论</span>
                                </div>

                                <div className="author">
                                    <img src={detail.aut_photo} alt="" />
                                    <span className="name">{detail.aut_name}</span>
                                    <span className={classNames("follow", { followed: detail.is_followed })}>{detail.is_followed ? "已关注" : "关注"}</span>
                                </div>
                            </div>

                            {/* 文章正文内容区域 */}
                            <div className="content">
                                <div className="content-html dg-html" dangerouslySetInnerHTML={{
                                    // 过滤掉危险内容，防止xss攻击
                                    __html: DOMPurify.sanitize(detail.content)
                                }}></div>
                                <div className="date">发布文章时间：{dayjs(detail.pubdate).format("YYYY-MM-DD")}</div>
                            </div>
                        </div>
                    </div>
                </>
            </div>
        </div>
    )
}

export default Article