import { currentUser } from "../../App";

import { useAtom } from "jotai";
export default function Homepage()
{
    const [user, setUser] = useAtom(currentUser);
    return(
        <>
            {user ? <p> Utente loggato {user.mail}</p> : <p>Utente non loggato</p>}
            
            <html lang="en">
            <head>
            </head>

            <body>

                <main role="main">

                <section class="jumbotron text-center">
                    <div class="container">
                    <h1 class="jumbotron-heading">QUALCOSA</h1>
                    <p class="lead text-muted">Booooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooho.</p>
                    <p>
                        <a href="#" class="btn btn-primary my-2">diteme voi</a>
                        <a href="#" class="btn btn-secondary my-2">te posso canta na canzone</a>
                    </p>
                    </div>
                </section>

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
                <div class="container">
                    <p>PER ALTRE PAGINE COME QUESTA, CONTATTATE I JAVENGERS!!!</p>
                    <p class="float-right">
                    <a href="#">TORNA SU</a>
                    </p>
                </div>
                </footer>

                {/*Placed at the end of the document so the pages load faster*/}
                <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
                <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery-slim.min.js"></script>')</script>
                <script src="../../assets/js/vendor/popper.min.js"></script>
                <script src="../../dist/js/bootstrap.min.js"></script>
                <script src="../../assets/js/vendor/holder.min.js"></script>
            </body>
            </html>
        </>
    );
}