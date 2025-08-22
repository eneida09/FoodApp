import Item from "./Item";

export default function ItemList({ food, isLoading }) {
  if (isLoading) return ;

  if (!food || !Array.isArray(food.extendedIngredients)) {
    return <p>No components available.</p>;
  }

  return (
    <div>
      {food.extendedIngredients.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
}
