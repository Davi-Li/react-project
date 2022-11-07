/*
 * @Author: Flockmaster
 * @Date: 2022-11-06 17:53:42
 * @LastEditTime: 2022-11-06 21:50:10
 * @Language: JavaScript | TypeScript
 */
import { useEffect, useRef } from 'react'
import styles from './index.module.scss'

type Props = {
    children: React.ReactElement | string
    top?: number
}

const Sticky = ({ children, top = 0 }: Props) => {
    const placeRef = useRef<HTMLDivElement>(null)
    const stickyRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        let child = stickyRef.current!
        let place = placeRef.current!
        // document.documentElement.clientWidth获取屏幕宽度
        const onScroll = () => {
            let value = top / 375 * document.documentElement.clientWidth
            if (place.getBoundingClientRect().top <= top) {
                child.style.position = "fixed"
                child.style.top = value + 'px'
                place.style.height = child.offsetHeight + 'px'
            } else {
                child.style.position = "static"
                child.style.top = "auto"
                place.style.height = "0px"
            }
        }
        window.addEventListener("scroll", onScroll)
        return () => {
            window.removeEventListener("scroll", onScroll)
        }
    }, [top])

    return (
        <div className={styles.root}>
            {/* 占位元素 */}
            <div className="sticky-placeholder" ref={placeRef} />
            {/* 吸顶显示的元素 */}
            <div className="sticky-container" ref={stickyRef}>
                {children}
            </div>
        </div>
    )
}

export default Sticky