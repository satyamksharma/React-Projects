import React from "react";

const Items = ({ item, onDeleteItem, onToggleItem }) => {
    return (
        <li>
            <input
                type='checkbox'
                name=''
                id=''
                value={item.packed}
                onChange={() => {
                    onToggleItem(item.id);
                }}
            />
            <span style={item.packed ? { textDecoration: "line-through" } : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    );
};

export default Items;
