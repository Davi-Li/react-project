/*
 * @Author: webcc
 * @Date: 2022-11-01 15:21:39
 * @LastEditTime: 2022-11-01 16:04:26
 * @email: webcc.coder@qq.com
 */
import classnames from 'classnames'
import Icon from '@/components/Icon'
import styles from './index.module.scss'
import dayjs from 'dayjs'
// 导入dayjs插件
import relativeTime from 'dayjs/plugin/relativeTime'
// 引入dayjs国际化
import 'dayjs/locale/zh-cn'
dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

const ArticleItem = ({ className, article }) => {
    const { cover: { type, images }, aut_name, title, pubdate, comm_count } = article
    return (
        <div className={styles.root}>
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
                    <Icon type="iconbtn_essay_close" />
                </span>
            </div>
        </div>
    )
}

export default ArticleItem