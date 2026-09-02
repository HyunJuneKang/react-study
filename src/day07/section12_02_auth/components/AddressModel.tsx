import DaumPostcode from "react-daum-postcode";

interface Props {
  onClose: () => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onComplete: (data: any) => void;
}

export default function AddressModal({ onClose, onComplete }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center
          justify-center bg-black/40"
    >
      <div
        className="relative w-[420px] rounded-lg bg-white
              p-4"
      >
        <button onClick={onClose} className="absolute right-2 top-2 text-xl">
          &times;
        </button>
        <DaumPostcode onComplete={onComplete} />
      </div>
    </div>
  );
}
