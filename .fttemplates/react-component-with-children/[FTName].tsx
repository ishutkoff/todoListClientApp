import { classNames } from '@/shared/lib/className/className'
import cls from './<FTName>.module.scss'
import { ReactNode } from 'react'

interface <FTName>Props {
    className?: string
    children?: ReactNode
}
export const <FTName> = (props: <FTName>Props) => {
    const { className, children } = props
    return (
        <div
            className={classNames(cls.<FTName|camelcase>, {}, [
                className ? className : '',
            ])}
        >
            {children}
        </div>
    )
}
