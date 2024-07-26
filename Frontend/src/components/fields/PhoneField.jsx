import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
// import "flag-icon-css/css/flag-icon.min.css";

function PhoneNumberInput(props) {
    const {
        label,
        id,
        name,
        extra,
        placeholder,
        variant,
        state,
        disabled,
        value,
        onChange,
        error,
    } = props;

    const handleChange = (value, country) => {
        if (onChange) {
            onChange(value, country);
        }
    };
    const containerStyle = {
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
  };

  const flagDropdownStyle = {
      position: 'absolute',
      left: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 1,
  };

  const inputStyle = {
      paddingLeft: '50px', // Ajustez cette valeur selon la taille du drapeau
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
            <div style={containerStyle}>
            <PhoneInput
                country={'tn'}
                value={value}
                onChange={handleChange}
                disabled={disabled}
                inputProps={{
                    name: name,
                    id: id,
                    required: true,
                    autoFocus: false,
                }}
                containerClass={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none ${
                    disabled === true
                        ? "!border-none !bg-gray-100 dark:!bg-white/5 dark:placeholder:!text-[rgba(255,255,255,0.15)]"
                        : state === "error"
                            ? "border-red-500 text-red-500 placeholder:text-red-500 dark:!border-red-400 dark:!text-red-400 dark:placeholder:!text-red-400"
                            : state === "success"
                                ? "border-green-500 text-green-500 placeholder:text-green-500 dark:!border-green-400 dark:!text-green-400 dark:placeholder:!text-green-400"
                                : "border-gray-200 dark:!border-white/10 dark:text-white"
                }`}
                inputClass={`w-full border-none outline-none ${
                    disabled ? "bg-gray-100" : "bg-white dark:bg-black"
                }`}
                buttonStyle={flagDropdownStyle}
                inputStyle={inputStyle}
            />
            </div>
            {error && <p className="text-red-500 text-xs italic mt-1">{error}</p>}
        </div>
    );
}

export default PhoneNumberInput;
