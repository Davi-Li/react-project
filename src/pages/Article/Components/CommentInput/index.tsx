/*
 * @Author: Flockmaster
 * @Date: 2022-11-06 20:57:24
 * @LastEditTime: 2022-11-07 08:49:22
 * @Language: JavaScript | TypeScript
 */
import NavBar from '@/components/NavBar'
import { addComment } from '@/store/actions/article'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import styles from './index.module.scss'

type Props = {
    id?: string
    name?: string
    onClose: () => void
    articleId?: string
    onReply?: (value: string) => void
}

const CommentInput = ({ onClose, articleId, name, onReply }: Props) => {
    const dispatch = useDispatch()

    // 输入框内容
    const [value, setValue] = useState('')

    // 输入框引用
    const txtRef = useRef<HTMLTextAreaElement>(null)

    useEffect(() => {
        // 输入框自动聚焦
        setTimeout(() => {
            txtRef.current!.focus()
        }, 600)
    }, [])

    // 发表评论
    const onSendComment = async () => {
        if (!value) return
        if (name) {
            // 回复评论
            onReply && onReply(value)
            onClose()
        } else {
            // 回复文章
            await dispatch(addComment(articleId!, value))
            onClose()
        }
    }

    return (
        <div className={styles.root}>
            {/* 顶部导航栏 */}
            <NavBar
                onLeftClick={onClose}
                extra={
                    <span className="publish" onClick={onSendComment}>
                        发表
                    </span>
                }
            >
                {name ? '回复评论' : '评论文章'}
            </NavBar>

            <div className="input-area">
                {/* 回复别人的评论时显示：@某某 */}
                {name && <div className="at">@{name}:</div>}

                {/* 评论内容输入框 */}
                <textarea
                    ref={txtRef}
                    placeholder="说点什么~"
                    rows={10}
                    value={value}
                    onChange={(e) => setValue(e.target.value.trim())}
                />
            </div>
        </div>
    )
}

export default CommentInput