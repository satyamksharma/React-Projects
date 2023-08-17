import React from "react";
import classes from "./MealsSummary.module.css";

const MealsSummary = () => {
    return (
        <section className={classes.summary}>
            <h2>Delicious Food, Delivered To You</h2>
            <p>
                Enjoy a mouth-watering meal in the comfort of your own home with our extensive
                selection of delicious dishes available for delivery.
            </p>
            <p>
                Our skilled chefs use only the finest, fresh ingredients and prepare each meal to
                order, ensuring that your food arrives just as it should be - hot, fresh, and
                bursting with flavor!
            </p>
        </section>
    );
};

export default MealsSummary;
