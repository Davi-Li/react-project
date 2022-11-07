/*
 * @Author: Flockmaster
 * @Date: 2022-11-05 23:25:26
 * @LastEditTime: 2022-11-07 09:10:04
 * @Language: JavaScript | TypeScript
 */
import Icon from '@/components/Icon'
import NavBar from '@/components/NavBar'
import { RootState } from '@/store'
import { followAuth, getArticleInfo, getCommentList, getMoreCommentList } from '@/store/actions/article'
import classNames from 'classnames'
import dayjs from 'dayjs'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import styles from './index.module.scss'
// 防止xss攻击
import DOMPurify from 'dompurify'
// 引入代码高亮
import hljs from 'highlight.js'
import 'highlight.js/styles/vs2015.css'
import throttle from 'lodash/throttle'
import NoComment from '@/pages/Article/Components/NoComment'
import CommentItem from '@/pages/Article/Components/CommentItem'
import { InfiniteScroll } from 'antd-mobile-v5'
import CommentFooter from './Components/CommentFooter'
import Sticky from '@/components/Sticky'
import { Drawer } from 'antd-mobile'
import Share from '@/pages/Article/Components/Share'
import CommentInput from './Components/CommentInput'
import CommentReply from './Components/CommentReply'
import { Comment } from '@/store/reducers/article'

type ReplyType = {
    visible: boolean
    originComment: Comment
}

