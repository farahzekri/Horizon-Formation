import React from "react";

function InputField(props) {
    const {
        label,
        id,
        name,
        extra,
        type = "text", // Default type to "text"
        placeholder,
        variant,
        state,
        disabled,
        value,
        onChange,
        error, // Error message for validation
        required, // Indicate if the field is required
        minLength, // Minimum length for validation
        maxLength, // Maximum length for validation
        pattern // Pattern for validation
    } = props;

    // Handle change event and trigger parent onChange handler
    const handleChange = (event) => {
        if (onChange) {
            onChange(event);
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
                {required && <span className="text-red-500">*</span>} {/* Show asterisk if required */}
            </label>
            <input
                disabled={disabled}
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                minLength={minLength} // Set minimum length
                maxLength={maxLength} // Set maximum length
                pattern={pattern} // Set regex pattern for validation
                className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
                    disabled
                        ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                        : state === "error"
                            ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                            : state === "success"
                                ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                                : "border-gray-200 dark:!border-white/10 dark:text-white"
                }`}
            />
            {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
        </div>
    );
}

export default InputField;
