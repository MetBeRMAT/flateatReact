import { currentCart } from "../../App";
import { useAtom } from 'jotai';
import { useLocation, useSearchParams } from 'react-router-dom';

export default function CheckoutOrder()
{
    const [cartItems, setCartItems] = useAtom(currentCart);

    const [queryParameters] = useSearchParams();

    let notes = queryParameters.get("notes")
    let orario = queryParameters.get("deliveryTime")
    console.log(notes);
    console.log(orario);

    return(
        <>
        <div className="d-flex justify-content-center">
            <div className="col-2">
                Shipped at - 
                Expected arrival -
            </div>
            <div className="row row-cols-3 g-4" style={{marginTop:"0%"}}>
                {cartItems.map(i => <ShowCart {...i}/>)}
                Total price: 
            </div>
        </div>
        </>
    );

    function ShowCart(props)
    {
        return(
            <>
                <div> {props.name} </div>
            </>
        )
    }
}