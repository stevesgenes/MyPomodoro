import TopBar from "./TopBar";

function Header({ onOpenSettings, onOpenTheme }) {
    return(
        <>
            <TopBar onOpenSettings={onOpenSettings} onOpenTheme={onOpenTheme} />
        </>
    )
}

export default Header