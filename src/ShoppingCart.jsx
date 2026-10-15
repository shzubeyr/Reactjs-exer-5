import { useState } from "react"

const ShoppingCart = () => {
    const [products, setproducts] = useState([])
    const [productName, setProductName] = useState("")
    const [productPrice, setProductPrice] = useState(0)
    const handleAddProduct = () => {
        if (productName.trim() !== " " && productPrice.trim() !== "") {
            const newProduct = {
                id: Date.now(),
                name: productName,
                price: parseFloat(productPrice),
                quantity: 1
            }
            setproducts([...products, newProduct])
            setProductName('')
            setProductPrice('')
        }
    }
    const removeProduct = (id)=>{
        const updateProducts= products.filter(product => product.id !== id)
        setproducts(updateProducts)

    }
    const increaseProduct = (id)=>{
        const updatedProducts = products.map(product => (
            product.id === id ? {...product, quantity: product.quantity+1} : product
        ))
        setproducts(updatedProducts)
    }
    const decreaseProduct = (id)=>{
        const updatedProducts = products.map(product =>(
            product.id === id && product.quantity > 1 ? {...product, quantity: product.quantity-1}: product
        ))
        setproducts(updatedProducts)
    }
    const totalPrice = products.reduce((total,product)=> total + product.price * product.quantity,0)
    return (
        <div>
            <h1>Simple Shopping Cart</h1>
            <div>
                <h3>Add a Product</h3>
                <input type="text" placeholder="Product Name"
                    onChange={(e) => setProductName(e.target.value)}
                    value={productName}
                />
                <input type="number" placeholder=" Price"
                    min={0}
                    onChange={(e) => setProductPrice(e.target.value)}
                    value={productPrice}
                />
                <button onClick={handleAddProduct}>Add to Cart</button>
            </div>
            {
                products.length > 0 ? (
                    <div>
                        <h3>Products in cart</h3>
                        <ul>
                            {
                                products.map(product => (
                                    <li key={product.id}>
                                        <strong>{product.name}</strong> - ${product.price.toFixed(2)}

                                        <div>
                                            Quantity:
                                            <button onClick={()=>decreaseProduct(product.id)}>-</button>
                                            {product.quantity}
                                            <button onClick={()=>increaseProduct(product.id)}>+</button>
                                        </div>

                                        <button onClick={()=>removeProduct(product.id)}>Remove Product</button>
                                    </li>
                                ))
                            }
                        </ul>
                        <h4>The Total Price is: ${totalPrice}</h4>
                    </div>
                ) : <p>This Cart is Empty.</p>
            }
        </div>
    )
}

export default ShoppingCart