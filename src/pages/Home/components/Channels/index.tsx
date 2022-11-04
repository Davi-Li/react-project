/*
 * @Author: webcc
 * @Date: 2022-10-31 20:09:56
 * @LastEditTime: 2022-11-04 19:38:40
 * @email: webcc.coder@qq.com
 */
import Icon from '@/components/Icon'
import { useSelector } from 'react-redux'
import styles from './index.module.scss'
// 按需导入
import differenceBy from 'lodash/differenceBy'
import classNames from 'classnames'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addChannel, removeChannel } from '@/store/actions/home'
import { Toast } from 'antd-mobile'
import { RootState } from '@/store'
import { Channel } from '@/store/reducers/home'

/**
 * 频道管理组件
 * @param {Number} props.tabActiveIndex 用户选中的频道的索引
 * @param {Function} props.onClose 关闭频道管理抽屉时的回调函数
 * @param {Function} props.onChannelClick 当点击频道列表中的某个频道时的会带哦函数
 */

type Props = {
    tabActiveIndex: number
    onClose: () => void
    onChangeActive: (index: number) => void
}

const Channels = ({ tabActiveIndex, onClose, onChangeActive }: Props) => {
    const dispatch = useDispatch()
    const userChannel = useSelector((state: RootState) => state.home.userChannel)
    const [edit, setEdit] = useState(false)
    const recommendChannels = useSelector((state: RootState) => {
        const { userChannel, allChannels } = state.home
        // differenceBy可以返回两个数组之间的差
        return differenceBy(allChannels, userChannel, 'id')
        // return allChannels.filter(item => {
        //     return userChannel.findIndex(v => v.id == item.id) === -1
        // })
    })
    const onChange = (index: number) => {
        if (edit) return
        onClose()
        onChangeActive(index)
    }
    const delChannel = (item: Channel, index: number) => {
        if (userChannel.length <= 4) {
            Toast.info("至少保留四个频道", 1)
            return;
        }
        dispatch(removeChannel(item))
        if (index < tabActiveIndex) {
            onChangeActive(tabActiveIndex - 1)
        }
        if (index == tabActiveIndex) {
            onChangeActive(0)
        }
    }
    const add = async (item: Channel) => {
        // console.log(item)
        await dispatch(addChannel(item))
        Toast.info("添加成功", 1)
    }
    return (
        <div className={styles.root}>
            {/* 顶部栏：带关闭按钮 */}
            <div className="channel-header">
                <Icon type="iconbtn_channel_close" onClick={onClose} />
            </div>

            {/* 频道列表 */}
            <div className="channel-content">
                {/* 当前已选择的频道列表 */}
                <div className={classNames("channel-item", edit ? 'edit' : '')}>
                    <div className="channel-item-header">
                        <span className="channel-item-title">我的频道</span>
                        <span className="channel-item-title-extra">
                            点击{edit ? '删除' : '进入'}频道
                        </span>
                        <span className="channel-item-edit" onClick={() => setEdit(!edit)}>
                            {edit ? '保存' : '编辑'}
                        </span>
                    </div>

                    <div className="channel-list">
                        {
                            userChannel.map((item, index) => {
                                return (
                                    <span onClick={() => onChange(index)} className={classNames("channel-list-item", { selected: tabActiveIndex == index })} key={item.id} >
                                        {item.name}
                                        {
                                            index != 0 && < Icon type="iconbtn_tag_close" onClick={() => { delChannel(item, index) }} />
                                        }
                                    </span>
                                )
                            })
                        }
                    </div>
                </div>

                {/* 推荐的频道列表 */}
                <div className="channel-item">
                    <div className="channel-item-header">
                        <span className="channel-item-title">频道推荐</span>
                        <span className="channel-item-title-extra">点击添加频道</span>
                    </div>
                    <div className="channel-list">
                        {
                            recommendChannels.map(item => {
                                return (
                                    <span className="channel-list-item" key={item.id} onClick={() => add(item)}>
                                        + {item.name}
                                    </span>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Channels