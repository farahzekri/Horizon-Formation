import React from "react";
import Select from "react-select";

function MultiSelectField(props) {
    const {
        label,
        id,
        extra,
        placeholder,
        variant,
        state,
        disabled,
        value,
        onChange,
        options,
    } = props;

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
            <Select
                isMulti
                isDisabled={disabled}
                inputId={id}
                value={value}
                onChange={onChange}
                options={options}
                placeholder={placeholder}
                className="mt-2"
                classNamePrefix="react-select"
            />
        </div>
    );
}

export default MultiSelectField;
