import { useEffect, useState } from "react";
import { db, storage } from "../firebase/firebase-config";
import { addProduct, deleteProduct } from "../firebase/dbActionsCrud";
import { NavBarGeneric } from "./NavbarGeneric";





function AdminCrud () {

//const [image, setImage] = useState("");
const [progress, setProgress] = useState(0);

  const initialState = {
    name: "",
    description: "",
    price: 0,
    image: ""
  
  };
  
  const [product, setProduct] = useState(initialState);
  const [productList, setProductList] = useState([]);


  function handleName(event) {
    setProduct({
      name: event.target.value,
      description: product.description,
      price: product.price,
      image: product.image
    });
  }

  function handleDescription(event) {
    setProduct({
      name: product.name,
      description: event.target.value,
      price: product.price,
      image: product.image
    });
  }

  function handlePrice(event) {
    setProduct({
      name: product.name,
      description: product.description,
      price: event.target.value,
      image: product.image
    });
  }

function handleImage (event) {

const file = event.target.files[0]

console.log(file)
  storage
  .ref("products/" + file.name)
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
      .ref("products")
      .child(file.name)
      .getDownloadURL()
      .then((url) =>  setProduct({
        name: product.name,
        description: product.description,
        price: product.price,
        image: url
      }
    ))
    }
  )
}

  function handleAddProduct(productData) {
    addProduct(productData);
    setProduct(initialState);
  }

  function handleDeleteProduct(productId) {
    deleteProduct(productId);
  }

  useEffect(() => {
    // suscription to Firebase Database (to checking changes)
    db.collection("products").onSnapshot((results) => {
      const products = [];
      results.forEach((product) => {
        products.push({ id: product.id, ...product.data() });
      });
      setProductList(products);
    });
  }, []);

  

  return (
    <>
    <NavBarGeneric/>
    <div className="App">
            <div className="project--form">
              <div>
                <input
                  type="text"
                  id="product-name"
                  placeholder="Product Name"
                  value={product.name}
                  onChange={handleName}
                />
              </div>
              <div>
                <input
                  type="text"
                  id="product-desc"
                  placeholder="Description"
                  value={product.description}
                  onChange={handleDescription}
                />
              </div>
              <div>
                <input
                  type="text"
                  id="product-price"
                  placeholder="Price"
                  value={product.price}
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
                <button className="button-admin" type="button" onClick={() => handleAddProduct(product)}>
                  Add product
                </button>
              </div>
            </div>

            <h3 className="number-products">{productList?.length} products</h3>

            <div className="project">
              {productList?.length > 0 &&
                productList?.map((item) => (
                  <div
                    className="project--card"
                    key={item.id}
                    
                  >
                    {progress}%
                    <img className="img--card" src={item.image} alt={item.image}/>
                    <h3>{item.name}</h3>
                    <h5 className="description">{item.description}</h5>
                    <h5>{item.price}€</h5>
                    <button onClick={() => handleDeleteProduct(item.id)}>delete</button>
                  </div>
                ))}
            </div>
    </div>
    </>
  );
}

export default AdminCrud;


