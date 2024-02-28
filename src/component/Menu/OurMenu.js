import DishCard from "../Dish/DishCard";

export default function(props)
{
    // let {id} = useParams();
    // const [menu, setMenu] = useState([]);
    // useEffect(
    //     ()=>
    //     {
    //         axios.get("/menu/"+id).then(
    //             (response)=>
    //             {
    //                 setRestaurant(response.data);
    //             }
    //         );
    //     },
    //     []
    // )

    function MenuGrid()
    {
        <div className="row row-cols-2 g-4" style={{marginTop:"0%"}}>
            {
                props.dish.map(d=><DishCard {...d} />)
            }
        </div>
    }
    return(
        <MenuGrid/>
    );
}