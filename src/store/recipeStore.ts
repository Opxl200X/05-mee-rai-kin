
import { create } from 'zustand';

export interface Ingredient {
  id: string;
  name: string;
  nutrition: string;
  caloriesPerUnit: number;
  unit: string;
}

export interface Recipe {
  id: string;
  title: string;
  imageUrl: string;
  cookTime: number;
  difficulty: 'easy' | 'medium' | 'hard';
  calories: number;
  ingredients: Ingredient[];
  steps: string[];
  videoUrl?: string;
}

interface RecipeState {
  recipes: Recipe[];
  favoriteRecipes: string[];
  searchResults: Recipe[];
  popularRecipes: Recipe[];

  searchRecipes: (query: string, filters?: string[]) => void;
  toggleFavorite: (recipeId: string) => void;
  getRandomRecipe: () => Recipe | null;
  getRecipeById: (id: string) => Recipe | null;
}

// Mock data from Excel
const mockRecipes: Recipe[] = 

[
  {
    "id": "1",
    "title": "กุยช่ายทอด",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,กุยช่ายทอด",
    "cookTime": 55,
    "difficulty": "hard",
    "calories": 288,
    "ingredients": [
      {
        "id": "1-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 175.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "1-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 87.3,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=กุยช่ายทอด",
    "diet_type": "มังสวิรัติ"
  },
  {
    "id": "2",
    "title": "จับฉ่าย",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,จับฉ่าย",
    "cookTime": 19,
    "difficulty": "medium",
    "calories": 540,
    "ingredients": [
      {
        "id": "2-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 156.4,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "2-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 16.9,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=จับฉ่าย",
    "diet_type": "มังสวิรัติ"
  },
  {
    "id": "3",
    "title": "ชะอมไข่ทอดกับน้ำพริก",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ชะอมไข่ทอดกับน้ำพริก",
    "cookTime": 60,
    "difficulty": "medium",
    "calories": 647,
    "ingredients": [
      {
        "id": "3-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 191.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "3-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 99.8,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ชะอมไข่ทอดกับน้ำพริก",
    "diet_type": "มังสวิรัติ"
  },
  {
    "id": "4",
    "title": "ชุปแป้งทอด",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ชุปแป้งทอด",
    "cookTime": 18,
    "difficulty": "medium",
    "calories": 639,
    "ingredients": [
      {
        "id": "4-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 75.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "4-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 12.8,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ชุปแป้งทอด",
    "diet_type": "มังสวิรัติ"
  },
  {
    "id": "5",
    "title": "ซุปหน่อไม้",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ซุปหน่อไม้",
    "cookTime": 45,
    "difficulty": "medium",
    "calories": 346,
    "ingredients": [
      {
        "id": "5-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 163.4,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "5-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 92.8,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ซุปหน่อไม้",
    "diet_type": "มังสวิรัติ"
  },
  {
    "id": "6",
    "title": "ดอกขจรผัดน้ำมันหอย",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ดอกขจรผัดน้ำมันหอย",
    "cookTime": 55,
    "difficulty": "hard",
    "calories": 465,
    "ingredients": [
      {
        "id": "6-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 270.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "6-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 45.5,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ดอกขจรผัดน้ำมันหอย",
    "diet_type": "มังสวิรัติ"
  },
  {
    "id": "7",
    "title": "ดอกแคผัดไข่",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ดอกแคผัดไข่",
    "cookTime": 28,
    "difficulty": "medium",
    "calories": 422,
    "ingredients": [
      {
        "id": "7-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 67.5,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "7-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 42.9,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ดอกแคผัดไข่",
    "diet_type": "มังสวิรัติ"
  },
  {
    "id": "8",
    "title": "ต้มจับฉ่าย",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ต้มจับฉ่าย",
    "cookTime": 19,
    "difficulty": "medium",
    "calories": 605,
    "ingredients": [
      {
        "id": "8-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 51.5,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "8-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 91.3,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ต้มจับฉ่าย",
    "diet_type": "มังสวิรัติ"
  },
  {
    "id": "9",
    "title": "ตำแตง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ตำแตง",
    "cookTime": 45,
    "difficulty": "hard",
    "calories": 478,
    "ingredients": [
      {
        "id": "9-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 65.2,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "9-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 70.0,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ตำแตง",
    "diet_type": "มังสวิรัติ"
  },
  {
    "id": "10",
    "title": "ถั่วงอกผัดเต้าหู้",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ถั่วงอกผัดเต้าหู้",
    "cookTime": 51,
    "difficulty": "easy",
    "calories": 689,
    "ingredients": [
      {
        "id": "10-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 247.8,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "10-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 61.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ถั่วงอกผัดเต้าหู้",
    "diet_type": "มังสวิรัติ"
  },
  {
    "id": "11",
    "title": "ถั่วพูผัดกะปิ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ถั่วพูผัดกะปิ",
    "cookTime": 50,
    "difficulty": "hard",
    "calories": 361,
    "ingredients": [
      {
        "id": "11-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 161.9,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "11-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 25.9,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ถั่วพูผัดกะปิ",
    "diet_type": "มังสวิรัติ"
  },
  {
    "id": "12",
    "title": "น้ำพริกกะปิ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,น้ำพริกกะปิ",
    "cookTime": 29,
    "difficulty": "medium",
    "calories": 317,
    "ingredients": [
      {
        "id": "12-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 128.5,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "12-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 13.7,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=น้ำพริกกะปิ",
    "diet_type": "มังสวิรัติ"
  },
  {
    "id": "13",
    "title": "น้ำพริกหนุ่ม",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,น้ำพริกหนุ่ม",
    "cookTime": 32,
    "difficulty": "easy",
    "calories": 428,
    "ingredients": [
      {
        "id": "13-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 175.4,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "13-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 54.1,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=น้ำพริกหนุ่ม",
    "diet_type": "มังสวิรัติ"
  },
  {
    "id": "14",
    "title": "บวบผัดไข่",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,บวบผัดไข่",
    "cookTime": 42,
    "difficulty": "hard",
    "calories": 683,
    "ingredients": [
      {
        "id": "14-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 257.8,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "14-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 60.6,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=บวบผัดไข่",
    "diet_type": "มังสวิรัติ"
  },
  {
    "id": "15",
    "title": "ผัดดอกกะหล่ำหมูสับ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ผัดดอกกะหล่ำหมูสับ",
    "cookTime": 52,
    "difficulty": "easy",
    "calories": 513,
    "ingredients": [
      {
        "id": "15-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 133.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "15-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 51.0,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ผัดดอกกะหล่ำหมูสับ",
    "diet_type": "มังสวิรัติ"
  },
  {
    "id": "16",
    "title": "ผัดผักรวมมิตร",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ผัดผักรวมมิตร",
    "cookTime": 42,
    "difficulty": "hard",
    "calories": 364,
    "ingredients": [
      {
        "id": "16-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 258.4,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "16-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 80.0,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ผัดผักรวมมิตร",
    "diet_type": "มังสวิรัติ"
  },
  {
    "id": "17",
    "title": "ฝักทองผัดไข่",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ฝักทองผัดไข่",
    "cookTime": 48,
    "difficulty": "easy",
    "calories": 300,
    "ingredients": [
      {
        "id": "17-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 131.4,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "17-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 32.1,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ฝักทองผัดไข่",
    "diet_type": "มังสวิรัติ"
  },
  {
    "id": "18",
    "title": "ฝักเพกาเผาใส่น้ำพริก",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ฝักเพกาเผาใส่น้ำพริก",
    "cookTime": 42,
    "difficulty": "hard",
    "calories": 243,
    "ingredients": [
      {
        "id": "18-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 245.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "18-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 55.5,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ฝักเพกาเผาใส่น้ำพริก",
    "diet_type": "มังสวิรัติ"
  },
  {
    "id": "19",
    "title": "ฟักเขียวต้มจืด",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ฟักเขียวต้มจืด",
    "cookTime": 58,
    "difficulty": "easy",
    "calories": 217,
    "ingredients": [
      {
        "id": "19-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 68.7,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "19-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 44.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ฟักเขียวต้มจืด",
    "diet_type": "มังสวิรัติ"
  },
  {
    "id": "20",
    "title": "ฟักทองผัดไข่",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ฟักทองผัดไข่",
    "cookTime": 31,
    "difficulty": "easy",
    "calories": 585,
    "ingredients": [
      {
        "id": "20-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 211.0,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "20-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 23.5,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ฟักทองผัดไข่",
    "diet_type": "มังสวิรัติ"
  },
  {
    "id": "21",
    "title": "วุ้นเส้นผัดไข่",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,วุ้นเส้นผัดไข่",
    "cookTime": 60,
    "difficulty": "easy",
    "calories": 391,
    "ingredients": [
      {
        "id": "21-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 118.1,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "21-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 20.6,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=วุ้นเส้นผัดไข่",
    "diet_type": "มังสวิรัติ"
  },
  {
    "id": "22",
    "title": "ส้มตำไทย",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ส้มตำไทย",
    "cookTime": 58,
    "difficulty": "hard",
    "calories": 688,
    "ingredients": [
      {
        "id": "22-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 116.4,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "22-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 65.2,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ส้มตำไทย",
    "diet_type": "มังสวิรัติ"
  },
  {
    "id": "23",
    "title": "หน่อไม้ผัดไข่",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,หน่อไม้ผัดไข่",
    "cookTime": 54,
    "difficulty": "easy",
    "calories": 688,
    "ingredients": [
      {
        "id": "23-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 159.0,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "23-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 79.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=หน่อไม้ผัดไข่",
    "diet_type": "มังสวิรัติ"
  },
  {
    "id": "24",
    "title": "ก๋วยเตี๋ยวคั่วไก่",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ก๋วยเตี๋ยวคั่วไก่",
    "cookTime": 40,
    "difficulty": "easy",
    "calories": 607,
    "ingredients": [
      {
        "id": "24-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 53.4,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "24-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 72.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ก๋วยเตี๋ยวคั่วไก่",
    "diet_type": "ฮาลาล"
  },
  {
    "id": "25",
    "title": "กะเพราไก่ไข่ดาว",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,กะเพราไก่ไข่ดาว",
    "cookTime": 50,
    "difficulty": "hard",
    "calories": 465,
    "ingredients": [
      {
        "id": "25-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 103.9,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "25-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 26.1,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=กะเพราไก่ไข่ดาว",
    "diet_type": "ฮาลาล"
  },
  {
    "id": "26",
    "title": "แกงเขียวหวานไก่",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,แกงเขียวหวานไก่",
    "cookTime": 18,
    "difficulty": "medium",
    "calories": 417,
    "ingredients": [
      {
        "id": "26-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 96.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "26-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 51.0,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=แกงเขียวหวานไก่",
    "diet_type": "ฮาลาล"
  },
  {
    "id": "27",
    "title": "แกงมัสมั่นเนื้อ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,แกงมัสมั่นเนื้อ",
    "cookTime": 55,
    "difficulty": "easy",
    "calories": 611,
    "ingredients": [
      {
        "id": "27-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 127.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "27-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 74.9,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=แกงมัสมั่นเนื้อ",
    "diet_type": "ฮาลาล"
  },
  {
    "id": "28",
    "title": "ขนมจีนน้ำยา",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ขนมจีนน้ำยา",
    "cookTime": 31,
    "difficulty": "hard",
    "calories": 386,
    "ingredients": [
      {
        "id": "28-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 257.7,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "28-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 43.3,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ขนมจีนน้ำยา",
    "diet_type": "ฮาลาล"
  },
  {
    "id": "29",
    "title": "ข้าวซอยไก่",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ข้าวซอยไก่",
    "cookTime": 20,
    "difficulty": "hard",
    "calories": 299,
    "ingredients": [
      {
        "id": "29-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 227.5,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "29-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 12.3,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ข้าวซอยไก่",
    "diet_type": "ฮาลาล"
  },
  {
    "id": "30",
    "title": "ข้าวมันไก่",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ข้าวมันไก่",
    "cookTime": 55,
    "difficulty": "medium",
    "calories": 394,
    "ingredients": [
      {
        "id": "30-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 96.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "30-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 36.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ข้าวมันไก่",
    "diet_type": "ฮาลาล"
  },
  {
    "id": "31",
    "title": "ข้าวหน้าไก่",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ข้าวหน้าไก่",
    "cookTime": 19,
    "difficulty": "easy",
    "calories": 497,
    "ingredients": [
      {
        "id": "31-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 154.2,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "31-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 74.3,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ข้าวหน้าไก่",
    "diet_type": "ฮาลาล"
  },
  {
    "id": "32",
    "title": "ฉู่ฉี่กุ้ง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ฉู่ฉี่กุ้ง",
    "cookTime": 51,
    "difficulty": "hard",
    "calories": 623,
    "ingredients": [
      {
        "id": "32-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 250.1,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "32-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 45.6,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ฉู่ฉี่กุ้ง",
    "diet_type": "ฮาลาล"
  },
  {
    "id": "33",
    "title": "ฉู่ฉี่ปลาทู",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ฉู่ฉี่ปลาทู",
    "cookTime": 54,
    "difficulty": "easy",
    "calories": 433,
    "ingredients": [
      {
        "id": "33-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 117.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "33-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 88.7,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ฉู่ฉี่ปลาทู",
    "diet_type": "ฮาลาล"
  },
  {
    "id": "34",
    "title": "ฉู่ฉี่ปลาเนื้ออ่อน",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ฉู่ฉี่ปลาเนื้ออ่อน",
    "cookTime": 44,
    "difficulty": "easy",
    "calories": 518,
    "ingredients": [
      {
        "id": "34-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 149.7,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "34-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 92.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ฉู่ฉี่ปลาเนื้ออ่อน",
    "diet_type": "ฮาลาล"
  },
  {
    "id": "35",
    "title": "ญี่ปุ่นดงบุริเนื้อ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ญี่ปุ่นดงบุริเนื้อ",
    "cookTime": 33,
    "difficulty": "medium",
    "calories": 235,
    "ingredients": [
      {
        "id": "35-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 164.0,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "35-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 33.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ญี่ปุ่นดงบุริเนื้อ",
    "diet_type": "ฮาลาล"
  },
  {
    "id": "36",
    "title": "ญี่ปุ่นยากินิกุ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ญี่ปุ่นยากินิกุ",
    "cookTime": 46,
    "difficulty": "easy",
    "calories": 658,
    "ingredients": [
      {
        "id": "36-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 55.7,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "36-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 37.5,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ญี่ปุ่นยากินิกุ",
    "diet_type": "ฮาลาล"
  },
  {
    "id": "37",
    "title": "ต้มข่าไก่",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ต้มข่าไก่",
    "cookTime": 21,
    "difficulty": "easy",
    "calories": 331,
    "ingredients": [
      {
        "id": "37-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 159.4,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "37-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 98.8,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ต้มข่าไก่",
    "diet_type": "ฮาลาล"
  },
  {
    "id": "38",
    "title": "ต้มยำกุ้ง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ต้มยำกุ้ง",
    "cookTime": 24,
    "difficulty": "hard",
    "calories": 527,
    "ingredients": [
      {
        "id": "38-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 169.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "38-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 38.6,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ต้มยำกุ้ง",
    "diet_type": "ฮาลาล"
  },
  {
    "id": "39",
    "title": "น้ำตกเนื้อ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,น้ำตกเนื้อ",
    "cookTime": 29,
    "difficulty": "medium",
    "calories": 610,
    "ingredients": [
      {
        "id": "39-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 286.7,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "39-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 12.0,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=น้ำตกเนื้อ",
    "diet_type": "ฮาลาล"
  },
  {
    "id": "40",
    "title": "เนื้อย่างจิ้มแจ่ว",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,เนื้อย่างจิ้มแจ่ว",
    "cookTime": 25,
    "difficulty": "easy",
    "calories": 599,
    "ingredients": [
      {
        "id": "40-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 289.9,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "40-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 84.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=เนื้อย่างจิ้มแจ่ว",
    "diet_type": "ฮาลาล"
  },
  {
    "id": "41",
    "title": "ปลานึ่งมะนาว",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ปลานึ่งมะนาว",
    "cookTime": 23,
    "difficulty": "hard",
    "calories": 292,
    "ingredients": [
      {
        "id": "41-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 226.1,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "41-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 57.2,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ปลานึ่งมะนาว",
    "diet_type": "ฮาลาล"
  },
  {
    "id": "42",
    "title": "ปลาราดพริก",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ปลาราดพริก",
    "cookTime": 58,
    "difficulty": "hard",
    "calories": 234,
    "ingredients": [
      {
        "id": "42-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 252.1,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "42-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 63.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ปลาราดพริก",
    "diet_type": "ฮาลาล"
  },
  {
    "id": "43",
    "title": "ปลาอินทรีทอดซีอิ๊ว",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ปลาอินทรีทอดซีอิ๊ว",
    "cookTime": 42,
    "difficulty": "easy",
    "calories": 223,
    "ingredients": [
      {
        "id": "43-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 143.0,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "43-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 76.8,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ปลาอินทรีทอดซีอิ๊ว",
    "diet_type": "ฮาลาล"
  },
  {
    "id": "44",
    "title": "สะโพกไก่อบซอส",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,สะโพกไก่อบซอส",
    "cookTime": 49,
    "difficulty": "hard",
    "calories": 442,
    "ingredients": [
      {
        "id": "44-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 126.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "44-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 69.8,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=สะโพกไก่อบซอส",
    "diet_type": "ฮาลาล"
  },
  {
    "id": "45",
    "title": "ห่อหมกทะเล",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ห่อหมกทะเล",
    "cookTime": 23,
    "difficulty": "medium",
    "calories": 541,
    "ingredients": [
      {
        "id": "45-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 51.4,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "45-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 28.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ห่อหมกทะเล",
    "diet_type": "ฮาลาล"
  },
  {
    "id": "46",
    "title": "ห่อหมกปลา",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ห่อหมกปลา",
    "cookTime": 55,
    "difficulty": "hard",
    "calories": 211,
    "ingredients": [
      {
        "id": "46-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 173.4,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "46-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 92.6,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ห่อหมกปลา",
    "diet_type": "ฮาลาล"
  },
  {
    "id": "47",
    "title": "อกไก่ย่างน้ำจิ้มแจ่ว",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,อกไก่ย่างน้ำจิ้มแจ่ว",
    "cookTime": 43,
    "difficulty": "hard",
    "calories": 648,
    "ingredients": [
      {
        "id": "47-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 168.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "47-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 47.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=อกไก่ย่างน้ำจิ้มแจ่ว",
    "diet_type": "ฮาลาล"
  },
  {
    "id": "48",
    "title": "อู๋ปลานิล",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,อู๋ปลานิล",
    "cookTime": 43,
    "difficulty": "easy",
    "calories": 635,
    "ingredients": [
      {
        "id": "48-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 89.2,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "48-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 88.3,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=อู๋ปลานิล",
    "diet_type": "ฮาลาล"
  },
  {
    "id": "49",
    "title": "กระพงทอดราดน้ำปลา",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,กระพงทอดราดน้ำปลา",
    "cookTime": 44,
    "difficulty": "medium",
    "calories": 618,
    "ingredients": [
      {
        "id": "49-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 283.7,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "49-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 91.0,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=กระพงทอดราดน้ำปลา",
    "diet_type": "คีโต"
  },
  {
    "id": "50",
    "title": "กุ้งแช่น้ำปลา",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,กุ้งแช่น้ำปลา",
    "cookTime": 27,
    "difficulty": "medium",
    "calories": 367,
    "ingredients": [
      {
        "id": "50-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 74.5,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "50-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 13.6,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=กุ้งแช่น้ำปลา",
    "diet_type": "คีโต"
  },
  {
    "id": "51",
    "title": "คอหมูย่าง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,คอหมูย่าง",
    "cookTime": 60,
    "difficulty": "medium",
    "calories": 267,
    "ingredients": [
      {
        "id": "51-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 85.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "51-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 24.2,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=คอหมูย่าง",
    "diet_type": "คีโต"
  },
  {
    "id": "52",
    "title": "คั่วกลิ้งหมู",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,คั่วกลิ้งหมู",
    "cookTime": 28,
    "difficulty": "easy",
    "calories": 308,
    "ingredients": [
      {
        "id": "52-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 53.9,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "52-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 98.3,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=คั่วกลิ้งหมู",
    "diet_type": "คีโต"
  },
  {
    "id": "53",
    "title": "คางหมูทอดกระเทียม",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,คางหมูทอดกระเทียม",
    "cookTime": 37,
    "difficulty": "easy",
    "calories": 554,
    "ingredients": [
      {
        "id": "53-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 267.0,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "53-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 78.7,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=คางหมูทอดกระเทียม",
    "diet_type": "คีโต"
  },
  {
    "id": "54",
    "title": "แจ่วบอง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,แจ่วบอง",
    "cookTime": 53,
    "difficulty": "medium",
    "calories": 563,
    "ingredients": [
      {
        "id": "54-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 239.5,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "54-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 79.0,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=แจ่วบอง",
    "diet_type": "คีโต"
  },
  {
    "id": "55",
    "title": "ฉู่ฉี่กุ้ง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ฉู่ฉี่กุ้ง",
    "cookTime": 43,
    "difficulty": "easy",
    "calories": 213,
    "ingredients": [
      {
        "id": "55-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 116.7,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "55-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 69.0,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ฉู่ฉี่กุ้ง",
    "diet_type": "คีโต"
  },
  {
    "id": "56",
    "title": "ฉู่ฉี่ปลาทู",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ฉู่ฉี่ปลาทู",
    "cookTime": 33,
    "difficulty": "easy",
    "calories": 556,
    "ingredients": [
      {
        "id": "56-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 213.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "56-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 81.0,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ฉู่ฉี่ปลาทู",
    "diet_type": "คีโต"
  },
  {
    "id": "57",
    "title": "ฉู่ฉี่ปลาเนื้ออ่อน",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ฉู่ฉี่ปลาเนื้ออ่อน",
    "cookTime": 49,
    "difficulty": "hard",
    "calories": 694,
    "ingredients": [
      {
        "id": "57-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 96.9,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "57-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 90.5,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ฉู่ฉี่ปลาเนื้ออ่อน",
    "diet_type": "คีโต"
  },
  {
    "id": "58",
    "title": "ทอดกระเทียมพริกไทย",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ทอดกระเทียมพริกไทย",
    "cookTime": 38,
    "difficulty": "medium",
    "calories": 376,
    "ingredients": [
      {
        "id": "58-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 126.0,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "58-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 36.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ทอดกระเทียมพริกไทย",
    "diet_type": "คีโต"
  },
  {
    "id": "59",
    "title": "ทอดมันกุ้ง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ทอดมันกุ้ง",
    "cookTime": 22,
    "difficulty": "hard",
    "calories": 523,
    "ingredients": [
      {
        "id": "59-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 124.7,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "59-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 77.9,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ทอดมันกุ้ง",
    "diet_type": "คีโต"
  },
  {
    "id": "60",
    "title": "ทอดมันปลากราย",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ทอดมันปลากราย",
    "cookTime": 52,
    "difficulty": "easy",
    "calories": 576,
    "ingredients": [
      {
        "id": "60-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 138.9,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "60-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 10.5,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ทอดมันปลากราย",
    "diet_type": "คีโต"
  },
  {
    "id": "61",
    "title": "ทอดหมูสามชั้น",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ทอดหมูสามชั้น",
    "cookTime": 41,
    "difficulty": "easy",
    "calories": 374,
    "ingredients": [
      {
        "id": "61-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 154.1,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "61-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 75.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ทอดหมูสามชั้น",
    "diet_type": "คีโต"
  },
  {
    "id": "62",
    "title": "น้ำตกเนื้อ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,น้ำตกเนื้อ",
    "cookTime": 30,
    "difficulty": "easy",
    "calories": 329,
    "ingredients": [
      {
        "id": "62-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 118.7,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "62-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 64.1,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=น้ำตกเนื้อ",
    "diet_type": "คีโต"
  },
  {
    "id": "63",
    "title": "เนื้อย่างจิ้มแจ่ว",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,เนื้อย่างจิ้มแจ่ว",
    "cookTime": 22,
    "difficulty": "hard",
    "calories": 484,
    "ingredients": [
      {
        "id": "63-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 186.7,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "63-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 80.8,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=เนื้อย่างจิ้มแจ่ว",
    "diet_type": "คีโต"
  },
  {
    "id": "64",
    "title": "ปลาทอดน้ำปลา",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ปลาทอดน้ำปลา",
    "cookTime": 47,
    "difficulty": "hard",
    "calories": 374,
    "ingredients": [
      {
        "id": "64-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 86.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "64-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 29.5,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ปลาทอดน้ำปลา",
    "diet_type": "คีโต"
  },
  {
    "id": "65",
    "title": "ปลานึ่งมะนาว",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ปลานึ่งมะนาว",
    "cookTime": 16,
    "difficulty": "medium",
    "calories": 210,
    "ingredients": [
      {
        "id": "65-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 292.7,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "65-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 63.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ปลานึ่งมะนาว",
    "diet_type": "คีโต"
  },
  {
    "id": "66",
    "title": "ปลาราดพริก",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ปลาราดพริก",
    "cookTime": 51,
    "difficulty": "medium",
    "calories": 310,
    "ingredients": [
      {
        "id": "66-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 182.1,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "66-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 42.1,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ปลาราดพริก",
    "diet_type": "คีโต"
  },
  {
    "id": "67",
    "title": "ปีกไก่ทอดน้ำปลา",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ปีกไก่ทอดน้ำปลา",
    "cookTime": 28,
    "difficulty": "easy",
    "calories": 409,
    "ingredients": [
      {
        "id": "67-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 171.2,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "67-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 72.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ปีกไก่ทอดน้ำปลา",
    "diet_type": "คีโต"
  },
  {
    "id": "68",
    "title": "ยำตะไคร้กุ้งสด",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ยำตะไคร้กุ้งสด",
    "cookTime": 40,
    "difficulty": "hard",
    "calories": 418,
    "ingredients": [
      {
        "id": "68-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 295.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "68-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 36.0,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ยำตะไคร้กุ้งสด",
    "diet_type": "คีโต"
  },
  {
    "id": "69",
    "title": "ยำเนื้อย่าง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ยำเนื้อย่าง",
    "cookTime": 39,
    "difficulty": "easy",
    "calories": 653,
    "ingredients": [
      {
        "id": "69-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 166.7,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "69-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 92.9,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ยำเนื้อย่าง",
    "diet_type": "คีโต"
  },
  {
    "id": "70",
    "title": "หมูแดดเดียว",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,หมูแดดเดียว",
    "cookTime": 17,
    "difficulty": "easy",
    "calories": 237,
    "ingredients": [
      {
        "id": "70-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 224.8,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "70-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 43.9,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=หมูแดดเดียว",
    "diet_type": "คีโต"
  },
  {
    "id": "71",
    "title": "หมูทอดกระเทียม",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,หมูทอดกระเทียม",
    "cookTime": 54,
    "difficulty": "medium",
    "calories": 393,
    "ingredients": [
      {
        "id": "71-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 144.2,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "71-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 98.9,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=หมูทอดกระเทียม",
    "diet_type": "คีโต"
  },
  {
    "id": "72",
    "title": "หมูสามชั้นทอดน้ำปลา",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,หมูสามชั้นทอดน้ำปลา",
    "cookTime": 59,
    "difficulty": "medium",
    "calories": 540,
    "ingredients": [
      {
        "id": "72-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 247.8,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "72-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 72.3,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=หมูสามชั้นทอดน้ำปลา",
    "diet_type": "คีโต"
  },
  {
    "id": "73",
    "title": "อกไก่ย่างน้ำจิ้มแจ่ว",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,อกไก่ย่างน้ำจิ้มแจ่ว",
    "cookTime": 53,
    "difficulty": "medium",
    "calories": 605,
    "ingredients": [
      {
        "id": "73-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 292.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "73-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 51.9,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=อกไก่ย่างน้ำจิ้มแจ่ว",
    "diet_type": "คีโต"
  },
  {
    "id": "74",
    "title": "กระดูกหมูตุ๋นเห็ดหอม",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,กระดูกหมูตุ๋นเห็ดหอม",
    "cookTime": 16,
    "difficulty": "easy",
    "calories": 492,
    "ingredients": [
      {
        "id": "74-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 145.0,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "74-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 85.0,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=กระดูกหมูตุ๋นเห็ดหอม",
    "diet_type": "โปรตีนสูง"
  },
  {
    "id": "75",
    "title": "กระเพาะปลาน้ำแดง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,กระเพาะปลาน้ำแดง",
    "cookTime": 16,
    "difficulty": "medium",
    "calories": 631,
    "ingredients": [
      {
        "id": "75-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 229.2,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "75-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 62.9,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=กระเพาะปลาน้ำแดง",
    "diet_type": "โปรตีนสูง"
  },
  {
    "id": "76",
    "title": "กุ้งผัดพริกเกลือ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,กุ้งผัดพริกเกลือ",
    "cookTime": 18,
    "difficulty": "easy",
    "calories": 280,
    "ingredients": [
      {
        "id": "76-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 161.7,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "76-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 46.1,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=กุ้งผัดพริกเกลือ",
    "diet_type": "โปรตีนสูง"
  },
  {
    "id": "77",
    "title": "กุ้งอบวุ้นเส้น",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,กุ้งอบวุ้นเส้น",
    "cookTime": 54,
    "difficulty": "hard",
    "calories": 500,
    "ingredients": [
      {
        "id": "77-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 260.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "77-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 80.2,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=กุ้งอบวุ้นเส้น",
    "diet_type": "โปรตีนสูง"
  },
  {
    "id": "78",
    "title": "แกงคั่วหอยขม",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,แกงคั่วหอยขม",
    "cookTime": 29,
    "difficulty": "easy",
    "calories": 478,
    "ingredients": [
      {
        "id": "78-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 115.1,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "78-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 41.9,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=แกงคั่วหอยขม",
    "diet_type": "โปรตีนสูง"
  },
  {
    "id": "79",
    "title": "ขนมจีนน้ำยา",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ขนมจีนน้ำยา",
    "cookTime": 15,
    "difficulty": "easy",
    "calories": 319,
    "ingredients": [
      {
        "id": "79-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 223.9,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "79-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 32.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ขนมจีนน้ำยา",
    "diet_type": "โปรตีนสูง"
  },
  {
    "id": "80",
    "title": "ข้าวขาหมู",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ข้าวขาหมู",
    "cookTime": 43,
    "difficulty": "easy",
    "calories": 317,
    "ingredients": [
      {
        "id": "80-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 239.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "80-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 74.6,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ข้าวขาหมู",
    "diet_type": "โปรตีนสูง"
  },
  {
    "id": "81",
    "title": "ข้าวผัดกะเพราเป็ด",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ข้าวผัดกะเพราเป็ด",
    "cookTime": 24,
    "difficulty": "hard",
    "calories": 575,
    "ingredients": [
      {
        "id": "81-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 186.5,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "81-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 10.7,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ข้าวผัดกะเพราเป็ด",
    "diet_type": "โปรตีนสูง"
  },
  {
    "id": "82",
    "title": "ข้าวผัดต้มยำทะเล",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ข้าวผัดต้มยำทะเล",
    "cookTime": 45,
    "difficulty": "medium",
    "calories": 234,
    "ingredients": [
      {
        "id": "82-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 295.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "82-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 23.2,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ข้าวผัดต้มยำทะเล",
    "diet_type": "โปรตีนสูง"
  },
  {
    "id": "83",
    "title": "ข้าวหน้าเป็ด",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ข้าวหน้าเป็ด",
    "cookTime": 17,
    "difficulty": "easy",
    "calories": 638,
    "ingredients": [
      {
        "id": "83-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 283.9,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "83-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 22.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ข้าวหน้าเป็ด",
    "diet_type": "โปรตีนสูง"
  },
  {
    "id": "84",
    "title": "คะน้าหมูกรอบ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,คะน้าหมูกรอบ",
    "cookTime": 36,
    "difficulty": "easy",
    "calories": 204,
    "ingredients": [
      {
        "id": "84-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 224.5,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "84-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 95.6,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=คะน้าหมูกรอบ",
    "diet_type": "โปรตีนสูง"
  },
  {
    "id": "85",
    "title": "ซี่โครงหมูอบน้ำผึ้ง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ซี่โครงหมูอบน้ำผึ้ง",
    "cookTime": 50,
    "difficulty": "medium",
    "calories": 419,
    "ingredients": [
      {
        "id": "85-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 53.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "85-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 48.9,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ซี่โครงหมูอบน้ำผึ้ง",
    "diet_type": "โปรตีนสูง"
  },
  {
    "id": "86",
    "title": "ดักแด้ทอด",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ดักแด้ทอด",
    "cookTime": 41,
    "difficulty": "hard",
    "calories": 281,
    "ingredients": [
      {
        "id": "86-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 176.7,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "86-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 68.7,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ดักแด้ทอด",
    "diet_type": "โปรตีนสูง"
  },
  {
    "id": "87",
    "title": "ตำถั่วหมูกรอบ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ตำถั่วหมูกรอบ",
    "cookTime": 35,
    "difficulty": "hard",
    "calories": 668,
    "ingredients": [
      {
        "id": "87-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 248.0,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "87-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 33.9,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ตำถั่วหมูกรอบ",
    "diet_type": "โปรตีนสูง"
  },
  {
    "id": "88",
    "title": "น้ำพริกอ่อง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,น้ำพริกอ่อง",
    "cookTime": 20,
    "difficulty": "medium",
    "calories": 675,
    "ingredients": [
      {
        "id": "88-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 268.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "88-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 99.6,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=น้ำพริกอ่อง",
    "diet_type": "โปรตีนสูง"
  },
  {
    "id": "89",
    "title": "ปลาช่อนลุยสวน",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ปลาช่อนลุยสวน",
    "cookTime": 30,
    "difficulty": "easy",
    "calories": 446,
    "ingredients": [
      {
        "id": "89-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 247.1,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "89-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 38.7,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ปลาช่อนลุยสวน",
    "diet_type": "โปรตีนสูง"
  },
  {
    "id": "90",
    "title": "ปลาดุกผัดเผ็ด",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ปลาดุกผัดเผ็ด",
    "cookTime": 44,
    "difficulty": "easy",
    "calories": 426,
    "ingredients": [
      {
        "id": "90-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 118.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "90-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 83.0,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ปลาดุกผัดเผ็ด",
    "diet_type": "โปรตีนสูง"
  },
  {
    "id": "91",
    "title": "ปูผัดผงกะหรี่",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ปูผัดผงกะหรี่",
    "cookTime": 33,
    "difficulty": "easy",
    "calories": 590,
    "ingredients": [
      {
        "id": "91-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 81.7,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "91-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 39.2,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ปูผัดผงกะหรี่",
    "diet_type": "โปรตีนสูง"
  },
  {
    "id": "92",
    "title": "ปูหลน",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ปูหลน",
    "cookTime": 35,
    "difficulty": "hard",
    "calories": 429,
    "ingredients": [
      {
        "id": "92-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 107.1,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "92-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 91.6,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ปูหลน",
    "diet_type": "โปรตีนสูง"
  },
  {
    "id": "93",
    "title": "พริกหยวกยัดไส้",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,พริกหยวกยัดไส้",
    "cookTime": 17,
    "difficulty": "medium",
    "calories": 459,
    "ingredients": [
      {
        "id": "93-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 278.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "93-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 91.3,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=พริกหยวกยัดไส้",
    "diet_type": "โปรตีนสูง"
  },
  {
    "id": "94",
    "title": "ลาบทอด",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ลาบทอด",
    "cookTime": 48,
    "difficulty": "medium",
    "calories": 369,
    "ingredients": [
      {
        "id": "94-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 53.2,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "94-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 30.1,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ลาบทอด",
    "diet_type": "โปรตีนสูง"
  },
  {
    "id": "95",
    "title": "ลาบปลาดุก",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ลาบปลาดุก",
    "cookTime": 52,
    "difficulty": "easy",
    "calories": 567,
    "ingredients": [
      {
        "id": "95-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 132.4,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "95-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 16.2,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ลาบปลาดุก",
    "diet_type": "โปรตีนสูง"
  },
  {
    "id": "96",
    "title": "ลาบเป็ด",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ลาบเป็ด",
    "cookTime": 29,
    "difficulty": "hard",
    "calories": 425,
    "ingredients": [
      {
        "id": "96-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 83.8,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "96-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 10.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ลาบเป็ด",
    "diet_type": "โปรตีนสูง"
  },
  {
    "id": "97",
    "title": "ลิ้นวัวตุ๋น",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ลิ้นวัวตุ๋น",
    "cookTime": 45,
    "difficulty": "hard",
    "calories": 620,
    "ingredients": [
      {
        "id": "97-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 227.4,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "97-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 89.9,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ลิ้นวัวตุ๋น",
    "diet_type": "โปรตีนสูง"
  },
  {
    "id": "98",
    "title": "หมูกระทะ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,หมูกระทะ",
    "cookTime": 25,
    "difficulty": "easy",
    "calories": 433,
    "ingredients": [
      {
        "id": "98-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 220.9,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "98-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 39.2,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=หมูกระทะ",
    "diet_type": "โปรตีนสูง"
  },
  {
    "id": "99",
    "title": "ก๋วยเตี๋ยวเรือ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ก๋วยเตี๋ยวเรือ",
    "cookTime": 26,
    "difficulty": "medium",
    "calories": 323,
    "ingredients": [
      {
        "id": "99-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 197.1,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "99-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 12.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ก๋วยเตี๋ยวเรือ",
    "diet_type": "ฟาสต์ฟู้ด"
  },
  {
    "id": "100",
    "title": "ข้าวไข่เจียวหมูสับ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ข้าวไข่เจียวหมูสับ",
    "cookTime": 28,
    "difficulty": "easy",
    "calories": 412,
    "ingredients": [
      {
        "id": "100-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 155.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "100-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 60.8,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ข้าวไข่เจียวหมูสับ",
    "diet_type": "ฟาสต์ฟู้ด"
  },
  {
    "id": "101",
    "title": "ข้าวคลุกกะปิ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ข้าวคลุกกะปิ",
    "cookTime": 55,
    "difficulty": "easy",
    "calories": 452,
    "ingredients": [
      {
        "id": "101-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 161.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "101-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 16.1,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ข้าวคลุกกะปิ",
    "diet_type": "ฟาสต์ฟู้ด"
  },
  {
    "id": "102",
    "title": "ข้าวผัดปู",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ข้าวผัดปู",
    "cookTime": 17,
    "difficulty": "medium",
    "calories": 252,
    "ingredients": [
      {
        "id": "102-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 283.7,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "102-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 10.8,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ข้าวผัดปู",
    "diet_type": "ฟาสต์ฟู้ด"
  },
  {
    "id": "103",
    "title": "ข้าวผัดหมู",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ข้าวผัดหมู",
    "cookTime": 53,
    "difficulty": "hard",
    "calories": 536,
    "ingredients": [
      {
        "id": "103-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 218.9,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "103-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 98.5,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ข้าวผัดหมู",
    "diet_type": "ฟาสต์ฟู้ด"
  },
  {
    "id": "104",
    "title": "ข้าวหมูกรอบ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ข้าวหมูกรอบ",
    "cookTime": 27,
    "difficulty": "easy",
    "calories": 355,
    "ingredients": [
      {
        "id": "104-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 110.1,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "104-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 16.3,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ข้าวหมูกรอบ",
    "diet_type": "ฟาสต์ฟู้ด"
  },
  {
    "id": "105",
    "title": "ข้าวหมูแดง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ข้าวหมูแดง",
    "cookTime": 57,
    "difficulty": "easy",
    "calories": 602,
    "ingredients": [
      {
        "id": "105-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 100.1,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "105-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 34.2,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ข้าวหมูแดง",
    "diet_type": "ฟาสต์ฟู้ด"
  },
  {
    "id": "106",
    "title": "ไข่เจียวหมูสับ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ไข่เจียวหมูสับ",
    "cookTime": 18,
    "difficulty": "medium",
    "calories": 346,
    "ingredients": [
      {
        "id": "106-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 144.9,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "106-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 12.6,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ไข่เจียวหมูสับ",
    "diet_type": "ฟาสต์ฟู้ด"
  },
  {
    "id": "107",
    "title": "ทอดไข่เค็ม",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ทอดไข่เค็ม",
    "cookTime": 32,
    "difficulty": "easy",
    "calories": 640,
    "ingredients": [
      {
        "id": "107-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 104.9,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "107-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 90.3,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ทอดไข่เค็ม",
    "diet_type": "ฟาสต์ฟู้ด"
  },
  {
    "id": "108",
    "title": "บะหมี่เกี๊ยวหมูแดง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,บะหมี่เกี๊ยวหมูแดง",
    "cookTime": 54,
    "difficulty": "hard",
    "calories": 508,
    "ingredients": [
      {
        "id": "108-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 240.8,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "108-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 37.8,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=บะหมี่เกี๊ยวหมูแดง",
    "diet_type": "ฟาสต์ฟู้ด"
  },
  {
    "id": "109",
    "title": "บะหมี่หมูกรอบ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,บะหมี่หมูกรอบ",
    "cookTime": 57,
    "difficulty": "medium",
    "calories": 264,
    "ingredients": [
      {
        "id": "109-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 116.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "109-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 82.0,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=บะหมี่หมูกรอบ",
    "diet_type": "ฟาสต์ฟู้ด"
  },
  {
    "id": "110",
    "title": "บะหมี่แห้งเป็ดย่าง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,บะหมี่แห้งเป็ดย่าง",
    "cookTime": 44,
    "difficulty": "medium",
    "calories": 505,
    "ingredients": [
      {
        "id": "110-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 227.8,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "110-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 29.8,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=บะหมี่แห้งเป็ดย่าง",
    "diet_type": "ฟาสต์ฟู้ด"
  },
  {
    "id": "111",
    "title": "ผัดซีอิ๊ว",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ผัดซีอิ๊ว",
    "cookTime": 16,
    "difficulty": "easy",
    "calories": 577,
    "ingredients": [
      {
        "id": "111-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 279.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "111-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 46.9,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ผัดซีอิ๊ว",
    "diet_type": "ฟาสต์ฟู้ด"
  },
  {
    "id": "112",
    "title": "ผัดไทย",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ผัดไทย",
    "cookTime": 23,
    "difficulty": "medium",
    "calories": 280,
    "ingredients": [
      {
        "id": "112-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 128.5,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "112-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 89.2,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ผัดไทย",
    "diet_type": "ฟาสต์ฟู้ด"
  },
  {
    "id": "113",
    "title": "ฟิชแอนด์ชิพส์",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ฟิชแอนด์ชิพส์",
    "cookTime": 60,
    "difficulty": "hard",
    "calories": 630,
    "ingredients": [
      {
        "id": "113-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 255.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "113-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 65.1,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ฟิชแอนด์ชิพส์",
    "diet_type": "ฟาสต์ฟู้ด"
  },
  {
    "id": "114",
    "title": "มาม่าผัดขี้เมา",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,มาม่าผัดขี้เมา",
    "cookTime": 50,
    "difficulty": "medium",
    "calories": 610,
    "ingredients": [
      {
        "id": "114-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 190.1,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "114-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 76.9,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=มาม่าผัดขี้เมา",
    "diet_type": "ฟาสต์ฟู้ด"
  },
  {
    "id": "115",
    "title": "ยำไข่ดาว",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ยำไข่ดาว",
    "cookTime": 26,
    "difficulty": "easy",
    "calories": 317,
    "ingredients": [
      {
        "id": "115-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 298.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "115-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 21.5,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ยำไข่ดาว",
    "diet_type": "ฟาสต์ฟู้ด"
  },
  {
    "id": "116",
    "title": "ราดหน้าเส้นกรอบ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ราดหน้าเส้นกรอบ",
    "cookTime": 37,
    "difficulty": "hard",
    "calories": 241,
    "ingredients": [
      {
        "id": "116-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 225.4,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "116-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 11.6,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ราดหน้าเส้นกรอบ",
    "diet_type": "ฟาสต์ฟู้ด"
  },
  {
    "id": "117",
    "title": "ลาบทอด",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ลาบทอด",
    "cookTime": 18,
    "difficulty": "easy",
    "calories": 577,
    "ingredients": [
      {
        "id": "117-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 74.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "117-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 13.5,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ลาบทอด",
    "diet_type": "ฟาสต์ฟู้ด"
  },
  {
    "id": "118",
    "title": "ลูกชิ้นปิ้งราดน้ำจิ้ม",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ลูกชิ้นปิ้งราดน้ำจิ้ม",
    "cookTime": 38,
    "difficulty": "medium",
    "calories": 497,
    "ingredients": [
      {
        "id": "118-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 95.8,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "118-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 19.9,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ลูกชิ้นปิ้งราดน้ำจิ้ม",
    "diet_type": "ฟาสต์ฟู้ด"
  },
  {
    "id": "119",
    "title": "วุ้นเส้นผัดขี้เมา",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,วุ้นเส้นผัดขี้เมา",
    "cookTime": 16,
    "difficulty": "easy",
    "calories": 274,
    "ingredients": [
      {
        "id": "119-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 77.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "119-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 69.5,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=วุ้นเส้นผัดขี้เมา",
    "diet_type": "ฟาสต์ฟู้ด"
  },
  {
    "id": "120",
    "title": "หมี่กรอบราดหน้า",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,หมี่กรอบราดหน้า",
    "cookTime": 58,
    "difficulty": "hard",
    "calories": 537,
    "ingredients": [
      {
        "id": "120-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 270.2,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "120-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 68.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=หมี่กรอบราดหน้า",
    "diet_type": "ฟาสต์ฟู้ด"
  },
  {
    "id": "121",
    "title": "หมี่ซั่วไก่",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,หมี่ซั่วไก่",
    "cookTime": 35,
    "difficulty": "easy",
    "calories": 246,
    "ingredients": [
      {
        "id": "121-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 87.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "121-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 47.7,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=หมี่ซั่วไก่",
    "diet_type": "ฟาสต์ฟู้ด"
  },
  {
    "id": "122",
    "title": "หมูยอทอด",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,หมูยอทอด",
    "cookTime": 55,
    "difficulty": "hard",
    "calories": 400,
    "ingredients": [
      {
        "id": "122-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 188.9,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "122-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 70.0,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=หมูยอทอด",
    "diet_type": "ฟาสต์ฟู้ด"
  },
  {
    "id": "123",
    "title": "ฮะเก๋าทอด",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ฮะเก๋าทอด",
    "cookTime": 56,
    "difficulty": "easy",
    "calories": 533,
    "ingredients": [
      {
        "id": "123-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 98.2,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "123-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 41.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ฮะเก๋าทอด",
    "diet_type": "ฟาสต์ฟู้ด"
  },
  {
    "id": "124",
    "title": "ข้าวต้มปลา",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ข้าวต้มปลา",
    "cookTime": 29,
    "difficulty": "medium",
    "calories": 376,
    "ingredients": [
      {
        "id": "124-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 286.8,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "124-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 88.1,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ข้าวต้มปลา",
    "diet_type": "อาหารเจ"
  },
  {
    "id": "125",
    "title": "ซุปเปอร์ขาไก่",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ซุปเปอร์ขาไก่",
    "cookTime": 44,
    "difficulty": "hard",
    "calories": 536,
    "ingredients": [
      {
        "id": "125-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 152.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "125-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 83.6,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ซุปเปอร์ขาไก่",
    "diet_type": "อาหารเจ"
  },
  {
    "id": "126",
    "title": "ซุปไก่ใส่เห็ดหอม",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ซุปไก่ใส่เห็ดหอม",
    "cookTime": 39,
    "difficulty": "easy",
    "calories": 504,
    "ingredients": [
      {
        "id": "126-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 178.8,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "126-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 96.2,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ซุปไก่ใส่เห็ดหอม",
    "diet_type": "อาหารเจ"
  },
  {
    "id": "127",
    "title": "ซี่โครงหมูตุ๋นมะระ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ซี่โครงหมูตุ๋นมะระ",
    "cookTime": 49,
    "difficulty": "easy",
    "calories": 404,
    "ingredients": [
      {
        "id": "127-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 254.2,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "127-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 27.0,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ซี่โครงหมูตุ๋นมะระ",
    "diet_type": "อาหารเจ"
  },
  {
    "id": "128",
    "title": "ต้มจืดวุ้นเส้น",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ต้มจืดวุ้นเส้น",
    "cookTime": 38,
    "difficulty": "hard",
    "calories": 342,
    "ingredients": [
      {
        "id": "128-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 126.1,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "128-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 94.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ต้มจืดวุ้นเส้น",
    "diet_type": "อาหารเจ"
  },
  {
    "id": "129",
    "title": "ต้มจืดเต้าหู้หมูสับ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ต้มจืดเต้าหู้หมูสับ",
    "cookTime": 60,
    "difficulty": "hard",
    "calories": 492,
    "ingredients": [
      {
        "id": "129-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 137.4,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "129-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 89.2,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ต้มจืดเต้าหู้หมูสับ",
    "diet_type": "อาหารเจ"
  },
  {
    "id": "130",
    "title": "ต้มส้มปลาทู",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ต้มส้มปลาทู",
    "cookTime": 21,
    "difficulty": "medium",
    "calories": 353,
    "ingredients": [
      {
        "id": "130-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 54.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "130-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 57.0,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ต้มส้มปลาทู",
    "diet_type": "อาหารเจ"
  },
  {
    "id": "131",
    "title": "ต้มโคล้งปลากรอบ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ต้มโคล้งปลากรอบ",
    "cookTime": 59,
    "difficulty": "medium",
    "calories": 331,
    "ingredients": [
      {
        "id": "131-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 143.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "131-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 62.3,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ต้มโคล้งปลากรอบ",
    "diet_type": "อาหารเจ"
  },
  {
    "id": "132",
    "title": "ถั่วลันเตาผัดหมูสับ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ถั่วลันเตาผัดหมูสับ",
    "cookTime": 41,
    "difficulty": "easy",
    "calories": 553,
    "ingredients": [
      {
        "id": "132-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 207.4,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "132-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 27.1,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ถั่วลันเตาผัดหมูสับ",
    "diet_type": "อาหารเจ"
  },
  {
    "id": "133",
    "title": "น้ำพริกปลาทู",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,น้ำพริกปลาทู",
    "cookTime": 19,
    "difficulty": "hard",
    "calories": 342,
    "ingredients": [
      {
        "id": "133-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 84.7,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "133-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 21.3,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=น้ำพริกปลาทู",
    "diet_type": "อาหารเจ"
  },
  {
    "id": "134",
    "title": "น้ำพริกตาแดง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,น้ำพริกตาแดง",
    "cookTime": 42,
    "difficulty": "hard",
    "calories": 400,
    "ingredients": [
      {
        "id": "134-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 282.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "134-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 69.1,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=น้ำพริกตาแดง",
    "diet_type": "อาหารเจ"
  },
  {
    "id": "135",
    "title": "ปลาทูต้มมะดัน",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ปลาทูต้มมะดัน",
    "cookTime": 44,
    "difficulty": "medium",
    "calories": 631,
    "ingredients": [
      {
        "id": "135-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 170.2,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "135-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 86.5,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ปลาทูต้มมะดัน",
    "diet_type": "อาหารเจ"
  },
  {
    "id": "136",
    "title": "วุ้นเส้นหมูสับน้ำซุป",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,วุ้นเส้นหมูสับน้ำซุป",
    "cookTime": 51,
    "difficulty": "easy",
    "calories": 222,
    "ingredients": [
      {
        "id": "136-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 112.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "136-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 57.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=วุ้นเส้นหมูสับน้ำซุป",
    "diet_type": "อาหารเจ"
  },
  {
    "id": "137",
    "title": "ส้มตำไข่เค็ม",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ส้มตำไข่เค็ม",
    "cookTime": 59,
    "difficulty": "medium",
    "calories": 279,
    "ingredients": [
      {
        "id": "137-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 251.0,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "137-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 72.5,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ส้มตำไข่เค็ม",
    "diet_type": "อาหารเจ"
  },
  {
    "id": "138",
    "title": "ผัดวุ้นเส้น",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ผัดวุ้นเส้น",
    "cookTime": 47,
    "difficulty": "medium",
    "calories": 447,
    "ingredients": [
      {
        "id": "138-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 290.7,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "138-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 31.8,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ผัดวุ้นเส้น",
    "diet_type": "อาหารเจ"
  },
  {
    "id": "139",
    "title": "บวบผัดกุ้ง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,บวบผัดกุ้ง",
    "cookTime": 46,
    "difficulty": "hard",
    "calories": 692,
    "ingredients": [
      {
        "id": "139-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 226.1,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "139-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 72.9,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=บวบผัดกุ้ง",
    "diet_type": "อาหารเจ"
  },
  {
    "id": "140",
    "title": "ผัดเปรี้ยวหวาน",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ผัดเปรี้ยวหวาน",
    "cookTime": 53,
    "difficulty": "medium",
    "calories": 616,
    "ingredients": [
      {
        "id": "140-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 163.7,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "140-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 97.8,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ผัดเปรี้ยวหวาน",
    "diet_type": "อาหารเจ"
  },
  {
    "id": "141",
    "title": "ฟองเต้าหู้ผัดน้ำมันหอย",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ฟองเต้าหู้ผัดน้ำมันหอย",
    "cookTime": 52,
    "difficulty": "hard",
    "calories": 553,
    "ingredients": [
      {
        "id": "141-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 182.4,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "141-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 69.5,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ฟองเต้าหู้ผัดน้ำมันหอย",
    "diet_type": "อาหารเจ"
  },
  {
    "id": "142",
    "title": "ชะแลงผัดน้ำมันหอย",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ชะแลงผัดน้ำมันหอย",
    "cookTime": 50,
    "difficulty": "easy",
    "calories": 686,
    "ingredients": [
      {
        "id": "142-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 232.7,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "142-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 45.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ชะแลงผัดน้ำมันหอย",
    "diet_type": "อาหารเจ"
  },
  {
    "id": "143",
    "title": "หอยลายผัดน้ำพริกเผา",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,หอยลายผัดน้ำพริกเผา",
    "cookTime": 55,
    "difficulty": "easy",
    "calories": 353,
    "ingredients": [
      {
        "id": "143-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 182.1,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "143-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 78.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=หอยลายผัดน้ำพริกเผา",
    "diet_type": "อาหารเจ"
  },
  {
    "id": "144",
    "title": "หอยนางรมทรงเครื่อง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,หอยนางรมทรงเครื่อง",
    "cookTime": 27,
    "difficulty": "medium",
    "calories": 407,
    "ingredients": [
      {
        "id": "144-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 107.7,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "144-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 79.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=หอยนางรมทรงเครื่อง",
    "diet_type": "อาหารเจ"
  },
  {
    "id": "145",
    "title": "หัวปลาต้มเผือก",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,หัวปลาต้มเผือก",
    "cookTime": 28,
    "difficulty": "hard",
    "calories": 315,
    "ingredients": [
      {
        "id": "145-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 130.2,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "145-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 27.8,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=หัวปลาต้มเผือก",
    "diet_type": "อาหารเจ"
  },
  {
    "id": "146",
    "title": "หน่อไม้ดองต้มกะทิ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,หน่อไม้ดองต้มกะทิ",
    "cookTime": 38,
    "difficulty": "easy",
    "calories": 218,
    "ingredients": [
      {
        "id": "146-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 206.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "146-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 47.9,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=หน่อไม้ดองต้มกะทิ",
    "diet_type": "อาหารเจ"
  },
  {
    "id": "147",
    "title": "ถั่วฝักยาวผัดพริกแกงหมู",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ถั่วฝักยาวผัดพริกแกงหมู",
    "cookTime": 47,
    "difficulty": "medium",
    "calories": 203,
    "ingredients": [
      {
        "id": "147-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 238.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "147-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 50.1,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ถั่วฝักยาวผัดพริกแกงหมู",
    "diet_type": "อาหารเจ"
  },
  {
    "id": "148",
    "title": "ดุกฟูผัดพริกขิง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ดุกฟูผัดพริกขิง",
    "cookTime": 32,
    "difficulty": "hard",
    "calories": 548,
    "ingredients": [
      {
        "id": "148-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 293.5,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "148-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 66.8,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ดุกฟูผัดพริกขิง",
    "diet_type": "อาหารเจ"
  },
  {
    "id": "149",
    "title": "ข้าวต้มปลา",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ข้าวต้มปลา",
    "cookTime": 42,
    "difficulty": "easy",
    "calories": 601,
    "ingredients": [
      {
        "id": "149-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 227.8,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "149-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 43.5,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ข้าวต้มปลา",
    "diet_type": "อาหารคลีน"
  },
  {
    "id": "150",
    "title": "ชะแลงผัดน้ำมันหอย",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ชะแลงผัดน้ำมันหอย",
    "cookTime": 46,
    "difficulty": "medium",
    "calories": 337,
    "ingredients": [
      {
        "id": "150-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 227.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "150-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 59.3,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ชะแลงผัดน้ำมันหอย",
    "diet_type": "อาหารคลีน"
  },
  {
    "id": "151",
    "title": "ซี่โครงหมูตุ๋นมะระ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ซี่โครงหมูตุ๋นมะระ",
    "cookTime": 59,
    "difficulty": "easy",
    "calories": 353,
    "ingredients": [
      {
        "id": "151-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 189.2,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "151-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 69.6,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ซี่โครงหมูตุ๋นมะระ",
    "diet_type": "อาหารคลีน"
  },
  {
    "id": "152",
    "title": "ซุปไก่ใส่เห็ดหอม",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ซุปไก่ใส่เห็ดหอม",
    "cookTime": 48,
    "difficulty": "easy",
    "calories": 515,
    "ingredients": [
      {
        "id": "152-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 223.4,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "152-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 75.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ซุปไก่ใส่เห็ดหอม",
    "diet_type": "อาหารคลีน"
  },
  {
    "id": "153",
    "title": "ซุปเปอร์ขาไก่",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ซุปเปอร์ขาไก่",
    "cookTime": 48,
    "difficulty": "hard",
    "calories": 335,
    "ingredients": [
      {
        "id": "153-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 233.8,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "153-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 52.3,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ซุปเปอร์ขาไก่",
    "diet_type": "อาหารคลีน"
  },
  {
    "id": "154",
    "title": "ดุกฟูผัดพริกขิง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ดุกฟูผัดพริกขิง",
    "cookTime": 52,
    "difficulty": "easy",
    "calories": 269,
    "ingredients": [
      {
        "id": "154-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 253.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "154-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 62.3,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ดุกฟูผัดพริกขิง",
    "diet_type": "อาหารคลีน"
  },
  {
    "id": "155",
    "title": "ต้มโคล้งปลากรอบ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ต้มโคล้งปลากรอบ",
    "cookTime": 38,
    "difficulty": "hard",
    "calories": 378,
    "ingredients": [
      {
        "id": "155-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 78.1,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "155-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 24.0,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ต้มโคล้งปลากรอบ",
    "diet_type": "อาหารคลีน"
  },
  {
    "id": "156",
    "title": "ต้มจืดเต้าหู้หมูสับ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ต้มจืดเต้าหู้หมูสับ",
    "cookTime": 19,
    "difficulty": "hard",
    "calories": 231,
    "ingredients": [
      {
        "id": "156-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 82.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "156-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 19.8,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ต้มจืดเต้าหู้หมูสับ",
    "diet_type": "อาหารคลีน"
  },
  {
    "id": "157",
    "title": "ต้มจืดวุ้นเส้น",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ต้มจืดวุ้นเส้น",
    "cookTime": 58,
    "difficulty": "easy",
    "calories": 371,
    "ingredients": [
      {
        "id": "157-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 231.2,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "157-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 98.5,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ต้มจืดวุ้นเส้น",
    "diet_type": "อาหารคลีน"
  },
  {
    "id": "158",
    "title": "ต้มส้มปลาทู",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ต้มส้มปลาทู",
    "cookTime": 53,
    "difficulty": "hard",
    "calories": 377,
    "ingredients": [
      {
        "id": "158-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 266.9,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "158-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 34.9,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ต้มส้มปลาทู",
    "diet_type": "อาหารคลีน"
  },
  {
    "id": "159",
    "title": "ถั่วฝักยาวผัดพริกแกงหมู",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ถั่วฝักยาวผัดพริกแกงหมู",
    "cookTime": 20,
    "difficulty": "hard",
    "calories": 634,
    "ingredients": [
      {
        "id": "159-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 253.5,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "159-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 69.6,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ถั่วฝักยาวผัดพริกแกงหมู",
    "diet_type": "อาหารคลีน"
  },
  {
    "id": "160",
    "title": "ถั่วลันเตาผัดหมูสับ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ถั่วลันเตาผัดหมูสับ",
    "cookTime": 17,
    "difficulty": "hard",
    "calories": 435,
    "ingredients": [
      {
        "id": "160-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 268.4,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "160-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 93.1,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ถั่วลันเตาผัดหมูสับ",
    "diet_type": "อาหารคลีน"
  },
  {
    "id": "161",
    "title": "น้ำพริกตาแดง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,น้ำพริกตาแดง",
    "cookTime": 41,
    "difficulty": "easy",
    "calories": 313,
    "ingredients": [
      {
        "id": "161-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 127.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "161-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 65.9,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=น้ำพริกตาแดง",
    "diet_type": "อาหารคลีน"
  },
  {
    "id": "162",
    "title": "น้ำพริกปลาทู",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,น้ำพริกปลาทู",
    "cookTime": 56,
    "difficulty": "easy",
    "calories": 655,
    "ingredients": [
      {
        "id": "162-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 114.1,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "162-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 97.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=น้ำพริกปลาทู",
    "diet_type": "อาหารคลีน"
  },
  {
    "id": "163",
    "title": "บวบผัดกุ้ง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,บวบผัดกุ้ง",
    "cookTime": 56,
    "difficulty": "medium",
    "calories": 305,
    "ingredients": [
      {
        "id": "163-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 93.9,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "163-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 95.7,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=บวบผัดกุ้ง",
    "diet_type": "อาหารคลีน"
  },
  {
    "id": "164",
    "title": "ปลาทูต้มมะดัน",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ปลาทูต้มมะดัน",
    "cookTime": 40,
    "difficulty": "easy",
    "calories": 475,
    "ingredients": [
      {
        "id": "164-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 147.5,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "164-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 80.7,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ปลาทูต้มมะดัน",
    "diet_type": "อาหารคลีน"
  },
  {
    "id": "165",
    "title": "ผัดเปรี้ยวหวาน",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ผัดเปรี้ยวหวาน",
    "cookTime": 24,
    "difficulty": "hard",
    "calories": 646,
    "ingredients": [
      {
        "id": "165-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 81.1,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "165-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 98.3,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ผัดเปรี้ยวหวาน",
    "diet_type": "อาหารคลีน"
  },
  {
    "id": "166",
    "title": "ผัดวุ้นเส้น",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ผัดวุ้นเส้น",
    "cookTime": 25,
    "difficulty": "easy",
    "calories": 209,
    "ingredients": [
      {
        "id": "166-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 235.8,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "166-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 21.8,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ผัดวุ้นเส้น",
    "diet_type": "อาหารคลีน"
  },
  {
    "id": "167",
    "title": "ฟองเต้าหู้ผัดน้ำมันหอย",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ฟองเต้าหู้ผัดน้ำมันหอย",
    "cookTime": 16,
    "difficulty": "easy",
    "calories": 570,
    "ingredients": [
      {
        "id": "167-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 133.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "167-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 48.9,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ฟองเต้าหู้ผัดน้ำมันหอย",
    "diet_type": "อาหารคลีน"
  },
  {
    "id": "168",
    "title": "วุ้นเส้นหมูสับน้ำซุป",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,วุ้นเส้นหมูสับน้ำซุป",
    "cookTime": 38,
    "difficulty": "medium",
    "calories": 286,
    "ingredients": [
      {
        "id": "168-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 285.7,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "168-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 42.8,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=วุ้นเส้นหมูสับน้ำซุป",
    "diet_type": "อาหารคลีน"
  },
  {
    "id": "169",
    "title": "ส้มตำไข่เค็ม",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ส้มตำไข่เค็ม",
    "cookTime": 41,
    "difficulty": "easy",
    "calories": 672,
    "ingredients": [
      {
        "id": "169-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 201.9,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "169-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 57.0,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ส้มตำไข่เค็ม",
    "diet_type": "อาหารคลีน"
  },
  {
    "id": "170",
    "title": "หน่อไม้ดองต้มกะทิ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,หน่อไม้ดองต้มกะทิ",
    "cookTime": 31,
    "difficulty": "easy",
    "calories": 469,
    "ingredients": [
      {
        "id": "170-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 206.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "170-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 26.6,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=หน่อไม้ดองต้มกะทิ",
    "diet_type": "อาหารคลีน"
  },
  {
    "id": "171",
    "title": "หอยนางรมทรงเครื่อง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,หอยนางรมทรงเครื่อง",
    "cookTime": 39,
    "difficulty": "medium",
    "calories": 354,
    "ingredients": [
      {
        "id": "171-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 217.8,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "171-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 55.2,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=หอยนางรมทรงเครื่อง",
    "diet_type": "อาหารคลีน"
  },
  {
    "id": "172",
    "title": "หอยลายผัดน้ำพริกเผา",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,หอยลายผัดน้ำพริกเผา",
    "cookTime": 32,
    "difficulty": "hard",
    "calories": 234,
    "ingredients": [
      {
        "id": "172-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 178.1,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "172-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 57.0,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=หอยลายผัดน้ำพริกเผา",
    "diet_type": "อาหารคลีน"
  },
  {
    "id": "173",
    "title": "หัวปลาต้มเผือก",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,หัวปลาต้มเผือก",
    "cookTime": 37,
    "difficulty": "medium",
    "calories": 424,
    "ingredients": [
      {
        "id": "173-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 183.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "173-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 61.6,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=หัวปลาต้มเผือก",
    "diet_type": "อาหารคลีน"
  },
  {
    "id": "174",
    "title": "กล้วยดิบผัดพริกแกงหมู",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,กล้วยดิบผัดพริกแกงหมู",
    "cookTime": 55,
    "difficulty": "easy",
    "calories": 644,
    "ingredients": [
      {
        "id": "174-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 120.4,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "174-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 89.1,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=กล้วยดิบผัดพริกแกงหมู",
    "diet_type": "สุขภาพ"
  },
  {
    "id": "175",
    "title": "แกงป่าหมู",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,แกงป่าหมู",
    "cookTime": 41,
    "difficulty": "hard",
    "calories": 525,
    "ingredients": [
      {
        "id": "175-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 226.1,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "175-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 31.8,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=แกงป่าหมู",
    "diet_type": "สุขภาพ"
  },
  {
    "id": "176",
    "title": "แกงพะแนงหมู",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,แกงพะแนงหมู",
    "cookTime": 60,
    "difficulty": "medium",
    "calories": 594,
    "ingredients": [
      {
        "id": "176-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 269.1,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "176-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 95.7,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=แกงพะแนงหมู",
    "diet_type": "สุขภาพ"
  },
  {
    "id": "177",
    "title": "ข้าวต้มหมู",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ข้าวต้มหมู",
    "cookTime": 48,
    "difficulty": "easy",
    "calories": 611,
    "ingredients": [
      {
        "id": "177-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 255.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "177-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 57.2,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ข้าวต้มหมู",
    "diet_type": "สุขภาพ"
  },
  {
    "id": "178",
    "title": "คะน้าหมูกรอบ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,คะน้าหมูกรอบ",
    "cookTime": 36,
    "difficulty": "medium",
    "calories": 621,
    "ingredients": [
      {
        "id": "178-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 94.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "178-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 79.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=คะน้าหมูกรอบ",
    "diet_type": "สุขภาพ"
  },
  {
    "id": "179",
    "title": "คั่วกลิ้งหมู",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,คั่วกลิ้งหมู",
    "cookTime": 60,
    "difficulty": "medium",
    "calories": 274,
    "ingredients": [
      {
        "id": "179-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 133.4,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "179-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 73.1,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=คั่วกลิ้งหมู",
    "diet_type": "สุขภาพ"
  },
  {
    "id": "180",
    "title": "คั่วแห้งไก่ใส่ใบมะกรูด",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,คั่วแห้งไก่ใส่ใบมะกรูด",
    "cookTime": 27,
    "difficulty": "hard",
    "calories": 254,
    "ingredients": [
      {
        "id": "180-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 151.8,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "180-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 45.0,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=คั่วแห้งไก่ใส่ใบมะกรูด",
    "diet_type": "สุขภาพ"
  },
  {
    "id": "181",
    "title": "งบทะเล",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,งบทะเล",
    "cookTime": 27,
    "difficulty": "medium",
    "calories": 527,
    "ingredients": [
      {
        "id": "181-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 176.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "181-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 57.5,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=งบทะเล",
    "diet_type": "สุขภาพ"
  },
  {
    "id": "182",
    "title": "งบปลา",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,งบปลา",
    "cookTime": 27,
    "difficulty": "easy",
    "calories": 400,
    "ingredients": [
      {
        "id": "182-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 292.9,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "182-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 58.5,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=งบปลา",
    "diet_type": "สุขภาพ"
  },
  {
    "id": "183",
    "title": "งบหอยแครง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,งบหอยแครง",
    "cookTime": 41,
    "difficulty": "medium",
    "calories": 269,
    "ingredients": [
      {
        "id": "183-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 119.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "183-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 91.0,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=งบหอยแครง",
    "diet_type": "สุขภาพ"
  },
  {
    "id": "184",
    "title": "จ๋อยจ๋ายไก่",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,จ๋อยจ๋ายไก่",
    "cookTime": 31,
    "difficulty": "hard",
    "calories": 624,
    "ingredients": [
      {
        "id": "184-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 208.4,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "184-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 49.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=จ๋อยจ๋ายไก่",
    "diet_type": "สุขภาพ"
  },
  {
    "id": "185",
    "title": "จิ้มจุ่ม",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,จิ้มจุ่ม",
    "cookTime": 56,
    "difficulty": "easy",
    "calories": 631,
    "ingredients": [
      {
        "id": "185-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 61.5,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "185-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 95.6,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=จิ้มจุ่ม",
    "diet_type": "สุขภาพ"
  },
  {
    "id": "186",
    "title": "ตับหวาน",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ตับหวาน",
    "cookTime": 40,
    "difficulty": "hard",
    "calories": 331,
    "ingredients": [
      {
        "id": "186-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 192.8,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "186-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 83.0,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ตับหวาน",
    "diet_type": "สุขภาพ"
  },
  {
    "id": "187",
    "title": "ผัดคะน้าหมูกรอบ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ผัดคะน้าหมูกรอบ",
    "cookTime": 34,
    "difficulty": "easy",
    "calories": 700,
    "ingredients": [
      {
        "id": "187-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 231.5,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "187-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 12.5,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ผัดคะน้าหมูกรอบ",
    "diet_type": "สุขภาพ"
  },
  {
    "id": "188",
    "title": "ผัดพริกแกงหมู",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ผัดพริกแกงหมู",
    "cookTime": 41,
    "difficulty": "easy",
    "calories": 233,
    "ingredients": [
      {
        "id": "188-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 245.6,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "188-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 84.6,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ผัดพริกแกงหมู",
    "diet_type": "สุขภาพ"
  },
  {
    "id": "189",
    "title": "พะแนงไก่",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,พะแนงไก่",
    "cookTime": 31,
    "difficulty": "hard",
    "calories": 245,
    "ingredients": [
      {
        "id": "189-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 152.5,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "189-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 67.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=พะแนงไก่",
    "diet_type": "สุขภาพ"
  },
  {
    "id": "190",
    "title": "พะแนงหมู",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,พะแนงหมู",
    "cookTime": 37,
    "difficulty": "easy",
    "calories": 263,
    "ingredients": [
      {
        "id": "190-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 191.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "190-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 97.1,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=พะแนงหมู",
    "diet_type": "สุขภาพ"
  },
  {
    "id": "191",
    "title": "ราดข้าวกะเพราเนื้อ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ราดข้าวกะเพราเนื้อ",
    "cookTime": 51,
    "difficulty": "hard",
    "calories": 632,
    "ingredients": [
      {
        "id": "191-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 130.1,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "191-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 29.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ราดข้าวกะเพราเนื้อ",
    "diet_type": "สุขภาพ"
  },
  {
    "id": "192",
    "title": "ราดข้าวปลากะพง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ราดข้าวปลากะพง",
    "cookTime": 50,
    "difficulty": "medium",
    "calories": 445,
    "ingredients": [
      {
        "id": "192-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 100.3,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "192-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 92.9,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ราดข้าวปลากะพง",
    "diet_type": "สุขภาพ"
  },
  {
    "id": "193",
    "title": "ราดหน้าทะเล",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ราดหน้าทะเล",
    "cookTime": 43,
    "difficulty": "easy",
    "calories": 362,
    "ingredients": [
      {
        "id": "193-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 54.0,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "193-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 71.5,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ราดหน้าทะเล",
    "diet_type": "สุขภาพ"
  },
  {
    "id": "194",
    "title": "ราดหน้าหมูหมัก",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,ราดหน้าหมูหมัก",
    "cookTime": 15,
    "difficulty": "easy",
    "calories": 549,
    "ingredients": [
      {
        "id": "194-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 213.4,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "194-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 78.6,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=ราดหน้าหมูหมัก",
    "diet_type": "สุขภาพ"
  },
  {
    "id": "195",
    "title": "หมูกรอบราดข้าว",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,หมูกรอบราดข้าว",
    "cookTime": 44,
    "difficulty": "medium",
    "calories": 377,
    "ingredients": [
      {
        "id": "195-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 177.2,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "195-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 31.0,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=หมูกรอบราดข้าว",
    "diet_type": "สุขภาพ"
  },
  {
    "id": "196",
    "title": "หมูตุ๋นยาจีน",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,หมูตุ๋นยาจีน",
    "cookTime": 43,
    "difficulty": "medium",
    "calories": 357,
    "ingredients": [
      {
        "id": "196-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 297.7,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "196-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 30.1,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=หมูตุ๋นยาจีน",
    "diet_type": "สุขภาพ"
  },
  {
    "id": "197",
    "title": "หมูผัดกะปิ",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,หมูผัดกะปิ",
    "cookTime": 33,
    "difficulty": "hard",
    "calories": 303,
    "ingredients": [
      {
        "id": "197-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 266.4,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "197-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 38.8,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=หมูผัดกะปิ",
    "diet_type": "สุขภาพ"
  },
  {
    "id": "198",
    "title": "หมูผัดขิง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,หมูผัดขิง",
    "cookTime": 17,
    "difficulty": "easy",
    "calories": 347,
    "ingredients": [
      {
        "id": "198-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 161.1,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "198-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 72.7,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=หมูผัดขิง",
    "diet_type": "สุขภาพ"
  },
  {
    "id": "199",
    "title": "หมูย่างเมืองตรัง",
    "imageUrl": "https://source.unsplash.com/featured/?thai,food,หมูย่างเมืองตรัง",
    "cookTime": 32,
    "difficulty": "easy",
    "calories": 416,
    "ingredients": [
      {
        "id": "199-1",
        "name": "วัตถุดิบหลัก",
        "nutrition": "โปรตีน",
        "caloriesPerUnit": 66.8,
        "unit": "กรัม",
        "quantity": 100
      },
      {
        "id": "199-2",
        "name": "เครื่องปรุงรวม",
        "nutrition": "รวม",
        "caloriesPerUnit": 75.4,
        "unit": "ช้อนโต๊ะ",
        "quantity": 2
      }
    ],
    "steps": [
      "เตรียมวัตถุดิบให้พร้อม",
      "ปรุงรสและเคี่ยวตามสูตร",
      "จัดจานเสิร์ฟ"
    ],
    "videoUrl": "https://www.youtube.com/results?search_query=หมูย่างเมืองตรัง",
    "diet_type": "สุขภาพ"
  }
];




export const useRecipeStore = create<RecipeState>((set, get) => ({
  recipes: mockRecipes,
  favoriteRecipes: [],
  searchResults: [],
  popularRecipes: mockRecipes.slice(0, 5),

  searchRecipes: (query, filters) => {
  const { recipes } = get();

  const results = recipes.filter(recipe => {
    const matchesQuery =
      !query ||
      recipe.title.toLowerCase().includes(query.toLowerCase()) ||
      recipe.ingredients.some(i =>
        i.name.toLowerCase().includes(query.toLowerCase())
      );

    // ✅ อัปเดตการกรองให้รองรับทั้ง diet_type และ ingredients
    const matchesFilters =
      !filters || filters.length === 0 ||
      filters.some(f =>
        (recipe.diet_type && recipe.diet_type.toLowerCase().includes(f.toLowerCase())) || // diet type match
        recipe.ingredients.some(i =>
          i.name.toLowerCase().includes(f.toLowerCase().trim())
        )
      );

    return matchesQuery && matchesFilters;
  });

  set({ searchResults: results });
}


,

  toggleFavorite: (recipeId) => {
    set(state => {
      const isFavorited = state.favoriteRecipes.includes(recipeId);
      let newFavorites: string[];

      if (isFavorited) {
        newFavorites = state.favoriteRecipes.filter(id => id !== recipeId);
      } else {
        newFavorites = [...state.favoriteRecipes, recipeId];
      }

      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavorites));
      return { favoriteRecipes: newFavorites };
    });
  },

  getRandomRecipe: () => {
    const { recipes } = get();
    if (recipes.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * recipes.length);
    return recipes[randomIndex];
  },

  getRecipeById: (id) => {
    const { recipes } = get();
    return recipes.find(recipe => recipe.id === id) || null;
  }
}));
