import React, {useEffect, useState} from "react";
import { Route } from 'react-router-dom';
import axios from "axios";
import AppContext from "./context";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import {Routes} from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import { Orders } from "./pages/Orders";


function App() {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [searchValue, setSearchValue] = useState('')
    const [cartOpened, setCartOpened] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [itemsResponse, cartResponse, favoritesResponse] = await Promise.all(
                    [axios.get('https://6300ce1b9a1035c7f8f861ab.mockapi.io/items/'),
                    axios.get('https://6300ce1b9a1035c7f8f861ab.mockapi.io/cart/'),
                    axios.get('https://6300ce1b9a1035c7f8f861ab.mockapi.io/favorites/')]
                );

                setIsLoading(false);

                setCartItems(cartResponse.data);
                setFavorites(favoritesResponse.data);
                setItems(itemsResponse.data);
            } catch (e) {
                alert('Ошибка при запросе данных')
            }
        }

        fetchData();
    }, []);

    const onAddToCart = async (obj) => {
        try {
            const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
            if (findItem) {
                setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
                await axios.delete(`https://6300ce1b9a1035c7f8f861ab.mockapi.io/cart/${findItem.id}`);
            } else {
                setCartItems(prev => [...prev, obj])
                const { data } = await axios.post('https://6300ce1b9a1035c7f8f861ab.mockapi.io/cart/', obj);
                setCartItems(prev => prev.map(item => {
                    if (item.parentId === data.parentId) {
                        return {
                            ...item,
                            id: data.id
                        };
                    }
                    return item;
                }))
            }
        } catch (e) {
            alert('Не удалось добавить в корзину')
        }
    };

    const onRemoveItem = (id) => {
        try {
            axios.delete(`https://6300ce1b9a1035c7f8f861ab.mockapi.io/cart/${id}`);
            setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)))
        } catch (e) {
            alert("Ошибка при удаленни из корзины")
        }
    }

    const onAddFavorite = async (obj) => {
        try {
            const findFavorite = favorites.find(favObj => Number(favObj.parentId) === Number(obj.id));
            if (findFavorite) {
                setFavorites(prev => prev.filter(item => item.parentId !== obj.id));
                axios.delete(`https://6300ce1b9a1035c7f8f861ab.mockapi.io/favorites/${findFavorite.id}`);
            } else {
                const { data } = await axios.post('https://6300ce1b9a1035c7f8f861ab.mockapi.io/favorites', obj);
                setFavorites(prev => [...prev, data])
            }
        } catch (e) {
            alert('Не удалось добавить в закладки')
        }

    };

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    const isItemAdded = (id) => {
        return cartItems.some((obj) => Number(obj.parentId) === Number(id));
    }


  return (
      <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddFavorite, setCartOpened, setCartItems, onAddToCart}}>
          <div className="wrapper">
              <Drawer items={cartItems} onRemove={onRemoveItem} onClose={() => setCartOpened(false)} opened={cartOpened}/>
              <Header onClickCart={() => setCartOpened(true)} />

              <Routes>
                  <Route path="/react-store" element={
                      <Home
                          items={items}
                          cartItems={cartItems}
                          favorites={favorites}
                          searchValue={searchValue}
                          setSearchValue={setSearchValue}
                          onChangeSearchInput={onChangeSearchInput}
                          onAddFavorite={onAddFavorite}
                          onAddToCart={onAddToCart}
                          isLoading={isLoading}
                      /> }
                  />
                  <Route path="/react-store/favorites" exact element={<Favorites />} />
                  <Route path="/react-store/orders" exact element={<Orders />} />
              </Routes>

          </div>
      </AppContext.Provider>
  );
}

export default App;
