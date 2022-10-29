/*
 * @Author: webcc
 * @Date: 2022-10-27 00:41:41
 * @LastEditTime: 2022-10-29 14:24:05
 * @email: webcc.coder@qq.com
 */
import React, { useState } from 'react'
import NavBar from '@/components/NavBar'
import styles from './index.module.scss'
import { Toast } from 'antd-mobile'
import Input from '@/components/Input'
import classnames from 'classnames'
import { sendCode, userLogin } from '@/store/actions/login'
import * as Yup from 'yup';
// formik表单校验
import { useFormik } from 'formik'
import { useDispatch } from 'react-redux'
export default function Login() {
    const dispatch = useDispatch();
    const validationSchema = Yup.object({
        mobile: Yup.string().required("手机号不能为空").matches(/^1[3-9]\d{9}$/, "手机号格式不正确"),
        code: Yup.string().required("验证码不能为空").matches(/^\d{6}$/, "验证码格式不正确")
    })
    let formik = useFormik({
        initialValues: {
            mobile: '18568963241',
            code: '246810'
        },
        // 登录
        onSubmit: async values => {
            await dispatch(userLogin({
                mobile,
                code
            }))
            Toast.show({
                content: '登录成功',
            })
        },
        validationSchema
    })
    let {
        values: { mobile, code },
        handleChange,
        handleSubmit,
        handleBlur,
        errors,
        touched,
        isValid,
    } = formik
    let [time, setTime] = useState(0)
    const onExtraClick = async () => {
        if (time > 0) return;
        // 正则表达式.test(待校验的字段)
        if (!/^1[3-9]\d{9}$/.test(mobile)) {
            // 设置是否触碰
            formik.setTouched({
                mobile: true
            })
            return
        }
        await dispatch(sendCode(mobile))
        Toast.show({
            content: '发送验证码成功',
        })
        setTime(60)
        let timeId = setInterval(() => {
            if (time == 1) {
                clearInterval(timeId)
            }
            setTime((time) => time - 1)
        }, 1000);
    }
    return (
        <div className={styles.root}>
            <NavBar>登录</NavBar>
            <div className="content">
                {/* 标题 */}
                <h3>短信登录</h3>
                <form onSubmit={handleSubmit}>
                    {/* 手机号输入框 */}
                    <div className="input-item">
                        <div className="input-box">
                            <Input placeholder="请输入手机号" autoComplete="off" name="mobile" value={mobile} onChange={handleChange} onBlur={handleBlur}></Input>
                            {/* <input
                                className="input"
                                name="mobile"
                                placeholder="请输入手机号"
                                autoComplete="off"
                            /> */}
                        </div>
                        {
                            touched.mobile && errors.mobile && <div className="validate">{errors.mobile}</div>
                        }
                    </div>

                    {/* 短信验证码输入框 */}
                    <div className="input-item">
                        <div className="input-box">
                            <Input extra={time > 0 ? time + 's后获取' : "发送验证码"} autoComplete="off" placeholder="请输入验证码" onBlur={handleBlur} onExtraClick={onExtraClick} name="code" value={code} onChange={handleChange}></Input>
                            {/* <input
                                className="input"
                                name="code"
                                placeholder="请输入验证码"
                                maxLength={6}
                                autoComplete="off"
                            /> */}
                            {/* <div className="extra">获取验证码</div> */}
                        </div>
                        {
                            touched.code && errors.code && <div className="validate">{errors.code}</div>
                        }
                    </div>

                    {/* 登录按钮 */}
                    <button type="submit" className={classnames('login-btn', { disabled: !isValid })} disabled={!isValid}>
                        登录
                    </button>
                </form>
            </div>
        </div>
    )
}
