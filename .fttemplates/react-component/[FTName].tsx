import { classNames } from '@/utils/className'
import cls from './<FTName>.module.scss'

interface <FTName>Props {
    className?: string
}
export const <FTName> = (props: <FTName>Props) => {
    const { className } = props
    return (
        <div
            className={classNames(cls.<FTName|camelcase>, {}, [
                className ? className : '',
            ])}
        >
           <FTName>
        </div>
    )
}
