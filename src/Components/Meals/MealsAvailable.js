import React, {useState, useEffect} from "react";
import classes from './MealsAvailable.module.css'
import Card from '../UI/Card'
import Meal from './Meal'


const MealsAvailable = () => {
  const [mealsData, setMealsData] = useState([]);
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Make a fetch API call to get the products data.
    const fetchData = async () =>{
    const response = await fetch("https://moviesapi-ad08f-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json");
    if(!response.ok){
      throw new Error('Something went wrong in fetching data');
    }
    const data = await (response.json());
    const loadMeals = [];
    for(const key in data){
      loadMeals.push({
        id: key,
        name: data[key].name,
        price: data[key].price,
        description: data[key].description
      });
    }
    console.log(loadMeals);
    setMealsData(loadMeals);
    setIsLoading(false);
}

  fetchData().catch((error) => {
    setIsLoading(false);
    setError(error.message);
  });
console.log(mealsData);
  }, []);

if(isLoading){
  return (
    <section className={classes.loading}>
      <p>Loading...</p>
    </section>
  );
}
if(error){
  return (
    <section className={classes.error}>
       <p>{error}</p>
    </section>
  );
}

return (
  <section className={classes.meals}>
    <Card>
      <ul>
        {mealsData.map((meal) => (
          <Meal
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
            id={meal.id}
          />
        ))}
      </ul>
    </Card>
  </section>
);

}
export default MealsAvailable;