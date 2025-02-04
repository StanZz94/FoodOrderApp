import { useContext } from "react"

import logo from "../assets/logo.jpg"
import Button from "./UI/Button.jsx"
import CartContext from "./store/CartContext.jsx"
import UserProgressContext from "./store/UserProgressContext.jsx"

export default function Header() {

    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity
    }, 0)

    function handleCartShow() {
        userProgressCtx.showCart()
    }

    return <header id="main-header">
        <div id="title">
            <img src={logo} alt="resturant logo" />
            <h1>Food Order</h1>
        </div>
        <nav>
            <Button onClick={handleCartShow} textOnly>Cart ({totalCartItems})</Button>
        </nav>
    </header>
}