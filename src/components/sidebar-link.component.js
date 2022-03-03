import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'

const SidebarLink = ({ label, to, icon, isActive }) => {
    return (
        <Link to={to}>
            <div className={"p-2 w-full my-3 text-sm flex hover:text-white  cursor-pointer " + (isActive ? 'text-white' : 'text-zinc-400')}>
                <div className="w-8">
                    <FontAwesomeIcon icon={icon} />
                </div>
                {label}
            </div>
        </Link>
    )
}

export default SidebarLink