/*
 * @Author: webcc
 * @Date: 2022-11-02 14:47:22
 * @LastEditTime: 2022-11-02 16:05:01
 * @email: webcc.coder@qq.com
 */
import Icon from '@/components/Icon'
import { Modal, Toast } from 'antd-mobile'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'
import { saveMoreAction, unLikeArticle, reportArticle } from '@/store/actions/home'

/**
 * 举报反馈菜单
 */
const list = [
    { id: 0, title: '其他问题' },
    { id: 1, title: '标题夸张' },
    { id: 2, title: '低俗色情' },
    { id: 3, title: '错别字多' },
    { id: 4, title: '旧闻重复' },
    { id: 5, title: '广告软文' },
    { id: 6, title: '内容不适' },
    { id: 7, title: '涉嫌违法犯罪' },
    { id: 8, title: '侵权' },
]

const MoreAction = () => {
    const dispatch = useDispatch()
    const { visible, article_Id, channelId } = useSelector(state => state.home.moreAction)
    // 举报类型：normal 不感兴趣或拉黑作者 | junk 垃圾内容
    const [type, setType] = useState('normal')

    // 关闭弹框时的事件监听函数
    const onClose = () => {
        dispatch(saveMoreAction({
            visible: false,
            article_Id: '',
            channelId: ''
        }))
    }
    const unLike = async () => {
        // await会等待结果回来后再继续执行下面的代码
        await dispatch(unLikeArticle(article_Id))
        onClose()
        Toast.info("拉黑成功", 1)
    }
    const report = async (id) => {
        await dispatch(reportArticle(article_Id, id))
        onClose()
        setType('normal')
        Toast.info("举报成功", 1)
    }
    return (
        <div className={styles.root}>
            <Modal
                className="more-action-modal"
                title=""
                transparent
                maskClosable
                footer={[]}
                onClose={onClose}
                visible={visible}
            >
                <div className="more-action">
                    {/* normal 类型时的菜单内容 */}
                    {type === 'normal' && (
                        <>
                            <div className="action-item" onClick={() => unLike()}>
                                <Icon type="iconicon_unenjoy1" /> 不感兴趣
                            </div>
                            <div className="action-item" onClick={() => setType('junk')}>
                                <Icon type="iconicon_feedback1" />
                                <span className="text">反馈垃圾内容</span>
                                <Icon type="iconbtn_right" />
                            </div>
                            <div className="action-item">
                                <Icon type="iconicon_blacklist" /> 拉黑作者
                            </div>
                        </>
                    )}

                    {/* junk 类型时的菜单内容 */}
                    {type === 'junk' && (
                        <>
                            <div className="action-item" onClick={() => setType('normal')}>
                                <Icon type="iconfanhui" />
                                <span className="back-text">反馈垃圾内容</span>
                            </div>
                            {
                                list.map(item => {
                                    return (
                                        <div key={item.id} className="action-item" onClick={() => report(item.id)}>{item.title}</div>
                                    )
                                })
                            }
                        </>
                    )}
                </div>
            </Modal>
        </div>
    )
}

export default MoreAction