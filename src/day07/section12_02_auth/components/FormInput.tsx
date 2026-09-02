interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  placeholder?: string;
  autoComplete?: string;
}
{
  /* <input type="text" name="address" />; */
}
export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  readOnly = false,
  placeholder,
  autoComplete,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label
        className="text-sm font-medium
              text-gray-700"
      >
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="rounded-md border px-3 py-2 text-sm
                   focus:outline-none focus:ring-2
                     focus:ring-blue-500
                   disabled:bg-gray-100"
      />
    </div>
  );
}
