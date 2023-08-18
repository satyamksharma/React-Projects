import "./App.css";
import convert from "convert-units";
import Convert from "./components/Convert";
import Calculator from "./components/Calculator";
import { useState } from "react";

function App() {
    const measures = convert().measures();
    const [measure, setMeasure] = useState(measures[0]);
    const format = (string) => {
        const str = string.replace(/([A-Z])/g, " $1").replace(/^./, (str) => {
            return str.toUpperCase();
        });
        return str;
    };

    const showCalc = () => {
        const calc = document.querySelector(".calcu");
        const mainBody = document.querySelector(".main");
        calc.classList.toggle("hidden");
        if (calc.classList.contains("hidden")) {
            mainBody.classList.add("pb-[25rem]");
        } else {
            mainBody.classList.remove("pb-[25rem]");
        }
    };
    return (
        <div className='App text-center h-[100vh] flex flex-col justify-between items-center'>
            <header className='App-header flex justify-center text-center text-5xl text-white py-12 pt-8'>
                <h1>Metric Master</h1>
            </header>

            <div className='main pb-[25rem]'>
                <select
                    className=' w-[20vw] h-10 outline-none rounded-lg'
                    value={measure}
                    onChange={(e) => setMeasure(e.target.value)}
                >
                    {measures.map((measure) => {
                        return (
                            <option
                                key={measure}
                                value={measure}
                            >
                                {format(measure)}
                            </option>
                        );
                    })}
                </select>
                <Convert measure={convert().list(measure)} />
            </div>
            <Calculator />
            <footer className=' mt-4 '>
                <a
                    href='#'
                    className='text-5xl text-white'
                    onClick={showCalc}
                >
                    <i class='bx bx-calculator'></i>
                </a>
            </footer>
        </div>
    );
}

export default App;
