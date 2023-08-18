import { useEffect, useState } from "react";
import convert from "convert-units";

function Convert(props) {
    // const [from, setFrom] = useState(props.measure[0]);
    // const [to, setTo] = useState(props.measure[1]);
    const [fromAbbr, setFromAbbr] = useState(props.measure[0].abbr);
    const [toAbbr, setToAbbr] = useState(props.measure[1].abbr);
    const [fromValue, setFromValue] = useState(0);
    const [toValue, setToValue] = useState(0);

    useEffect(() => {
        setFromValue(0);
        setToValue(0);
        setFromAbbr("");
        setToAbbr("");
    }, [props]);

    const calculate = (fromValue, fromAbbr, toAbbr) => {
        if (fromValue !== undefined && fromAbbr !== "" && toAbbr !== "") {
            setToValue(convert(fromValue).from(fromAbbr).to(toAbbr));
        }
    };
    const reverseCalculate = (toValue) => {
        if (toValue !== undefined && fromAbbr !== "" && toAbbr !== "") {
            setFromValue(convert(toValue).from(toAbbr).to(fromAbbr));
        }
    };
    const updateFrom = (e) => {
        setFromAbbr(e.target.value);
        calculate(fromValue, e.target.value, toAbbr);
    };
    const updateTo = (e) => {
        setToAbbr(e.target.value);
        calculate(fromValue, fromAbbr, e.target.value);
    };
    const updateFromValue = (e) => {
        setFromValue(e.target.value);
        calculate(e.target.value, fromAbbr, toAbbr);
    };
    const updateToValue = (e) => {
        setToValue(e.target.value);
        reverseCalculate(e.target.value);
    };
    const fromXClick = () => {
        setFromValue("");
        document.getElementById("fromInput").focus();
    };
    const toXClick = () => {
        setToValue("");
        document.getElementById("toInput").focus();
    };
    return (
        <div className=' flex justify-evenly py-8 px-9'>
            <div className=' relative flex p-4 h-10'>
                <select
                    className=' relative h-10 border-none rounded-lg'
                    onChange={updateFrom}
                    value={fromAbbr}
                >
                    <option value={""}>From</option>
                    <option disabled>---</option>
                    {props.measure.map((unit) => {
                        return (
                            <option
                                key={unit.abbr}
                                value={unit.abbr}
                            >
                                {unit.plural}
                            </option>
                        );
                    })}
                </select>
                <input
                    className=' relative h-10 border-none ml-2 pl-4 lg:w-[20rem] w-[10rem] outline-none rounded-tl-lg rounded-bl-lg'
                    id='fromInput'
                    value={fromValue}
                    type={"number"}
                    onChange={updateFromValue}
                />
                <button
                    onClick={fromXClick}
                    className='w-[40px] border-none text-[20px] text-black bg-white h-10 rounded-tr-lg rounded-br-lg'
                >
                    ✕
                </button>
            </div>
            <span className=' text-white text-5xl pt-4'>
                <i class='bx bx-expand-horizontal'></i>
            </span>
            <div className=' relative flex p-4 h-10'>
                <select
                    className=' relative h-10 border-none rounded-lg'
                    onChange={updateTo}
                    value={toAbbr}
                >
                    <option value={""}>To</option>
                    <option disabled>---</option>
                    {props.measure.map((unit) => {
                        return (
                            <option
                                key={unit.abbr}
                                value={unit.abbr}
                            >
                                {unit.plural}
                            </option>
                        );
                    })}
                </select>
                <input
                    id='toInput'
                    className=' relative h-10 border-none ml-2 pl-4 lg:w-[20rem] w-[10rem] outline-none rounded-tl-lg rounded-bl-lg'
                    value={toValue}
                    type={"number"}
                    onChange={updateToValue}
                />
                <button
                    onClick={toXClick}
                    className='w-[40px] border-none text-[20px] text-black bg-white h-10 rounded-tr-lg rounded-br-lg'
                >
                    ✕
                </button>
            </div>
        </div>
    );
}

export default Convert;
