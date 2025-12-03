// src/pages/MenuPage.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, ChevronLeft, ChevronRight, ChevronDown, ChefHat } from 'lucide-react';

// Import Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MenuPage = ({ menuData }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = menuData?.categories || [];
  const allItems = categories.flatMap(category => category.items);

  const filteredItems = selectedCategory === 'all' 
    ? allItems 
    : allItems.filter(item => 
        item.badges?.includes(selectedCategory)
      );

  const categoryFilters = [
    { id: 'all', name: 'Todos', count: allItems.length },
    { id: 'recomendado', name: 'Recomendados', count: allItems.filter(item => item.badges?.includes('recomendado')).length },
    { id: 'vegano', name: 'Vegano', count: allItems.filter(item => item.badges?.includes('vegano')).length },
    { id: 'vegetariano', name: 'Vegetariano', count: allItems.filter(item => item.badges?.includes('vegetariano')).length },
  ];

  const handleItemClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Imágenes de ejemplo para el carrusel
  const getItemImages = (item) => {
    return [
      `https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=600&fit=crop&crop=center`,
      `https://images.unsplash.com/photo-1484980972926-edee96e0960d?w=800&h=600&fit=crop&crop=center`,
      `https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop&crop=center`,
    ];
  };

  // Ingredientes de ejemplo
  const getItemIngredients = (item) => {
    const ingredientsMap = {
      1: [
        "Pasta fresca artesanal",
        "Salsa de trufa negra",
        "Champiñones silvestres",
        "Queso parmesano",
        "Aceite de oliva extra virgen",
        "Hierbas frescas"
      ],
      2: [
        "Salmón fresco del Atlántico",
        "Glaseado de miel y soja",
        "Jengibre fresco",
        "Ajo",
        "Pimienta rosa",
        "Cebollín"
      ],
      3: [
        "Arroz arbóreo",
        "Espinacas frescas",
        "Pesto de albahaca",
        "Piñones tostados",
        "Caldo de verduras",
        "Queso parmesano"
      ],
      4: [
        "Pollo marinado 24h",
        "Mezcla de especias tandoori",
        "Yogur natural",
        "Jengibre",
        "Ajo",
        "Limón"
      ],
      5: [
        "Lechuga romana fresca",
        "Crutones artesanales",
        "Queso parmesano",
        "Salsa césar casera",
        "Anchoas",
        "Pimienta negra"
      ],
      6: [
        "Quinoa orgánica",
        "Aguacate hass",
        "Tomate cherry",
        "Pepino",
        "Limón fresco",
        "Aceite de oliva"
      ]
    };
    return ingredientsMap[item.id] || [
      "Ingredientes frescos",
      "Especias seleccionadas",
      "Productos de temporada"
    ];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-rose-50 pb-20">
      {/* Header Moderno */}
      <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-orange-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{menuData?.restaurantName}</h1>
              <p className="text-sm text-gray-600">Menú digital</p>
            </div>
            <button className="p-2 bg-orange-500 text-white rounded-full shadow-lg hover:bg-orange-600 transition-colors">
              <Search size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Filtros Sticky */}
      <div className="bg-white/90 backdrop-blur-sm sticky top-16 z-40 border-b border-orange-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex space-x-2 overflow-x-auto scrollbar-hide flex-1">
              {categoryFilters.map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedCategory(filter.id)}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedCategory === filter.id
                      ? 'bg-orange-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {filter.name}
                  <span className="ml-1 text-xs opacity-80">({filter.count})</span>
                </button>
              ))}
            </div>
            
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="ml-2 p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Grid de Platos */}
      <div className="container mx-auto px-4 py-6">
        <motion.div 
          className="grid grid-cols-2 gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          <AnimatePresence>
            {filteredItems.map((item) => (
              <MenuItemCard 
                key={item.id} 
                item={item} 
                onClick={() => handleItemClick(item)}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">🍽️</div>
            <p className="text-gray-500">No hay platos en esta categoría</p>
          </div>
        )}
      </div>

      {/* Modal Minimalista con Carrusel */}
      <ItemModal 
        isOpen={isModalOpen}
        item={selectedItem}
        onClose={closeModal}
        getItemImages={getItemImages}
        getItemIngredients={getItemIngredients}
      />
    </div>
  );
};

