import {HeartIcon} from "@heroicons/react/24/outline"

function Navbar({NumOfResult , query , setQuery,children}) {
  return (
    <nav className="navbar">
        <div className="navbar__logo">LOGO</div>
        <input value={query} onChange={(e) => {setQuery(e.target.value)}} type="text" className="text-field" placeholder="search..." />
        <div className="navbar__result">found {NumOfResult} characters</div>
        {children}
    </nav>
  )
}

export default Navbar;

export function Favorite(){ 
  return(  <button className="heart">
    <HeartIcon className="icon"/>
    <span className="badge">4</span>
  </button>)

}


