/*
 * @Author: webcc
 * @Date: 2022-10-30 14:26:03
 * @LastEditTime: 2022-10-30 16:22:46
 * @email: webcc.coder@qq.com
 */
import classNames from 'classnames'
import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import styles from './index.module.scss'
export default function Textarea({ maxLength = 100, value, className, onChange, ...rest }) {
    let [text, setText] = useState(value || '')
    const inputRef = useRef(null)
    useEffect(() => {
        inputRef.current.focus()
        inputRef.current.setSelectionRange(-1, -1)
    }, [])
    const handleChange = (e) => {
        setText(e.target.value)
        onChange && onChange(e)
    }
    return (
        <div className={styles.root}>
            <textarea
                ref={inputRef}
                className={classNames('textarea', className)}
                value={text}
                maxLength={maxLength}
                onChange={handleChange}
                {...rest}
            >
            </textarea>
            <div className="count">{text.length}/{maxLength}</div>
        </div>
    )
}
