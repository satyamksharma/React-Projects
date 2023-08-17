import classes from "./AvailableMeals.module.css";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";

const DUMMY_MEALS = [
    {
        id: "m1",
        name: "Butter Chicken",
        description: "Finest chicken with mouth watering gravy",
        price: 300.0,
    },
    {
        id: "m2",
        name: "Masala Dosa",
        description: "A South Indian signature dish",
        price: 150.0,
    },
    {
        id: "m3",
        name: "Barbecue Burger",
        description: "Fully loaded burger with multiple options",
        price: 120.0,
    },
    {
        id: "m4",
        name: "Garlic Naan",
        description: "Classic Indian bread with garlic butter and herbs",
        price: 65.0,
    },
];

const AvailableMeals = () => {
    const mealsList = DUMMY_MEALS.map((meal) => (
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />
    ));

    return (
        <section className={classes.meals}>
            <Card>
                <h1>Menu</h1>
                <ul>{mealsList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;
