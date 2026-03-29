import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../types/CartItem";
import { useState } from "react";
import "./DonatePage.css";

function DonatePage() {

    const navigate = useNavigate();
    const { projectId, projectName } = useParams();
    const {addToCart} = useCart();
    const [ donationAmount, setDonationAmount ] = useState<number>(0);

    const handleAddToCart = (donationAmount: number) => {
        const newItem: CartItem = {
            projectId: Number(projectId),
            projectName: projectName || 'No Project Found',
            donationAmount}
        addToCart(newItem);
        navigate('/cart');
    };

    return (
        <div className="donate-page">
            <WelcomeBand />
            <h2>Donate to Project {projectName}</h2>

            <div className="donate-page__form">
                <input
                    className="donate-page__input"
                    type="number"
                    placeholder="Enter donation amount"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(Number(e.target.value))}
                />
                <button className="donate-page__btn--add" onClick={() => handleAddToCart(donationAmount)}>
                    Add to Cart
                </button>
            </div>

            <button className="donate-page__btn--back" onClick={() => navigate('/projects')}>
                Go Back
            </button>
        </div>
    );
}

export default DonatePage;
