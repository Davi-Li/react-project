/*
 * @Author: webcc
 * @Date: 2022-10-28 16:54:10
 * @LastEditTime: 2022-11-03 22:18:12
 * @email: webcc.coder@qq.com
 */
import React, { InputHTMLAttributes } from 'react'
import styles from './index.module.scss'
import classnames from 'classnames'
import { useEffect } from 'react'
import { useRef } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    extra?: string
    className?: string
    autoFocus?: boolean
    onExtraClick?: () => void
}

export default function Input({ extra, onExtraClick, autoFocus, className, ...rest }: Props) {
    const inputRef = useRef<HTMLInputElement>(null)
    useEffect(() => {
        if (autoFocus) inputRef.current!.focus()
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
