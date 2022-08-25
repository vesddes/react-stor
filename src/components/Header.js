import {Link} from "react-router-dom";
import {useContext} from "react";
import AppContext from "../context";


export default function Header(props) {
    const {cartItems} = useContext(AppContext);

    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum,0);


    return (
        <header>
            <div className="headerLeft">
                <Link to="/react-store">
                <img width={40} height={40} src="img/logo.png" alt="logo"/>
                </Link>
                <div className="headerInfo">
                    <h3>Store Sneakers</h3>
                    <p>Shop of the best sneakers</p>
                </div>
            </div>


            <ul className="headerRight">
                <li onClick={props.onClickCart}>
                    <img width={18} height={18} src="img/cart.svg" alt="cart"/>
                    <span>{totalPrice} USD</span>
                </li>
                <li>
                    <Link to="/react-store/favorites">
                    <img width={18} height={18} src="img/saved.svg" alt="saved"/>
                    </Link>
                </li>
                <li>
                    <Link to="/react-store/orders">
                    <img width={18} height={18} src="img/user.svg" alt="user"/>
                    </Link>
                </li>
            </ul>
        </header>
    );
}