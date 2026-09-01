import "./EmotionItem.css";
type EmotionItemType = {
  id: number;
  img: string;
  name: string;
  onClick: (id: number) => void;
  isSelected: boolean;
};

export default function EmotionItem({
  id,
  img,
  name,
  onClick,
  isSelected,
}: EmotionItemType) {
  const handleOnClick = () => {
    onClick(id);
  };
  return (
    <div
      className={`EmotionItem ${isSelected ? `EmotionItem_on_${id}` : `EmotionItem_off`}`}
      onClick={handleOnClick}
    >
      <img alt={`emotion${id}`} src={img} />
      <span>{name}</span>
    </div>
  );
}
