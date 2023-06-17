
const ContainerCard = ({children, propClasses}) => {
    return  (
        <div className={propClasses}>
            {children}
        </div>
    )
}

export default ContainerCard;