import { useEffect, useState } from "react";
import { db, storage } from "../firebase/firebase-config";
import { addProduct, deleteProduct } from "../firebase/dbActionsCrudBabyes";
import { NavBarGeneric } from "./NavbarGeneric";


function AdminCrudBabyes() {

  const [progress, setProgress] = useState(0);

  const initialState = {
    name: "",
    description: "",
    price: 0,
    image: "",
    sizes: [
      { size: 1, state: false },
      { size: 3, state: false },
      { size: 6, state: false },
      { size: 9, state: false },
      { size: 12, state: false },
      { size: 18, state: false },
      { size: 24, state: false },
    ]

  };

  const [productb, setProductB] = useState(initialState);
  const [productBoysList, setProductBoysList] = useState([]);


  function handleName(event) {
    setProductB({
      ...productb,
      name: event.target.value,
      
    });
  }

  function handleDescription(event) {
    setProductB({
      ...productb,
      description: event.target.value,
      
    });
  }

  function handlePrice(event) {
    setProductB({
      ...productb,
      price: event.target.value,
     
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
     ...productb,
      sizes: tempSize
    });
    console.log(productb)

  }

  function handleImage(event) {

    const file = event.target.files[0]

    console.log(file)
    storage
      .ref("productsbabyes/" + file.name)
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
            .ref("productsbabyes")
            .child(file.name)
            .getDownloadURL()
            .then((url) => setProductB({
              ...productb,
              image: url,
              
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
    db.collection("productsbabyes").onSnapshot((results) => {
      const productsBoys = [];
      results.forEach((productb) => {
        productsBoys.push({ id: productb.id, ...productb.data() });
      });
      setProductBoysList(productsBoys);
    });
  }, []);



  return (
    <>
      <NavBarGeneric />
      <div className="App">
      <div style={{ textAlign: 'center'}}>
        <h1>Admin Babyes</h1>
      </div>
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

        <h3 className="number-products">{productBoysList?.length} products</h3>

        <div className="project">
          {productBoysList?.length > 0 &&
            productBoysList?.map((item) => (
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
                              <br />
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
      
    </>
  );
}

export default AdminCrudBabyes;

