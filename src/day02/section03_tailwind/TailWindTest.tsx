import { Fragment } from "react/jsx-runtime";

export default function TailWindTest() {
  const isActive: boolean = true;

  return (
    <Fragment>
      <div className="max-w-3xl mx-auto mt-4">
        <div className="rounded-lg border border-gray-200 p-4 shadow-sm">
          <h5 className="text-lg font-semibold mb-2">User</h5>
          <p className="text-gray-600 mb-3">Tailwind 카드입니다</p>
          <button
            className={`px-4 py-2 rounded text-white text-sm
                ${isActive ? "bg-green-500" : "bg-red-500"}`}
          >
            확인2
          </button>
        </div>
        <button className="mt-2 px-2 py-1 text-sm rounded bg-blue-500 text-white">
          확인1
        </button>
      </div>
    </Fragment>
  );
}
