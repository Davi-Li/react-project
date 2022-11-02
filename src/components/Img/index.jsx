/*
 * @Author: webcc
 * @Date: 2022-11-02 16:08:49
 * @LastEditTime: 2022-11-02 16:13:41
 * @email: webcc.coder@qq.com
 */
import classnames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import Icon from '../Icon'
import styles from './index.module.scss'

/**
 * 拥有懒加载特性的图片组件
 * @param {String} props.src 图片地址
 * @param {String} props.className 样式类
 */
const Image = ({ src, className }) => {
    // 记录图片加载是否出错的状态
    const [isError, setIsError] = useState(false)

    // 记录图片是否正在加载的状态
    const [isLoading, setIsLoading] = useState(true)

    // 对图片元素的引用
    const imgRef = useRef(null)

    // useEffect(() => {
    //     const observe = new IntersectionObserver((entries, imgObserver) => {

    //     })
    // }, [])
    return (
        <div className={classnames(styles.root, className)}>
            {/* 正在加载时显示的内容 */}
            {isLoading && (
                <div className="image-icon">
                    <Icon type="iconphoto" />
                </div>
            )}

            {/* 加载出错时显示的内容 */}
            {isError && (
                <div className="image-icon">
                    <Icon type="iconphoto-fail" />
                </div>
            )}

            {/* 加载成功时显示的内容 */}
            {!isError && (
                <img alt=""
                    data-src={src}
                    ref={imgRef}
                    onLoad={() => setIsLoading(false)}
                    onError={() => setIsError(true)}
                />
            )}
        </div>
    )
}

export default Image