/*
 * @Author: webcc
 * @Date: 2022-10-28 16:54:10
 * @LastEditTime: 2022-10-28 17:08:44
 * @email: webcc.coder@qq.com
 */
import React from 'react'
import styles from './index.module.scss'
import classnames from 'classnames'
export default function Input({ extra, onExtraClick, className, ...rest }) {
    return (
        <div className={styles.root}>
            <div>
                <input className={classnames('input', className)} {...rest} />
                {extra && <span className="extra" onClick={onExtraClick}>{extra}</span>}
            </div>
        </div>
    )
}
