// src/hooks/useMenu.js
import { useState, useEffect } from 'react';

const mockMenuData = {
  restaurantName: "Sabores del Mundo",
  categories: [
    {
      id: 1,
      name: "Especialidades",
      items: [
        {
          id: 1,
          name: "Pasta Trufada",
          description: "Pasta fresca con salsa de trufa negra y champiñones silvestres",
          price: 28500,
          image: null,
          badges: ["recomendado", "vegetariano"],
          rating: 4.8
        },
        {
          id: 2,
          name: "Salmón Glaseado",
          description: "Salmón con glaseado de miel y soja, acompañado de vegetales",
          price: 32500,
          image: null,
          badges: ["recomendado"],
          rating: 4.6
        },
        {
          id: 3,
          name: "Risotto Verde",
          description: "Risotto cremoso con espinacas, pesto y piñones tostados",
          price: 24500,
          image: null,
          badges: ["vegano", "sin-gluten"],
          rating: 4.4
        },
        {
          id: 4,
          name: "Pollo Tandoori",
          description: "Pollo marinado en especias con arroz basmati y naan",
          price: 26500,
          image: null,
          badges: ["picante"],
          rating: 4.7
        }
      ]
    },
    {
      id: 2,
      name: "Ensaladas",
      items: [
        {
          id: 5,
          name: "Ensalada César",
          description: "Lechuga romana, crutones, parmesano y aderezo césar clásico",
          price: 18500,
          image: null,
          badges: ["vegetariano"],
          rating: 4.3
        },
        {
          id: 6,
          name: "Quinoa Power",
          description: "Quinoa con aguacate, tomate cherry y aderezo de limón",
          price: 19500,
          image: null,
          badges: ["vegano", "sin-gluten"],
          rating: 4.5
        }
      ]
    }
  ]
};

export const useMenu = () => {
  const [menuData, setMenuData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMenuData = () => {
      setLoading(true);
      setTimeout(() => {
        setMenuData(mockMenuData);
        setLoading(false);
      }, 1500);
    };

    loadMenuData();
  }, []);

  return {
    menuData,
    loading,
    refetch: () => {
      setLoading(true);
      setTimeout(() => {
        setMenuData(mockMenuData);
        setLoading(false);
      }, 1000);
    }
  };
};