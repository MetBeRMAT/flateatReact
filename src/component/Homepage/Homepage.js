import { currentUser } from "../../App";
import { useAtom } from "jotai";
import Slider from "react-slick";
import poke from "./poke.png";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Homepage()
{
    const [user, setUser] = useAtom(currentUser);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true, // Abilita lo scorrimento automatico
        autoplaySpeed: 2000, // Imposta la velocità di scorrimento automatico in millisecondi
      };
    return(
        <>  
            <div style={{ position: "relative", overflow: "hidden", backgroundColor: "black", minHeight: "500px" }}>
                {user ?
                <a href="/" onClick={() => setUser(null)} style={{ position: "absolute", top: 0, left: "3%", zIndex: 1, color: "white", textDecoration: "none", padding: "10px", fontWeight: "bold", transform: "translate(5px, -5px)" }}>Logout</a>
                : null}               
                {/* Carosello di immagini */}
                <div style={{ margin: "20px auto 1px", width: "70%", position: "absolute", bottom: "0", left: "50%", transform: "translateX(-50%)", zIndex: 1 }}>
                    <Slider {...settings}>
                    <div style={{opacity: 1}}>
                        <img src="https://staticcookist.akamaized.net/wp-content/uploads/sites/21/2023/07/poke-bowl-still-life-1200x675.jpg" alt="Immagine 1" style={{ width: "50%" }} />
                    </div>
                    <div style={{opacity: 1}}>
                        <img src="https://media-assets.lacucinaitaliana.it/photos/6436c696f536a5ce0d9ef0ac/16:9/w_2560%2Cc_limit/pizza%2520margherita.jpg" alt="Immagine 2" style={{ width: "50%" }} />
                    </div>
                    <div style={{opacity: 1}}>
                        <img src="https://www.fattoincasadabenedetta.it/wp-content/uploads/2022/10/gelato_al_cioccolato_copertina.jpg" alt="Immagine 3" style={{ width: "50%" }} />
                    </div>
                    <div style={{opacity: 1}}>
                        <img src="https://www.alimentaitaly.com/img/cms/gyros%20LARGE.jpg" alt="Immagine 3" style={{ width: "40%" }} />
                    </div>
                    <div style={{opacity: 1}}>
                        <img src="https://sweetest.it/wp-content/uploads/2021/06/sushi-01.jpeg" alt="Immagine 3" style={{ width: "50%" }} />
                    </div>
                    {/* Aggiungi più immagini qui */}
                    </Slider>
            </div>

      {/* Triangolo per spezzare il div con una diagonale */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        transformOrigin: "bottom",
        transform: "skewY(-6deg)",
        background: "linear-gradient(#ffffff, transparent)",
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: "bold",
        textTransform: "uppercase"
      }}>
        {user ?
        <>
        <a href="/loggedrestaurant" style={{ marginRight: "80px", fontSize: "24px", textDecoration: 'none', color: 'white' }}>RESTAURANT</a>
        <a href="/ticket" style={{ marginLeft: "80px", fontSize: "24px", textDecoration: 'none', color: 'white' }}>APRI UN TICKET</a>
        </>
        :
        <>
        <a href="/restaurant" style={{ marginRight: "80px", fontSize: "24px", textDecoration: 'none', color: 'white' }}>RESTAURANT</a>
        <a href="/ticket" style={{ marginLeft: "80px", fontSize: "24px", textDecoration: 'none', color: 'white' }}>APRI UN TICKET</a>
        </>
        }
      </div>

      {/* Contenuto della homepage */}
      <div style={{ zIndex: 0 }}>
        {/* Inserisci qui il resto del contenuto della tua homepage */}
      </div>
    </div>
    <div style={{ backgroundColor: "#fff", padding: "20px" }}>
    <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "35%", marginRight: "30px" }}>
            <div style={{ backgroundImage: `url('https://img.freepik.com/premium-photo/portrait-shot-chef-adorning-dishes-while-making-meals-generate-ai_905417-1835.jpg')`, backgroundSize: "cover", height: "400px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", opacity: 1, position: "relative" }}>
                <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
                    <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px", color: "#fff" }}>Diventa nostro Partner</h2>
                    <p style={{ fontSize: "18px", marginBottom: "20px", color: "#fff" }}>Raggiungi più clienti con Javeat. Gestiamo noi la consegna, così tu puoi dedicarti a offrire i migliori piatti e prodotti.</p>
                    <button style={{ fontSize: "18px", backgroundColor: "white", color: "#000", padding: "10px 20px", border: "none", borderRadius: "5px" }}>Inizia ora</button>
                </div>
            </div>
        </div>
        <div style={{ width: "35%", marginRight: "10px" }}>
            <div style={{ backgroundImage: `url('https://aws.imagelinenetwork.com/agronotizie/materiali/ArticoliImg/fattorino-fattorini-consegne-delivery-by-motortion-adobe-stock-750x422.jpeg')`, backgroundSize: "cover", height: "400px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", opacity: 1, position: "relative" }}>
                <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
                    <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px", color: "#000" }}>Consegna con noi</h2>
                    <p style={{ fontSize: "18px", marginBottom: "20px", color: "#000" }}>La libertà di consegnare dove e quando vuoi, con ottimi guadagni, convenzioni e sconti riservati a te.</p>
                    <button style={{ fontSize: "18px", backgroundColor: "white", color: "#000", padding: "10px 20px", border: "none", borderRadius: "5px" }}>Inizia ora</button>
                </div>
            </div>
        </div>
    </div>
