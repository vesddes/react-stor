import React, {useContext} from "react";
import AppContext from "../context";
import styles from './/Drawer/Drawer.module.scss';

const InfoCart = ({image, title, description}) => {
    const {setCartOpened} = useContext(AppContext);

    return (
        <div className={styles.cartEmpty}>
            <img className={styles.cartImg} width={120}  src={image} alt=""/>
            <h2>{title}</h2>
            <p>{description}</p>
            <button onClick={() => setCartOpened(false)} className={styles.greenBtn}>
                <img src="img/arrow.svg" alt="arrow"/>
                Get back
            </button>
        </div>
    )
}

export default  InfoCart;