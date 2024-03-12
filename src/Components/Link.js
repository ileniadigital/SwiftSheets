function Link({href, children, ...props}){
    return(
        <li className="navbar-item">
            <a href={href} className="navbar-link">{children}</a>
        </li>
    )
}

//Export Link component
export default Link;