// Componente de Card Individual (se mantiene igual)
const MenuItemCard = ({ item, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(price);
  };

  const getBadgeColor = (badge) => {
    const colors = {
      'recomendado': 'bg-gradient-to-r from-orange-500 to-red-500',
      'vegano': 'bg-gradient-to-r from-green-500 to-emerald-500',
      'vegetariano': 'bg-gradient-to-r from-emerald-400 to-green-400',
      'sin-gluten': 'bg-gradient-to-r from-blue-400 to-cyan-400',
      'picante': 'bg-gradient-to-r from-red-500 to-pink-500'
    };
    return colors[badge] || 'bg-gray-500';
  };

  const mainBadge = item.badges?.[0];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer border border-gray-100"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      <div className="relative h-32 bg-gradient-to-br from-orange-100 to-red-100 overflow-hidden">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-4xl">🍽️</span>
          </div>
        )}
        
        {mainBadge && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-semibold text-white ${getBadgeColor(mainBadge)}`}
          >
            {mainBadge}
          </motion.div>
        )}
        
        <motion.div 
          animate={{ 
            scale: isHovered ? 1.1 : 1,
            backgroundColor: isHovered ? 'rgba(249, 115, 22, 0.95)' : 'rgba(249, 115, 22, 0.9)'
          }}
          className="absolute bottom-2 right-2 px-2 py-1 rounded-lg text-white font-bold text-sm backdrop-blur-sm"
        >
          {formatPrice(item.price)}
        </motion.div>
      </div>

      <div className="p-3">
        <h3 className="font-bold text-gray-900 text-sm leading-tight mb-1 line-clamp-2">
          {item.name}
        </h3>
        <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
};

// Modal Minimalista con Carrusel e Ingredientes
const ItemModal = ({ isOpen, item, onClose, getItemImages, getItemIngredients }) => {
  const [showIngredients, setShowIngredients] = useState(false);

  if (!isOpen || !item) return null;

  const images = getItemImages(item);
  const ingredients = getItemIngredients(item);
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 30 }}
        className="bg-transparent rounded-3xl max-w-md w-full max-h-[90vh] overflow-visible"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Carrusel que ocupa el 80% */}
        <div className="relative h-64 mb-4 rounded-2xl overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            pagination={{ 
              clickable: true,
              dynamicBullets: true 
            }}
            className="h-full"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="w-full h-full bg-gray-200 relative">
                  <img
                    src={image}
                    alt={`${item.name} - Imagen ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/10 to-transparent" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Botones de navegación */}
          <button className="swiper-button-prev absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all">
            <ChevronLeft size={24} />
          </button>
          <button className="swiper-button-next absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all">
            <ChevronRight size={24} />
          </button>

          {/* Botón de cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/40 hover:bg-black/60 text-white w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all z-20"
          >
            <X size={24} />
          </button>
        </div>

        {/* Información mínima - 20% restante */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          {/* Nombre y Precio */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
            <div className="text-2xl font-bold text-orange-600">
              {formatPrice(item.price)}
            </div>
          </div>

          {/* Botón de Ingredientes */}
          <motion.div
            className="border-t border-gray-200 pt-4"
            initial={false}
            animate={{ height: showIngredients ? 'auto' : 'auto' }}
          >
            <button
              onClick={() => setShowIngredients(!showIngredients)}
              className="w-full flex items-center justify-between p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl transition-all duration-300 group"
            >
              <div className="flex items-center space-x-2">
                <ChefHat size={20} />
                <span className="font-semibold">Ver Ingredientes</span>
              </div>
              <motion.div
                animate={{ rotate: showIngredients ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronDown size={20} />
              </motion.div>
            </button>

            {/* Lista de Ingredientes Desplegable */}
            <AnimatePresence>
              {showIngredients && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 p-4 bg-orange-50 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <ChefHat size={16} className="mr-2" />
                      Ingredientes Principales
                    </h4>
                    <ul className="space-y-2">
                      {ingredients.map((ingredient, index) => (
                        <motion.li
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center text-sm text-gray-700"
                        >
                          <div className="w-2 h-2 bg-orange-500 rounded-full mr-3" />
                          {ingredient}
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MenuPage;