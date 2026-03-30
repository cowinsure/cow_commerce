// components/ui/InputField.tsx

import clsx from "clsx";
import React from "react";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  className,
  ...props
}) => {
  const { required } = props;
  return (
    <div className="relative group">
      <div className="flex flex-col">
        {label && (
          <label
            htmlFor={props.id}
            className="mb-2 text-sm font-semibold text-gray-700 tracking-wide
                       group-focus-within:text-green-700 transition-colors duration-200"
          >
            {label}
            {required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}

        <div className="relative">
          <input
            {...props}
            className={clsx(
              "w-full px-4 py-3 rounded-xl font-medium text-sm",
              "bg-white border-2 border-gray-300",
              "placeholder:text-gray-400 placeholder:font-normal",
              "text-gray-900",
              "transition-all duration-200 ease-out",
              "focus:outline-none focus:border-green-950/80 focus:ring-4 focus:ring-green-600/20",
              "hover:border-green-100 hover:shadow-sm",
              "disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed",
              error &&
                "border-red-500 focus:border-red-500 focus:ring-red-500/20 hover:border-red-400",
              props.type === "date" &&
                "appearance-none [&::-webkit-calendar-picker-indicator]:opacity-0",
              className,
            )}
          />

          {/* 3D Focus Indicator - Pop out effect */}
          <div
            className={clsx(
              "absolute -inset-0.5 rounded-xl bg-green-400",
              "opacity-0 blur-sm transition-all duration-300 -z-10",
              "group-focus-within:opacity-50 group-focus-within:scale-[1.0]",
              error && "from-red-500 to-red-400 group-focus-within:opacity-20",
            )}
          />

          {/* Success/Error Icon - 3D pop out */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            {error ? (
              <svg
                className="w-5 h-5 text-red-500 drop-shadow-md transform scale-110"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                style={{
                  filter: "drop-shadow(0 2px 2px rgba(239, 68, 68, 0.3))",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              !error &&
              props.defaultValue && (
                <svg
                  className="w-5 h-5 text-green-600 drop-shadow-md transform scale-110"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                  style={{ filter: "drop-shadow(0 2px 2px rgba(0,0,0,0.2))" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )
            )}
          </div>
        </div>
      </div>

      {error && (
        <p className="text-red-500 mt-2 font-medium text-xs absolute animate-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default InputField;
