import { useEffect, useState } from "react";
import { db, storage } from "../firebase/firebase-config";
import { addProduct, deleteProduct } from "../firebase/dbActionsCrudShoes";
import { NavBarGeneric } from "./NavbarGeneric";


function AdminCrudShoes() {


  const [progress, setProgress] = useState(0);

  const initialState = {
    name: "",
    description: "",
    price: 0,
    image: "",
    sizes: [
      { size: 23, state: false },
      { size: 24, state: false },
      { size: 25, state: false },
      { size: 26, state: false },
      { size: 27, state: false },
      { size: 28, state: false },
      { size: 29, state: false },
      { size: 30, state: false },

    ]

  };

  const [productb, setProductB] = useState(initialState);
  const [productShoesList, setProductShoesList] = useState([]);




  function handleName(event) {
    setProductB({
      name: event.target.value,
      description: productb.description,
      price: productb.price,
      image: productb.image,
      sizes: productb.sizes
    });
  }

  function handleDescription(event) {
    setProductB({
      name: productb.name,
      description: event.target.value,
      price: productb.price,
      image: productb.image,
      sizes: productb.sizes
    });
  }

  function handlePrice(event) {
    setProductB({
      name: productb.name,
      description: productb.description,
      price: event.target.value,
      image: productb.image,
      sizes: productb.sizes
    });
  }

  function handleSize(event) {

    const tempSize = productb.sizes;
    tempSize.forEach(product => {

      if (product.size === +event.target.id) {
        product.state = event.target.checked
      }
    })
    setProductB({
      name: productb.name,
      description: productb.description,
      image: productb.image,
      price: productb.price,
      sizes: tempSize
    });
    console.log(productb)

  }

  function handleImage(event) {

    const file = event.target.files[0]

    console.log(file)
    storage
      .ref("productsshoes/" + file.name)
      .put(file)
      .on(
        "status_changed",
        (snapshot) => {
          const uploadProgress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) + 100
          );
          setProgress(uploadProgress);

        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("productsshoes")
            .child(file.name)
            .getDownloadURL()
            .then((url) => setProductB({
              name: productb.name,
              description: productb.description,
              price: productb.price,
              image: url,
              sizes: productb.sizes
            }
            ))
        }
      )
  }

  function handleAddProduct(productbData) {
    addProduct(productbData);
    setProductB(initialState);
  }

  function handleDeleteProduct(productbId) {
    deleteProduct(productbId);
  }

  useEffect(() => {
    // suscription to Firebase Database (to checking changes)
    db.collection("productsshoes").onSnapshot((results) => {
      const productsShoes = [];
      
      results.forEach((productb) => {
        productsShoes.push({ id: productb.id, ...productb.data() });
      });
      
      setProductShoesList(productsShoes);
    });
  }, []);



  return (
    <>
      <NavBarGeneric />
      <div className="App">
      <div style={{ textAlign: 'center'}}>
        <h1>Admin Shoes</h1>
      </div>
        <div className="project--form">
          <div>
            <input
              type="text"
              id="product-name"
              placeholder="Product Name"
              value={productb.name}
              onChange={handleName}
            />
          </div>
          <div>
            <input
              type="text"
              id="product-desc"
              placeholder="Description"
              value={productb.description}
              onChange={handleDescription}
            />
          </div>
          <div>
            <input
              type="text"
              id="product-price"
              placeholder="Price"
              value={productb.price}
              onChange={handlePrice}
            />
          </div>

          <div>
            <input
              type="file"
              id="product-image"
              placeholder="Image"
              onChange={(event) => handleImage(event)}
            />

          </div>

          {
            productb?.sizes?.map(product => (
              <div>

                <label htmlFor={product.size}>
                  <input
                    checked={product.state}
                    id={product.size}
                    onChange={(event) => handleSize(event)}
                    type="checkbox"
                  />
                  {product.size}</label>
              </div>
            ))
          }


          <div>
            <button className="button-admin" type="button" onClick={() => handleAddProduct(productb)}>
              Add product
            </button>
          </div>
        </div>

        <h3 className="number-products">{productShoesList?.length} products</h3>

        <div className="project">
          {productShoesList?.length > 0 &&
            productShoesList?.map((item) => (
              <div
                className="project--card"
                key={item.id}

              >
                {progress}%
                <img className="img--card" src={item.image} alt={item.image} />
                <h3>{item.name}</h3>
                <h5 className="description">{item.description}</h5>
                <h5>{item.price}€</h5>
                <div className="cont-sizes">
                <div class="dropdown">
                          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-expanded="false">
                            Sizes
                          </button>
               
                   <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                      <a class="dropdown-item" href="##"> {
                  item?.sizes?.map((currentSize) =>
                    currentSize.state === true && (
                       <> 
                       {currentSize.size}
                       <br/>
                       </>
                        
                        ))
                       
                      }
                      
                       </a>
                    </div>

                
                 </div>
                  </div>

                <button onClick={() => handleDeleteProduct(item.id)}>delete</button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default AdminCrudShoes;

