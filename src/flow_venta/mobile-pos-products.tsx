"use client"

import React, { useState, useRef } from 'react';
import { 
  Search, 
  Package, 
  Coffee, 
  Pizza, 
  ShoppingBag, 
  Star, 
  Plus, 
  Minus, 
  AlertCircle, 
  Camera, 
  ArrowRight, 
  ChevronLeft,
  Filter,
  BarChart2,
  Check,
  X,
  Edit,
  Mic,
  StopCircle
} from 'lucide-react';

const MobilePOSProducts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [activeCategory, setActiveCategory] = useState('todos');
  const [isScanning, setIsScanning] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showAddConfirmation, setShowAddConfirmation] = useState(null);
  const [cart, setCart] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStatus, setRecordingStatus] = useState(''); // 'listening', 'processing', 'error'
  const [frequentlyBoughtProducts] = useState([
    { id: 2, name: 'Coca Cola 500ml', price: 2500, stock: 24, category: 'Bebidas', lowStock: false, maxPerOrder: 12, frequency: 52 },
    { id: 4, name: 'Hamburguesa Clásica', price: 12000, stock: 8, category: 'Comidas', lowStock: false, maxPerOrder: 10, frequency: 38 },
    { id: 3, name: 'Pan Baguette', price: 3800, stock: 3, category: 'Panadería', lowStock: true, maxPerOrder: 5, frequency: 33 },
    { id: 5, name: 'Agua Mineral 1L', price: 1800, stock: 15, category: 'Bebidas', lowStock: false, maxPerOrder: 24, frequency: 29 },
    { id: 6, name: 'Jugo Natural Naranja', price: 3500, stock: 7, category: 'Bebidas', lowStock: false, maxPerOrder: 8, frequency: 27 },
    { id: 7, name: 'Pizza Personal', price: 10000, stock: 2, category: 'Comidas', lowStock: true, maxPerOrder: 6, frequency: 25 }
  ]);

  // Theme colors
  const theme = {
    bg: '#F8FAFC',
    card: '#FFFFFF',
    primary: '#6366F1',
    text: '#1A1A2E',
    textSecondary: '#64748B',
    border: '#E2E8F0',
    success: '#10B981',
    error: '#EF4444',
    accent: '#F97316'
  };

  // Category tabs
  const categories = [
    { id: 'todos', label: 'Todos', icon: Package },
    { id: 'bebidas', label: 'Bebidas', icon: Coffee },
    { id: 'comidas', label: 'Comidas', icon: Pizza },
    { id: 'mercado', label: 'Mercado', icon: ShoppingBag },
    { id: 'populares', label: 'Populares', icon: Star }
  ];

  // Sample products data
  const productsData = {
    todos: [
      { id: 1, name: 'Arroz Premium 1kg', price: 4200, stock: 18, category: 'Alimentos', lowStock: false, maxPerOrder: 10 },
      { id: 2, name: 'Coca Cola 500ml', price: 2500, stock: 24, category: 'Bebidas', lowStock: false, maxPerOrder: 12 },
      { id: 3, name: 'Pan Baguette', price: 3800, stock: 3, category: 'Panadería', lowStock: true, maxPerOrder: 5 },
      { id: 4, name: 'Hamburguesa Clásica', price: 12000, stock: 8, category: 'Comidas', lowStock: false, maxPerOrder: 10 },
      { id: 5, name: 'Agua Mineral 1L', price: 1800, stock: 15, category: 'Bebidas', lowStock: false, maxPerOrder: 24 },
      { id: 6, name: 'Jugo Natural Naranja', price: 3500, stock: 7, category: 'Bebidas', lowStock: false, maxPerOrder: 8 },
      { id: 7, name: 'Pizza Personal', price: 10000, stock: 2, category: 'Comidas', lowStock: true, maxPerOrder: 6 }
    ],
    bebidas: [
      { id: 2, name: 'Coca Cola 500ml', price: 2500, stock: 24, category: 'Bebidas', lowStock: false, maxPerOrder: 12 },
      { id: 5, name: 'Agua Mineral 1L', price: 1800, stock: 15, category: 'Bebidas', lowStock: false, maxPerOrder: 24 },
      { id: 6, name: 'Jugo Natural Naranja', price: 3500, stock: 7, category: 'Bebidas', lowStock: false, maxPerOrder: 8 }
    ],
    comidas: [
      { id: 4, name: 'Hamburguesa Clásica', price: 12000, stock: 8, category: 'Comidas', lowStock: false, maxPerOrder: 10 },
      { id: 7, name: 'Pizza Personal', price: 10000, stock: 2, category: 'Comidas', lowStock: true, maxPerOrder: 6 }
    ],
    mercado: [
      { id: 1, name: 'Arroz Premium 1kg', price: 4200, stock: 18, category: 'Alimentos', lowStock: false, maxPerOrder: 10 }
    ],
    populares: [
      { id: 2, name: 'Coca Cola 500ml', price: 2500, stock: 24, category: 'Bebidas', lowStock: false, maxPerOrder: 12 },
      { id: 4, name: 'Hamburguesa Clásica', price: 12000, stock: 8, category: 'Comidas', lowStock: false, maxPerOrder: 10 },
      { id: 3, name: 'Pan Baguette', price: 3800, stock: 3, category: 'Panadería', lowStock: true, maxPerOrder: 5 }
    ]
  };

  // Filter products based on search query
  const getFilteredProducts = () => {
    const products = productsData[activeCategory] || [];
    
    if (!searchQuery) return products;
    
    return products.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  // Function to handle voice search
  const handleVoiceSearch = () => {
    if (!isRecording) {
      // Start voice recording
      setIsRecording(true);
      setRecordingStatus('listening');
      
      // Simulate speech recognition (in a real app, you would use the Web Speech API)
      setTimeout(() => {
        setRecordingStatus('processing');
        
        setTimeout(() => {
          // Simulate a successful voice recognition
          setIsRecording(false);
          setRecordingStatus('');
          
          // Set a sample search query (in a real app, this would be the recognized speech)
          const recognizedText = 'coca cola';
          setSearchQuery(recognizedText);
          updateSearchSuggestions(recognizedText);
        }, 1500);
      }, 2500);
    } else {
      // Stop voice recording
      setIsRecording(false);
      setRecordingStatus('');
    }
  };
  
  // Get search suggestions based on query
  const updateSearchSuggestions = (query) => {
    if (!query || query.length < 2) {
      setSearchSuggestions([]);
      return;
    }
    
    const allProducts = productsData.todos;
    const matchingProducts = allProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 5); // Show max 5 suggestions
    
    setSearchSuggestions(matchingProducts);
  };

  // Handle camera scanning
  const handleScan = () => {
    setIsScanning(true);
    // Simulate scanning process
    setTimeout(() => {
      setIsScanning(false);
      // Simulate finding a product
      const foundProduct = productsData.todos[1]; // Coca Cola for example
      setSelectedProduct(foundProduct);
      
      // Show success animation and auto-add to cart
      setShowAddConfirmation(foundProduct.id);
      setTimeout(() => {
        setShowAddConfirmation(null);
        handleAddToCart(foundProduct);
      }, 1000);
    }, 1500);
  };

  // Add to cart with animation
  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    // Show confirmation animation
    setShowAddConfirmation(product.id);
    
    setTimeout(() => {
      setShowAddConfirmation(null);
      
      if (existingItem) {
        setCart(cart.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        ));
      } else {
        setCart([...cart, { ...product, quantity: 1 }]);
      }
    }, 800); // Increased animation time for better UX
  };

  // Update quantity
  const handleUpdateQuantity = (productId, change) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        const newQuantity = Math.max(0, item.quantity + change);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0);
    
    setCart(updatedCart);
  };

  // Get quantity of a product in the cart
  const getCartQuantity = (productId) => {
    const item = cart.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  // Check if a product can have more quantity added
  const canAddMore = (product) => {
    const currentQty = getCartQuantity(product.id);
    return currentQty < Math.min(product.stock, product.maxPerOrder || 999);
  };

  // Check if a product can have quantity decreased
  const canDecrease = (productId) => {
    return getCartQuantity(productId) > 0;
  };

  // Calculate subtotal
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Filters popup component
  const FiltersPopup = () => {
    const [selectedFilters, setSelectedFilters] = useState({
      inStock: true,
      lowStock: false,
      priceRange: [0, 50000]
    });
    
    const [priceMin, setPriceMin] = useState(0);
    const [priceMax, setPriceMax] = useState(50000);
    const [selectedCategories, setSelectedCategories] = useState([activeCategory]);
    
    const handleCategoryToggle = (categoryId) => {
      if (selectedCategories.includes(categoryId)) {
        if (selectedCategories.length > 1) {
          setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        }
      } else {
        setSelectedCategories([...selectedCategories, categoryId]);
      }
    };
    
    const applyFilters = () => {
      // Here you would apply the filters to your product list
      // For now, we'll just select the first category from selected ones
      if (selectedCategories.length > 0 && selectedCategories[0] !== activeCategory) {
        setActiveCategory(selectedCategories[0]);
      }
      setShowFilters(false);
    };
    
    const clearFilters = () => {
      setSelectedFilters({
        inStock: true,
        lowStock: false,
        priceRange: [0, 50000]
      });
      setPriceMin(0);
      setPriceMax(50000);
      setSelectedCategories([activeCategory]);
    };

    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-end">
        <div 
          className="w-full rounded-t-xl shadow-xl max-h-[90vh] overflow-y-auto"
          style={{ backgroundColor: theme.card }}
        >
          {/* Filter Header */}
          <div 
            className="sticky top-0 z-10 px-6 py-4 flex justify-between items-center border-b"
            style={{ 
              backgroundColor: theme.card,
              borderColor: theme.border
            }}
          >
            <h3 className="text-xl font-medium" style={{ color: theme.text }}>Filtrar Productos</h3>
            <button 
              onClick={() => setShowFilters(false)}
              className="p-2 rounded-full"
              style={{ backgroundColor: `${theme.error}15` }}
            >
              <X className="w-5 h-5" style={{ color: theme.error }} />
            </button>
          </div>
          
          <div className="px-6 py-4 space-y-6">
            {/* Availability Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="font-medium text-lg" style={{ color: theme.text }}>Disponibilidad</p>
                <span className="text-sm px-2 py-1 rounded-full" style={{ 
                  backgroundColor: `${theme.primary}15`,
                  color: theme.primary
                }}>
                  {selectedFilters.inStock && selectedFilters.lowStock ? 'Todos' : 
                   selectedFilters.inStock ? 'En Stock' :
                   selectedFilters.lowStock ? 'Stock Bajo' : 'Ninguno'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setSelectedFilters(prev => ({ ...prev, inStock: !prev.inStock }))}
                  className="relative px-4 py-4 rounded-xl overflow-hidden"
                  style={{ 
                    backgroundColor: selectedFilters.inStock ? `${theme.success}08` : theme.bg,
                    borderWidth: 2,
                    borderStyle: 'solid',
                    borderColor: selectedFilters.inStock ? theme.success : theme.border
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="p-3 rounded-full"
                      style={{ 
                        backgroundColor: selectedFilters.inStock ? `${theme.success}15` : `${theme.textSecondary}10`,
                      }}
                    >
                      <Check 
                        className="w-6 h-6" 
                        style={{ color: selectedFilters.inStock ? theme.success : theme.textSecondary }} 
                      />
                    </div>
                    <div>
                      <p 
                        className="font-medium text-lg"
                        style={{ 
                          color: selectedFilters.inStock ? theme.success : theme.text
                        }}
                      >
                        En Stock
                      </p>
                      <p className="text-sm" style={{ color: theme.textSecondary }}>
                        Artículos disponibles
                      </p>
                    </div>
                  </div>
                  
                  {selectedFilters.inStock && (
                    <div
                      className="absolute top-2 right-2 w-3 h-3 rounded-full"
                      style={{ backgroundColor: theme.success }}
                    />
                  )}
                </button>
                
                <button
                  onClick={() => setSelectedFilters(prev => ({ ...prev, lowStock: !prev.lowStock }))}
                  className="relative px-4 py-4 rounded-xl overflow-hidden"
                  style={{ 
                    backgroundColor: selectedFilters.lowStock ? `${theme.error}08` : theme.bg,
                    borderWidth: 2,
                    borderStyle: 'solid',
                    borderColor: selectedFilters.lowStock ? theme.error : theme.border
                  }}
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="p-3 rounded-full"
                      style={{ 
                        backgroundColor: selectedFilters.lowStock ? `${theme.error}15` : `${theme.textSecondary}10`,
                      }}
                    >
                      <AlertCircle 
                        className="w-6 h-6" 
                        style={{ color: selectedFilters.lowStock ? theme.error : theme.textSecondary }} 
                      />
                    </div>
                    <div>
                      <p 
                        className="font-medium text-lg"
                        style={{ 
                          color: selectedFilters.lowStock ? theme.error : theme.text
                        }}
                      >
                        Stock Bajo
                      </p>
                      <p className="text-sm" style={{ color: theme.textSecondary }}>
                        Artículos por acabarse
                      </p>
                    </div>
                  </div>
                  
                  {selectedFilters.lowStock && (
                    <div
                      className="absolute top-2 right-2 w-3 h-3 rounded-full"
                      style={{ backgroundColor: theme.error }}
                    />
                  )}
                </button>
              </div>
            </div>
            
            {/* Price Range Section */}
            <div className="space-y-4 pt-2 border-t" style={{ borderColor: theme.border }}>
              <div className="flex justify-between items-center">
                <p className="font-medium text-lg" style={{ color: theme.text }}>Rango de precio</p>
                <p 
                  className="text-sm px-2 py-1 rounded-full" 
                  style={{ 
                    backgroundColor: `${theme.primary}15`,
                    color: theme.primary
                  }}
                >
                  ${priceMin.toLocaleString()} - ${priceMax.toLocaleString()}
                </p>
              </div>
              
              {/* Range Slider Control with Draggable Points */}
              <div className="px-3 py-6">
                <div 
                  className="relative w-full h-12"
                  onMouseDown={(e) => {
                    const sliderRect = e.currentTarget.getBoundingClientRect();
                    const clickPosition = (e.clientX - sliderRect.left) / sliderRect.width;
                    const value = Math.round(clickPosition * 50000);
                    
                    // Determine which thumb to move (closer to min or max)
                    const distToMin = Math.abs(value - priceMin);
                    const distToMax = Math.abs(value - priceMax);
                    
                    if (distToMin <= distToMax) {
                      setPriceMin(Math.min(value, priceMax));
                    } else {
                      setPriceMax(Math.max(value, priceMin));
                    }
                  }}
                  onTouchStart={(e) => {
                    if (e.touches.length === 1) {
                      const sliderRect = e.currentTarget.getBoundingClientRect();
                      const touchPosition = (e.touches[0].clientX - sliderRect.left) / sliderRect.width;
                      const value = Math.round(touchPosition * 50000);
                      
                      // Determine which thumb to move (closer to min or max)
                      const distToMin = Math.abs(value - priceMin);
                      const distToMax = Math.abs(value - priceMax);
                      
                      if (distToMin <= distToMax) {
                        setPriceMin(Math.min(value, priceMax));
                      } else {
                        setPriceMax(Math.max(value, priceMin));
                      }
                    }
                  }}
                >
                  {/* Track background */}
                  <div 
                    className="absolute h-2 rounded-full w-full top-5"
                    style={{ backgroundColor: `${theme.primary}20` }}
                  />
                  
                  {/* Active range */}
                  <div 
                    className="absolute h-2 rounded-full top-5"
                    style={{ 
                      backgroundColor: theme.primary,
                      left: `${(priceMin / 50000) * 100}%`,
                      right: `${100 - (priceMax / 50000) * 100}%`
                    }}
                  />
                  
                  {/* Min thumb */}
                  <div
                    className="absolute w-7 h-7 rounded-full cursor-pointer -ml-3.5 -mt-3 flex items-center justify-center top-5"
                    style={{ 
                      backgroundColor: theme.primary,
                      left: `${(priceMin / 50000) * 100}%`,
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                      touchAction: 'none'
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      const startX = e.clientX;
                      const startValue = priceMin;
                      const width = e.currentTarget.parentElement.clientWidth;
                      
                      const handleMouseMove = (moveEvent) => {
                        const deltaX = moveEvent.clientX - startX;
                        const deltaValue = Math.round((deltaX / width) * 50000);
                        const newValue = Math.max(0, Math.min(priceMax, startValue + deltaValue));
                        setPriceMin(newValue);
                      };
                      
                      const handleMouseUp = () => {
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                      };
                      
                      document.addEventListener('mousemove', handleMouseMove);
                      document.addEventListener('mouseup', handleMouseUp);
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      if (e.touches.length === 1) {
                        const startX = e.touches[0].clientX;
                        const startValue = priceMin;
                        const width = e.currentTarget.parentElement.clientWidth;
                        
                        const handleTouchMove = (moveEvent) => {
                          if (moveEvent.touches.length === 1) {
                            const deltaX = moveEvent.touches[0].clientX - startX;
                            const deltaValue = Math.round((deltaX / width) * 50000);
                            const newValue = Math.max(0, Math.min(priceMax, startValue + deltaValue));
                            setPriceMin(newValue);
                          }
                        };
                        
                        const handleTouchEnd = () => {
                          document.removeEventListener('touchmove', handleTouchMove);
                          document.removeEventListener('touchend', handleTouchEnd);
                        };
                        
                        document.addEventListener('touchmove', handleTouchMove);
                        document.addEventListener('touchend', handleTouchEnd);
                      }
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  
                  {/* Max thumb */}
                  <div
                    className="absolute w-7 h-7 rounded-full cursor-pointer -ml-3.5 -mt-3 flex items-center justify-center top-5"
                    style={{ 
                      backgroundColor: theme.primary,
                      left: `${(priceMax / 50000) * 100}%`,
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)',
                      touchAction: 'none'
                    }}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      const startX = e.clientX;
                      const startValue = priceMax;
                      const width = e.currentTarget.parentElement.clientWidth;
                      
                      const handleMouseMove = (moveEvent) => {
                        const deltaX = moveEvent.clientX - startX;
                        const deltaValue = Math.round((deltaX / width) * 50000);
                        const newValue = Math.max(priceMin, Math.min(50000, startValue + deltaValue));
                        setPriceMax(newValue);
                      };
                      
                      const handleMouseUp = () => {
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                      };
                      
                      document.addEventListener('mousemove', handleMouseMove);
                      document.addEventListener('mouseup', handleMouseUp);
                    }}
                    onTouchStart={(e) => {
                      e.stopPropagation();
                      if (e.touches.length === 1) {
                        const startX = e.touches[0].clientX;
                        const startValue = priceMax;
                        const width = e.currentTarget.parentElement.clientWidth;
                        
                        const handleTouchMove = (moveEvent) => {
                          if (moveEvent.touches.length === 1) {
                            const deltaX = moveEvent.touches[0].clientX - startX;
                            const deltaValue = Math.round((deltaX / width) * 50000);
                            const newValue = Math.max(priceMin, Math.min(50000, startValue + deltaValue));
                            setPriceMax(newValue);
                          }
                        };
                        
                        const handleTouchEnd = () => {
                          document.removeEventListener('touchmove', handleTouchMove);
                          document.removeEventListener('touchend', handleTouchEnd);
                        };
                        
                        document.addEventListener('touchmove', handleTouchMove);
                        document.addEventListener('touchend', handleTouchEnd);
                      }
                    }}
                  >
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                </div>
                
                {/* Markers */}
                <div className="flex justify-between mt-2 px-3 text-xs" style={{ color: theme.textSecondary }}>
                  <span>$0</span>
                  <span>$10k</span>
                  <span>$20k</span>
                  <span>$30k</span>
                  <span>$40k</span>
                  <span>$50k</span>
                </div>
              </div>
              
              {/* Input fields for precise control */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm mb-1.5 block font-medium" style={{ color: theme.textSecondary }}>
                    Precio Mínimo
                  </label>
                  <div className="relative">
                    <span 
                      className="absolute left-3 top-3.5 text-sm font-medium" 
                      style={{ color: theme.textSecondary }}
                    >
                      $
                    </span>
                    <input
                      type="number"
                      value={priceMin}
                      onChange={(e) => {
                        const value = Math.max(0, Math.min(priceMax, parseInt(e.target.value) || 0));
                        setPriceMin(value);
                      }}
                      className="w-full pl-7 pr-3 py-3 rounded-xl text-base"
                      style={{ 
                        backgroundColor: theme.bg,
                        border: `1px solid ${theme.border}`,
                        color: theme.text
                      }}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm mb-1.5 block font-medium" style={{ color: theme.textSecondary }}>
                    Precio Máximo
                  </label>
                  <div className="relative">
                    <span 
                      className="absolute left-3 top-3.5 text-sm font-medium" 
                      style={{ color: theme.textSecondary }}
                    >
                      $
                    </span>
                    <input
                      type="number"
                      value={priceMax}
                      onChange={(e) => {
                        const value = Math.max(priceMin, Math.min(50000, parseInt(e.target.value) || priceMin));
                        setPriceMax(value);
                      }}
                      className="w-full pl-7 pr-3 py-3 rounded-xl text-base"
                      style={{ 
                        backgroundColor: theme.bg,
                        border: `1px solid ${theme.border}`,
                        color: theme.text
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Categories Section */}
            <div className="space-y-4 pt-2 border-t" style={{ borderColor: theme.border }}>
              <div className="flex justify-between items-center">
                <p className="font-medium text-lg" style={{ color: theme.text }}>Categorías</p>
                <span 
                  className="text-sm px-2 py-1 rounded-full"
                  style={{ 
                    backgroundColor: `${theme.primary}15`,
                    color: theme.primary
                  }}
                >
                  {selectedCategories.length} seleccionadas
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {categories.map(category => {
                  const isSelected = selectedCategories.includes(category.id);
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryToggle(category.id)}
                      className="relative flex items-center gap-3 p-4 rounded-xl"
                      style={{ 
                        backgroundColor: isSelected ? `${theme.primary}08` : theme.bg,
                        borderWidth: 2,
                        borderStyle: 'solid',
                        borderColor: isSelected ? theme.primary : theme.border
                      }}
                    >
                      <div 
                        className="p-3 rounded-lg"
                        style={{ 
                          backgroundColor: isSelected ? `${theme.primary}15` : `${theme.textSecondary}10`,
                        }}
                      >
                        <category.icon 
                          className="w-6 h-6" 
                          style={{ color: isSelected ? theme.primary : theme.textSecondary }} 
                        />
                      </div>
                      <p 
                        className="font-medium text-base"
                        style={{ color: isSelected ? theme.primary : theme.text }}
                      >
                        {category.label}
                      </p>
                      
                      {isSelected && (
                        <div
                          className="absolute top-2 right-2 w-3 h-3 rounded-full"
                          style={{ backgroundColor: theme.primary }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div 
            className="sticky bottom-0 p-6 border-t grid grid-cols-2 gap-4"
            style={{ 
              backgroundColor: theme.card,
              borderColor: theme.border
            }}
          >
            <button
              className="p-4 rounded-xl text-base font-medium"
              style={{ 
                backgroundColor: theme.bg,
                border: `1px solid ${theme.border}`,
                color: theme.text
              }}
              onClick={clearFilters}
            >
              Limpiar Filtros
            </button>
            <button
              className="p-4 rounded-xl text-base font-medium text-white"
              style={{ backgroundColor: theme.primary }}
              onClick={applyFilters}
            >
              Aplicar Filtros
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Product Card
  const ProductCard = ({ product }) => {
    const quantity = getCartQuantity(product.id);
    const isAdding = showAddConfirmation === product.id;

    return (
      <div
        className="flex items-center p-3 rounded-xl relative overflow-hidden"
        style={{ 
          backgroundColor: theme.card,
          border: `1px solid ${theme.border}`
        }}
      >
        {/* Success Animation Overlay */}
        {isAdding && (
          <div 
            className="absolute inset-0 flex items-center justify-center z-10"
            style={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              animation: 'pulseAndFade 0.8s ease-out'
            }}
          >
            <div
              className="flex items-center justify-center w-12 h-12 rounded-full"
              style={{ 
                backgroundColor: theme.success,
                animation: 'scaleUp 0.4s ease-out'
              }}
            >
              <Plus className="w-6 h-6 text-white" />
            </div>
            <style jsx>{`
              @keyframes pulseAndFade {
                0% { opacity: 0; }
                20% { opacity: 1; }
                80% { opacity: 1; }
                100% { opacity: 0; }
              }
              @keyframes scaleUp {
                0% { transform: scale(0); }
                70% { transform: scale(1.2); }
                100% { transform: scale(1); }
              }
            `}</style>
          </div>
        )}

        {/* Product Icon */}
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center mr-3 flex-shrink-0"
          style={{ backgroundColor: `${theme.primary}15` }}
        >
          <Package className="w-6 h-6" style={{ color: theme.primary }} />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 
                className="font-medium text-sm truncate"
                style={{ color: theme.text }}
              >
                {product.name}
              </h3>
              <p className="text-sm" style={{ color: theme.textSecondary }}>
                ${product.price.toLocaleString()}
              </p>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center gap-1.5">
              {quantity > 0 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUpdateQuantity(product.id, -1);
                    }}
                    disabled={!canDecrease(product.id)}
                    className="p-1.5 rounded"
                    style={{ 
                      backgroundColor: `${theme.error}15`, 
                      color: theme.error,
                      opacity: canDecrease(product.id) ? 1 : 0.5
                    }}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span 
                    className="w-6 text-center text-sm font-medium"
                    style={{ color: theme.text }}
                  >
                    {quantity}
                  </span>
                </>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                disabled={!canAddMore(product)}
                className="p-2 rounded-lg"
                style={{ 
                  backgroundColor: `${theme.primary}15`,
                  color: theme.primary,
                  opacity: canAddMore(product) ? 1 : 0.5
                }}
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stock Info */}
          <div className="flex items-center justify-between mt-1.5">
            <div className="flex items-center gap-1.5">
              {product.lowStock ? (
                <div className="flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" style={{ color: theme.error }} />
                  <span className="text-xs" style={{ color: theme.error }}>
                    Stock: {product.stock}
                  </span>
                </div>
              ) : (
                <span className="text-xs" style={{ color: theme.textSecondary }}>
                  Stock: {product.stock}
                </span>
              )}
            </div>
            <div className="text-xs px-1.5 py-0.5 rounded-full"
              style={{ backgroundColor: `${theme.primary}10`, color: theme.primary }}>
              {product.category}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Product Detail Modal
  const ProductDetailModal = () => {
    const [showPriceAdjust, setShowPriceAdjust] = useState(false);
    const [priceAdjustment, setPriceAdjustment] = useState(0);
    const [customQuantity, setCustomQuantity] = useState('');
    
    if (!selectedProduct) return null;

    const adjustedPrice = selectedProduct.price + priceAdjustment;
    
    const handlePriceAdjustmentChange = (value) => {
      setPriceAdjustment(parseInt(value) || 0);
    };
    
    const handleCustomQuantityChange = (e) => {
      // Allow only numbers
      const value = e.target.value.replace(/[^0-9]/g, '');
      setCustomQuantity(value);
    };
    
    const handleAddCustomQuantity = () => {
      if (customQuantity && parseInt(customQuantity) > 0) {
        // Add multiple items at once
        const numItems = parseInt(customQuantity);
        const currentQty = getCartQuantity(selectedProduct.id);
        const maxAllowed = Math.min(selectedProduct.maxPerOrder, selectedProduct.stock);
        
        if (numItems > 0 && currentQty + numItems <= maxAllowed) {
          // If price adjustment is active, use adjusted price
          if (priceAdjustment !== 0) {
            const productWithAdjustedPrice = {
              ...selectedProduct,
              price: adjustedPrice
            };
            
            // Create a temporary copy for animation purposes
            const currentCart = [...cart];
            
            // Add items one by one with a slight delay for visual feedback
            let added = 0;
            
            const addItem = () => {
              if (added < numItems) {
                handleAddToCart(productWithAdjustedPrice);
                added++;
                setTimeout(addItem, 100);
              }
            };
            
            addItem();
          } else {
            const currentCart = [...cart];
            const existingItemIndex = currentCart.findIndex(item => item.id === selectedProduct.id);
            
            if (existingItemIndex >= 0) {
              // Update existing item quantity
              currentCart[existingItemIndex] = {
                ...currentCart[existingItemIndex],
                quantity: currentCart[existingItemIndex].quantity + numItems
              };
            } else {
              // Add new item
              currentCart.push({
                ...selectedProduct,
                quantity: numItems
              });
            }
            
            // Show confirmation animation
            setShowAddConfirmation(selectedProduct.id);
            setTimeout(() => {
              setShowAddConfirmation(null);
              setCart(currentCart);
            }, 800);
          }
          
          setCustomQuantity('');
        }
      }
    };
    
    const togglePriceAdjust = () => {
      setShowPriceAdjust(!showPriceAdjust);
      setPriceAdjustment(0);
    };

    const handleAddWithAdjustedPrice = () => {
      if (priceAdjustment !== 0) {
        // Create a copy of the product with adjusted price
        const productWithAdjustedPrice = {
          ...selectedProduct,
          price: adjustedPrice
        };
        
        handleAddToCart(productWithAdjustedPrice);
      } else {
        handleAddToCart(selectedProduct);
      }
      setShowPriceAdjust(false);
    };

    return (
      <div 
        className="fixed inset-0 z-50 flex flex-col"
        style={{ backgroundColor: theme.bg }}
      >
        <div className="p-4 border-b" style={{ borderColor: theme.border }}>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setSelectedProduct(null)}
              className="p-2 rounded-lg"
              style={{ backgroundColor: theme.card }}
            >
              <ChevronLeft className="w-5 h-5" style={{ color: theme.text }} />
            </button>
            <h2 className="text-lg font-medium" style={{ color: theme.text }}>
              Detalles del Producto
            </h2>
          </div>
        </div>
        
        <div className="p-4 flex-1 overflow-y-auto">
          {/* Product Detail Card */}
          <div 
            className="p-4 rounded-xl"
            style={{ 
              backgroundColor: theme.card,
              border: `1px solid ${theme.border}`
            }}
          >
            <div className="flex flex-col space-y-4">
              {/* Product Header */}
              <div className="flex items-start">
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mr-4 flex-shrink-0"
                  style={{ backgroundColor: `${theme.primary}15` }}
                >
                  <Package className="w-8 h-8" style={{ color: theme.primary }} />
                </div>
                <div className="flex-1">
                  <h3 
                    className="font-medium text-lg"
                    style={{ color: theme.text }}
                  >
                    {selectedProduct.name}
                  </h3>
                  
                  {showPriceAdjust ? (
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center">
                        <p className="text-sm mr-2" style={{ color: theme.textSecondary }}>
                          Precio base: ${selectedProduct.price.toLocaleString()}
                        </p>
                        <button
                          onClick={togglePriceAdjust}
                          className="p-1.5 rounded-lg ml-auto"
                          style={{ backgroundColor: `${theme.error}15` }}
                        >
                          <X className="w-4 h-4" style={{ color: theme.error }} />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handlePriceAdjustmentChange(priceAdjustment - 500)}
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${theme.error}15`, color: theme.error }}
                        >
                          <Minus className="w-5 h-5" />
                        </button>
                        
                        <div className="flex-1 text-center">
                          <p style={{ color: theme.text }}>
                            Ajuste: {priceAdjustment > 0 ? '+' : ''}{priceAdjustment.toLocaleString()}
                          </p>
                        </div>
                        
                        <button
                          onClick={() => handlePriceAdjustmentChange(priceAdjustment + 500)}
                          className="p-2 rounded-lg"
                          style={{ backgroundColor: `${theme.success}15`, color: theme.success }}
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <p className="font-medium" style={{ color: theme.text }}>
                          Precio final:
                        </p>
                        <p 
                          className="text-xl font-bold"
                          style={{ 
                            color: priceAdjustment > 0 ? theme.success : 
                                  priceAdjustment < 0 ? theme.error : theme.primary
                          }}
                        >
                          ${adjustedPrice.toLocaleString()}
                        </p>
                      </div>
                      
                      <button
                        onClick={handleAddWithAdjustedPrice}
                        className="w-full p-3 mt-2 rounded-lg text-white"
                        style={{ backgroundColor: theme.primary }}
                      >
                        Agregar con precio ajustado
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between mt-1">
                      <div className="flex items-center gap-2">
                        <p 
                          className="text-xl font-bold"
                          style={{ color: theme.primary }}
                        >
                          ${selectedProduct.price.toLocaleString()}
                        </p>
                        <span 
                          className="px-2 py-0.5 rounded-full text-sm"
                          style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}
                        >
                          {selectedProduct.category}
                        </span>
                      </div>
                      <button
                        onClick={togglePriceAdjust}
                        className="p-1.5 rounded-lg"
                        style={{ backgroundColor: `${theme.primary}15` }}
                      >
                        <Edit className="w-4 h-4" style={{ color: theme.primary }} />
                      </button>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Stock Information */}
              <div 
                className="p-3 rounded-lg"
                style={{ backgroundColor: selectedProduct.lowStock ? `${theme.error}10` : `${theme.success}10` }}
              >
                <div className="flex items-center gap-2">
                  <AlertCircle 
                    className="w-5 h-5" 
                    style={{ color: selectedProduct.lowStock ? theme.error : theme.success }} 
                  />
                  <div>
                    <p 
                      className="font-medium"
                      style={{ color: selectedProduct.lowStock ? theme.error : theme.success }}
                    >
                      {selectedProduct.lowStock ? 'Stock Bajo' : 'En Stock'}
                    </p>
                    <p className="text-sm" style={{ color: theme.text }}>
                      {selectedProduct.stock} unidades disponibles
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Add to Cart Control */}
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: theme.bg }}>
                  <p className="font-medium" style={{ color: theme.text }}>
                    Cantidad
                  </p>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleUpdateQuantity(selectedProduct.id, -1)}
                      disabled={!canDecrease(selectedProduct.id)}
                      className="p-2 rounded-lg"
                      style={{ 
                        backgroundColor: `${theme.error}15`, 
                        color: theme.error,
                        opacity: canDecrease(selectedProduct.id) ? 1 : 0.5
                      }}
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                    <span 
                      className="w-10 text-center text-lg font-bold"
                      style={{ color: theme.text }}
                    >
                      {getCartQuantity(selectedProduct.id)}
                    </span>
                    <button
                      onClick={() => {
                        if (priceAdjustment !== 0 && showPriceAdjust) {
                          const productWithAdjustedPrice = {
                            ...selectedProduct,
                            price: adjustedPrice
                          };
                          handleAddToCart(productWithAdjustedPrice);
                        } else {
                          handleAddToCart(selectedProduct);
                        }
                      }}
                      disabled={!canAddMore(selectedProduct)}
                      className="p-2 rounded-lg"
                      style={{ 
                        backgroundColor: `${theme.primary}15`,
                        color: theme.primary,
                        opacity: canAddMore(selectedProduct) ? 1 : 0.5
                      }}
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                {/* Custom Quantity Input */}
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={customQuantity}
                      onChange={handleCustomQuantityChange}
                      placeholder="Cantidad personalizada"
                      className="w-full pl-3 pr-3 py-3 rounded-lg"
                      style={{ 
                        backgroundColor: theme.bg,
                        border: `1px solid ${theme.border}`,
                        color: theme.text
                      }}
                    />
                  </div>
                  <button
                    onClick={handleAddCustomQuantity}
                    disabled={!customQuantity || parseInt(customQuantity) <= 0}
                    className="p-3 rounded-lg"
                    style={{ 
                      backgroundColor: theme.primary,
                      opacity: (!customQuantity || parseInt(customQuantity) <= 0) ? 0.7 : 1,
                      color: 'white'
                    }}
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: theme.bg }}
    >
      {/* Header with search and scan */}
      <div 
        className="sticky top-0 z-10 p-4 border-b"
        style={{ backgroundColor: theme.bg, borderColor: theme.border }}
      >
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-medium" style={{ color: theme.text }}>
            Nueva Venta
          </h1>
          
          <button 
            className="p-2 rounded-lg"
            style={{ backgroundColor: theme.card }}
            onClick={() => setShowFilters(true)}
          >
            <Filter className="w-5 h-5" style={{ color: theme.text }} />
          </button>
        </div>
        
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-5 h-5" style={{ color: theme.textSecondary }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                const query = e.target.value;
                setSearchQuery(query);
                updateSearchSuggestions(query);
              }}
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-14 py-3 rounded-xl"
              style={{ 
                backgroundColor: theme.card,
                border: `1px solid ${theme.border}`,
                color: theme.text
              }}
              onBlur={() => {
                // Delay hiding suggestions to allow clicking on them
                setTimeout(() => setSearchSuggestions([]), 200);
              }}
            />
            
            {/* Voice Search Button */}
            <div className="absolute right-3 top-2.5">
              <button
                onClick={handleVoiceSearch}
                className="p-1.5 rounded-lg transition-all duration-300"
                style={{ 
                  backgroundColor: isRecording ? `${theme.error}15` : `${theme.primary}15`,
                  color: isRecording ? theme.error : theme.primary
                }}
              >
                {isRecording ? (
                  <>
                    <StopCircle className="w-5 h-5" />
                    <span 
                      className="absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse"
                      style={{ backgroundColor: theme.error }}
                    ></span>
                  </>
                ) : (
                  <Mic className="w-5 h-5" />
                )}
              </button>
            </div>
            
            {/* Voice Recording Status Indicator */}
            {isRecording && (
              <div 
                className="fixed inset-x-0 top-20 mx-auto w-11/12 p-3 rounded-xl z-40 flex items-center gap-3 shadow-lg"
                style={{ 
                  backgroundColor: recordingStatus === 'processing' ? theme.primary : theme.accent,
                  maxWidth: '400px'
                }}
              >
                <div 
                  className={`w-3 h-3 rounded-full ${recordingStatus === 'listening' ? 'animate-pulse' : ''}`}
                  style={{ 
                    backgroundColor: 'white',
                    opacity: recordingStatus === 'listening' ? '1' : '0.7'
                  }}
                ></div>
                <p className="text-white font-medium">
                  {recordingStatus === 'listening' 
                    ? 'Escuchando...' 
                    : recordingStatus === 'processing' 
                      ? 'Procesando...' 
                      : 'Error de reconocimiento'}
                </p>
                
                <button
                  onClick={handleVoiceSearch}
                  className="ml-auto p-1.5 rounded-lg bg-white bg-opacity-20"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            )}
            
            {/* Search Suggestions Dropdown */}
            {searchSuggestions.length > 0 && (
              <div 
                className="absolute z-20 w-full mt-1 rounded-xl shadow-xl overflow-hidden"
                style={{ backgroundColor: theme.card, border: `1px solid ${theme.border}` }}
              >
                {searchSuggestions.map(product => (
                  <div 
                    key={product.id}
                    className="p-3 border-b flex items-center gap-3 cursor-pointer hover:opacity-80"
                    style={{ borderColor: theme.border }}
                    onClick={() => {
                      setSelectedProduct(product);
                      setSearchSuggestions([]);
                      setSearchQuery('');
                    }}
                  >
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${theme.primary}15` }}
                    >
                      <Package className="w-5 h-5" style={{ color: theme.primary }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate" style={{ color: theme.text }}>
                        {product.name}
                      </p>
                      <div className="flex items-center justify-between">
                        <p style={{ color: theme.primary }}>${product.price.toLocaleString()}</p>
                        <p className="text-xs" style={{ color: theme.textSecondary }}>
                          Stock: {product.stock}
                        </p>
                      </div>
                    </div>
                    <button
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${theme.primary}15` }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                        setSearchSuggestions([]);
                      }}
                    >
                      <Plus className="w-4 h-4" style={{ color: theme.primary }} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="p-3 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: theme.accent }}
          >
            {isScanning ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Camera className="w-5 h-5 text-white" />
            )}
          </button>
        </div>
        
        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto py-3">
          {categories.map(category => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl whitespace-nowrap transition-colors"
                style={{ 
                  backgroundColor: isActive ? theme.primary : `${theme.primary}10`,
                  color: isActive ? 'white' : theme.primary
                }}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{category.label}</span>
                {category.id === 'todos' && (
                  <span 
                    className="px-1.5 py-0.5 text-xs rounded-full"
                    style={{ 
                      backgroundColor: isActive ? 'white' : theme.primary,
                      color: isActive ? theme.primary : 'white'
                    }}
                  >
                    {productsData.todos.length}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
      
      {/* Frequently Bought Products - Improved Design with proper scrolling */}
      <div className="px-4 py-3 border-t border-b" style={{ borderColor: theme.border }}>
        <h3 className="text-base font-medium mb-2" style={{ color: theme.text }}>
          Productos Frecuentes
        </h3>
        <div className="flex overflow-x-auto gap-2 pb-2 hide-scrollbar">
          {frequentlyBoughtProducts.map(product => (
            <button 
              key={product.id}
              className="p-3 rounded-xl flex items-center gap-2 flex-shrink-0"
              style={{ 
                backgroundColor: theme.card,
                border: `1px solid ${theme.border}`,
                width: '220px'
              }}
              onClick={() => setSelectedProduct(product)}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${theme.primary}15` }}
              >
                <Package className="w-6 h-6" style={{ color: theme.primary }} />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="text-sm font-medium truncate" style={{ color: theme.text }}>
                  {product.name}
                </p>
                <p className="font-medium" style={{ color: theme.primary }}>
                  ${product.price.toLocaleString()}
                </p>
              </div>
              <button
                className="p-2 rounded-lg"
                style={{ 
                  backgroundColor: `${theme.primary}15`,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
              >
                <Plus className="w-5 h-5" style={{ color: theme.primary }} />
              </button>
            </button>
          ))}
        </div>
      </div>
      
      {/* Product List */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {getFilteredProducts().map(product => (
          <div key={product.id} onClick={() => setSelectedProduct(product)}>
            <ProductCard product={product} />
          </div>
        ))}
        
        {getFilteredProducts().length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <Package className="w-16 h-16 mb-4" style={{ color: `${theme.primary}50` }} />
            <p className="text-lg font-medium" style={{ color: theme.text }}>
              No se encontraron productos
            </p>
            <p className="text-sm mt-1" style={{ color: theme.textSecondary }}>
              Intenta con otra búsqueda o categoría
            </p>
          </div>
        )}
      </div>
      
      {/* Cart Summary (if items exist) */}
      {cart.length > 0 && (
        <div 
          className="sticky bottom-0 p-4 border-t"
          style={{ borderColor: theme.border, backgroundColor: theme.card }}
        >
          <button
            className="w-full p-4 rounded-xl flex items-center justify-between text-white"
            style={{ backgroundColor: theme.primary }}
          >
            <span className="flex items-center gap-2 text-lg font-medium">
              <ShoppingBag className="w-6 h-6" />
              <span>Ver Carrito</span>
            </span>
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold bg-white bg-opacity-20 px-3 py-1 rounded-lg">
                {cart.reduce((sum, item) => sum + item.quantity, 0)} items
              </span>
              <span className="text-lg font-bold px-3 py-1 border-l" style={{ borderColor: 'rgba(255,255,255,0.3)' }}>
                ${subtotal.toLocaleString()}
              </span>
            </div>
          </button>
        </div>
      )}
      
      {/* Product Detail Modal */}
      {selectedProduct && <ProductDetailModal />}
      
      {/* Filters Popup */}
      {showFilters && <FiltersPopup />}
    </div>
  );
};

export default MobilePOSProducts;
