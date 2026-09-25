import { Palette, Settings } from "lucide-react";
import project_details from "../../package.json";
import Button from "../components/Button";

function TopBar({ onOpenSettings, onOpenTheme }) {
    const version = `v${project_details.version}`;

    return (
        <nav className="top-bar" aria-label="Main navigation">

            <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}> 
                <a className="top-bar-brand" href="/" style={{ lineHeight: 1 }}>MyPomodoro</a> 
                <p style={{ color: "var(--muted)", margin: 0, fontSize: "0.85rem" }}>{version}</p> 
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Button
                    text={null}
                    textColor = '#fff'
                    backgroundColor = 'var(--theme-line)'
                    padding = "10px 10px"
                    borderRadius = "100%"
                    ariaLabel="Open theme selector"
                    onClick={onOpenTheme}
                    icon={<Palette size={28} />}
                />
                <Button
                    text={null}
                    textColor = '#fff'

                    backgroundColor = 'var(--theme-line)'

                    padding = "10px 10px"
                    borderRadius = "100%"

                    ariaLabel="Open settings"
                    onClick={onOpenSettings}

                    icon={
                        <Settings
                            size={28}
                            // color="var(--muted)"
                        />
                    }
                    
               />
            </div>

            
            
        </nav>
    )
}

export default TopBar