function Footer() {
    const currentYear = new Date().getFullYear()

    const publisherElement = (
        <u>
            <a href="https://github.com/stevesgenes" target="_blank" rel="noopener noreferrer">
                @stevesgenes
            </a>
        </u>
    )

    return (
        <footer className="footer">
            <p className="footer-publisher">
                Published by {publisherElement}
            </p>
            <p>
                &copy; {currentYear} Pomodoro Timer | Distributed under the <a href="https://opensource.org/licenses/MIT" target="_blank" rel="noopener noreferrer">MIT License</a>
            </p>
        </footer>
    )
}

export default Footer