import Styles from './Alert.module.scss'

export function Alert({children, level}){
    
    let alertLevel = level ? Styles[`${"alert"+level}`] : Styles.alert1

    return (
    <div className={`${Styles.localContainer} ${alertLevel}`}>
        {children}
    </div>)

}