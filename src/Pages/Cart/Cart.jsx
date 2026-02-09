import React, { useContext, useEffect } from 'react'
import LayOut from '../../Components/LayOut/LayOut';
import { DataContext } from '../../Components/DataProvider/DataProvider';
import  ProductCard from '../../Components/Product/ProductCard'
import CurrencyFormat from '../../Components/CurrencyFormat/CurrencyFormat';
import {Link} from 'react-router-dom'
import Classes from './Cart.module.css'
import { Type } from '../../Utility/action.Type';
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

function Cart() {
    const [{basket, user}, dispatch]= useContext(DataContext);
    
    // Scroll to top when component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const total = basket.reduce((amount, item)=>{
        return amount + item.price * item.amount ;
    }, 0)

    const increment =(item)=>{
        dispatch({
            type: Type.ADD_TO_BASKET,
            item
        })
    }
    const decrement =(id)=>{
        dispatch({
            type:Type.REMOVE_FROM_BASKET,
            id
        })
    }


return (
    <LayOut>
        <section className={Classes.container}>
            <div className={Classes.cart_container}>
            <h2>Hello</h2>
            <h3>Your shopping basket</h3>
            
            {/* Debug and Clear Basket Button */}
            <div style={{ 
                padding: '10px', 
                backgroundColor: '#f8f9fa', 
                border: '1px solid #dee2e6',
                borderRadius: '5px',
                marginBottom: '15px',
                display: 'flex',
                gap: '10px',
                alignItems: 'center'
            }}>
                <button 
                    onClick={() => dispatch({ type: Type.EMPTY_BASKET })}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Clear Basket
                </button>
                <span style={{ fontSize: '14px', color: '#666' }}>
                    Clear basket and add fresh items to see descriptions
                </span>
            </div>
            
            <hr />
            {
                basket?.length==0?(<p>Opps ! No item in your cart</p>):(
                    basket?.map((item,i)=>{
                        console.log("Cart item:", i, item);
                        return <section key={i} className={Classes.cart_product}>
                <ProductCard
                    product={item}
                    renderDesc={true}
                    renderAdd={false}
                    flex={true}
                />
                <div className={Classes.btn_container}>
                    <button className={Classes.btn} onClick={()=>increment(item)}>
    <IoIosArrowUp size={30}/>
                    </button>
                    <span>{item.amount}</span>
                    <button className={Classes.btn} onClick={()=>decrement(item.id)}>
    <IoIosArrowDown size={30}/>
                    </button>
                </div>
            </section>
                    })
                )
            }
            </div>
{
    basket?.length !==0&&(
        <div className={Classes.subtotal}>
            <div>
                <p>Subtotal ({basket?.length} items)</p>
                <CurrencyFormat amount={total}/>
            </div>
            <span>
                <input type="checkbox" />
                <small>This order contains a gift</small>
            </span>
            <Link to='/payments'>Continue to checkout</Link>
        </div>
)}

        </section>
    </LayOut>
)
}
export default Cart;