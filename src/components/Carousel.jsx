import React from 'react';
import rop from '../img/rop.jpeg';
import clothes from '../img/clothes.jpeg';
import pink from '../img/pink.jpeg'

function Carousel() {
  return (
    <div className="container-xl">
      <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src={clothes} style={{ height: "25rem" }} class="d-block w-100" alt="..."/>
          </div>
          <div class="carousel-item">
            <img src={rop} style={{ height: "25rem" }} class="d-block w-100" alt="..."/>
          </div>
          <div class="carousel-item">
            <img src={pink} style={{ height: "25rem" }} class="d-block w-100" alt="..."/>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-target="#carouselExampleControls" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-target="#carouselExampleControls" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </button>
      </div>

    </div>

  )
}

export default Carousel
