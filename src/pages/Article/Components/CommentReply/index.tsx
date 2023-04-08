/*
 * @Author: Flockmaster
 * @Date: 2022-11-06 22:03:28
 * @LastEditTime: 2022-11-07 13:18:32
 * @Language: JavaScript | TypeScript
 */
import NavBar from '@/components/NavBar'
import NoComment from '../NoComment'
import CommentFooter from '../CommentFooter'
import styles from './index.module.scss'
import { Comment, CommentType } from '@/store/reducers/article'
import CommentItem from '../CommentItem'
import { useEffect, useRef, useState } from 'react'
import request from '@/utils/request'
import { InfiniteScroll } from 'antd-mobile-v5'
import { Drawer } from 'antd-mobile'
import CommentInput from '../CommentInput'
import { useDispatch } from 'react-redux'
import { getCommentList, likeComment, updateComment } from '@/store/actions/article'

/**
 * 回复评论界面组件
 * @param {Object} props.originComment 原评论数据
 * @param {String} props.articleId 文章ID
 * @param {Function} props.onClose 关闭抽屉的回调函数
 */
type Props = {
    articleId: string
    onClose?: () => void
    originComment: Comment
}

const CommentReply = ({ articleId, onClose, originComment }: Props) => {
    const dispatch = useDispatch()

    const [replyList, setReplyList] = useState<CommentType>({
        end_id: '',
        last_id: '',
        results: [],
        total_count: 0
    })
    const hasMore = replyList.last_id != replyList.end_id
    const loadMore = async () => {
        const res = await request.get<CommentType>('/comments', {
            params: {
                type: 'c',
                source: originComment.com_id,
                offset: replyList.last_id
            }
        })
        setReplyList({
            ...res.data,
            results: [...replyList.results, ...res.data.results]
        })
    }
    const fetchDate = async () => {
        const res = await request.get<CommentType>('/comments', {
            params: {
                type: 'c',
                source: originComment.com_id
            }
        })
        setReplyList(res.data)
    }
    useEffect(() => {
        fetchDate()
    }, [])

    //回复评论抽屉
    const [drawerStatus, setDrawerStatus] = useState({
        visible: false
    })
    const onCloseComment = () => {
        setDrawerStatus({
            visible: false
        })
    }
    const onReply = async (content: string) => {
        const res = await request.post('/comments', {
            target: originComment.com_id,
            content,
            art_id: articleId
        })
        setReplyList({
            ...replyList,
            total_count: replyList.total_count + 1,
            results: [res.data.new_obj, ...replyList.results]
        })
        dispatch(updateComment({
            ...originComment,
            reply_count: originComment.reply_count + 1
        }))
    }

    // 对评论点赞
    const onLike = async (commentDetail: Comment) => {
        await dispatch(likeComment(commentDetail.com_id, commentDetail.is_liking))
        await fetchDate()
        await dispatch(getCommentList(articleId))
    }

    return (
        <div className={styles.root}>
            <div className="reply-wrapper">
                {/* 顶部导航栏 */}
                <NavBar className="transparent-navbar" onLeftClick={onClose}>
                    <div>{replyList.total_count}条回复</div>
                </NavBar>

                {/* 原评论信息 */}
                <CommentItem onLike={onLike} detail={originComment} type='reply'></CommentItem>
                {/* 回复评论的列表 */}
                <div className="reply-list">
                    <div className="reply-header">全部回复</div>
                    {
                        originComment.reply_count == 0 ? <NoComment /> : (
                            replyList.results.map(item => <CommentItem onLike={onLike} type='reply' key={item.com_id} detail={item}></CommentItem>)
                        )
                    }
                    <InfiniteScroll loadMore={loadMore} hasMore={hasMore}></InfiniteScroll>
                </div>

                {/* 评论工具栏，设置 type="reply" 不显示评论和点赞按钮 */}
                <CommentFooter onComment={() => setDrawerStatus({ visible: true })} type="reply" />
            </div>
            {/* 评论表单抽屉 */}
            <Drawer
                className="drawer"
                position="bottom"
                style={{ minHeight: document.documentElement.clientHeight }}
                sidebar={
                    <div className="drawer-sidebar-wrapper">
                        {drawerStatus.visible && (
                            <CommentInput
                                name={originComment.aut_name}
                                articleId={articleId}
                                onClose={onCloseComment}
                                onReply={onReply}
                            />
                        )}
                    </div>
                }
                open={drawerStatus.visible}
                onOpenChange={onCloseComment}
            />
        </div>
    )
}

export default CommentReply