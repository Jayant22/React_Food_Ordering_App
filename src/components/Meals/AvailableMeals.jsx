import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItems/MealItem';
import classes from './AvailableMeals.module.css';
import useFetch from '../../hooks/useFetch';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const { isLoading, error, sendHttpRequest: fetchMealsRequest } = useFetch();

  useEffect(() => {
    const processMeals = (dataObj) => {
      const loadedMeals = [];

      for (const key in dataObj) {
        loadedMeals.push({
          id: key,
          name: dataObj[key].name,
          description: dataObj[key].description,
          price: dataObj[key].price,
        });
      }
      setMeals(loadedMeals);
    };

    fetchMealsRequest(
      {
        url: 'https://react--http-f960e-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json',
      },
      processMeals
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchMealsRequest]);

  let content = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  if (meals.length <= 0) content = <p> No Meals Found... </p>;

  if (error) {
    content = <button onClick={fetchMealsRequest}>Try again</button>;
  }

  if (isLoading) {
    content = 'Loading Meals...';
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{content}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
