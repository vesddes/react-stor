import Card from "../components/Card";
import React from "react";
import {Banner} from "../components/Banner";

function Home({items, favorites, searchValue, setSearchValue, onChangeSearchInput, onAddFavorite, onAddToCart, isLoading}) {

    const renderItems = () => {
        const filteredItems = items.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));

        return   (isLoading ? [...Array(8)] : filteredItems)
          .map((item, index) => (
              <Card
                  key = {index}
                  onFavorite = {(obj) => onAddFavorite(obj)}
                  onPlus = {(obj) => onAddToCart(obj)}
                  loading={isLoading}
                  favorited={favorites.some(obj => obj.parentId === item.id)}
                  {...item}
              />
          ))
    };

    return (
        <div className="content">
            <Banner />
            <div>
                <div className="content-title">
                    <h1>{searchValue ? `Search by request: "${searchValue}"` : 'All sneakers'}</h1>

                    <div className="search-block">
                        <img src="img/search.svg" alt="search"/>
                        {searchValue &&
                        <img
                            onClick= {() => setSearchValue('')}
                            className='clear'
                            src="img/btn-remove.svg"
                            alt="clear"/>}
                        <input onChange={onChangeSearchInput} value={searchValue} type="text" placeholder="Search..."/>
                    </div>
                </div>


                <div className="sneakers">
                    {
                        renderItems()
                    }
                </div>
            </div>

    </div>
    );
}

export default Home;
