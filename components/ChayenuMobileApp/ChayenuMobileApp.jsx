import {useState, useEffect, useRef} from 'react';
import dailyStudyData from '../../data/dailyStudy.json';
import weeklyStudyData from '../../data/weeklyStudy.json';
import { useWindowDimensions } from '../../hooks/useWindow';
import Image from 'next/image';
import GOTMobileImage1 from '/public/images/homepage/GOTM1@2x.webp';
import GOTMobileImage2 from '/public/images/homepage/GOTM2@2x.webp';
import { Popup } from '/components/common';

const ChayenuMobileApp = ({Styles}) => {
    const [borderColor, setBorderColor] = useState(dailyStudyData.defaultBorderColor);
    const studyIndexRef = useRef(0)
    const { width } = useWindowDimensions();
    const [selectedChumashScreen, setselectedChumashScreen] = useState(
        dailyStudyData
    );
    const [openPopup, setOpenPopup] = useState(false);

  

    useEffect(()=>{

        if(width >= 800){
        const combinedStudyData = [...dailyStudyData.data, ...weeklyStudyData.data]
        const lengthOfCombinedStudyData = combinedStudyData.length
        
        const interval = setInterval(()=>{
    
          if(studyIndexRef.current >= lengthOfCombinedStudyData){
            studyIndexRef.current = 0;
          } else{
            setselectedChumashScreen(combinedStudyData[studyIndexRef.current])
            setBorderColor(combinedStudyData[studyIndexRef.current].textColor)
            ++studyIndexRef.current;
          }
    
        }, 2000)
    
        return () => {
          window.clearInterval(interval)
        }
      }
    
      }, [width])
    
      useEffect(()=>{
    
        if(width > 800 && openPopup){
          setOpenPopup(false)
        }
    
      }, [width, openPopup])


      const setMobileScreenData = (data) => {
          setselectedChumashScreen(data);
          setBorderColor(selectedChumashScreen.textColor)
          studyIndexRef.current = data.id;
      }

      const changeOnMouseOver = (data) => {
        if(width >=800){  
          setMobileScreenData(data)
        }
      }

      const changeOnClick = (data) => {
        if(width <= 800){
            setOpenPopup(true);
            setMobileScreenData(data);
        }
      }

    return (
        <div id="mobile-app" className={Styles.card}>
            <div className={Styles.head}>
              <h2>Chayenu App</h2>
            </div>

            <div className={Styles.cardContentLeft}>
              <div>
                <p className={Styles.subtitle}>DAILY STUDY</p>

                <div className={Styles.childCard}>
                  {dailyStudyData.data.map((data) => (
                    <div
                      className={Styles.dailyStudyCards}
                      style={{ backgroundColor: data.backgroundColor, border: data.textColor === borderColor && width > 800 ? `2px solid ${borderColor}`: '' }}
                      key={data.title}
                      onMouseOver={() => {
                        changeOnMouseOver(data);
                      }}
                      onClick={()=>{
                        changeOnClick(data);
                      }}
                    >
                      <p style={{ color: data.textColor }}>{data.title}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className={Styles.subtitle}>Weekly STUDY</p>
                <div>
                  <div className={Styles.childCard}>
                    {weeklyStudyData.data.map((data, index) => (
                      <div
                      style={{ backgroundColor: data.backgroundColor, border: data.textColor === borderColor && width > 800? `2px solid ${borderColor}`: '' }}
                        className={Styles.dailyStudyCards}
                        key={data.title}
                        onMouseOver={() => {
                          changeOnMouseOver(data);
                        }}
                        onClick={()=>{
                          changeOnClick(data);
                        }}
                        // onMouseLeave={()=>{setselectedChumashScreen(dailyStudyData.defaultUrl)}}
                      >
                        <p style={{ color: data.textColor }}>{data.title}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={Styles.cardContentRight}>
              <Image
                src={GOTMobileImage1}
                className={Styles.mobileWrapper}
                alt="Chayenu Mobile"
                height={328}
                width={155}
                objectFit="contain"
              />
              <Image
                className={Styles.screen}
                src={selectedChumashScreen.imageUrl || dailyStudyData.defaultUrl}
                alt="Chayenu Mobile"
                height={297}
                width={132}
                objectFit="contain"
              />
            </div>
            {
      
      openPopup && 
      <div className={Styles.popUp}>
      <Popup setPopupState={setOpenPopup} additionalStyles={{alignItems: 'flex-start', paddingTop:'2rem'}}> 
            <div>
              <Image
                src={GOTMobileImage1}
                alt="Chayenu Mobile"
                height={584}
                width={269}
                objectFit="contain"
              />
              <Image
                className={Styles.modalScreen}
                src={selectedChumashScreen.imageUrl}
                alt="Chayenu Mobile"
                height={560}
                width={250}
                objectFit="contain"
              />
            </div>
      </Popup>
      </div>
      }
          </div>
    );

}

export default ChayenuMobileApp;