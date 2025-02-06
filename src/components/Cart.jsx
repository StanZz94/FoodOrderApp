import { useContext } from "react";
import Modal from "./UI/Modal.jsx";
import CartContext from "./store/CartContext.jsx";
import { currencyFormatter } from "../utils/formatting";
import Button from "./UI/Button";
import UserProgressContext from "./store/UserProgressContext.jsx";
import CartItem from "./CartItem.jsx";

export default function Cart() {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);


    function handleCartClose() {
        userProgressCtx.hideCart();
    }

    return <Modal className="cart" open={userProgressCtx.progress === "cart"}>
        <h2>Your Cart</h2>
        <ul>
            {cartCtx.items.map((item) => (
                <CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price} />
            ))}
        </ul>
        <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
        <p className="modal-actions">
            <Button onClick={handleCartClose} textOnly>Close</Button>
            <Button>Go to Checkout</Button>
        </p>
    </Modal>
}