function Footer() {
    const currentYear = new Date().getFullYear()
    const licenseElement = (
        <u>
            <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">
                MIT License
            </a>
        </u>
    )

    const publisherElement = (
        // <u>
            <a href="https://github.com/stevesgenes" target="_blank" rel="noopener noreferrer">
                stevesgenes
            </a>
        // </u>
    )

    return (
        <footer className="footer">
            <p>
                &copy; {currentYear} Pomodoro Timer | Distributed under the {licenseElement}
            </p>
            <p className="footer-publisher">
                Published by {publisherElement} (Github)
            </p>
        </footer>
    )
}

export default Footer