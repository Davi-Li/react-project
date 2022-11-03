/*
 * @Author: webcc
 * @Date: 2022-10-30 14:26:03
 * @LastEditTime: 2022-11-03 22:34:32
 * @email: webcc.coder@qq.com
 */
import classNames from 'classnames'
import React from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { useState } from 'react'
import styles from './index.module.scss'

type Props = Omit<React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement>,
    'value' | 'maxLength' | 'onChange'
> & {
    maxLength: number,
    value: string,
    className: string,
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export default function Textarea({ maxLength = 100, value, className, onChange, ...rest }: Props) {
    let [text, setText] = useState(value || '')
    const inputRef = useRef<HTMLTextAreaElement>(null)
    useEffect(() => {
        inputRef.current!.focus()
        inputRef.current!.setSelectionRange(-1, -1)
    }, [])
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
