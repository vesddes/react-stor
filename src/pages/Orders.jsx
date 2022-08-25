import React, { useEffect, useState} from "react";
import Card from "../components/Card";
import axios from "axios";
import Info from "../components/Info";


export function Orders() {

    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const {data} = await axios.get('https://6300ce1b9a1035c7f8f861ab.mockapi.io/orders');
                setOrders(data.reduce((acc, obj) => [...acc, ...obj.items], []));
                setIsLoading(false);
            } catch (e) {
                alert('Error');
            }
        }
        fetchData();
    },[]);

    return (
        <div className="content">
            {
                orders.length > 0 ?
                    (<>
                        <div className="content-title">
                            <h1>My orders</h1>
                        </div>

                        <div className="sneakers">
                            {(isLoading ? [...Array(8)] : orders)
                                .map((item, index) => (
                                    <Card
                                        key={index}
                                        loading={isLoading}
                                        {...item}
                                    />
                                ))
                            }
                        </div>
                    </>)
                    :
                    (<Info
                        title={"You have no orders"}
                        description={"Place at least one order."}
                        image={"img/emoji-cart.jpg"}
                    />)
            }
        </div>
    );
}
