
const Input = ({ text, id, type, placeholder, className, onchange, value }) => {
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
            onChange={onchange}
            value={value}
         />
      </>
   )
}

export default Input