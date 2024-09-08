import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export interface SidebarDropdownProps {
    pageDirectory: string;
    isSidebarExpanded: boolean;
    setIsSidebarExpanded: (isExpanded: boolean) => void;
}

const SidebarDropdown = ({
    pageDirectory,
    isSidebarExpanded,
    setIsSidebarExpanded,
}: SidebarDropdownProps) => {

    return (
        <div className="w-full h-14 flex items-center justify-between border-b border-gray-700">
            <div className="flex-1 flex items-center justify-center">
                <h1 className="text-xl font-semibold">{pageDirectory}</h1>
            </div>
            <button className="mr-4" onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}>
                <FontAwesomeIcon icon={faBars} />
            </button>
        </div>
    )
}

export default SidebarDropdown;