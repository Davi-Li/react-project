/*
 * @Author: Flockmaster
 * @Date: 2022-11-06 12:46:57
 * @LastEditTime: 2022-11-07 11:38:30
 * @Language: JavaScript | TypeScript
 */
import Icon from '@/components/Icon'
import { getCommentList, likeComment } from '@/store/actions/article'
import { Comment } from '@/store/reducers/article'
import classnames from 'classnames'
import dayjs from 'dayjs'
import { useDispatch } from 'react-redux'
import styles from './index.module.scss'

type Props = {
    detail: Comment
    onOpenReply?: (comment: Comment) => void
    type?: string
    onLike: (detail: Comment) => void
}

const CommentItem = ({ detail, onOpenReply, type = "normal", onLike }: Props) => {
    const dispatch = useDispatch()

    return (
        <div className={styles.root}>
            {/* 评论者头像 */}
            <div className="avatar">
                <img src={detail.aut_photo} alt="" />
            </div>

            <div className="comment-info">
                {/* 评论者名字 */}
                <div className="comment-info-header">
                    <span className="name">{detail.aut_name}</span>

                    {/* 关注或点赞按钮 */}
                    <span className="thumbs-up">
                        {detail.like_count}
                        <Icon type={detail.is_liking ? 'iconbtn_like_sel' : 'iconbtn_like2'} onClick={() => onLike && onLike(detail)} />
                    </span>
                </div>

                {/* 评论内容 */}
                <div className="comment-content">{detail.content}</div>

                <div className="comment-footer">
                    {/* 回复按钮 */}

                    {
                        type == "reply" ? null : (
                            <span className="replay" onClick={() => onOpenReply && onOpenReply(detail)}>
                                {detail.reply_count}回复 <Icon type="iconbtn_right" />
                            </span>
                        )
                    }


                    {/* 评论日期 */}
                    <span className="comment-time">{dayjs(detail.pubdate).fromNow()}</span>
                </div>
            </div>
        </div>
    )
}

export default CommentItem