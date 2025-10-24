
const Input = ({ text, id, type, placeholder, className, onChange, value }) => {
   return (
      <>
         <label htmlFor={id}>{text}</label>
         <input
            id={id}
            name={id}
            type={type}
            placeholder={placeholder}
            className={className}
            onChange={onChange}
            value={value}
            required
         />
      </>
   )
}

export default Input