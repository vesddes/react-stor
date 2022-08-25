import InfoCart from "../InfoCart";
import {useContext, useState} from "react";
import axios from "axios";
import AppContext from "../../context";

import styles from './Drawer.module.scss';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve,ms));

export default function Drawer({opened, onRemove, onClose, items = []}) {
    const {cartItems, setCartItems} = useContext(AppContext);
    const [orderId, setOrderId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOrderComplete, setIsOrderComplete] = useState(false);

    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum,0);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const {data} = await axios.post('https://6300ce1b9a1035c7f8f861ab.mockapi.io/orders', {items: cartItems});
            setOrderId(data.id);
            setIsOrderComplete(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete(`https://6300ce1b9a1035c7f8f861ab.mockapi.io/cart/${item.id}`);
                await delay(1000)
            }
        } catch (e) {
            alert('Error creating order :(');
        }
        setIsLoading(false);
    }

    return (
        <div className={ `${styles.overlay} ${opened ? styles.overlayVisible : ''} `}>
            <div className={styles.drawer}>
                <h2>Cart
                    <img onClick={onClose} className={styles.removeBtn} src="img/btn-remove.svg" alt="remove"/>
                </h2>

                {
                    items.length > 0 ?
                        (<>
                            <div className={styles.items}>
                                {items.map((obj) => (
                                    <div key={obj.id} className={styles.cartItem}>
                                        <div style={{backgroundImage: `url(${obj.githubUrl})`}} className={styles.cartItemImg}></div>
                                        <div>
                                            <p>{obj.title}</p>
                                            <b>{obj.price} USD</b>
                                        </div>
                                        <img onClick={() => onRemove(obj.id)} className={styles.removeBtn} src="img/btn-remove.svg" alt="remove"/>
                                    </div>
                                ))}
                            </div>

                            <div className={styles.cartTotalBlock}>
                                <ul>
                                    <li>
                                        <span>Total:</span>
                                        <div></div>
                                        <b>{totalPrice} USD</b>
                                    </li>
                                    <li>
                                        <span>Tax 5%:</span>
                                        <div></div>
                                        <b>{Math.round(totalPrice * 0.05)} USD</b>
                                    </li>
                                </ul>
                                <button disabled={isLoading} onClick={onClickOrder} className={styles.greenBtn}>Make an order
                                    <img src="img/arrow.svg" alt="Arrow"/></button>
                            </div>
                        </>)
                        :
                        (<InfoCart
                            title={isOrderComplete ? "Your order has been confirmed!" : "Cart is empty"}
                            description={isOrderComplete ? `Your order #${orderId} will soon be handed over to courier delivery` : "Add at least one pair of sneakers to place an order."}
                            image={isOrderComplete ? "img/order-complete.jpg" : "img/empty-cart.jpg"}
                        />)
                }
            </div>
        </div>
    );
}