</div>



  
            {/* <html lang="en">
            <head>
            </head>
            <body>
                <main role="main">
                <div class="album py-5 bg-danger">
                    <div class="container">

                    <div class="row">
                        <div class="col-md-4">
                            <div class="card mb-4 box-shadow">
                                <img class="card-img-top" src="photos/poke.png" alt="Card image cap"/>
                            <div class="card-body">
                                <p class="card-text">SUCCOSISSIMA POKE'</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-outline-secondary">ORDINA ORA</button>
                                </div>
                            </div>
                            </div>
                            </div>
                        </div>
                        <div class="col-md-4">
                        <div class="card mb-4 box-shadow">
                            <img class="card-img-top" src="photos/pizza.png" alt="Card image cap"/>
                            <div class="card-body">
                            <p class="card-text">FRAGRANTISSIMA PIZZA</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                <button type="button" class="btn btn-outline-secondary">ORDINA ORA</button>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>

                        <div class="col-md-4">
                        <div class="card mb-4 box-shadow">
                            <img class="card-img-top" src="photos/burger.png" alt="Card image cap"/>
                            <div class="card-body">
                                <p class="card-text">SUCCULENTISSIMO HAMBURGER</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-outline-secondary">ORDINA ORA</button>
                                </div>
                                </div>
                            </div>
                        </div>
                        </div>

                        <div class="col-md-4">
                            <div class="card mb-4 box-shadow">
                                <img class="card-img-top" src="photos/piadina.png" alt="Card image cap"/>
                            <div class="card-body">
                                <p class="card-text">DELIZIOSISSIMA PIADINA</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-outline-secondary">ORDINA ORA</button>
                                </div>
                            </div>
                            </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="card mb-4 box-shadow">
                                <img class="card-img-top" src="photos/dolci.png" alt="Card image cap"/>
                            <div class="card-body">
                                <p class="card-text">SQUISITISSIMI DOLCI</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-outline-secondary">ORDINA ORA</button>
                                </div>
                            </div>
                            </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="card mb-4 box-shadow">
                                <img class="card-img-top" src="photos/arrosticini.png" alt="Card image cap"/>
                            <div class="card-body">
                                <p class="card-text">SAPORITISSIMI ARROSTICINI</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-outline-secondary">ORDINA ORA</button>
                                </div>
                            </div>
                            </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="card mb-4 box-shadow">
                                <img class="card-img-top" src="photos/kebab.png" alt="Card image cap"/>
                            <div class="card-body">
                                <p class="card-text">UNTISSIMO KEBAB</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-outline-secondary">ORDINA ORA</button>
                                </div>
                            </div>
                            </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="card mb-4 box-shadow">
                                <img class="card-img-top" src="photos/sushi.png" alt="Card image cap"/>
                            <div class="card-body">
                                <p class="card-text">SECCHISSIMO SUSHI</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-outline-secondary">ORDINA ORA</button>
                                </div>
                            </div>
                            </div>
                            </div>
                        </div>

                        <div class="col-md-4">
                            <div class="card mb-4 box-shadow">
                                <img class="card-img-top" src="photos/gelato.png" alt="Card image cap"/>
                            <div class="card-body">
                                <p class="card-text">FRESCHISSIMO GELATO</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-outline-secondary">ORDINA ORA</button>
                                </div>
                            </div>
                            </div>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>

                </main>

                <footer class="text-muted">
                <div class="container position-relative">
                    <p >
                    <a href="#" className="position-absolute top-100 start-0 translate-middle"><button className="btn" style={{width:"800%", backgroundColor:"violet"}}>BACK TO THE KITCHEN</button></a>
                    </p>
                </div>
                </footer>

                {/*Placed at the end of the document so the pages load faster*/}
                {/* <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
                <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery-slim.min.js"></script>')</script>
                <script src="../../assets/js/vendor/popper.min.js"></script>
                <script src="../../dist/js/bootstrap.min.js"></script>
                <script src="../../assets/js/vendor/holder.min.js"></script>
            </body>
            </html>  */}
        </>
    );
}