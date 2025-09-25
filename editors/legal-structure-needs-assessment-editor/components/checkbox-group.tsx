import React from "react";

interface CheckboxOption {
  key: string;
  label: string;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  values: Record<string, boolean | null>;
  onChange: (values: Record<string, boolean | null>) => void;
}

export function CheckboxGroup({ options, values, onChange }: CheckboxGroupProps) {
  const handleChange = (key: string, checked: boolean) => {
    onChange({
      ...values,
      [key]: checked
    });
  };

  return (
    <div className="space-y-3">
      {options.map((option) => (
        <label
          key={option.key}
          className="flex items-start space-x-3 cursor-pointer group"
        >
          <input
            type="checkbox"
            checked={values[option.key] === true}
            onChange={(e) => handleChange(option.key, e.target.checked)}
            className="mt-0.5 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:border-gray-600 dark:bg-gray-700"
          />
          <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
            {option.label}
          </span>
        </label>
      ))}
    </div>
  );
}