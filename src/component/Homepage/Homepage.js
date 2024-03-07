import { currentUser } from "../../App";
import { useAtom } from "jotai";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import hero from "./hero.png";

export default function Homepage() {
    const [user, setUser] = useAtom(currentUser);

    const settings = {
        dots: false,
        infinite: true,
        speed: 5000,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true, // Abilita lo scorrimento automatico
        autoplaySpeed: 0, // Imposta la velocità di scorrimento automatico in millisecondi
    };

    return (
        <>
    <div style={{ backgroundColor: '#071c2c', minHeight: 'calc(60vh)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={hero} alt="Hero Image" style={{ maxWidth: '50%', marginRight: '20px' }} /> {/* Aggiunto l'immagine con stile float:left */}
            <div>
                {user ?
                    <div style={{ position: 'absolute', top: '20px', right: '120px', color: 'white', fontWeight: 'bold', fontSize: '20px' }}>
                        Benvenuto {user.mail}
                    </div>
                    : <></>}
                <h1 style={{ background: 'linear-gradient(to right, white, red)', WebkitBackgroundClip: 'text', color: 'transparent', fontWeight: 'bold', marginBottom: '50px', textAlign: 'center' }}>Hai fame? <br />Approfitta e ordina anche tu su JAVEAT</h1>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                    <div className="d-flex" style={{ marginTop: '130px' }}>
                        {!user ?
                            <>
                                <Link to="/restaurant" className="link" style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', transform: 'rotate(-15deg)', marginRight: '190px', fontSize: '24px', textDecoration: 'none' }}>RESTAURANT</Link>
                                <Link to="/login" className="link" style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', transform: 'rotate(-15deg)', fontSize: '24px', textDecoration: 'none' }}>ACCEDI PER I TICKET</Link>
                            </>
                            : user.id === 6 ?
                                <>
                                    <Link to="/restaurantlogged" className="link" style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', transform: 'rotate(-15deg)', marginRight: '190px', fontSize: '24px', textDecoration: 'none' }}>RESTAURANT</Link>
                                    <Link to="/ticket" className="link" style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', transform: 'rotate(-15deg)', fontSize: '24px', textDecoration: 'none' }}>RISPONDI AI TICKET</Link>
                                </>
                                :
                                <>
                                    <Link to="/restaurantlogged" className="link" style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', transform: 'rotate(-15deg)', marginRight: '190px', fontSize: '24px', textDecoration: 'none' }}>RESTAURANT</Link>
                                    <Link to="/ticket" className="link" style={{ color: 'white', fontWeight: 'bold', fontFamily: 'Arial, sans-serif', transform: 'rotate(-15deg)', fontSize: '24px', textDecoration: 'none' }}>APRI UN TICKET</Link>
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* Carosello di immagini */}
    <div style={{ width: "75%", position: "absolute", left: "55%", transform: "translateX(-50%)", zIndex: 1, marginTop: "20px" }}>
        <Slider {...settings}>
            <div style={{ opacity: 1 }}>
                <img src="https://staticcookist.akamaized.net/wp-content/uploads/sites/21/2023/07/poke-bowl-still-life-1200x675.jpg" alt="Immagine 1" style={{ width: "50%", height: "auto" }} />
            </div>
            <div style={{ opacity: 1 }}>
                <img src="https://media-assets.lacucinaitaliana.it/photos/6436c696f536a5ce0d9ef0ac/16:9/w_2560%2Cc_limit/pizza%2520margherita.jpg" alt="Immagine 2" style={{ width: "50%", height: "auto" }} />
            </div>
            <div style={{ opacity: 1 }}>
                <img src="https://www.fattoincasadabenedetta.it/wp-content/uploads/2022/10/gelato_al_cioccolato_copertina.jpg" alt="Immagine 3" style={{ width: "50%", height: "auto" }} />
            </div>
            <div style={{ opacity: 1 }}>
                <img src="https://www.alimentaitaly.com/img/cms/gyros%20LARGE.jpg" alt="Immagine 3" style={{ width: "50%", height: "auto" }} />
            </div>
            <div style={{ opacity: 1 }}>
                <img src="https://sweetest.it/wp-content/uploads/2021/06/sushi-01.jpeg" alt="Immagine 3" style={{ width: "50%", height: "auto" }} />
            </div>
            {/* Aggiungi più immagini qui */}
        </Slider>
    </div>
    <div style={{ backgroundColor: 'white', width: 'auto', height: '200px' }}></div>
    <div style={{ backgroundColor: 'red', width: 'auto', height: '420px', padding: '20px', color: 'black' }}>
        <p style={{ fontSize: '48px', fontWeight: 'bold', textAlign: 'center', marginTop: '20px' }}>Menù in offerta: sconti<br /> fino al 25%</p>
        <p style={{ fontSize: '24px', textAlign: 'center', marginTop: '20px' }}>Perfetti per dare più gusto alla tua settimana, ordinare i piatti più amati da<br />tutta la famiglia e fare una pausa dai fornelli.</p>
        <p style={{ fontSize: '14px', textAlign: 'center', marginTop: '30px' }}>Si applicano spese di consegna e di servizio. Offerta soggetta a disponibilità, solo per<br />ristoranti aderenti all'iniziativa. Si applicano termini e condizioni, consultabili qui. <u>Termini e<br /> condizioni qui.</u></p>
        <p style={{ textAlign: 'center', fontSize: '20px' }}>
            <span style={{ color: 'yellow' }}>★</span> <span style={{ color: 'yellow' }}>★</span> <span style={{ color: 'yellow' }}>★</span> <span style={{ color: 'yellow' }}>★</span> <span style={{ color: 'yellow' }}>★</span>
        </p>
    </div>
    <div style={{ backgroundColor: "#fff", padding: "20px" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "35%", marginRight: "30px" }}>
                <div style={{ backgroundImage: `url('https://media.tenor.com/Eh4Gt4BAY_EAAAAM/shrek-somebody.gif')`, backgroundSize: "cover", height: "400px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", opacity: 1, position: "relative" }}>
                    <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
                        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px", color: "#fff" }}>Diventa nostro Partner</h2>
                        <p style={{ fontSize: "18px", marginBottom: "20px", color: "#fff" }}>Raggiungi più clienti con Javeat. Gestiamo noi la consegna, così tu puoi dedicarti a offrire i migliori piatti e prodotti.</p>
                        <button style={{ fontSize: "18px", backgroundColor: "white", color: "#000", padding: "10px 20px", border: "none", borderRadius: "5px" }}>Inizia ora</button>
                    </div>
                </div>
            </div>
            <div style={{ width: "35%", marginRight: "10px" }}>
                <div style={{ backgroundImage: `url('https://i.pinimg.com/originals/1e/84/67/1e8467512c470c0d326d16717812df21.gif')`, backgroundSize: "cover", height: "400px", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", opacity: 1, position: "relative" }}>
                    <div style={{ position: "absolute", bottom: "20px", left: "20px" }}>
                        <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "10px", color: "#000" }}>Consegna con noi</h2>
                        <p style={{ fontSize: "18px", marginBottom: "20px", color: "#000" }}>La libertà di consegnare dove e quando vuoi, con ottimi guadagni, convenzioni e sconti riservati a te.</p>
                        <button style={{ fontSize: "18px", backgroundColor: "white", color: "#000", padding: "10px 20px", border: "none", borderRadius: "5px" }}>Inizia ora</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div style={{ backgroundColor: '#071c2c', width: 'auto', height: '400px', padding: '20px', color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ backgroundColor: '#154360', width: '250px', height: '300px', padding: '20px', margin: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <p style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Note legali</p>
            <p style={{ color: 'white', fontSize: '16px' }}>Termini & Condizioni</p>
            <p style={{ color: 'white', fontSize: '16px' }}>Informativa sulla privacy</p>
            <p style={{ color: 'white', fontSize: '16px' }}>Cookies</p>
            <p style={{ color: 'white', fontSize: '16px' }}>Richieste da parte delle Autorità Pubbliche</p>
        </div>
        <div style={{ backgroundColor: '#154360', width: '250px', height: '300px', padding: '20px', margin: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <p style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Aiuto</p>
            <p style={{ color: 'white', fontSize: '16px' }}>Contatti</p>
            <p style={{ color: 'white', fontSize: '16px' }}>FAQ</p>
            <p style={{ color: 'white', fontSize: '16px' }}>Tipi di cucina</p>
        </div>
        <div style={{ backgroundColor: '#154360', width: '250px', height: '300px', padding: '20px', margin: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p style={{ color: 'white', fontSize: '20px', fontWeight: 'bold', marginBottom: '10px' }}>Porta con te Javeat</p>
            <img src="https://thumbs.dreamstime.com/b/google-gioca-le-icone-del-deposito-di-app-illustrazione-vettore-bottoni-delle-gioco-e-della-mela-isolata-su-fondo-bianco-155321658.jpg" alt="Immagine Javeat" style={{ width: '80%', maxHeight: '150px' }} />
        </div>
    </div>

            {/* https://img.freepik.com/premium-photo/portrait-shot-chef-adorning-dishes-while-making-meals-generate-ai_905417-1835.jpg */}
            {/* https://aws.imagelinenetwork.com/agronotizie/materiali/ArticoliImg/fattorino-fattorini-consegne-delivery-by-motortion-adobe-stock-750x422.jpeg */}
            </>
    );
}