import { Provider } from "react-redux";
import store from "./redux/stores";
import { AppRouter } from "./routers/AppRouter";
import { NavBar } from "./components/NavBar";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { LoginScreen } from "./components/auth/LoginScreen";
import { RegisterScreen } from "./components/auth/RegisterScreen";
import { Product } from "./components/Product";
import AdminCrud from "./components/AdminCrud";
import  CartList  from "./components/CartList";
import DesiresList from "./components/DesiresList";
import ProductDetail from "./components/ProductDetail";
import AdminCrudBoys from "./components/AdminCrudBoys";
import { ProductBoys } from "./components/ProductBoys";
import AdminCrudBabyes from "./components/AdminCrudBabyes";
import { ProductBabyes } from "./components/ProductBabyes";
import { ProductGirls } from "./components/ProductGirls";
import AdminCrudGirls from "./components/AdminCrudGirls";
import AdminCrudShoes from "./components/AdminCrudShoes";
import { ProductShoes } from "./components/ProductShoes";

function App() {
  return (
    <div className="container-xl">
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" exact component={Product}/>
          <Route path="/productboys" exact component={ProductBoys}/>
          <Route path="/productbabyes" exact component={ProductBabyes}/>
          <Route path="/productgirls" exact component={ProductGirls}/>
          <Route path="/productshoes" exact component={ProductShoes}/>
          <Route path="/cart" exact component={CartList} />
          <Route path="/detail" exact component={ProductDetail} />
          <Route path="/desires" exact component={DesiresList} />
          <Route path="/admin" exact component={AdminCrud} />
          <Route path="/adminboys" exact component={AdminCrudBoys} />
          <Route path="/adminbabyes" exact component={AdminCrudBabyes} />
          <Route path="/admingirls" exact component={AdminCrudGirls} />
          <Route path="/adminshoes" exact component={AdminCrudShoes} />
              <Route path="/auth/login" exact component={LoginScreen} />
              <Route path="/auth/register" exact component={RegisterScreen} />
        </Switch>
      </Router>
    </Provider>
    </div>
  );
}

export default App;





