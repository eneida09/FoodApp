import { useEffect, useState } from "react";
import styles from "./fooddetails.module.css";
import ItemList from "./ItemList";
export default function FoodDetails({ foodId }) {
  const [food, setFood] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const API_KEY = "23f7ef9b8e8e40658fa553d020f14122";
  const URL = `https://api.spoonacular.com/recipes/${foodId}/information`;

  useEffect(() => {
    if (!foodId) return;

    async function fetchFood() {
      try {
        const res = await fetch(`${URL}?apiKey=${API_KEY}`);
        if (!res.ok) throw new Error("Error API");
        const data = await res.json();
        console.log(data);
        setFood(data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error:", err.message);
        setIsLoading(false);
      }
    }

    fetchFood();
  }, [foodId]);

  if (isLoading) return <p></p>;
  if (!food) return <p>No data found</p>;

  return (
    <div>
      <div className={styles.recipeCard}>
        <h1 className={styles.recipeName}>{food.title}</h1>
        <img
          className={styles.recipeImage}
          src={food.image}
          alt={food.title}
          style={{ width: "300px" }}
        />
        <div className={styles.recipeDetails}>
          <span>
            <strong>⏱️ {food.readyInMinutes} minutes</strong>
          </span>
          <span>
            <strong> | Serves: {food.servings}</strong>
          </span>
          <span> | {food.vegetarian ? "Vegetarian" : "Non-vegetarian"}</span>
          {food.vegan && <span> | Vegan</span>}
        </div>
        <div>
          💲 <strong>{(food.pricePerServing / 100).toFixed(2)} USD</strong>
        </div>
      </div>
      <div>
        <h2>Ingridients</h2>
        <ItemList food={food} isLoading={isLoading}/>
        {food.extendedIngredients.map((item) => (
  <div key={item.id}>
    <img
      src={`https://spoonacular.com/cdn/ingredients_100x100/${item.image}`}
      alt=""
    />
    <h3>{item.name}</h3>
    <h3>
      {item.amount} {item.unit}
    </h3>
  </div>
))}

        <h2>Instructions</h2>
        <div className={styles.recipeInstruction}>
          <ul>
            {food.analyzedInstructions?.[0]?.steps?.map((step) => (
              <li key={step.number}>{step.step}</li>
            )) || <p>No instructions are available.</p>}
          </ul>
        </div>
      </div>
    </div>
  );
}
