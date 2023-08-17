import React from "react";
import { useState } from "react";
import Item from "./Item";

const PackingList = ({ items, onDeleteItem, onToggleItem, onClearList }) => {
    const [sortBy, setsort] = useState("input");
    let sortedItems;
    if (sortBy === "input") {
        sortedItems = items;
    } else if (sortBy === "description") {
        sortedItems = [...items].sort((a, b) => a.description.localeCompare(b.description));
    } else if (sortBy === "packed") {
        sortedItems = [...items].sort((a, b) => Number(a.packed) - Number(b.packed));
    }

    return (
        <div className='list'>
            <ul>
                {sortedItems.map((item) => (
                    <Item
                        item={item}
                        onDeleteItem={onDeleteItem}
                        onToggleItem={onToggleItem}
                        key={item.id}
                    />
                ))}
            </ul>
            <div className='actions'>
                <select
                    name=''
                    id=''
                    value={sortBy}
                    onChange={(e) => {
                        setsort(e.target.value);
                    }}
                >
                    <option value='input'>Sort By Input Order</option>
                    <option value='description'>Sort By Description</option>
                    <option value='packed'>Sort By Packed Status </option>
                </select>
                <button onClick={onClearList}>Clear List</button>
            </div>
        </div>
    );
};

export default PackingList;
