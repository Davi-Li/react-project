/*
 * @Author: webcc
 * @Date: 2022-10-28 16:54:10
 * @LastEditTime: 2022-10-30 16:24:48
 * @email: webcc.coder@qq.com
 */
import React from 'react'
import styles from './index.module.scss'
import classnames from 'classnames'
import { useEffect } from 'react'
import { useRef } from 'react'
export default function Input({ extra, onExtraClick, autoFocus, className, ...rest }) {
    const inputRef = useRef(null)
    useEffect(() => {
        if (autoFocus) inputRef.current.focus()
    }, [])
    return (
        <div className={styles.root}>
            <div>
                <input ref={inputRef} className={classnames('input', className)} {...rest} />
                {extra && <span className="extra" onClick={onExtraClick}>{extra}</span>}
            </div>
        </div>
    )
}
