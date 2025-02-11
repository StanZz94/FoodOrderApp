import { useContext } from "react"
import Modal from "./UI/Modal"
import CartContext from "./store/CartContext"
import { currencyFormatter } from "../utils/formatting";
import Input from "./UI/Input";
import Button from "./UI/Button";
import UserProgressContext from "./store/UserProgressContext";
import useHttp from "./hooks/useHttp";
import Error from "./Error";

const requestConfig = {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    }
};

export default function Checkout() {
    const userProgressCtx = useContext(UserProgressContext);
    const cartCtx = useContext(CartContext);
    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice + item.quantity * item.price, 0);

    const { data, error, isLoading, sendRequest } = useHttp('http://localhost:3000/orders', requestConfig);

    function handleClose() {
        userProgressCtx.hideCheckout();
    }

    function handleSubmit(e) {
        e.preventDefault();

        const fd = new FormData(e.target);
        const customerData = Object.fromEntries(fd.entries());

        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }));
    }

    let actions = (<>
        <Button textOnly type="button" onClick={handleClose}>Close</Button>
        <Button>Submit Order</Button>
    </>);

    if (isLoading) {
        actions = <span>Sending order...</span>
    }

    if (data && !error) {
        return <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
            <h2>Success!</h2>
            <p>Your order was wubmitted successfully.</p>
            <p className="modal-actions">
                <Button onClick={handleClose}>Okay</Button>
            </p>
        </Modal>
    }

    return <Modal open={userProgressCtx.progress === "checkout"} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>

            <Input label="Full Name" type="text" id="name" />
            <Input label="E-mail Adress" type="email" id="email" />
            <Input label="Street" type="text" id="street" />
            <div className="control-row">
                <Input label="Postal Code" type="text" id="postal-code" />
                <Input label="City" type="text" id="city" />
            </div>
            {error && <Error title="Fail to make order!" message={error} />}
            <p>{actions}</p>
        </form>
    </Modal>
};