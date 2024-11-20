import SearchIcon from '@mui/icons-material/Search';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

interface SearchAndClearIconProps {
    onPressSearch?: () => void;
    onPressClear?: () => void;
    showSearchIcon?: boolean;
    showClearIcon?: boolean;
}

const SearchAndClearIcon = ({
    onPressSearch,
    onPressClear,
    showSearchIcon = true,
    showClearIcon = true,
}: SearchAndClearIconProps) => {
    return (
        <div className="flex gap-2 items-center justify-center flex-wrap">
            {showSearchIcon &&
                <SearchIcon
                    className='bg-slate-800 text-white p-2 rounded w-10 h-10 cursor-pointer'
                    onClick={onPressSearch}
                />}
            {showClearIcon &&
                <CleaningServicesIcon
                    className='bg-slate-800 text-white p-2 rounded w-10 h-10 cursor-pointer'
                    onClick={onPressClear}
                />}
        </div>
    )
}

export default SearchAndClearIcon
