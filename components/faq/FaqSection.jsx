import Styles from './faqSection.module.scss';
import ContentStyles from '../../styles/content.module.scss';
import { slugify } from '../../api/util'; 

export default function FaqSection({ faqSection }) {
    return <div id={slugify(faqSection.name)} className={Styles.faqSectionWrapper}>
        <h2 className={Styles.title}>{faqSection.name}</h2>

        {faqSection.questions.map(question => <div key={question.id}>
            <div className={Styles.qaWrapper}>
                <p className={Styles.question}>{question.question}</p>
                <div
                    className={`${ContentStyles.content} ${Styles.answer}`}
                    dangerouslySetInnerHTML={{ __html: question.answer }}
                />
            </div>
        </div>)}
    </div>
}