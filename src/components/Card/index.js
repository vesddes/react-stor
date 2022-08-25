import React, {useState, useContext} from "react";
import ContentLoader from "react-content-loader";
import AppContext from "../../context";
import styles from './Card.module.scss';


function Card({onFavorite, onPlus, id, title, imageUrl, githubUrl, price, favorited = false,  loading = false}) {
    const {isItemAdded} = useContext(AppContext);
    const [isFavorite, setIsFavorite] = useState(favorited);

    const onClickPlus = () => {
        onPlus({id, parentId: id, title, githubUrl, price});
    }

    const inClickFavorite = () => {
        onFavorite({id, parentId: id, title, githubUrl, price});
        setIsFavorite(!isFavorite)
    }

    return (
        <div className={styles.card}>
            {
                loading ?
                    (
                        <ContentLoader
                            speed={2}
                            width={160}
                            height={230}
                            viewBox="0 0 165 265"
                            backgroundColor="#f3f3f3"
                            foregroundColor="#ecebeb"
                        >
                            <rect x="0" y="11" rx="10" ry="10" width="155" height="120" />
                            <rect x="0" y="181" rx="5" ry="5" width="155" height="15" />
                            <rect x="0" y="205" rx="5" ry="5" width="100" height="15" />
                            <rect x="0" y="235" rx="5" ry="5" width="80" height="25" />
                            <rect x="122" y="228" rx="10" ry="10" width="32" height="32" />
                        </ContentLoader>
                    )
                    :
                    (
                        <>
                            {onFavorite && <div className={styles.favourite} onClick={inClickFavorite}>
                                <img src={isFavorite ? "img/heart-liked.svg" : "img/heart-unliked.svg"}
                                     alt="unliked"/>
                            </div>}
                            <img width={133} height={112} src={githubUrl} alt="sneakers"/>
                            <h5>{title}</h5>

                            <div className={styles.cardBottom}>
                                <div>
                                    <span>Price:</span>
                                    <b>{price} USD</b>
                                </div>
                                {onPlus && <img
                                    className={styles.button}
                                    onClick={onClickPlus}
                                    src={isItemAdded(id) ? 'img/plus-checked.svg' : 'img/plus-unchecked.svg'}
                                    alt='plus'/>}
                            </div>
                            </>
                            )
            }
        </div>

    );
}

export default Card;