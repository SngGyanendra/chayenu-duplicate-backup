import Styles from "./FeatureList.module.scss";
import {useState,useEffect} from 'react';
import { useWindowDimensions } from '../../hooks/useWindow';

const FeatureList = (props) => {
    const [openPopup, setOpenPopup] = useState(false);
    const [mobileView, setMobileView] = useState(false);
    const { width } = useWindowDimensions();
    useEffect(()=>{
    
        if(width < 800 ){
          setMobileView(true)
        }else{
            setMobileView(false);
        }
    
      }, [width])

    return (
        <div className={`${ mobileView ? Styles.mobileBox:Styles.box} ${ (openPopup && mobileView) ? Styles.active:''}`} onClick={() => setOpenPopup(!openPopup)}>
            <div className={Styles.heading}>
                <i className={`${Styles.arrowDown} ${openPopup ? Styles.up:''}`}></i>
                <p className={Styles.text}>{props.feature.title}</p>
                <img className={Styles.image} src={props.feature.icon} alt="box" />
            </div>
            <p className={Styles.hoverText}>{props.feature.text}</p>
        </div>
    );
}
export default FeatureList;