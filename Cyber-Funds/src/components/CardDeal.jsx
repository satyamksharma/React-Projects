import { card } from '../assets';
import styles, { layout } from '../style';
import Button from './Button';

const CardDeal = () => (
    <section className={layout.section}>
        <div className={layout.sectionInfo}>
            <h2 className={styles.heading2}>
                The Best Card deal for <br className="sm:block hidden" /> you right away.
            </h2>
            <p className={`${styles.paragraph} max-w-[480px] mt-5`}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati totam quo iste
                hic officiis cumque, quasi perferendis. Ab repudiandae aperiam laudantium officia,
                numquam voluptates ad earum minima obcaecati vitae autem.
            </p>
            <Button styles="mt-10" />
        </div>

        <div className={layout.sectionImg}>
            <img
                src={card}
                alt="card"
                className="w-[100%] h-[100%]"
            />
        </div>
    </section>
);

export default CardDeal;
