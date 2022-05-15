import React from 'react';
import {Button, Carousel} from "react-bootstrap";

const HomePage = () => {
    return (
        <div>
            <div className=" container-fluid mainsection">

                <section className="container-fluid py-5 sections" >
                    <div className="container">
                        <Carousel>
                            <Carousel.Item>
                                <img
                                    src="https://res.cloudinary.com/nezz/image/upload/v1651900371/Sample/top-view-meat-slices-with-red-tomatoes-inside-pan-gray-background-chicken-raw-cow-pepper-color-meat-photo-animals_ajchwy.jpg"
                                    className="d-block w-100" alt="..."/>
                                <Carousel.Caption>
                                    <h3>First slide label</h3>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    src="https://res.cloudinary.com/nezz/image/upload/v1651900371/Sample/top-view-meat-slices-with-red-tomatoes-inside-pan-gray-background-chicken-raw-cow-pepper-color-meat-photo-animals_ajchwy.jpg"
                                    className="d-block w-100" alt="..."/>

                                <Carousel.Caption>
                                    <h3>Second slide label</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img
                                    src="https://res.cloudinary.com/nezz/image/upload/v1651900371/Sample/top-view-meat-slices-with-red-tomatoes-inside-pan-gray-background-chicken-raw-cow-pepper-color-meat-photo-animals_ajchwy.jpg"
                                    className="d-block w-100" alt="..."/>

                                <Carousel.Caption>
                                    <h3>Third slide label</h3>
                                    <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </div>




                    <div className="container" id="top">
                        <div className="d-flex flex-row flex-wrap justify-content-center">
                            <a href="/catalog/fruit/page/1">
                                <div className="col-xl-4 m-2 d-flex flex-column justify-content-center types">Fruits
                                </div>
                            </a>
                            <a href="/catalog/vegetables/page/1">
                                <div
                                    className="col-xl-4 m-2 d-flex flex-column justify-content-center types">Vegetables
                                </div>
                            </a>
                            <a href="/catalog/meat/page/1">
                                <div className="col-xl-4 m-2 d-flex flex-column justify-content-center types">Meat</div>
                            </a>
                            <a href="/catalog/milk/page/1">
                                <div className="col-xl-4 m-2 d-flex flex-column justify-content-center types">Milk
                                    products
                                </div>
                            </a>

                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default HomePage;