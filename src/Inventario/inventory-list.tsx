"use client"
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Package,
  Filter,
  Clock,
  FileText,
  ChevronRight,
  X,
  ArrowUpDown,
  Plus,
  Sliders,
  ArrowLeft
} from 'lucide-react';

// Define interfaces for data types
interface ThemeType {
  bg: string;
  card: string;
  primary: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  warning: string;
  error: string;
}

interface ProductType {
  icon: React.ElementType;
  label: string;
  color: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number | null;
  type: 'physical' | 'service' | 'digital';
  duration?: string;
  commission?: string;
}

interface CategoryType {
  id: string;
  label: string;
  count?: number;
}

interface FilterType {
  category: string;
  type: string;
  stock: string;
  sortBy: string;
}

interface QuickFilterType {
  id: string;
  label: string;
  count: number;
  isActive: boolean;
  action: () => void;
}

interface ProductCardProps {
  product: Product;
  type: 'physical' | 'service' | 'digital';
  index: number;
}

interface OptimizedFilterInventoryProps {
  onClose?: () => void;
}

const OptimizedFilterInventory: React.FC<OptimizedFilterInventoryProps> = ({ onClose }) => {
  // Theme configuration
  const theme: ThemeType = {
    bg: '#F8FAFC',
    card: '#FFFFFF',
    primary: '#6366F1',
    text: '#1A1A2E',
    textSecondary: '#64748B',
    border: '#E5E7EB',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444'
  };

  // Product types with icons
  const productTypes: Record<string, ProductType> = {
    physical: { icon: Package, label: 'Producto', color: theme.primary },
    service: { icon: Clock, label: 'Servicio', color: theme.primary },
    digital: { icon: FileText, label: 'Digital', color: theme.primary }
  };

  // Sample product data - in a real app this would come from your database
  const products: Product[] = [
    { id: 1, name: 'Coca Cola 500ml', category: 'bebidas', price: 2500, stock: 24, type: 'physical' },
    { id: 2, name: 'Pan Baguette', category: 'panaderia', price: 3800, stock: 3, type: 'physical' },
    { id: 3, name: 'Arroz Premium 1kg', category: 'alimentos', price: 4200, stock: 18, type: 'physical' },
    { id: 4, name: 'Jabón de manos', category: 'limpieza', price: 3200, stock: 15, type: 'physical' },
    { id: 5, name: 'Detergente 2L', category: 'limpieza', price: 8500, stock: 7, type: 'physical' },
    
    { id: 6, name: 'Corte de Cabello', category: 'belleza', price: 25000, stock: null, type: 'service', duration: '30 min' },
    { id: 7, name: 'Manicure', category: 'belleza', price: 18000, stock: null, type: 'service', duration: '45 min' },
    { id: 8, name: 'Limpieza facial', category: 'belleza', price: 35000, stock: null, type: 'service', duration: '60 min' },
    
    { id: 9, name: 'Recarga Claro $10.000', category: 'recargas', price: 10000, stock: null, type: 'digital', commission: '5%' },
    { id: 10, name: 'Netflix Premium', category: 'streaming', price: 45000, stock: null, type: 'digital', commission: '8%' },
    { id: 11, name: 'Pago de servicios', category: 'pagos', price: 2000, stock: null, type: 'digital', commission: '3%' }
  ];

  // State management
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filters, setFilters] = useState<FilterType>({
    category: 'all',
    type: 'all',
    stock: 'all',
    sortBy: 'name'
  });

  const [showFilterModal, setShowFilterModal] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [isCreatingProduct, setIsCreatingProduct] = useState<boolean>(false);

  // Handle refresh action
  const handleRefresh = () => {
    if (refreshing) return;
    
    setRefreshing(true);
    
    // Simulate refresh with a timeout
    setTimeout(() => {
      setRefreshing(false);
      // In a real app, you would fetch fresh data here
    }, 1500);
  };

  // Get categories from products
  const categories = useMemo<CategoryType[]>(() => {
    const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
    return [
      { id: 'all', label: 'Todas' },
      ...uniqueCategories.sort().map(cat => ({ 
        id: cat, 
        label: cat.charAt(0).toUpperCase() + cat.slice(1),
        count: products.filter(p => p.category === cat).length
      }))
    ];
  }, [products]);

  // Quick-filter buttons
  const quickFilters = useMemo<QuickFilterType[]>(() => {
    return [
      { 
        id: 'all', 
        label: 'Todos', 
        count: products.length,
        isActive: filters.type === 'all' && filters.stock === 'all', 
        action: () => setFilters(prev => ({ ...prev, type: 'all', stock: 'all' }))
      },
      { 
        id: 'physical', 
        label: 'Productos', 
        count: products.filter(p => p.type === 'physical').length,
        isActive: filters.type === 'physical', 
        action: () => setFilters(prev => ({ ...prev, type: 'physical' }))
      },
      { 
        id: 'service', 
        label: 'Servicios', 
        count: products.filter(p => p.type === 'service').length,
        isActive: filters.type === 'service', 
        action: () => setFilters(prev => ({ ...prev, type: 'service' }))
      },
      { 
        id: 'digital', 
        label: 'Digitales', 
        count: products.filter(p => p.type === 'digital').length,
        isActive: filters.type === 'digital', 
        action: () => setFilters(prev => ({ ...prev, type: 'digital' }))
      },
      { 
        id: 'low_stock', 
        label: 'Stock Bajo', 
        count: products.filter(p => p.type === 'physical' && p.stock !== null && p.stock > 0 && p.stock <= 5).length,
        isActive: filters.stock === 'low', 
        action: () => setFilters(prev => ({ ...prev, stock: prev.stock === 'low' ? 'all' : 'low' }))
      }
    ];
  }, [products, filters]);

  // Optimized filtered products logic
  const filteredProducts = useMemo<Product[]>(() => {
    // Start with all products
    let results = [...products];
    
    // Apply type filter first (usually most restrictive)
    if (filters.type !== 'all') {
      results = results.filter(product => product.type === filters.type);
    }
    
    // Then category filter
    if (filters.category !== 'all') {
      results = results.filter(product => product.category === filters.category);
    }
    
    // Then stock filter (applies only to physical products)
    if (filters.stock !== 'all') {
      results = results.filter(product => {
        if (product.type !== 'physical') return false;
        
        if (filters.stock === 'low') {
          return product.stock !== null && product.stock > 0 && product.stock <= 5;
        } else if (filters.stock === 'out') {
          return product.stock === 0;
        }
        return true;
      });
    }
    
    // Apply search filter last (most expensive operation)
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      results = results.filter(product => {
        return product.name.toLowerCase().includes(query) || 
               product.category.toLowerCase().includes(query);
      });
    }
    
    // Finally sort
    return results.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price_asc':
          return a.price - b.price;
        case 'price_desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });
  }, [products, searchQuery, filters]);

  // Get readable category label
  const getCategoryLabel = (categoryId: string): string => {
    const category = categories.find(c => c.id === categoryId);
    return category ? category.label : categoryId;
  };

  // Determine product stock color
  const getStockColor = (product: Product): string => {
    if (product.type !== 'physical') return theme.textSecondary;
    if (product.stock === 0) return theme.error;
    if (product.stock !== null && product.stock <= 5) return theme.warning;
    return theme.success;
  };

  // Reset all filters
  const clearAllFilters = (): void => {
    setFilters({
      category: 'all',
      type: 'all',
      stock: 'all',
      sortBy: 'name'
    });
    setSearchQuery('');
  };

  // Component to render a product card with animations
  const ProductCard: React.FC<ProductCardProps> = ({ product, type, index }) => {
    const { icon: Icon } = productTypes[type];
    
    return (
      <div
        className="product-card bg-white rounded-lg shadow-sm p-4 flex items-center cursor-pointer border border-gray-100 hover:border-indigo-200"
        style={{ 
          opacity: 1, 
          transition: "all 0.3s ease",
          animationDelay: `${index * 50}ms` 
        }}
        onClick={() => {
          // Navigate to product edit page (simulated in this demo)
          alert(`Editando: ${product.name}`);
        }}
      >
        <div className="mr-3 bg-indigo-50 w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-6 h-6" style={{ color: theme.primary }} />
        </div>
        
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 truncate">
            {product.name}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-sm text-gray-500">
              ${product.price.toLocaleString()}
            </span>
            <span className="w-1 h-1 rounded-full bg-gray-300"></span>
            {type === 'physical' ? (
              <span 
                className="text-sm"
                style={{ color: getStockColor(product) }}
              >
                {product.stock !== null && product.stock > 0 
                  ? `${product.stock} unidades` 
                  : 'Sin stock'}
              </span>
            ) : type === 'service' ? (
              <span className="text-sm text-indigo-500">
                {product.duration}
              </span>
            ) : (
              <span className="text-sm text-indigo-500">
                {product.commission}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <span 
            className="text-xs px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 hover:bg-indigo-100 transition-colors"
            onClick={(e) => {
              e.stopPropagation(); // Prevent opening edit page
              setFilters(prev => ({ ...prev, category: product.category }));
            }}
          >
            {getCategoryLabel(product.category)}
          </span>
          <ChevronRight className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    );
  };

  // Handle 'Escape' key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showFilterModal) {
          setShowFilterModal(false);
        } else if (onClose) {
          onClose();
        }
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showFilterModal, onClose]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .product-card {
          animation: fadeIn 0.4s ease-out forwards;
        }
        .button-grow {
          transition: transform 0.2s ease;
        }
        .button-grow:hover {
          transform: scale(1.02);
        }
        .button-grow:active {
          transform: scale(0.98);
        }
      `}</style>

      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 sticky top-0 z-10 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            {onClose && (
              <button 
                onClick={onClose}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Volver"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <h1 className="text-xl font-medium text-gray-900">
              Inventario
            </h1>
          </div>
          <button 
            className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shadow-sm hover:bg-indigo-700 transition-colors"
            aria-label="Añadir producto"
            onClick={() => setIsCreatingProduct(true)}
          >
            <Plus className="w-5 h-5 text-white" />
          </button>
        </div>
        
        {/* Search and Filter */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search 
              className="absolute left-3 top-3 w-5 h-5 text-gray-400" 
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full pl-10 pr-10 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-3"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
          
          <button 
            onClick={() => setShowFilterModal(true)}
            className="p-3 rounded-lg bg-gray-50 border border-gray-200 relative hover:bg-gray-100 transition-colors"
          >
            <Sliders className="w-5 h-5 text-gray-500" />
            {Object.values(filters).some(v => v !== 'all' && v !== 'name') && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-xs bg-indigo-600 text-white">
                {Object.values(filters).filter(v => v !== 'all' && v !== 'name').length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div 
          className="fixed inset-0 z-50 bg-black bg-opacity-40 transition-opacity"
          onClick={() => setShowFilterModal(false)}
        >
          <div 
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl p-5 max-h-[85vh] overflow-y-auto transform transition-transform duration-300 ease-out"
            style={{ 
              transform: 'translateY(0)'
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Drag handle */}
            <div className="h-1 w-16 rounded-full mx-auto mb-3 bg-gray-300"></div>
            
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-medium text-gray-900">
                Filtros Avanzados
              </h3>
              <button onClick={() => setShowFilterModal(false)}>
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Sort Order */}
            <div className="mb-5">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Ordenar por
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'name', label: 'Nombre' },
                  { id: 'price_asc', label: 'Precio ↑' },
                  { id: 'price_desc', label: 'Precio ↓' }
                ].map(option => (
                  <button
                    key={option.id}
                    onClick={() => setFilters(prev => ({ ...prev, sortBy: option.id }))}
                    className={`px-3 py-2 rounded-md text-sm flex items-center gap-2 ${
                      filters.sortBy === option.id ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="mb-5">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Categorías
              </h4>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button 
                    key={category.id}
                    onClick={() => setFilters(prev => ({ ...prev, category: category.id }))}
                    className={`px-3 py-2 rounded-md text-sm flex items-center gap-2 ${
                      filters.category === category.id ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <span>{category.label}</span>
                    {category.count && category.id !== 'all' && (
                      <span className="text-xs bg-white bg-opacity-50 px-1.5 rounded-full">
                        {category.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Type Filter */}
            <div className="mb-5">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Tipo de producto
              </h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilters(prev => ({ ...prev, type: 'all' }))}
                  className={`px-3 py-2 rounded-md text-sm ${
                    filters.type === 'all' ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Todos
                </button>
                {Object.entries(productTypes).map(([type, info]) => (
                  <button
                    key={type}
                    onClick={() => setFilters(prev => ({ ...prev, type }))}
                    className={`px-3 py-2 rounded-md text-sm flex items-center gap-2 ${
                      filters.type === type ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    <info.icon className="w-4 h-4" />
                    <span>{info.label}s</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stock Filter */}
            <div className="mb-5">
              <h4 className="text-sm font-medium text-gray-500 mb-2">
                Inventario
              </h4>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setFilters(prev => ({ ...prev, stock: 'all' }))}
                  className={`px-3 py-2 rounded-md text-sm ${
                    filters.stock === 'all' ? 'bg-indigo-50 text-indigo-600' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFilters(prev => ({ ...prev, stock: 'low' }))}
                  className={`px-3 py-2 rounded-md text-sm ${
                    filters.stock === 'low' ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <span>Inventario bajo</span>
                </button>
                <button
                  onClick={() => setFilters(prev => ({ ...prev, stock: 'out' }))}
                  className={`px-3 py-2 rounded-md text-sm ${
                    filters.stock === 'out' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-700'
                  }`}
                >
                  <span>Sin inventario</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                onClick={clearAllFilters}
                className="p-3 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Limpiar filtros
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="p-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
              >
                Aplicar filtros
              </button>
            </div>
          </div>
        </div>
      )}

      {/* "Pull to refresh" indicator */}
      <div 
        className="bg-indigo-50 border-b border-indigo-100 text-indigo-600 text-center py-2 text-sm font-medium cursor-pointer hover:bg-indigo-100 transition-colors"
        onClick={handleRefresh}
      >
        <div className="flex items-center justify-center gap-2">
          {refreshing ? (
            <>
              <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Actualizando inventario...</span>
            </>
          ) : (
            <>
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              <span>Tocar para actualizar</span>
            </>
          )}
        </div>
      </div>

      {/* Stat Cards */}
      <div className="p-4 grid grid-cols-3 gap-4">
        <button 
          onClick={() => setFilters(prev => ({ ...prev, type: filters.type === 'physical' ? 'all' : 'physical' }))}
          className="text-left cursor-pointer button-grow"
        >
          <div className={`rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 ${filters.type === 'physical' ? 'bg-indigo-100 border-indigo-300' : 'bg-white'}`}>
            <div className="flex flex-col items-center">
              <div className={`${filters.type === 'physical' ? 'bg-indigo-200' : 'bg-indigo-50'} w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300`}>
                <Package className="w-6 h-6" style={{ color: theme.primary }} />
              </div>
              <p className={`text-2xl font-semibold ${filters.type === 'physical' ? 'text-indigo-800' : 'text-gray-900'} transition-colors duration-300`}>
                {products.filter(p => p.type === 'physical').length}
              </p>
              <p className={`text-sm mt-1 ${filters.type === 'physical' ? 'text-indigo-700 font-medium' : 'text-gray-500'} transition-colors duration-300`}>
                Productos
                {filters.type === 'physical' && <span className="ml-1">✓</span>}
              </p>
            </div>
          </div>
        </button>
        
        <button
          onClick={() => setFilters(prev => ({ ...prev, type: filters.type === 'service' ? 'all' : 'service' }))}
          className="text-left cursor-pointer button-grow"
        >
          <div className={`rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 ${filters.type === 'service' ? 'bg-indigo-100 border-indigo-300' : 'bg-white'}`}>
            <div className="flex flex-col items-center">
              <div className={`${filters.type === 'service' ? 'bg-indigo-200' : 'bg-indigo-50'} w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300`}>
                <Clock className="w-6 h-6" style={{ color: theme.primary }} />
              </div>
              <p className={`text-2xl font-semibold ${filters.type === 'service' ? 'text-indigo-800' : 'text-gray-900'} transition-colors duration-300`}>
                {products.filter(p => p.type === 'service').length}
              </p>
              <p className={`text-sm mt-1 ${filters.type === 'service' ? 'text-indigo-700 font-medium' : 'text-gray-500'} transition-colors duration-300`}>
                Servicios
                {filters.type === 'service' && <span className="ml-1">✓</span>}
              </p>
            </div>
          </div>
        </button>
        
        <button
          onClick={() => setFilters(prev => ({ ...prev, type: filters.type === 'digital' ? 'all' : 'digital' }))}
          className="text-left cursor-pointer button-grow"
        >
          <div className={`rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 ${filters.type === 'digital' ? 'bg-indigo-100 border-indigo-300' : 'bg-white'}`}>
            <div className="flex flex-col items-center">
              <div className={`${filters.type === 'digital' ? 'bg-indigo-200' : 'bg-indigo-50'} w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300`}>
                <FileText className="w-6 h-6" style={{ color: theme.primary }} />
              </div>
              <p className={`text-2xl font-semibold ${filters.type === 'digital' ? 'text-indigo-800' : 'text-gray-900'} transition-colors duration-300`}>
                {products.filter(p => p.type === 'digital').length}
              </p>
              <p className={`text-sm mt-1 ${filters.type === 'digital' ? 'text-indigo-700 font-medium' : 'text-gray-500'} transition-colors duration-300`}>
                Digitales
                {filters.type === 'digital' && <span className="ml-1">✓</span>}
              </p>
            </div>
          </div>
        </button>
      </div>

      {/* Active Filters */}
      {(filters.category !== 'all' || filters.type !== 'all' || filters.stock !== 'all' || searchQuery) && (
        <div className="bg-gray-50 border-t border-b border-gray-200 px-4 py-2">
          <div className="flex flex-wrap items-center gap-2">
            {searchQuery && (
              <div className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md flex items-center gap-1 text-sm">
                <span>Búsqueda: "{searchQuery}"</span>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="w-4 h-4 rounded-full flex items-center justify-center bg-indigo-100 hover:bg-indigo-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            
            {filters.type !== 'all' && (
              <div className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md flex items-center gap-1 text-sm">
                <span>Tipo: {productTypes[filters.type].label}</span>
                <button 
                  onClick={() => setFilters(prev => ({...prev, type: 'all'}))}
                  className="w-4 h-4 rounded-full flex items-center justify-center bg-indigo-100 hover:bg-indigo-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            
            {filters.category !== 'all' && (
              <div className="bg-indigo-50 text-indigo-700 px-2 py-1 rounded-md flex items-center gap-1 text-sm">
                <span>Categoría: {getCategoryLabel(filters.category)}</span>
                <button 
                  onClick={() => setFilters(prev => ({...prev, category: 'all'}))}
                  className="w-4 h-4 rounded-full flex items-center justify-center bg-indigo-100 hover:bg-indigo-200"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            
            {filters.stock !== 'all' && (
              <div className={`${filters.stock === 'low' ? 'bg-amber-50 text-amber-700' : 'bg-red-50 text-red-700'} px-2 py-1 rounded-md flex items-center gap-1 text-sm`}>
                <span>Stock: {filters.stock === 'low' ? 'Bajo' : 'Agotado'}</span>
                <button 
                  onClick={() => setFilters(prev => ({...prev, stock: 'all'}))}
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${filters.stock === 'low' ? 'bg-amber-100 hover:bg-amber-200' : 'bg-red-100 hover:bg-red-200'}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}
            
            <button 
              onClick={clearAllFilters}
              className="ml-auto text-gray-500 text-sm hover:text-gray-700 flex items-center gap-1"
            >
              <span>Limpiar todos</span>
              <X className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}

      {/* Quick Filters */}
      <div className="px-4 py-2">
        <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
          {quickFilters.map(filter => (
            <div
              key={filter.id}
              onClick={filter.action}
              className={`px-3 py-2 rounded-md text-sm flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                filter.isActive 
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-300 font-medium' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50 transition-all'
              }`}
            >
              <span>{filter.label}</span>
              {filter.count > 0 && (
                <span className={`text-xs px-1.5 rounded-full ${
                  filter.isActive 
                    ? 'bg-indigo-50 text-indigo-700' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {filter.count}
                </span>
              )}
              {filter.isActive && filter.id !== 'all' && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (filter.id === 'low_stock') {
                      setFilters(prev => ({ ...prev, stock: 'all' }));
                    } else {
                      setFilters(prev => ({ ...prev, type: 'all' }));
                    }
                  }}
                  className="ml-1 w-4 h-4 rounded-full flex items-center justify-center bg-indigo-200 hover:bg-indigo-300"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
          
          {/* Sort Button */}
          <button
            onClick={() => {
              const nextSort = filters.sortBy === 'name' ? 'price_asc' : 
                               filters.sortBy === 'price_asc' ? 'price_desc' : 'name';
              setFilters(prev => ({ ...prev, sortBy: nextSort }));
            }}
            className={`px-3 py-2 rounded-md text-sm flex items-center gap-1 ml-auto whitespace-nowrap 
              ${filters.sortBy !== 'name' 
                ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                : 'bg-white text-gray-600 border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50'}`}
          >
            <ArrowUpDown className="w-4 h-4" />
            <span>
              {filters.sortBy === 'name' ? 'Nombre' : 
               filters.sortBy === 'price_asc' ? 'Precio ↑' : 'Precio ↓'}
            </span>
          </button>
        </div>
      </div>

      {/* Product List */}
      <div className="p-4 pb-24">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100 mt-4">
            <Package className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-4">
              No se encontraron productos que coincidan con los filtros
            </p>
            <button
              onClick={clearAllFilters}
              className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors"
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <div>
            {/* Results Count with Performance Indicator */}
            <div className="flex justify-between items-center mb-4 px-1">
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-600">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'} encontrados
                </p>
                {filteredProducts.length < products.length / 2 && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100">
                    Filtro eficiente
                  </span>
                )}
              </div>
              
              <div className="flex gap-2 text-xs text-gray-500">
                {['physical', 'service', 'digital'].map(type => {
                  const count = filteredProducts.filter(p => p.type === type).length;
                  if (count === 0) return null;
                  
                  return (
                    <span key={type} className="flex items-center gap-1">
                      {count} {productTypes[type].label.toLowerCase()}
                      {count !== 1 && 's'}
                    </span>
                  );
                })}
              </div>
            </div>
            
            {/* Physical Products Section */}
            {filteredProducts.some(product => product.type === 'physical') && (
              <div 
                className="mb-6"
                key={`physical-${filters.type}-${filters.category}-${filters.stock}-${searchQuery}`}
              >
                <h3 className="text-sm font-medium uppercase text-gray-500 mb-3 px-1">
                  Productos Físicos
                </h3>
                <div className="space-y-3">
                  {filteredProducts
                    .filter(product => product.type === 'physical')
                    .map((product, index) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        type="physical"
                        index={index}
                      />
                    ))}
                </div>
              </div>
            )}
            
            {/* Services Section */}
            {filteredProducts.some(product => product.type === 'service') && (
              <div 
                className="mb-6"
                key={`service-${filters.type}-${filters.category}-${filters.stock}-${searchQuery}`}
              >
                <h3 className="text-sm font-medium uppercase text-gray-500 mb-3 px-1">
                  Servicios
                </h3>
                <div className="space-y-3">
                  {filteredProducts
                    .filter(product => product.type === 'service')
                    .map((product, index) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        type="service"
                        index={index} 
                      />
                    ))}
                </div>
              </div>
            )}
            
            {/* Digital Products Section */}
            {filteredProducts.some(product => product.type === 'digital') && (
              <div 
                className="mb-6"
                key={`digital-${filters.type}-${filters.category}-${filters.stock}-${searchQuery}`}
              >
                <h3 className="text-sm font-medium uppercase text-gray-500 mb-3 px-1">
                  Productos Digitales
                </h3>
                <div className="space-y-3">
                  {filteredProducts
                    .filter(product => product.type === 'digital')
                    .map((product, index) => (
                      <ProductCard 
                        key={product.id} 
                        product={product} 
                        type="digital"
                        index={index} 
                      />
                    ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        {/* Create Product Button (At the bottom of the content) */}
        <div className="mt-6">
          <button
            className="button-grow w-full py-4 bg-indigo-600 text-white rounded-xl flex items-center justify-center shadow-md hover:bg-indigo-700 transition-colors"
            onClick={() => {
              setIsCreatingProduct(true);
            }}
          >
            <Plus className="w-5 h-5 mr-2" />
            <span className="font-medium">Crear Producto</span>
          </button>
        </div>
      </div>

      {/* Floating scroll-to-top button that appears when scrolling down */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-indigo-600 text-white shadow-lg hover:bg-indigo-700 transition-all transform hover:scale-105 active:scale-95"
        style={{
          opacity: 0.9,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 40
        }}
      >
        <svg 
          className="w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M5 10l7-7m0 0l7 7m-7-7v18" 
          />
        </svg>
      </button>

      {/* CSS for hiding scrollbars but allowing scrolling */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default OptimizedFilterInventory;