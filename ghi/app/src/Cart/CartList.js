import "./CartList.css"
import {useState, useEffect} from 'react';
import { Link } from "react-router-dom"
import StarRating from "../Shoes/Reviews/Stars"
import { useAuth } from '../Auth/AuthContext';
import { useToast } from '../ToastContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'


function useWindowSize() {
    const [size, setSize] = useState({ width: window.innerWidth, height: window.innerHeight });

    useEffect(() => {
        const handleResize = () => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
        };

        window.addEventListener('resize', handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
}


function CartList(){
    const [userCart, setUserCart] = useState([]);
    const [userCartTotal, setUserCartTotal] = useState("");
    const [cartItem, setCartItem] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const { userId } = useAuth();
    const showToast = useToast();
    const { width, height } = useWindowSize();
    const totalQuantity = userCart.reduce((total, item) => total + item.quantity, 0);
    console.log(width, height)


    async function loadCart() {
        const response = await fetch(`http://localhost:8080/api/items/${userId}/`);
        const data = await response.json();
        setUserCart(data.items);
        setUserCartTotal(data.total_cost)
        setIsLoading(false);
    }
    useEffect(() => {
        loadCart();
    }, []);

    async function itemDelete(cartId, cartItemId){
            const response = await fetch (`http://localhost:8080/api/item/${cartId}/${cartItemId}/`, {
            method: "DELETE"
        });
            if (response.ok){
                setIsLoading(true);
                showToast("Removed From Cart!", "error");
                loadCart();
            } else {

            }
        }

    return (
    <div>
    {isLoading && (
            <div className="loading-message"></div>
        )}

        {userCart.length === 0 && (
            <div className="noFavortiesDiv">
                <h2 className="noFavorites">No Items Added!</h2>
                <div className="shopButtonLinkDiv">
                    <div className="shopButtonLinkDivCenter">
                        <p className="shopText">Check Out Our Catalog!</p>
                        <Link className="shopButtonLink" to="/shoes">
                            <button className="shopButtonFavorites">Shop</button>
                        </Link>
                    </div>
                </div>
            </div>
        )}
        {isLoading === false && width < 900 && (
            <div className="cartMainDivParent">
                <div className="cartMainDiv">
                    <div className="shoeCartAndCheckoutInfoDiv">
                    <div className="div3Cart">
                        <div className="div3CartHeaderDiv">
                            <h1 className="div3CartHeader">Cart ({totalQuantity})</h1>
                        </div>
                        <div className="div3CartChild">
                            {userCart.map((item) => (
                                <div key={item.item_id} className="mainCardCart">
                                    <div className="topCardCart">
                                        <div className="topCardImgDiv">
                                            <div className="imageCart">
                                                <img
                                                    className="imgCart"
                                                    src={item.shoe.picture_url}
                                                    alt={`Shoe ${item.shoe.name}`}
                                                />
                                            </div>
                                            <div className="topCardCartDiv">
                                                <div className="cardCart">
                                                        <div className="namePriceCartDiv">
                                                            <div className="shoeNameCartContainer">
                                                                <h2 className="shoeNameH2">
                                                                    <Link
                                                                        className="shoeNameCart"
                                                                        to={`/shoes/${item.shoe.id}`}
                                                                    >
                                                                        {item.shoe.name}
                                                                    </Link>
                                                                </h2>
                                                            </div>
                                                            <div className="shoePriceCartDiv">
                                                                <h3 className="shoePriceCart">${item.shoe.price}</h3>
                                                            </div>
                                                        </div>
                                                        <div className="shoeBrandQuantityDeleteDiv">
                                                            <div className="shoeBrandQuantityDiv">
                                                                <div className="shoeBrandCartDiv">
                                                                    <h3 className="shoeBrand">Quantity: {item.quantity}</h3>
                                                                </div>
                                                                <div className="shoeBrandCartDiv">
                                                                    <h3 className="shoeBrand">{item.shoe.brand}</h3>
                                                                </div>
                                                            </div>
                                                            <div>
                                                            <button onClick={() => itemDelete(item.cart_id, item.item_id)}>
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="checkoutBottomInfoDivParentMain">
                    <div className="checkoutBottomInfoDivParent">
                        <div className="checkoutSummaryTitleDiv">
                            <h1 className="checkoutSummaryTitle">
                                Summary
                            </h1>
                        </div>
                        <div className="checkoutBottomInfoDivChild">
                                <div className="checkOutSubTotalDiv">
                                    <h4 className="checkOutSubtotal">
                                        Subtotal: ${userCartTotal}
                                    </h4>
                                </div>
                                <div className="checkOutEstimatedDiv">
                                    <h4 className="checkOutEstimated">
                                        Estimated Tax: --
                                    </h4>
                                </div>
                                <div className="checkOutEstimatedDiv">
                                    <h4 className="checkOutEstimated">
                                        Estimated Shipping: --
                                    </h4>
                                </div>
                                <div className="checkoutButtonDiv">
                                <hr style={{width: "100%"}}></hr>
                                <div className="checkOutPriceTotalDiv">
                                    <div className="checkOutTotalDiv">
                                        <h1 className="checkOutTotal">
                                            Total:
                                        </h1>
                                    </div>
                                    <div className="checkOutPriceDiv">
                                        <h1 className="checkOutPrice">
                                            ${userCartTotal}
                                        </h1>
                                    </div>
                                </div>
                                <hr style={{width: "100%"}}></hr>
                                </div>
                            </div>
                            </div>
                        </div>
                        <footer className="main-footer">
                                <div className="buttonCheckoutDiv">
                                    <button className="buttonCheckout">
                                        Checkout
                                    </button>
                                </div>
                        </footer>
                </div>
            )}
            {isLoading === false && width > 900 && (
                <div className="MainLargeParent">
                <div className="MainLarge">
                <div className="cartMainDivLarge">
                    <div className="shoeCartAndCheckoutInfoDivLarge">
                    <div className="div3Cart">
                        <div className="div3CartHeaderDiv">
                            <h1 className="div3CartHeader">Cart</h1>
                        </div>
                        <div className="div3CartChild">
                            {userCart.map((item) => (
                                <div key={item.item_id} className="mainCardCart">
                                    <div className="topCardCart">
                                        <div className="topCardImgDiv">
                                            <div className="imageCart">
                                                <img
                                                    className="imgCart"
                                                    src={item.shoe.picture_url}
                                                    alt={`Shoe ${item.shoe.name}`}
                                                />
                                            </div>
                                            <div className="topCardCartDiv">
                                                <div className="cardCart">
                                                        <div className="namePriceCartDiv">
                                                            <div className="shoeNameCartContainer">
                                                                <h2 className="shoeNameH2">
                                                                    <Link
                                                                        className="shoeNameCart"
                                                                        to={`/shoes/${item.shoe.id}`}
                                                                    >
                                                                        {item.shoe.name}
                                                                    </Link>
                                                                </h2>
                                                            </div>
                                                            <div className="shoePriceCartDiv">
                                                                <h3 className="shoePriceCart">${item.shoe.price}</h3>
                                                            </div>
                                                        </div>
                                                        <div className="shoeBrandQuantityDeleteDiv">
                                                            <div className="shoeBrandQuantityDiv">
                                                                <div className="shoeBrandCartDiv">
                                                                    <h3 className="shoeBrand">Quantity: {item.quantity}</h3>
                                                                </div>
                                                                <div className="shoeBrandCartDiv">
                                                                    <h3 className="shoeBrand">{item.shoe.brand}</h3>
                                                                </div>
                                                            </div>
                                                            <div>
                                                            <button onClick={() => itemDelete(item.cart_id, item.item_id)}>
                                                                <FontAwesomeIcon icon={faTrash} />
                                                            </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div className="checkoutBottomInfoDivParent">
                        <div className="checkoutSummaryTitleDiv">
                            <h1 className="checkoutSummaryTitle">
                                Summary
                            </h1>
                        </div>
                        <div className="checkoutBottomInfoDivChild">
                            <div className="checkoutBottomInfoDivSibling">
                                <div className="checkOutSubTotalDiv">
                                    <h4 className="checkOutSubtotal">
                                        Subtotal: ${userCartTotal}
                                    </h4>
                                </div>
                                <div className="checkOutEstimatedDiv">
                                    <h4 className="checkOutEstimated">
                                        Estimated Tax: --
                                    </h4>
                                </div>
                                <div className="checkOutEstimatedDiv">
                                    <h4 className="checkOutEstimated">
                                        Estimated Shipping: --
                                    </h4>
                                </div>
                                <div className="checkoutButtonDiv">
                                <hr style={{width: "100%"}}></hr>
                                <div className="checkOutPriceTotalDiv">
                                    <div className="checkOutTotalDiv">
                                        <h1 className="checkOutTotal">
                                            Total:
                                        </h1>
                                    </div>
                                    <div className="checkOutPriceDiv">
                                        <h1 className="checkOutPrice">
                                            ${userCartTotal}
                                        </h1>
                                    </div>
                                </div>
                                <hr style={{width: "100%"}}></hr>
                                </div>
                                <div className="buttonCheckoutDivLarge">
                                    <button className="buttonCheckoutLarge">
                                        Checkout
                                    </button>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>

);

}
export default CartList;
