import { useContext } from "react"

import logo from "../assets/logo.jpg"
import Button from "./UI/Button"
import CartContext from "./store/CartContext"

export default function Header() {

    const cartCtx = useContext(CartContext);

    const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
        return totalNumberOfItems + item.quantity
    }, 0)

    return <header id="main-header">
        <div id="title">
            <img src={logo} alt="resturant logo" />
            <h1>Food Order</h1>
        </div>
        <nav>
            <Button textOnly>Cart ({totalCartItems})</Button>
        </nav>
    </header>
}