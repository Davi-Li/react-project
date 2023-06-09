/*
 * @Author: webcc
 * @Date: 2022-11-01 15:21:39
 * @LastEditTime: 2022-11-06 13:03:52
 * @email: webcc.coder@qq.com
 */
import classnames from 'classnames'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import dayjs from 'dayjs'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { saveMoreAction } from '@/store/actions/home'
import { RootState } from '@/store'
import { Article } from '@/store/reducers/home'
import { useHistory } from 'react-router-dom'

type Props = {
    className?: string
    channelId: number
    article: Article
}

const ArticleItem = ({ className, article, channelId }: Props) => {
    const { cover: { type, images }, aut_name, title, pubdate, comm_count } = article
    const disPatch = useDispatch()
    const history = useHistory()
    const isLogin = useSelector((state: RootState) => state.login.token)
    return (
        <div className={styles.root} onClick={() => { history.push('/article/' + article.art_id) }}>
            <div
                className={classnames(
                    'article-content',
                    type === 3 ? 't3' : '',
                    type === 0 ? 'none-mt' : ''
                )}
            >
                <h3>{title}</h3>
                {type !== 0 && (
                    <div className="article-imgs">
                        {images.map((item, i) => (
                            <div className="article-img-wrapper" key={i}>
                                <img src={item} alt="" />
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className={classnames('article-info', type === 0 ? 'none-mt' : '')}>
                <span>{aut_name}</span>
                <span>{comm_count} 评论</span>
                <span>{dayjs(pubdate).fromNow()}</span>

                <span className="close">
                    {
                        isLogin && <Icon type="iconbtn_essay_close" onClick={() => disPatch(saveMoreAction({
                            visible: true,
                            article_Id: article.art_id,
                            channelId: channelId
                        }))} />
                    }
                </span>
            </div>
        </div>
    )
}

export default ArticleItem