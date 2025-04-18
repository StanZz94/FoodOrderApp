import Error from "./Error.jsx";
import useHttp from "./hooks/useHttp.js";
import MealCard from "./MealCard";

const requestConfig = {};

export default function Meals() {
    const { data: loadedMeals, error, isLoading } = useHttp('http://localhost:3000/meals', requestConfig, []);

    if (isLoading) {
        return <p className="center">Fething meals...</p>
    }

    if (error) {
        return <Error title="Failed to fetch meals!" message={error} />
    }

    return <ul id="meals">
        {loadedMeals.map((meal) => (
            <MealCard key={meal.id} meal={meal} />
        ))}
    </ul>
}