import React, {useContext} from "react";
import Card from "../components/Card";
import AppContext from "../context";
import Info from "../components/Info";


function Favorites() {
    const {favorites, onAddFavorite} = useContext(AppContext);
    return (
        <div className="content">
            {
                favorites.length > 0 ?
                    (<>
                        <div className="content-title">
                            <h1>All favorites</h1>
                        </div>

                        <div className="sneakers">
                            {
                                favorites
                                    .map((item, index) => (
                                        <Card
                                            key = {index}
                                            favorited={true}
                                            onFavorite = {onAddFavorite}
                                            {...item}
                                        />
                                    ))
                            }
                        </div>
                    </>)
                :
                (<Info
                    title={"No favorites"}
                    description={"You haven't added anything to your favorites."}
                    image={"img/emoji-favorites.jpg"}
                />)
            }
        </div>
    );
}

export default Favorites;