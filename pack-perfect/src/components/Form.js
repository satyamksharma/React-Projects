import React from "react";
import { useState } from "react";

const Form = ({ onAddItems }) => {
    const [description, setdescription] = useState("");
    const [quantity, setquantity] = useState(1);

    function handleSubmit(e) {
        e.preventDefault();
        if (!description) return;

        const newItem = { description, quantity, packed: false, id: Date.now() };
        onAddItems(newItem);
        setdescription("");
        setquantity(1);
    }

    return (
        <form
            className='add-form'
            onSubmit={handleSubmit}
        >
            <h3>What do you need for your 😍 Trip?</h3>
            <select
                value={quantity}
                onChange={(e) => {
                    console.log(e.target.value);
                    setquantity(Number(e.target.value));
                }}
            >
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                    <option
                        value={num}
                        key={num}
                    >
                        {num}
                    </option>
                ))}
            </select>
            <input
                type='text'
                placeholder='Item....'
                value={description}
                onChange={(e) => setdescription(e.target.value)}
            />
            <button>ADD</button>
        </form>
    );
};

export default Form;
