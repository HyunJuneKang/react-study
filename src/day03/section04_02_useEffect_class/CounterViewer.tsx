type CounterViewProps = {
  count2: number;
};

function CountViewer({ count2 }: CounterViewProps) {
  return (
    <div>
      <h1>현재값:{count2}</h1>
    </div>
  );
}
export default CountViewer;
    