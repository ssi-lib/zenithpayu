const Button = ({textContent, styles,callback}) => {
    return (
      <button 
        className={'rounded-md py-2 px-4 text-center w-full '+styles}
        onClick = {callback}
        >
            {textContent}
    </button>
    )
  }
  
  export default Button