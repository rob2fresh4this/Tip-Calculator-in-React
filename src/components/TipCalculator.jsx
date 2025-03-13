import React, { useState, useEffect } from "react";
import dollarSymbol from "../../assets/images/icon-dollar.svg";
import personIcon from "../../assets/images/icon-person.svg";
import mainLogo from "../../assets/images/logo.svg";

function TipCalculator() {
    const [bill, setBill] = useState(0);
    const [tipPercentage, setTipPercentage] = useState(0);
    const [numPeople, setNumPeople] = useState();
    const [customTip, setCustomTip] = useState("");
    const [warningText, setWarningText] = useState("");

    const handleTipSelection = (percentage) => {
        setTipPercentage(percentage);
        setCustomTip(""); // Clear custom tip input when a preset tip is selected
    };

    const handleCustomTip = (e) => {
        const value = e.target.value;
        setCustomTip(value);
        setTipPercentage(value === "" ? 0 : parseFloat(value) / 100);
    };

    useEffect(() => {
        if (!numPeople || numPeople <= 0) {
            setWarningText("Can't be zero");
        } else {
            setWarningText("");
        }
    }, [numPeople]);

    const calculateTipAmount = () => {
        return bill * tipPercentage;
    };

    const calculateTotalPerPerson = () => {
        const peopleCount = parseInt(numPeople, 10) || 0;
        if (peopleCount <= 0) return 0;

        return (bill + calculateTipAmount()) / peopleCount;
    };

    const resetCalculator = () => {
        setBill(0);
        setTipPercentage(0);
        setNumPeople(0);
        setCustomTip("");
        setWarningText("");
    };

    return (
        <div className="flex flex-col justify-center items-center w-full h-screen bg-[hsl(185,41%,84%)] font-bold text-sm">
            {/* Logo */}

            <img src={mainLogo} alt="main logo" className="mt-[-4rem] mb-10 md:mt-10 md:mb-12 " />

            {/* Card Container */}
            <div className="bg-[hsl(0,0%,100%)] p-8 md:p-10 rounded-2xl shadow-lg flex flex-col md:flex-row w-[100%] md:w-[60%]">

                {/* Left Panel - Inputs */}
                <div className="w-full md:w-1/2 p-5 space-y-6">
                    {/* Bill Input */}
                    <div>
                        <label className="block text-[hsl(186,14%,43%)] mb-2">Bill</label>
                        <div className="bg-[hsl(189,41%,97%)] mt-4 w-full h-[44px] rounded-[5px] flex items-center justify-between px-2">
                            <img src={dollarSymbol} className="pl-[8px]" alt="dollar icon" />
                            <input
                                placeholder="0"
                                min={0}
                                type="number"
                                className="text-[20px] mr-2 bg-transparent border-none outline-none w-full text-right appearance-none focus:outline-none focus:ring-0 active:outline-none active:ring-0"
                                value={bill || ""}
                                onChange={(e) => setBill(e.target.value === "" ? "" : parseFloat(e.target.value))}
                            />
                        </div>
                    </div>

                    {/* Tip Selection */}
                    <div>
                        <label className="block text-[hsl(186,14%,43%)] mb-2">Select Tip %</label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                            {[5, 10, 15, 25, 50].map((tip) => (
                                <button
                                    key={tip}
                                    className={`text-[hsl(0,0%,100%)] text-lg py-2 px-0 h-[44px] rounded-lg transition-all ${tipPercentage === tip / 100
                                        ? "bg-[hsl(172,67%,45%)] text-[hsl(183,100%,15%)]"
                                        : "bg-[hsl(183,100%,15%)] hover:text-[hsl(183,100%,15%)] hover:bg-[hsl(172,67%,60%)]"
                                        }`}
                                    onClick={() => handleTipSelection(tip / 100)}
                                >
                                    {tip}%
                                </button>
                            ))}
                            <div className="bg-[hsl(189,41%,97%)] w-full h-[44px] rounded-[5px] flex items-center justify-between">
                                <input
                                    type="number"
                                    min={0}
                                    placeholder="Custom"
                                    className="w-full bg-transparent border-none outline-none p-2 rounded-lg appearance-none h-[44px] text-center md:text-right focus:outline-none focus:ring-0 active:outline-none active:ring-0 placeholder:text-center"
                                    value={customTip || ""}
                                    onChange={handleCustomTip}
                                />
                            </div>
                        </div>
                    </div>


                    {/* Number of People */}
                    <div>
                        <label className="text-[hsl(186,14%,43%)] mb-2 flex flex-col md:flex-row md:justify-between text-sm">
                            Number of People <div className="text-red-500 text-sm pt-1 md:pt-0">{warningText}</div>
                        </label>
                        <div className="bg-[hsl(189,41%,97%)] mt-4 w-full h-[44px] rounded-[5px] flex items-center justify-between px-2">
                            <img src={personIcon} className="pl-[8px]" alt="person icon" />
                            <input
                                placeholder="0"
                                min={0}
                                type="number"
                                className="text-[20px] mr-2 bg-transparent border-none outline-none w-full text-right appearance-none focus:outline-none focus:ring-0 active:outline-none active:ring-0"
                                value={numPeople || ""}
                                onChange={(e) => setNumPeople(e.target.value === "" ? "" : parseInt(e.target.value))}
                            />
                        </div>
                    </div>
                </div>

                {/* Right Panel - Results */}
                <div className="w-full md:w-1/2 bg-[hsl(183,100%,15%)] text-[hsl(172,67%,45%)] p-8 rounded-xl flex flex-col justify-between">
                    <div className="space-y-6">
                        {/* Tip Amount */}
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-white">Tip Amount</p>
                                <span className="text-[hsl(184,14%,56%)] text-sm">/ person</span>
                            </div>
                            <p className="text-2xl md:text-[2.5rem]">${(calculateTipAmount() / numPeople || 0).toFixed(2)}</p>
                        </div>

                        {/* Total */}
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-white">Total</p>
                                <span className="text-[hsl(184,14%,56%)] text-sm">/ person</span>
                            </div>
                            <p className="text-2xl md:text-[2.5rem]">${calculateTotalPerPerson().toFixed(2)}</p>
                        </div>
                        <br className="block md:hidden" />
                    </div>

                    {/* Reset Button */}
                    <button
                        className={`w-full py-2 text-lg rounded-lg ${bill > 0
                            ? "bg-[hsl(172,67%,45%)] text-[hsl(183,100%,15%)] hover:bg-[hsl(172,67%,60%)]"
                            : "bg-[hsl(183,79%,24%)] text-[hsl(184,14%,56%)] cursor-not-allowed"
                            }`}
                        onClick={resetCalculator}
                        disabled={bill === 0}
                    >
                        RESET
                    </button>
                </div>
            </div>
        </div>



    );
}

export default TipCalculator;
