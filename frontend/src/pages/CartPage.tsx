import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../types/CartItem";
import "./CartPage.css";

function CartPage() {

    const navigate = useNavigate();
    const {cart, removeFromCart} = useCart();
    const total = cart.reduce((sum, item) => sum + item.donationAmount, 0);

    return (
        <div className="cart-page">
            <h2>Your Cart</h2>

            {cart.length === 0 ? (
                <p className="cart-page__empty">Your cart is empty</p>
            ) : (
                <ul className="cart-page__list">
                    {cart.map((item: CartItem) => (
                        <li key={item.projectId} className="cart-page__item">
                            <span className="cart-page__item-name">{item.projectName}</span>
                            <div className="cart-page__item-right">
                                <span className="cart-page__item-amount">${item.donationAmount.toFixed(2)}</span>
                                <button className="cart-page__btn--remove" onClick={() => removeFromCart(item.projectId)}>
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <p className="cart-page__total">Total: <span>${total.toFixed(2)}</span></p>

            <div className="cart-page__actions">
                <button className="cart-page__btn--checkout">Checkout</button>
                <button className="cart-page__btn--browse" onClick={() => navigate('/projects')}>Continue Browsing</button>
            </div>
        </div>
    );
}

export default CartPage;
