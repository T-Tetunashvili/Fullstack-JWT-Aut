
const Input = ({ text, id, type, placeholder, className }) => {
   return (
      <>
         <label htmlFor={id}>{text}</label>
         <input
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            required
            className={className}
         />
      </>
   )
}

export default Input