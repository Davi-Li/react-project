/*
 * @Author: webcc
 * @Date: 2022-10-27 21:55:04
 * @LastEditTime: 2022-11-03 18:36:53
 * @email: webcc.coder@qq.com
 */
import classnames from 'classnames'

type Props = {
    type: string,
    className?: string
    onClick?: () => void
}

function Icon({ type, className, ...rest }: Props) {
    return (
        <svg className={classnames('icon', className)} aria-hidden="true" {...rest}>
            <use xlinkHref={`#${type}`}></use>
        </svg>
    )
}


export default Icon;
