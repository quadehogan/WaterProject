import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import './CartSummary.css';

const CartSummary = () => {
    const navigate = useNavigate();
    const {cart} = useCart();
    const totalAmount = cart.reduce((total, item) => total + item.donationAmount, 0);

    return (
        <div className="cart-summary" onClick={() => navigate('/cart')}>
            🛒 <span className="cart-summary__amount">${totalAmount.toFixed(2)}</span>
        </div>
    );
};

export default CartSummary;
