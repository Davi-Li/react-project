/*
 * @Author: webcc
 * @Date: 2022-10-30 10:47:30
 * @LastEditTime: 2022-10-30 16:56:32
 * @email: webcc.coder@qq.com
 */
import React from 'react'
import styles from './index.module.scss'
export default function EditList({ config, type, onClose }) {
    let list = config[type]
    return (
        <div className={styles.root}>
            {
                list.map(item => {
                    return <div key={item.title} className="list-item" onClick={item.onClick}>{item.title}</div>
                })
            }
            <div className="list-item" onClick={onClose}>取消</div>
        </div>
    )
}
