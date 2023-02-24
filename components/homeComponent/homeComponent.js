import ContainerCard from '../cards/ContainerCard/ContainerCard';
import Styles from './homeComponent.module.scss'

const Home = () => {

    return (
        
        <section className={Styles.main}>
            <ContainerCard propClasses={Styles.section1}>
                <div className={Styles.card}>
                    <div className={Styles.cardContentLeft}>
                        <h1>Daily Torah Study</h1>
                        <h3>More Accesible Than Ever! </h3>
                        <button type="button">Subscribe</button>
                    </div>
                    <div className={Styles.cardContentRight}>

                    </div>
                </div>
            </ContainerCard>
            
            <ContainerCard propClasses={Styles.section2}>
            <div className={Styles.card}>
                    <div className={Styles.cardContentLeft}>
                        <h2>Establish Your Daily Torah</h2>
                        <h2>Study Routine</h2>
                        <ul>
                            <li> Print & digital Torah publication in Hebrew & English </li>
                            <li> Daily study cycles; Chumash, Rambam, Tanya & much more  </li>
                            <li> Studied in over 20,000 people in 35 countries </li>
                            <li> Take the guess work out of establishing a daily study routine </li>
                            <li> Shipped to you - 52 editions a year </li>
                        </ul>
                    </div>
                    <div className={Styles.cardContentRight}>
                        <button>View Sample</button>
                    </div>
                </div>
            </ContainerCard>
            
            <ContainerCard>
               
            </ContainerCard>
            
            <ContainerCard>
                
            </ContainerCard>
            
            <ContainerCard>
                
            </ContainerCard>
            
            <ContainerCard>
                
            </ContainerCard>
        </section>
    
    )

}

export default Home;