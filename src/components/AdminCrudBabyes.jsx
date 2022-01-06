import { useEffect, useState } from "react";
import { db, storage } from "../firebase/firebase-config";
import { addProduct, deleteProduct } from "../firebase/dbActionsCrudBabyes";
import { NavBarGeneric } from "./NavbarGeneric";





function AdminCrudBabyes () {

//const [image, setImage] = useState("");
const [progress, setProgress] = useState(0);

  const initialState = {
    name: "",
    description: "",
    price: 0,
    image: ""
  
  };
  
  const [productb, setProductB] = useState(initialState);
  const [productBoysList, setProductBoysList] = useState([]);


  function handleName(event) {
    setProductB({
      name: event.target.value,
      description: productb.description,
      price: productb.price,
      image: productb.image
    });
  }

  function handleDescription(event) {
    setProductB({
      name: productb.name,
      description: event.target.value,
      price: productb.price,
      image: productb.image
    });
  }

  function handlePrice(event) {
    setProductB({
      name: productb.name,
      description: productb.description,
      price: event.target.value,
      image: productb.image
    });
  }

function handleImage (event) {

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
      .then((url) =>  setProductB({
        name: productb.name,
        description: productb.description,
        price: productb.price,
        image: url
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
    <NavBarGeneric/>
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

export default AdminCrudBabyes;

