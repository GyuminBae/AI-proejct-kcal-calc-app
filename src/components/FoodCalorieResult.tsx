import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FoodCalorieResultProps {
  calories: number;
}

export function FoodCalorieResult({ calories }: FoodCalorieResultProps) {
  // Determine color based on calorie count
  const getCalorieColor = (cal: number) => {
    if (cal < 200) return "text-green-600";
    if (cal < 500) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="p-4 bg-gray-50">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Calorie Result</h3>
        <div className="flex items-center justify-center">
          <span className={cn("text-3xl font-bold", getCalorieColor(calories))}>
            {calories}
          </span>
          <span className="ml-1 text-gray-500">kcal</span>
        </div>
      </div>
    </Card>
  );
}