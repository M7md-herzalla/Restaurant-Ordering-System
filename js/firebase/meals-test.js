import { db } from "./firebase-config.js";
import { doc, getDoc } from "firebase/firestore";

async function testMeal() {
  try {
    const snapshot = await getDoc(doc(db, "meals", "1"));

if (!snapshot.exists()) {
      console.log("Meal not found.");
      return;
    }
        const meal = snapshot.data();
 console.log("Meal loaded from Firestore:", meal);
    console.log("Price in JOD:", meal.priceFils / 1000);
    console.log("Ingredients:", meal.ingredients);
  } catch (error) {
    console.error("Could not load meal:", error);
  }
}

testMeal();