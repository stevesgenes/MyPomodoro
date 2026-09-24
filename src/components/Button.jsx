const Button = ({
  text = '',
  backgroundColor = '#666666',
  textColor = '#fff',
  icon = null,
  ariaLabel,
  onClick = () => {},
  padding = '10px 20px',
  fontSize = '16px',
  border = 'none',
  borderRadius = '4px',
}) => {
  const buttonText = text || (!icon ? 'Button' : '')

  return (
    <button
      className="button"
      type="button"
      aria-label={ariaLabel || buttonText || 'Button'}
      style={{
        backgroundColor,
        color: textColor,
        padding,
        fontSize,
        border,
        borderRadius,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: icon && buttonText ? '8px' : 0,
        lineHeight: 1,
        cursor: 'pointer',
      }}
      onClick={onClick}
    >
      {icon}
      {buttonText && <span>{buttonText}</span>}
    </button>
  )
}

export default Button;