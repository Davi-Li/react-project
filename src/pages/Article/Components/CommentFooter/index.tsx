/*
 * @Author: Flockmaster
 * @Date: 2022-11-06 16:17:46
 * @LastEditTime: 2022-11-07 00:20:18
 * @Language: JavaScript | TypeScript
 */
import Icon from '@/components/Icon'
import { RootState } from '@/store'
import { collectArticle, likeArticle } from '@/store/actions/article'
import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'

type Props = {
    goComment?: () => void
    onOpenDrawer?: () => void
    onComment?: () => void
    type?: string
}

const CommentFooter = ({ goComment, onOpenDrawer, onComment, type = "normal" }: Props) => {
    const dispatch = useDispatch();
    const { detail } = useSelector((state: RootState) => state.article)

    // 点赞和收藏
    const onLike = async () => {
        await dispatch(likeArticle(detail.art_id, detail.attitude))
    }
    const onCollect = async () => {
        await dispatch(collectArticle(detail.art_id, detail.is_collected))
    }

    return (
        <div className={styles.root}>
            <div className="input-btn" onClick={onComment}>
                <Icon type="iconbianji" />
                <span>去评论</span>
            </div>
            {
                type == "reply" ? null : (
                    <>
                        <div className="action-item" onClick={goComment}>
                            <Icon type="iconbtn_comment" />
                            <p>评论</p>
                            <span className="bage">{detail.comm_count}</span>
                        </div>
                        {/* 'iconbtn_like2' */}
                        <div className="action-item" onClick={onLike}>
                            <Icon type={detail.attitude == 1 ? 'iconbtn_like_sel' : 'iconbtn_like2'} />
                            <p>点赞</p>
                        </div>
                    </>
                )
            }
            <div className="action-item" onClick={onCollect}>
                {/* 'iconbtn_collect' */}
                <Icon type={detail.is_collected ? 'iconbtn_collect_sel' : 'iconbtn_collect'} />
                <p>收藏</p>
            </div>
            <div className="action-item" onClick={onOpenDrawer}>
                <Icon type="iconbtn_share" />
                <p>分享</p>
            </div>
        </div>
    )
}

export default CommentFooter