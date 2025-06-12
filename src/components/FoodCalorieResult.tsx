import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FoodCalorieResultProps {
  calories: number;
  carbohydrates?: number | null;
  proteins?: number | null;
  fats?: number | null;
}

export function FoodCalorieResult({
  calories,
  carbohydrates,
  proteins,
  fats
}: FoodCalorieResultProps) {
  // Determine color based on calorie count
  const getCalorieColor = (cal: number) => {
    if (cal < 200) return "text-green-600";
    if (cal < 500) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <Card className="p-4 bg-gray-50">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-2">Nutrition Information</h3>
        <div className="flex items-center justify-center mb-3">
          <span className={cn("text-3xl font-bold", getCalorieColor(calories))}>
            {calories}
          </span>
          <span className="ml-1 text-gray-500">kcal</span>
        </div>

        {/* Macronutrients breakdown */}
        {(carbohydrates !== null || proteins !== null || fats !== null) && (
          <div className="grid grid-cols-3 gap-2 mt-2 text-sm">
            <div className="bg-blue-50 p-2 rounded">
              <div className="font-medium text-blue-700">Carbs</div>
              <div>{carbohydrates !== null ? `${carbohydrates}g` : '-'}</div>
            </div>
            <div className="bg-green-50 p-2 rounded">
              <div className="font-medium text-green-700">Protein</div>
              <div>{proteins !== null ? `${proteins}g` : '-'}</div>
            </div>
            <div className="bg-yellow-50 p-2 rounded">
              <div className="font-medium text-yellow-700">Fat</div>
              <div>{fats !== null ? `${fats}g` : '-'}</div>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
