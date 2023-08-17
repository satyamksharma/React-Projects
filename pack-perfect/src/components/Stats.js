import React from "react";

const Stats = ({ items }) => {
    if (!items.length)
        return (
            <p className='stats'>
                <em>Start Adding some items....🚀</em>
            </p>
        );
    const numItems = items.length;
    const numPacked = items.filter((item) => item.packed).length;
    let percentage = numPacked > 0 ? Math.round((numPacked * 100) / numItems) : 0;

    return (
        <footer className='stats'>
            <em>
                {percentage === 100
                    ? "You are ready to go ✈️"
                    : `
                🎒You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
            </em>
        </footer>
    );
};

export default Stats;
