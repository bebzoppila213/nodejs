type CuspomInputProps = {
  label: string;
  updateVlue: (text: string) => void;
  type: string
};

export default function CuspomInput({ label, updateVlue, type  }: CuspomInputProps) {
  const InputId = String(Math.random() + 123 * 21) + "Id";

  return (
    <div className="mb-3">
      <label htmlFor={InputId} className="htmlForm-label">
        {label}
      </label>
      <input
        onChange={(event) => updateVlue(event.target.value)}
        type={type}
        className="htmlForm-control"
        id={InputId}
        aria-describedby="emailHelp"
      />
    </div>
  );
}
