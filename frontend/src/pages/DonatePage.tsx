import { useNavigate, useParams } from "react-router-dom";
import WelcomeBand from "../components/WelcomeBand";
import { useCart } from "../context/CartContext";
import type { CartItem } from "../types/CartItem";
import { useState } from "react";

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
        <>
        <WelcomeBand />
        <h2> Donate to Project {projectName} </h2>

        <div>
            <input 
            type="number" 
            placeholder="Enter donation amount" 
            value={donationAmount} 
            onChange = {(e) => setDonationAmount(Number(e.target.value))}/>
            <button onClick={() => handleAddToCart(donationAmount)}>Add to Cart</button>
        </div>

        <button onClick={() => navigate('/projects')}>Go Back</button>
        </>
    );
}

export default DonatePage;