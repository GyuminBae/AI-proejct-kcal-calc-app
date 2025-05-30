import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { UploadCloud } from "lucide-react";
import { FoodImageUploader } from "@/components/FoodImageUploader";
import { FoodCalorieResult } from "@/components/FoodCalorieResult";
import { calculateCalories } from "@/lib/api";

function App() {
  const [foodName, setFoodName] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [calories, setCalories] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (file: File | null) => {
    setSelectedImage(file);
    setError(null);
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!foodName.trim()) {
      setError("Please enter a food name");
      return;
    }
    
    if (!selectedImage) {
      setError("Please upload a food image");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    try {
      const result = await calculateCalories(foodName, selectedImage);
      setCalories(result.kcal);
    } catch (err) {
      setError("Failed to calculate calories. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold">Food Calorie Calculator</h1>
          <p className="text-gray-500">Upload a food image and get calorie information</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="food-name">Food Name</Label>
            <Input
              id="food-name"
              placeholder="Enter food name (e.g., Pizza, Salad)"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
            />
          </div>
          
          <FoodImageUploader 
            onImageChange={handleImageChange}
            imagePreview={imagePreview}
          />
          
          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading}
          >
            {isLoading ? "Calculating..." : "Calculate Calories"}
          </Button>
        </form>
        
        {calories !== null && (
          <FoodCalorieResult calories={calories} />
        )}
      </Card>
    </div>
  );
}

export default App;