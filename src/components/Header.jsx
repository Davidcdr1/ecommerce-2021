
import { Link } from "react-router-dom";


function Header() {
  

  return (
    <header>
      
      <nav>
        <Link to="/">Products</Link>
        {" | "}
       
      </nav>
      <hr />
    </header>
  );
}

export default Header;