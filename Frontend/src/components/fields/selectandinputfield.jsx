import React, { useState } from "react";

function SelectandInputField(props) {
    const {
        label,
        id,
        extra,
        variant,
        state,
        disabled,
        value,
        onChange,
        options,
    } = props;

    const [inputValue, setInputValue] = useState(value || '');

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    const handleSelectChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <div className={`${extra}`}>
            <label
                htmlFor={id}
                className={`text-sm text-navy-700 dark:text-white ${
                    variant === "auth" ? "ml-1.5 font-medium" : "ml-3 font-bold"
                }`}
            >
                {label}
            </label>
            <div className="flex">
                <select
                    id={`${id}-select`}
                    value={value}
                    onChange={handleSelectChange}
                    disabled={disabled}
                    className={`h-12 rounded-l-xl border bg-white/0 p-3 text-sm outline-none ${
                        disabled === true
                            ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                            : state === "error"
                                ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                                : state === "success"
                                    ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                                    : "border-gray-200 dark:!border-white/10 dark:text-white"
                    }`}
                >
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    id={`${id}-input`}
                    value={inputValue}
                    onChange={handleInputChange}
                    disabled={disabled}
                    className={`flex-1 h-12 rounded-r-xl border bg-white/0 p-3 text-sm outline-none ${
                        disabled === true
                            ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                            : state === "error"
                                ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                                : state === "success"
                                    ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                                    : "border-gray-200 dark:!border-white/10 dark:text-white"
                    }`}
                    placeholder="Enter le numero de salle ..."
                />
            </div>
        </div>
    );
}

export default SelectandInputField;
