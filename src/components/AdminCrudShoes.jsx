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
    size: {s:23,
      state: false}

  };

  const [productb, setProductB] = useState(initialState);
  const [productShoesList, setProductShoesList] = useState([]);
  
 


  function handleName(event) {
    setProductB({
      name: event.target.value,
      description: productb.description,
      price: productb.price,
      image: productb.image,
      size: productb.size
    });
  }

  function handleDescription(event) {
    setProductB({
      name: productb.name,
      description: event.target.value,
      price: productb.price,
      image: productb.image,
      size: productb.size
    });
  }

  function handlePrice(event) {
    setProductB({
      name: productb.name,
      description: productb.description,
      price: event.target.value,
      image: productb.image,
      size: productb.size
    });
  }

  function handleSize(event) {
    setProductB({
      name: productb.name,
      description: productb.description,
      image: productb.image,
      price: productb.price,
      size: event.target.value
    });
    console.log(event)
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
              size: productb.size
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
          <div>

            <input
              value={productb.size.s}
              id="product-size"
              onChange={(event) => handleSize(event)}
              type="checkbox"
            />
            <label for="product-size">23</label>
          </div>

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
                <h5>{item.size}</h5>
                 
                <button onClick={() => handleDeleteProduct(item.id)}>delete</button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default AdminCrudShoes;

