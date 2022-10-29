/*
 * @Author: webcc
 * @Date: 2022-10-27 21:55:04
 * @LastEditTime: 2022-10-27 22:03:51
 * @email: webcc.coder@qq.com
 */
import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

function Icon({ type, className, ...rest }) {
    return (
        <svg className={classnames('icon', className)} aria-hidden="true" {...rest}>
            <use xlinkHref={`#${type}`}></use>
        </svg>
    )
}

Icon.propTypes = {
    type: PropTypes.string.isRequired
}

export default Icon;
