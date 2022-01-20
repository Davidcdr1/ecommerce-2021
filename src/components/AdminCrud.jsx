import { useEffect, useState } from "react";
import { db, storage } from "../firebase/firebase-config";
import { addProduct, deleteProduct, updateProduct } from "../firebase/dbActionsCrud";
import { NavBarGeneric } from "./NavbarGeneric";


function AdminCrud() {


  const [progress, setProgress] = useState(0);
  const [isModify, setIsModify] = useState(false)

  const initialState = {
    name: "",
    description: "",
    price: 0,
    image: "",
    sizes: [
      { size: 4, state: false },
      { size: 6, state: false },
      { size: 8, state: false },
      { size: 10, state: false },
      { size: 12, state: false },
      { size: 14, state: false },
      { size: 16, state: false },
      { size: "0-1", state: false },
      { size: '1-3', state: false },
      { size: '3-6', state: false },
      { size: '6-9', state: false },
      { size: '9-12', state: false },
      { size: '12-18', state: false },
      { size: '18-24', state: false },
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

  const [product, setProduct] = useState(initialState);
  const [productList, setProductList] = useState([]);


  function handleName(event) {
    setProduct({
      ...product,
      name: event.target.value,
    });
  }

  function handleDescription(event) {
    setProduct({
      ...product,
      description: event.target.value,
    });
  }

  function handlePrice(event) {
    setProduct({
      ...product,
      price: event.target.value,
    });
  }

  function handleSize(event) {

    const tempSize = product.sizes;
    tempSize.forEach(product => {

      if (product.size === +event.target.id) {
        product.state = event.target.checked
      }
    })
    setProduct({
      ...product,
      sizes: tempSize
    });

  }

  function handleImage(event) {

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
            .then((url) => setProduct({
              ...product,
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

  function handleSelectProduct(item) {
    console.log({ item })
    setProduct(item)
    setIsModify(true)
  }

  function handleUpdateProduct(product) {
    updateProduct(product)
    setProduct(initialState)
    setIsModify(false)
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
      <NavBarGeneric />
      <div className="App">
        <div style={{ textAlign: 'center' }}>
          <h1>Admin Home</h1>
        </div>
        <div className="project--form">
          <div>
            <input
              type="text"
              id="product-name"
              placeholder="Product Name"
              value={product.name}
              onChange={(event) => handleName(event)}
            />
          </div>
          <div>
            <input
              type="text"
              id="product-desc"
              placeholder="Description"
              value={product.description}
              onChange={(event) => handleDescription(event)}
            />
          </div>
          <div>
            <input
              type="text"
              id="product-price"
              placeholder="Price"
              value={product.price}
              onChange={(event) => handlePrice(event)}
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
            product?.sizes?.map(product => (
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
            {
              isModify ? (
                <button className="button-admin" type="button" onClick={() => handleUpdateProduct(product)}>
                  Update product
                </button>
              ) : (
                <button className="button-admin" type="button" onClick={() => handleAddProduct(product)}>
                  Add product
                </button>)
            }
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
                      <a class="dropdown-item" href="#"> {
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
                <button className="btn btn-success" onClick={() => handleSelectProduct(item)}>modify</button>
                <button className="btn btn-danger" onClick={() => handleDeleteProduct(item.id)}>delete</button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default AdminCrud;


