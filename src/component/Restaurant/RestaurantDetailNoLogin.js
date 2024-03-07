import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import OurMenu from "../Menu/OurMenu";
import { useAtom } from "jotai";
import { currentUser } from "../../App";
import DishCard from "../Dish/DishCard";
import { currentRestaurant } from "../../App";

export default function RestaurantDetailNoLogin() {
    let { id } = useParams();

    const [user, setUser] = useAtom(currentUser);
    const [restaurant, setRestaurant] = useState([]);
    const [menu, setMenu] = useState([]);
    const [categories, setCategories] = useState([]);
    const [ristoranteAttuale, setRistoranteAttuale] = useAtom(currentRestaurant);


    useEffect(
        () => {
            axios.get("/restaurants/" + id).then(
                (response) => {
                    setRestaurant(response.data);
                    setRistoranteAttuale(response.data)
                }
            );
        },
        []
    )

    useEffect(
        () => {

            axios.get("/menu/" + id).then(
                (response) => {
                    setMenu(response.data);
                    uniqueCategories(response.data);
                }
            );

        },
        []
    )

    function uniqueCategories(menuPar) {
        let categories = menuPar.dishes.map(c => c.category);
        let categoriesSet = new Set(categories);

        let uniqueCategory = [...categoriesSet];

        setCategories(uniqueCategory);
    }

    return (
        <>
            <div className="row" style={{ minHeight: 'calc(100vh)', display: 'flex', background: 'linear-gradient(to right, #ffffff, #154360)', color: '#000' }}>
                <div>
                    <Link to="/restaurant" className="btn rounded-pill m-3" style={{ backgroundColor: '#154360', color: '#fff', padding: '10px 20px', textDecoration: 'none' }}>Back</Link>
                </div>
                <div className="col-9 p-5">
                    {/* Resto del codice rimane invariato */}
                    {categories.map((category, index) => (
                        <div key={index} style={{ marginBottom: '130px' }}> {/* Aggiungi un margine inferiore tra le categorie */}
                            <h5 style={{ fontWeight: 'bold', fontSize: '1.8rem', marginBottom: '10px', fontFamily: 'Back to Black, cursive' }}>{category}</h5> {/* Aggiungi un margine inferiore tra le categorie */}
                            <hr style={{ borderTop: '1px solid red', marginBottom: '20px' }} /> {/* Imposta il colore bianco per l'hr */}
                            <div className="row row-cols-4 g-4">
                                {menu.dishes
                                    .filter(dish => dish.category === category)
                                    .map((dish, dishIndex) => (
                                        <div key={dishIndex} className="col-12 col-md-3 mb-4">
                                            <DishCard {...dish} />
                                        </div>
                                    ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}