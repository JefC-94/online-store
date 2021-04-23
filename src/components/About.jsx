import React from 'react';
import {Link} from 'react-router-dom';

function About() {
    return (
        <main className="container inner">
            <div className="about-container">
                <h1>Over dit project</h1>
                <div className="about-block">
                    <p>
                        Deze e-commerce website werd ontwikkeld in React door Jef Ceuppens, als onderdeel van de opleiding Front-end Developer bij Syntra AB. De layout werd gemaakt in SCSS.
                    </p>
                </div>

                <div className="about-block">
                    <p>
                        Alle producten en merken zijn fictief en dienen enkel als voorbeeld. Omdat het om een fictieve winkel gaat, is er geen betalingssysteem of checkout geïmplementeerd.
                    </p>
                </div>
                
                <div className="about-block">
                    <p>
                        Voor niet ingelogde bezoekers wordt de referentie naar de shopping cart bijgehouden in de local storage. Een ingelogde gebruiker heeft zijn persoonlijke shopping cart dat hij kan raadplegen via zijn account.
                    </p>
                </div>

                <div className="about-block">
                    <p>
                        De backend werd gebaseerd op volgende open-source code (en lichtelijk aangepast naar de noden van dit project):
                    </p>
                    <ul>
                        <li><a className="link" href="https://github.com/mevdschee/php-crud-api" target="_blank" rel="noreferrer">PHP-CRUD-API</a> door mvedschee</li>
                        <li><a className="link" href="https://www.w3jar.com/php-login-and-registration-restful-api/" target="_blank" rel="noreferrer">PHP Login system</a> door w3jar</li>
                    </ul>
                </div>

                <div className="about-block">

                </div>
            
                <div className="back">
                    <Link className="link" to='/'>Terug naar het project</Link> {/* This will return to dashboard when logged in */}
                </div>
            </div>
        </main>
    )
}

export default About
