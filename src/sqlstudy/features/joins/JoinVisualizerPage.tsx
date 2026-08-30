import { useState } from "react";
import { customers, orders } from "../../data/joindata";

export default function JoinVisualizerPage() {
  const [joinType, setJoinType] = useState<"" | "inner" | "left">("");
  let result: { customerName: string; product: string }[] = [];

  if (joinType === "inner") {
    result = customers.flatMap((customer) =>
      orders
        .filter((order) => order.customerId === customer.id)
        .map((order) => ({
          customerName: customer.name,
          product: order.product,
        })),
    );
  } else if (joinType === "left") {
    result = customers.flatMap((customer) => {
      const customerOrders = orders.filter(
        (order) => order.customerId === customer.id,
      );

      if (customerOrders.length === 0) {
        return [{ customerName: customer.name, product: "주문 없음" }];
      }

      return customerOrders.map((order) => ({
        customerName: customer.name,
        product: order.product,
      }));
    });
  }
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-6 lg:py-12">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
            SQL Study
          </p>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            INNER JOIN vs LEFT JOIN
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-slate-600">
            조인 방식을 선택하고 같은 데이터에서 결과 행이 어떻게 달라지는지
            확인해보세요.
          </p>
        </header>

        <div className="grid gap-6 md:grid-cols-2">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">customers</h2>

            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="border px-4 py-3">id</th>
                    <th className="border px-4 py-3">name</th>
                  </tr>
                </thead>

                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td className="border px-4 py-3">{customer.id}</td>
                      <td className="border px-4 py-3">{customer.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-xl font-bold">orders</h2>

            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="w-full border-collapse text-left text-sm">
                <thead className="bg-slate-100">
                  <tr>
                    <th className="border px-4 py-3">id</th>
                    <th className="border px-4 py-3">customerId</th>
                    <th className="border px-4 py-3">product</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="border px-4 py-3">{order.id}</td>
                      <td className="border px-4 py-3">{order.customerId}</td>
                      <td className="border px-4 py-3">{order.product}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <section className="my-6 overflow-hidden rounded-2xl bg-slate-950 text-slate-100 shadow-lg shadow-slate-300/40">
          <div className="flex items-center gap-2 border-b border-slate-800 px-5 py-3">
            <span className="h-3 w-3 rounded-full bg-rose-400" />
            <span className="h-3 w-3 rounded-full bg-amber-300" />
            <span className="h-3 w-3 rounded-full bg-emerald-400" />
            <span className="ml-2 text-xs font-semibold text-slate-400">
              query.sql
            </span>
          </div>
          <div className="p-5">
            <p className="mb-3 text-sm font-bold text-slate-400">실행할 SQL</p>

            <pre className="overflow-x-auto font-mono text-sm leading-7">
              <code className="bg-transparent p-0 text-inherit">
                <span className="text-sky-300">SELECT</span> c.name, o.product
                {"\n"}
                <span className="text-sky-300">FROM</span> customers c{"\n"}
                <span
                  className={
                    joinType
                      ? "font-bold text-amber-300"
                      : "font-bold text-rose-300"
                  }
                >
                  {joinType ? joinType.toUpperCase() : "____"}
                </span>{" "}
                <span className="text-sky-300">JOIN</span> orders o{"\n"}
                <span className="text-sky-300">ON</span> c.id = o.customerId;
              </code>
            </pre>
          </div>
        </section>

        <div className="my-6 flex flex-wrap gap-3" aria-label="조인 방식 선택">
          <button
            onClick={() => setJoinType("inner")}
            className={`rounded-lg px-5 py-3 font-bold text-white transition hover:-translate-y-0.5 ${
              joinType === "inner"
                ? "bg-blue-600 shadow-md shadow-blue-200"
                : "bg-slate-500 hover:bg-slate-600"
            }`}
          >
            INNER JOIN
          </button>

          <button
            onClick={() => setJoinType("left")}
            className={`rounded-lg px-5 py-3 font-bold text-white transition hover:-translate-y-0.5 ${
              joinType === "left"
                ? "bg-blue-600 shadow-md shadow-blue-200"
                : "bg-slate-500 hover:bg-slate-600"
            }`}
          >
            LEFT JOIN
          </button>
        </div>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="mb-4 text-xl font-bold">
            {joinType ? `${joinType.toUpperCase()} JOIN 결과` : "JOIN 결과"}
          </h2>

          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="w-full border-collapse text-left text-sm">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border px-4 py-3">customerName</th>
                  <th className="border px-4 py-3">product</th>
                </tr>
              </thead>

              <tbody>
                {result.length > 0 ? (
                  result.map((row, index) => (
                    <tr
                      className="transition-colors hover:bg-blue-50"
                      key={`${row.customerName}-${row.product}-${index}`}
                    >
                      <td className="border px-4 py-3 font-medium">
                        {row.customerName}
                      </td>
                      <td className="border px-4 py-3">{row.product}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={2}
                      className="px-4 py-8 text-center text-slate-500"
                    >
                      위에서 JOIN 방식을 선택하면 결과가 표시됩니다.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
