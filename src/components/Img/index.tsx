/*
 * @Author: webcc
 * @Date: 2022-11-02 16:08:49
 * @LastEditTime: 2022-11-03 20:51:09
 * @email: webcc.coder@qq.com
 */
import classnames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import Icon from '../Icon'
import styles from './index.module.scss'

type Props = {
    className?: string,
    src: string,
    alt?: string
}

/**
 * 拥有懒加载特性的图片组件
 * @param {String} props.src 图片地址
 * @param {String} props.className 样式类
 */
const Image = ({ src, className, alt }: Props) => {
    // 记录图片加载是否出错的状态
    const [isError, setIsError] = useState(false)

    // 记录图片是否正在加载的状态
    const [isLoading, setIsLoading] = useState(true)

    // 对图片元素的引用
    const imgRef = useRef<HTMLImageElement>(null)

    const onLoad = () => {
        setIsError(false)
        setIsLoading(false)
    }

    const onError = () => {
        setIsError(false)
        setIsLoading(true)
    }

    useEffect(() => {
        const current = imgRef.current!
        const observe = new IntersectionObserver(([{ isIntersecting }]) => {
            if (isIntersecting) {
                current.src = current.dataset.src!
                observe.unobserve(current)
            }
        })
        observe.observe(current)
    }, [])
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
                <img
                    alt={alt}
                    data-src={src}
                    ref={imgRef}
                    onLoad={onLoad}
                    onError={onError}
                />
            )}
        </div>
    )
}

export default Image