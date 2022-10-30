/*
 * @Author: webcc
 * @Date: 2022-10-30 10:47:15
 * @LastEditTime: 2022-10-30 16:25:13
 * @email: webcc.coder@qq.com
 */
import React, { useState } from 'react'
import styles from './index.module.scss'
import NavBar from '@/components/NavBar'
import Textarea from '@/components/Textarea'
import { useSelector } from 'react-redux'
import Input from '@/components/Input'

export default function EditInput({ onClose, type, onSubmit }) {
    const defaultValue = useSelector(state => {
        return state.profile.profile[type]
    })
    const [value, setValue] = useState(defaultValue || '')
    return (
        <div className={styles.root}>
            <NavBar extra={<span className='commit-btn' onClick={() => onSubmit(type, value)}>提交</span>} onLeftClick={onClose}>编辑{type == 'name' ? '昵称' : '简介'}</NavBar>
            <div className="content-box">
                <h3>{type == 'name' ? '昵称' : '简介'}</h3>
                {
                    type == 'name' ? <Input className="input-wrap" autoFocus placeholder="请输入昵称" value={value} onChange={(e) => setValue(e.target.value)} /> : <Textarea maxLength={200} placeholder="请输入简介" value={value} onChange={(e) => setValue(e.target.value)}></Textarea>
                }
            </div>
        </div>
    )
}
