import React, { useState } from "react";
import Logo from "./components/Logo";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import Stats from "./components/Stats";

const App = () => {
    const [items, setitems] = useState([]);
    function handleItems(item) {
        setitems((items) => {
            return [...items, item];
        });
    }
    function handleDeleteItems(id) {
        setitems((items) => {
            return items.filter((item) => item.id !== id);
        });
    }
    function handleToggleItems(id) {
        setitems((items) => {
            return items.map((item) => {
                if (item.id === id) {
                    return { ...item, packed: !item.packed };
                }
                return item;
            });
        });
    }
    function handleCLearList() {
        const confirmed = window.confirm("Are you sure you want to clear the list?");
        if (!confirmed) return;

        setitems([]);
    }

    return (
        <div className='App'>
            <Logo />
            <Form onAddItems={handleItems} />
            <PackingList
                items={items}
                onDeleteItem={handleDeleteItems}
                onToggleItem={handleToggleItems}
                onClearList={handleCLearList}
            />
            <Stats items={items} />
        </div>
    );
};

export default App;
