/**
 * Sends a request to calculate calories for a food item with an image
 * @param foodName The name of the food
 * @param image The food image file
 * @returns Promise with the calorie data
 */
export async function calculateCalories(foodName: string, image: File): Promise<{
    kcal: number,
    carbohydrates: number,
    proteins: number,
    fats: number
}> {
  // Create a FormData object to send multipart/form-data
  const formData = new FormData();
  formData.append('food_name', foodName);
  formData.append('image', image);

  try {
    const response = await fetch('http://127.0.0.1:8000/calculate_kcal', {
      method: 'POST',
      body: formData,
      // No need to set Content-Type header as it's automatically set with boundary for multipart/form-data
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error calculating calories:', error);
    throw error;
  }
}
