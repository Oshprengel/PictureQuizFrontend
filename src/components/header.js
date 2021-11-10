import { Link } from 'react-router-dom';
import '../style/header-footer.css'

function Header(props) {
  return (
    <header>
        <h1>Picture Mixture<Link id="homelink" to="/">Home</Link></h1>
        
    </header>
  );
}

export default Header;