export default function TestInput({lable, value, onChange, placeholder, type='Text'}){

    return (
        <div className="field">
            
            <label className="label">label</label>
            <input type={type}
            value={value}
            placeholder={placeholder}
            onChange={(e)=> onChange(e.target.value)}
            className="input"
            />

        </div>
    )
}