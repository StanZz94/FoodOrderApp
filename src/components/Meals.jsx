import useHttp from "./hooks/useHttp.js";
import MealCard from "./MealCard";

export default function Meals() {
    const { data: loadedMeals, error, isLoading } = useHttp('http://localhost:3000/meals')

    return <ul id="meals">
        {loadedMeals.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
        ))}
    </ul>
}