const Article = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const params = useParams<{ id: string }>()

    const art_id = params.id
    useEffect(() => {
        dispatch(getArticleInfo(art_id))
        dispatch(getCommentList(art_id))
    }, [])

    const { detail, comment } = useSelector((state: RootState) => state.article)

    /**
     * 引入代码高亮
     */
    useEffect(() => {
        // 配置 highlight.js
        hljs.configure({
            // 忽略未经转义的 HTML 字符
            ignoreUnescapedHTML: true,
        })
        // 获取到内容中所有的code标签
        const codes = document.querySelectorAll('.dg-html pre > code')
        codes.forEach((el) => {
            // 让code进行高亮
            hljs.highlightElement(el as HTMLElement)
        })
    }, [detail])

    // 使得头像被遮住时在navbar显示头衔名称信息
    const authRef = useRef<HTMLDivElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)
    const [isShowAuth, setIsShowAuth] = useState(false)
    useEffect(() => {
        const onScroll = throttle(function () {
            const rect = authRef.current?.getBoundingClientRect()!
            if (!rect) return;
            if (rect.top - 46 <= 0) {
                setIsShowAuth(true)
            } else {
                setIsShowAuth(false)
            }
        }, 300)
        let wrap = wrapperRef.current!
        wrap.addEventListener("scroll", onScroll)
        return () => {
            wrap.removeEventListener("scroll", onScroll)
        }
    }, [])

    const hasMore = comment.last_id != comment.end_id
    const loadMore = async () => {
        await dispatch(getMoreCommentList(art_id, comment.last_id))
    }

    // 点击跳转到评论区
    const isComment = useRef(false)
    const commentRef = useRef<HTMLDivElement>(null)
    const goComment = () => {
        if (isComment.current) {
            wrapperRef.current!.scrollTo(0, 0)
        } else {
            wrapperRef.current!.scrollTo(0, commentRef.current!.offsetTop - 46)
        }
        isComment.current = !isComment.current
    }

    // 关注作者
    const onFollow = async () => {
        await dispatch(followAuth(detail.aut_id, detail.is_followed, detail.art_id))
    }

    //分享
    const [visible, setVisible] = useState(false)
    const onCloseShare = () => {
        setVisible(false)
    }

    //发表评论
    const [commentDrawerStatus, setCommentDrawerStatus] = useState({
        visible: false
    })
    const onCloseComment = () => {
        setCommentDrawerStatus({
            visible: false
        })
    }
    const onComment = () => {
        setCommentDrawerStatus({
            visible: true
        })
    }

    // 回复评论
    const [replyDrawerStatus, setReplyDrawerStatus] = useState<ReplyType>({
        visible: false,
        originComment: {} as Comment
    })
    const onCloseReply = () => {
        setReplyDrawerStatus({
            visible: false,
            originComment: {} as Comment
        })
    }
    const onOpenReply = (comment: Comment) => {
        setReplyDrawerStatus({
            visible: true,
            originComment: comment
        })
    }

    return (
        <div className={styles.root}>
            <div className="root-wrapper">
                {/* 顶部导航栏 */}
                <NavBar
                    onLeftClick={() => history.go(-1)}
                    className="navBar"
                    extra={
                        <span>
                            <Icon type="icongengduo" />
                        </span>
                    }
                >
                    {
                        isShowAuth ? (
                            <div className="nav-author">
                                <img src={detail.aut_photo} alt="" />
                                <span className="name">{detail.aut_name}</span>
                                <span
                                    className={classNames(
                                        'follow',
                                        detail.is_followed ? 'followed' : ''
                                    )}
                                >
                                    {detail.is_followed ? '已关注' : '关注'}
                                </span>
                            </div>
                        ) : (
                            ''
                        )
                    }
                </NavBar>

                <>
                    <div className="wrapper" ref={wrapperRef}>
                        <div className="article-wrapper">
                            {/* 文章描述信息栏 */}
                            <div className="header">
                                <h1 className="title">{detail.title}</h1>

                                <div className="info">
                                    <span>{detail.pubdate}</span>
                                    <span>{detail.read_count} 阅读</span>
                                    <span>{detail.comm_count} 评论</span>
                                </div>

                                <div className="author" ref={authRef}>
                                    <img src={detail.aut_photo} alt="" />
                                    <span className="name">{detail.aut_name}</span>
                                    <span onClick={onFollow} className={classNames("follow", { followed: detail.is_followed })}>{detail.is_followed ? "已关注" : "关注"}</span>
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
                        <div className="comment">
                            {/* 评论总览信息 */}
                            {/* <Sticky> */}
                            <div className="comment-header" ref={commentRef}>
                                <span>全部评论（{detail.comm_count}）</span>
                                <span>{detail.like_count} 点赞</span>
                            </div>
                            {/* </Sticky> */}
                            {/* 评论列表 */}
                            {detail.comm_count == 0 ? (
                                <NoComment></NoComment>
                            ) : (
                                comment.results?.map(item => <CommentItem key={item.com_id} detail={item} onOpenReply={onOpenReply}></CommentItem>)
                            )}
                            <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
                        </div>
                    </div>
                </>
                <CommentFooter goComment={goComment} onOpenDrawer={() => setVisible(true)} onComment={onComment}></CommentFooter>
            </div>
            {/* 分享抽屉 */}
            <Drawer
                className="drawer-share"
                position="bottom"
                style={{ minHeight: document.documentElement.clientHeight }}
                sidebar={
                    <Share onClose={onCloseShare} />
                }
                open={visible}
                onOpenChange={onCloseShare}
            />
            {/* 发表评论抽屉 */}
            <Drawer
                className="drawer"
                position="bottom"
                style={{ minHeight: document.documentElement.clientHeight }}
                sidebar={
                    <div className="drawer-sidebar-wrapper">
                        {commentDrawerStatus.visible && (
                            <CommentInput
                                // id={commentDrawerStatus.id}
                                articleId={detail.art_id}
                                onClose={onCloseComment}
                            // onComment={onAddComment}
                            />
                        )}
                    </div>
                }
                open={commentDrawerStatus.visible}
                onOpenChange={onCloseComment}
            />
            {/* 回复抽屉 */}
            <Drawer
                className="drawer-right"
                position="right"
                style={{ minHeight: document.documentElement.clientHeight }}
                sidebar={
                    <div className="drawer-sidebar-wrapper">
                        {replyDrawerStatus.visible && <CommentReply articleId={art_id} originComment={replyDrawerStatus.originComment} onClose={onCloseReply} />}
                    </div>
                }
                open={replyDrawerStatus.visible}
                onOpenChange={onCloseReply}
            />
        </div >
    )
}

export default Article