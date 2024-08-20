import React from 'react';
import { Link } from 'react-router-dom';

/**
 * props:
 * - to: endereço do Links
 * - text: texto do item
 * - children: tag SVG
 * - onClick: um callback de click (quando necessário)
 */
function SideBarItem(props) {

    function getClassName(itemName) {
        return window.location.pathname === itemName ? 'nav-item active' : 'nav-item';
    }

    return (
        <li className={getClassName(props.to)}>
            <Link to={props.to} className="nav-link" onClick={props.onClick}>
                <span className="sidebar-icon">
                    {props.children}
                </span>
                <span className="sidebar-text">{props.text}</span>
            </Link>
        </li>
    );
}

export default SideBarItem;