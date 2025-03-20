"use client"

import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Package,
  Clock,
  FileText,
  Sparkles,
  Check,
  ArrowRight,
  Copy,
  X,
  Camera,
  Plus,
  PlusSquare,
  Minus,
  Barcode,
  AlertCircle,
  Edit,
  Circle,
  Trash,
  Save
} from 'lucide-react';

// Common Theme definition
interface ThemeType {
  bg: string;
  card: string;
  primary: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  error: string;
}

const theme: ThemeType = {
  bg: '#F8FAFC',
  card: '#FFFFFF',
  primary: '#6366F1',
  text: '#1A1A2E',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  success: '#10B981',
  error: '#EF4444'
};

// PROGRESS DOTS COMPONENT
interface ProgressDotsProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressDots: React.FC<ProgressDotsProps> = ({ currentStep, totalSteps }) => (
  <div className="flex gap-2 items-center">
    {Array.from({ length: totalSteps }, (_, i) => (
      <div
        key={i}
        className="transition-all duration-300"
        style={{ 
          width: i === currentStep ? '8px' : '6px',
          height: i === currentStep ? '8px' : '6px',
          borderRadius: '50%',
          backgroundColor: i === currentStep ? theme.primary : 
                         i < currentStep ? `${theme.primary}80` : theme.border,
          transform: i === currentStep ? 'scale(1.2)' : 'scale(1)'
        }}
      />
    ))}
  </div>
);

// ACTION BUTTON COMPONENT
interface ActionButtonProps {
  onClick: () => void;
  icon: React.ElementType;
  children: React.ReactNode;
  primary?: boolean;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
}

const ActionButton: React.FC<ActionButtonProps> = ({ 
  onClick, 
  icon: Icon, 
  children, 
  primary = true, 
  className = '', 
  loading = false,
  disabled = false
}) => (
  <button
    onClick={onClick}
    disabled={loading || disabled}
    className={`p-4 rounded-xl flex items-center justify-center gap-2 active:scale-[0.98] transition-all ${className}`}
    style={{ 
      backgroundColor: primary ? theme.primary : `${theme.primary}10`,
      color: primary ? 'white' : theme.primary,
      opacity: (loading || disabled) ? 0.7 : 1
    }}
  >
    {loading ? (
      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
    ) : (
      <Icon className="w-5 h-5" />
    )}
    <span className="text-base font-medium">
      {children}
    </span>
  </button>
);

// CREATION OPTION DEFINITION
interface CreationOption {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  nextTitle: string;
  nextDescription: string;
  recommended?: boolean;
}

// PRODUCT TYPE CARD COMPONENT
interface ProductTypeCardProps {
  option: CreationOption;
  onSelect: (option: CreationOption) => void;
  isSelected: boolean;
  isTransitioning: boolean;
}

const ProductTypeCard: React.FC<ProductTypeCardProps> = ({ option, onSelect, isSelected, isTransitioning }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const Icon = option.icon;

  return (
    <button
      onClick={() => !isSelected && onSelect(option)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      className="w-full transition-all duration-300 group"
      style={{ 
        transform: isSelected ? 'scale(1.02)' : 
                  isPressed ? 'scale(0.98)' :
                  isHovered ? 'scale(1.01)' : 'scale(1)',
        opacity: isTransitioning && !isSelected ? 0 : 1
      }}
    >
      <div 
        className="h-24 p-5 rounded-xl relative overflow-visible flex items-center gap-4"
        style={{ 
          backgroundColor: isSelected ? `${theme.primary}08` : theme.card,
          border: `2px solid ${isSelected || isHovered ? theme.primary : theme.border}`,
          boxShadow: isHovered && !isPressed ? '0 4px 12px rgba(99, 102, 241, 0.1)' : 'none'
        }}
      >
        {/* Icon Container */}
        <div 
          className="h-16 w-16 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0"
          style={{ 
            backgroundColor: isSelected || isHovered ? theme.primary : `${theme.primary}20`,
            transform: isPressed ? 'scale(0.95)' : 'scale(1)'
          }}
        >
          <Icon 
            className="w-8 h-8 transition-all duration-300" 
            style={{ color: isSelected || isHovered ? 'white' : theme.primary }}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 
            className="text-xl font-medium mb-1 transition-all duration-300 truncate"
            style={{ 
              color: isSelected ? theme.primary : theme.text,
            }}
          >
            {option.title}
          </h3>
          <p 
            className="text-sm truncate" 
            style={{ color: theme.textSecondary }}
          >
            {option.description}
          </p>
        </div>

        {/* Action Icon */}
        <div 
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 flex-shrink-0"
          style={{ 
            backgroundColor: isSelected || isHovered ? theme.primary : 'transparent',
            transform: `scale(${isSelected || isHovered ? '1' : '0.8'}) translateX(${isSelected || isHovered ? '0' : '-10px'})`,
            opacity: isSelected || isHovered ? 1 : 0
          }}
        >
          {isSelected ? (
            <Check className="w-4 h-4 text-white" />
          ) : (
            <ArrowRight className="w-4 h-4 text-white" />
          )}
        </div>

        {option.recommended && (
          <div 
            className="absolute -top-2.5 -right-1 px-3 py-1 text-xs font-medium rounded-full shadow-lg transition-all duration-300"
            style={{ 
              backgroundColor: theme.success,
              color: 'white',
              opacity: isTransitioning ? 0 : 1,
              transform: isHovered ? 'translateY(-1px)' : 'translateY(0)',
              zIndex: 10
            }}
          >
            Recomendado
          </div>
        )}
      </div>
    </button>
  );
};

// INPUT COMPONENT PROPS
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  hint?: string;
  error?: string;
}

const Input: React.FC<InputProps> = ({ label, hint, error, ...props }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-baseline">
      <label className="block font-medium text-base" style={{ color: theme.text }}>
        {label}
        {props.required && <span style={{ color: theme.error }}> *</span>}
      </label>
      {hint && (
        <span className="text-sm" style={{ color: theme.textSecondary }}>
          {hint}
        </span>
      )}
    </div>
    <input
      className="w-full p-3 rounded-xl border-2 bg-white text-base"
      style={{ borderColor: error ? theme.error : theme.border }}
      {...props}
    />
    {error && (
      <div className="flex items-center gap-1.5">
        <AlertCircle className="w-4 h-4" style={{ color: theme.error }} />
        <span className="text-sm" style={{ color: theme.error }}>
          {error}
        </span>
      </div>
    )}
  </div>
);

// PRICE INPUT COMPONENT
interface PriceInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  hint?: string;
  required?: boolean;
  error?: string;
}

const PriceInput: React.FC<PriceInputProps> = ({ label, value, onChange, hint, required, error }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-baseline">
      <div className="flex items-center gap-0.5">
        <label className="block font-medium text-base" style={{ color: theme.text }}>
          {label}
        </label>
        {required && <span className="text-base" style={{ color: theme.error }}>*</span>}
      </div>
      {hint && (
        <span className="text-sm" style={{ color: theme.textSecondary }}>
          {hint}
        </span>
      )}
    </div>
    <div className="relative">
      <input
        type="text"
        value={value ? Number(value).toLocaleString() : ''}
        onChange={(e) => {
          const rawValue = e.target.value.replace(/\D/g, '');
          onChange(rawValue);
        }}
        className="w-full p-3 pl-3 rounded-xl border-2 bg-white text-base"
        style={{ 
          borderColor: error ? theme.error : theme.border,
          color: theme.text
        }}
        placeholder="$ 0"
      />
    </div>
    {error && (
      <div className="flex items-center gap-1.5">
        <AlertCircle className="w-4 h-4" style={{ color: theme.error }} />
        <span className="text-sm" style={{ color: theme.error }}>
          {error}
        </span>
      </div>
    )}
  </div>
);

// TAG INPUT COMPONENT
interface TagInputProps {
  value: string[];
  onChange: (tags: string[]) => void;
}

const TagInput: React.FC<TagInputProps> = ({ value = [], onChange }) => {
  const commonTags: string[] = [
    'Bebidas', 'Snacks', 'Dulces', 'Lácteos',
    'Limpieza', 'Papelería', 'Mascotas'
  ];

  const [input, setInput] = useState<string>('');

  const handleAdd = (tag: string) => {
    if (value.length < 5 && !value.includes(tag)) {
      onChange([...value, tag]);
      setInput('');
    }
  };

  const filteredSuggestions = input
    ? commonTags.filter(tag => 
        tag.toLowerCase().includes(input.toLowerCase()) &&
        !value.includes(tag)
      )
    : commonTags.filter(tag => !value.includes(tag));

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <label className="block font-medium text-base" style={{ color: theme.text }}>
          Categorías
        </label>
        <span className="text-sm" style={{ color: theme.textSecondary }}>
          {value.length}/5
        </span>
      </div>

      <div className="flex flex-wrap gap-2 min-h-[32px]">
        {value.map((tag, i) => (
          <span 
            key={i} 
            className="px-3 py-1.5 rounded-full flex items-center text-base"
            style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}
          >
            {tag}
            <button 
              onClick={() => onChange(value.filter((_, index) => index !== i))}
              className="ml-1.5 w-5 h-5 inline-flex items-center justify-center hover:bg-black/5 rounded-full"
              title="Eliminar"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {value.length < 5 && (
        <>
          <div className="relative">
            <input
              value={input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && input.trim()) {
                  handleAdd(input.trim());
                }
              }}
              placeholder="Agregar categoría..."
              className="w-full p-3 rounded-xl border-2 bg-white text-base"
              style={{ borderColor: theme.border }}
            />
            {input && (
              <button
                onClick={() => handleAdd(input.trim())}
                className="absolute right-2 top-2 p-1.5 rounded-lg"
                style={{ backgroundColor: `${theme.primary}15`, color: theme.primary }}
              >
                <Plus className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Category Suggestions */}
          {(input ? filteredSuggestions : commonTags)
            .slice(0, 5)
            .map((tag, i) => (
              <button
                key={i}
                onClick={() => handleAdd(tag)}
                className="px-3 py-1.5 rounded-full text-sm mr-2 transition-transform active:scale-95"
                style={{ 
                  backgroundColor: `${theme.primary}08`,
                  color: theme.primary
                }}
              >
                + {tag}
              </button>
            ))}
        </>
      )}
    </div>
  );
};

// VARIANT DEFINITION
interface Variant {
  name: string;
  price: string;
  stock: string;
}

// FORM STATE DEFINITION
interface FormState {
  name: string;
  description: string;
  price: string;
  purchasePrice: string;
  stock: string;
  tags: string[];
  ivaRate: string;
  showCustomIva: boolean;
  barcode: string;
  images: string[];
  showVariants: boolean;
  variants: Variant[];
  variantName: string;
  variantPrice: string;
  variantStock: string;
}

// NEXT SCREEN FOR PRODUCT SELECTION
interface NextScreenProps {
  option: CreationOption;
  isVisible: boolean;
  onBack: () => void;
  onProceed: () => void;
}

const NextScreen: React.FC<NextScreenProps> = ({ option, isVisible, onBack, onProceed }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleProceed = async (): Promise<void> => {
    setIsLoading(true);
    // Simulate loading before proceeding
    await new Promise(resolve => setTimeout(resolve, 800));
    setIsLoading(false);
    onProceed();
  };

  return (
    <div 
      className="fixed inset-0 transition-all duration-500 ease-in-out flex flex-col"
      style={{ 
        backgroundColor: theme.bg,
        transform: `translateX(${isVisible ? '0%' : '100%'})`,
        opacity: isVisible ? 1 : 0,
        zIndex: 50
      }}
    >
      <div className="px-6 py-4 border-b sticky top-0 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-all duration-200"
            >
              <ChevronLeft className="w-6 h-6" style={{ color: theme.text }} />
            </button>
            <h1 className="text-2xl font-medium" style={{ color: theme.text }}>
              {option.nextTitle}
            </h1>
          </div>
        </div>
      </div>
      
      <div className="p-6 flex-1">
        <p style={{ color: theme.textSecondary }} className="mb-6">
          {option.nextDescription}
        </p>
        
        {/* Additional content specific to each product type */}
        <div className="p-4 rounded-xl border border-dashed" style={{ borderColor: theme.border }}>
          <p className="text-center" style={{ color: theme.textSecondary }}>
            Este es un placeholder para el formulario de {option.title}
          </p>
        </div>
      </div>
      
      {/* Bottom buttons */}
      <div className="p-4 border-t" style={{ backgroundColor: theme.card, borderColor: theme.border }}>
        <div className="grid grid-cols-2 gap-3">
          <ActionButton
            onClick={onBack}
            icon={X}
            primary={false}
            className=""
          >
            Cancelar
          </ActionButton>

          <ActionButton
            onClick={handleProceed}
            icon={ArrowRight}
            loading={isLoading}
            primary={true}
          >
            Continuar
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

// PRODUCT CREATION FORM COMPONENT
interface ProductCreateFormProps {
  isVisible: boolean;
  productType: CreationOption | null;
  onBack: () => void;
  onProductCreated: (product: any) => void;
}

const ProductCreateForm: React.FC<ProductCreateFormProps> = ({ isVisible, productType, onBack, onProductCreated }) => {
  const [form, setForm] = useState<FormState>({
    name: '',
    description: '',
    price: '',
    purchasePrice: '',
    stock: '',
    tags: [],
    ivaRate: '19%',
    showCustomIva: false,
    barcode: '',
    images: [],
    showVariants: false,
    variants: [],
    variantName: '',
    variantPrice: '',
    variantStock: ''
  });

  const handleChange = <K extends keyof FormState>(field: K, value: FormState[K]) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Determine if the form is valid and can be submitted
  const isFormValid = (): boolean => {
    // Basic validation - name and price are required
    return !!form.name.trim() && !!form.price;
  };

  return (
    <div 
      className="fixed inset-0 transition-all duration-500 ease-in-out flex flex-col"
      style={{ 
        backgroundColor: theme.bg,
        transform: `translateY(${isVisible ? '0%' : '100%'})`,
        opacity: isVisible ? 1 : 0,
        zIndex: 60
      }}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 px-6 py-4 border-b" 
        style={{ backgroundColor: theme.bg, borderColor: theme.border }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="p-2 rounded-lg active:bg-gray-100 transition-all duration-200" 
              style={{ backgroundColor: theme.card }}
            >
              <ChevronLeft className="w-6 h-6" style={{ color: theme.text }} />
            </button>
            <span className="text-xl font-medium" style={{ color: theme.text }}>
              Nuevo {productType?.title || "Producto"}
            </span>
          </div>
          <ProgressDots currentStep={2} totalSteps={3} />
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          {/* Image & Barcode Section */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <label className="block font-medium text-base" style={{ color: theme.text }}>
                Fotos e identificación
              </label>
              <span className="text-sm" style={{ color: theme.textSecondary }}>
                Máximo 3 fotos
              </span>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              <button 
                className="w-20 h-20 rounded-xl flex-shrink-0 flex flex-col items-center justify-center gap-1.5 active:scale-95 transition-transform"
                style={{ 
                  backgroundColor: `${theme.primary}08`,
                  border: `2px dashed ${theme.primary}`
                }}
              >
                <PlusSquare className="w-5 h-5" style={{ color: theme.primary }} />
                <span className="text-xs" style={{ color: theme.primary }}>
                  Subir
                </span>
              </button>
              
              <button 
                className="w-20 h-20 rounded-xl flex-shrink-0 flex flex-col items-center justify-center gap-1.5 active:scale-95 transition-transform"
                style={{ 
                  backgroundColor: theme.card,
                  border: `2px dashed ${theme.border}`
                }}
              >
                <Camera className="w-5 h-5" style={{ color: theme.textSecondary }} />
                <span className="text-xs" style={{ color: theme.textSecondary }}>
                  Cámara
                </span>
              </button>

              <button 
                className="w-20 h-20 rounded-xl flex-shrink-0 flex flex-col items-center justify-center gap-1.5 active:scale-95 transition-transform"
                style={{ 
                  backgroundColor: theme.card,
                  border: `2px dashed ${theme.border}`
                }}
              >
                <Barcode className="w-5 h-5" style={{ color: theme.textSecondary }} />
                <span className="text-xs" style={{ color: theme.textSecondary }}>
                  Código
                </span>
              </button>

              {form.images.map((image, index) => (
                <div 
                  key={index}
                  className="relative w-20 h-20 rounded-xl flex-shrink-0 overflow-hidden group"
                  style={{ border: `1px solid ${theme.border}` }}
                >
                  <img
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => {
                      const newImages = [...form.images];
                      newImages.splice(index, 1);
                      handleChange('images', newImages);
                    }}
                    className="absolute top-1 right-1 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: `${theme.error}dd` }}
                  >
                    <Minus className="w-4 h-4 text-white" />
                  </button>
                </div>
              ))}
            </div>
            
            {form.barcode && (
              <div 
                className="mt-3 p-3 rounded-xl flex items-center gap-3"
                style={{ backgroundColor: `${theme.success}08` }}
              >
                <Barcode className="w-5 h-5" style={{ color: theme.success }} />
                <div className="flex-1">
                  <p className="text-sm font-medium" style={{ color: theme.text }}>
                    Código escaneado
                  </p>
                  <p className="text-sm" style={{ color: theme.textSecondary }}>
                    {form.barcode}
                  </p>
                </div>
                <button
                  onClick={() => handleChange('barcode', '')}
                  className="p-1.5 rounded-lg"
                  style={{ color: theme.textSecondary }}
                >
                  <Minus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Basic Info */}
          <Input
            label="Nombre del producto"
            placeholder="Ej: Coca Cola 500ml"
            value={form.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
            required
          />

          <Input
            label="Descripción"
            placeholder="Ej: Refresco carbonatado"
            value={form.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('description', e.target.value)}
            hint="Opcional - Se mostrará en las facturas"
          />

          {/* Prices */}
          <div className="grid grid-cols-2 gap-4">
            <PriceInput
              label="Precio de venta"
              value={form.price}
              onChange={(value) => handleChange('price', value)}
              required
            />
            <PriceInput
              label="Precio de compra"
              value={form.purchasePrice}
              onChange={(value) => handleChange('purchasePrice', value)}
            />
          </div>

          {/* IVA Rate */}
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <label className="block font-medium text-base" style={{ color: theme.text }}>
                Tasa de IVA
              </label>
              <button 
                onClick={() => handleChange('showCustomIva', !form.showCustomIva)}
                className="text-sm"
                style={{ color: theme.primary }}
              >
                {form.showCustomIva ? 'Usar presets' : 'Personalizar'}
              </button>
            </div>
            {form.showCustomIva ? (
              <div className="relative">
                <input
                  type="number"
                  value={form.ivaRate?.replace('%', '')}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('ivaRate', `${e.target.value}%`)}
                  placeholder="19"
                  className="w-full p-3 pr-8 rounded-xl border-2 bg-white text-base"
                  style={{ borderColor: theme.border }}
                />
                <span 
                  className="absolute right-3 top-3 font-medium"
                  style={{ color: theme.textSecondary }}
                >
                  %
                </span>
              </div>
            ) : (
              <div className="flex gap-2">
                {['19%', '5%', '0%'].map((rate) => (
                  <button
                    key={rate}
                    onClick={() => handleChange('ivaRate', rate)}
                    className="px-4 py-2.5 rounded-xl text-base flex-1"
                    style={{
                      backgroundColor: form.ivaRate === rate ? theme.primary : `${theme.primary}10`,
                      color: form.ivaRate === rate ? 'white' : theme.primary
                    }}
                  >
                    {rate}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Stock */}
          <div className="space-y-2">
            <label className="block font-medium text-base" style={{ color: theme.text }}>
              Stock inicial
            </label>
            <div className="relative">
              <input
                type="number"
                value={form.stock}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('stock', e.target.value)}
                placeholder="0"
                className="w-full p-3 rounded-xl border-2 bg-white text-base"
                style={{ borderColor: theme.border }}
              />
            </div>
          </div>

          {/* Variants */}
          <div className="border rounded-xl overflow-hidden" style={{ borderColor: theme.border }}>
            <div className="p-4">
              <button
                onClick={() => handleChange('showVariants', !form.showVariants)}
                className="flex items-center gap-2 w-full"
              >
                <Plus className="w-5 h-5" style={{ color: theme.primary }} />
                <span className="text-base font-medium" style={{ color: theme.text }}>
                  Agregar variante
                </span>
              </button>
            </div>

            {form.variants?.length > 0 && (
              <div className="border-t" style={{ borderColor: theme.border }}>
                {form.variants.map((variant, index) => (
                  <div 
                    key={index}
                    className="p-4 flex items-center gap-3 border-b last:border-b-0"
                    style={{ borderColor: theme.border }}
                  >
                    <div className="flex-1">
                      <p className="font-medium" style={{ color: theme.text }}>{variant.name}</p>
                      <div className="flex items-center gap-4 mt-1">
                        <span style={{ color: theme.textSecondary }}>
                          ${Number(variant.price).toLocaleString()}
                        </span>
                        <span style={{ color: theme.textSecondary }}>
                          Stock: {variant.stock}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const newVariants = [...form.variants];
                        newVariants.splice(index, 1);
                        handleChange('variants', newVariants);
                      }}
                      className="p-2 rounded-lg"
                      style={{ color: theme.error }}
                    >
                      <Minus className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {form.showVariants && (
              <div className="border-t p-4 space-y-4" style={{ borderColor: theme.border }}>
                <Input
                  label="Nombre de variante"
                  placeholder="Ej: Grande, Pequeño, etc."
                  value={form.variantName || ''}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('variantName', e.target.value)}
                  error={form.variants?.some(v => v.name === form.variantName) ? 
                    'Ya existe una variante con este nombre' : undefined}
                  required
                />
                <div className="grid grid-cols-2 gap-3">
                  <PriceInput
                    label="Precio de venta"
                    value={form.variantPrice || ''}
                    onChange={(value) => handleChange('variantPrice', value)}
                    required
                  />
                  <Input
                    label="Stock inicial"
                    type="number"
                    placeholder="0"
                    value={form.variantStock || ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('variantStock', e.target.value)}
                  />
                </div>
                <button
                  onClick={() => {
                    if (!form.variantName?.trim() || !form.variantPrice) return;
                    if (form.variants?.some(v => v.name === form.variantName?.trim())) return;
                    
                    const newVariant: Variant = {
                      name: form.variantName.trim(),
                      price: form.variantPrice,
                      stock: form.variantStock || '0'
                    };
                    
                    handleChange('variants', [...(form.variants || []), newVariant]);
                    handleChange('variantName', '');
                    handleChange('variantPrice', '');
                    handleChange('variantStock', '');
                    handleChange('showVariants', false);
                  }}
                  disabled={!form.variantName?.trim() || !form.variantPrice || 
                           form.variants?.some(v => v.name === form.variantName?.trim())}
                  className="w-full p-3 rounded-xl text-white transition-opacity"
                  style={{ 
                    backgroundColor: theme.primary,
                    opacity: (!form.variantName?.trim() || !form.variantPrice || 
                           form.variants?.some(v => v.name === form.variantName?.trim())) ? 0.5 : 1
                  }}
                >
                  Guardar variante
                </button>
              </div>
            )}
          </div>

          {/* Categories */}
          <TagInput
            value={form.tags}
            onChange={(tags) => handleChange('tags', tags)}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="sticky bottom-0 p-4 border-t" 
        style={{ backgroundColor: theme.card, borderColor: theme.border }}>
        <button
          className="w-full p-4 rounded-xl text-white flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          style={{ 
            backgroundColor: theme.primary,
            opacity: isFormValid() ? 1 : 0.7
          }}
          disabled={!isFormValid()}
          onClick={() => {
            if (isFormValid()) {
              // Create product object from form data
              const product = {
                name: form.name,
                description: form.description,
                price: form.price,
                purchasePrice: form.purchasePrice,
                stock: form.stock,
                ivaRate: form.ivaRate,
                tags: form.tags,
                variants: form.variants,
                images: form.images.length > 0 ? form.images : ['/api/placeholder/100/100']
              };
              
              // Pass product data to parent component
              onProductCreated(product);
            }
          }}
        >
          <Plus className="w-6 h-6" />
          <span className="text-lg font-medium">
            Guardar {productType?.title || 'Producto'}
          </span>
        </button>
      </div>
    </div>
  );
};

// MAIN INTEGRATED COMPONENT
// PRODUCT REVIEW COMPONENT
interface ProductReviewProps {
  isVisible: boolean;
  product: any;
  onBack: () => void;
}

const ProductReview: React.FC<ProductReviewProps> = ({ isVisible, product, onBack }) => {
  const [isActive, setIsActive] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedMainCategory, setSelectedMainCategory] = useState(0);

  return (
    <div 
      className="fixed inset-0 transition-all duration-500 ease-in-out flex flex-col"
      style={{ 
        backgroundColor: theme.bg,
        transform: `translateY(${isVisible ? '0%' : '100%'})`,
        opacity: isVisible ? 1 : 0,
        zIndex: 70
      }}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 px-4 py-3 border-b" 
        style={{ backgroundColor: theme.bg, borderColor: theme.border }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={onBack}
              className="p-2 rounded-lg" 
              style={{ backgroundColor: theme.card }}
            >
              <ChevronLeft className="w-5 h-5" style={{ color: theme.text }} />
            </button>
            <span className="text-lg font-medium" style={{ color: theme.text }}>
              Revisar Producto
            </span>
          </div>
          <ProgressDots currentStep={3} totalSteps={3} />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6 mb-32">
          {/* Product Info */}
          <div className="bg-white rounded-xl p-4">
            <div className="flex justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="font-medium text-lg" style={{ color: theme.text }}>
                    {product.name}
                  </h2>
                  <div
                    className="px-2 py-0.5 rounded-full text-sm"
                    style={{ 
                      backgroundColor: isActive ? `${theme.success}15` : `${theme.textSecondary}15`,
                      color: isActive ? theme.success : theme.textSecondary
                    }}
                  >
                    {isActive ? 'Activo' : 'Inactivo'}
                  </div>
                </div>
                <p className="text-sm" style={{ color: theme.textSecondary }}>
                  {product.description}
                </p>
              </div>
              <button 
                className="p-1.5 h-fit rounded-lg"
                style={{ backgroundColor: `${theme.primary}10` }}
                onClick={onBack}
              >
                <Edit className="w-4 h-4" style={{ color: theme.primary }} />
              </button>
            </div>
            <div className="flex gap-2 mt-3">
              {product.images && product.images.map((image:any, index:any) => (
                <div 
                  key={index}
                  className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100"
                  style={{ border: `1px solid ${theme.border}` }}
                >
                  <img 
                    src={image} 
                    alt={`Product ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ 
                    backgroundColor: isActive ? `${theme.success}15` : `${theme.textSecondary}15`,
                    border: `1px solid ${isActive ? theme.success : theme.textSecondary}`
                  }}
                >
                  <Check 
                    className="w-5 h-5" 
                    style={{ color: isActive ? theme.success : theme.textSecondary }} 
                  />
                </div>
                <div>
                  <p className="font-medium" style={{ color: theme.text }}>
                    {isActive ? 'Producto Activo' : 'Producto Inactivo'}
                  </p>
                  <p className="text-sm" style={{ color: theme.textSecondary }}>
                    {isActive ? 'Se mostrará en el inventario' : 'No visible en el inventario'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsActive(!isActive)}
                className="relative w-12 h-6 rounded-full transition-colors duration-200"
                style={{ 
                  backgroundColor: isActive ? theme.success : theme.textSecondary 
                }}
              >
                <div 
                  className="absolute w-4 h-4 rounded-full bg-white transition-transform duration-200"
                  style={{
                    top: '4px',
                    left: '4px',
                    transform: isActive ? 'translateX(24px)' : 'translateX(0)'
                  }}
                />
              </button>
            </div>
          </div>

          {/* Price Info */}
          <div className="bg-white rounded-xl p-4">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-sm mb-1" style={{ color: theme.textSecondary }}>
                  Precio de venta
                </p>
                <p className="text-xl font-medium" style={{ color: theme.text }}>
                  ${Number(product.price).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-sm mb-1" style={{ color: theme.textSecondary }}>
                  Precio de compra
                </p>
                <p className="text-xl font-medium" style={{ color: theme.text }}>
                  ${Number(product.purchasePrice || 0).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="flex justify-between pt-3 border-t" style={{ borderColor: theme.border }}>
              <div>
                <p className="text-sm" style={{ color: theme.textSecondary }}>IVA</p>
                <p className="font-medium" style={{ color: theme.text }}>{product.ivaRate}</p>
              </div>
              <div>
                <p className="text-sm" style={{ color: theme.textSecondary }}>Margen</p>
                <p className="font-medium" style={{ color: theme.success }}>
                  {calculateMargin(product.price, product.purchasePrice)}
                </p>
              </div>
            </div>
          </div>

          {/* Stock */}
          <div className="bg-white rounded-xl p-4">
            <p className="text-sm mb-1" style={{ color: theme.textSecondary }}>
              Stock inicial
            </p>
            <p className="text-xl font-medium" style={{ color: theme.text }}>
              {product.stock} unidades
            </p>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-xl p-4">
            <p className="font-medium mb-3" style={{ color: theme.text }}>
              Categorías
            </p>
            <div className="flex flex-wrap gap-2">
              {product.tags && product.tags.map((category:any, index:any) => (
                <button
                  key={index}
                  onClick={() => setSelectedMainCategory(index)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg"
                  style={{ 
                    backgroundColor: selectedMainCategory === index ? `${theme.primary}15` : theme.card,
                    border: `1px solid ${selectedMainCategory === index ? theme.primary : theme.border}`,
                    color: selectedMainCategory === index ? theme.primary : theme.text
                  }}
                >
                  <Circle 
                    className="w-4 h-4" 
                    style={{ 
                      fill: selectedMainCategory === index ? theme.primary : 'transparent',
                      stroke: selectedMainCategory === index ? theme.primary : theme.border
                    }}
                  />
                  <span>{category}</span>
                  {selectedMainCategory === index && (
                    <span 
                      className="text-xs px-1.5 py-0.5 rounded"
                      style={{ backgroundColor: `${theme.primary}20` }}
                    >
                      Principal
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Variants */}
          {product.variants && product.variants.length > 0 && (
            <div className="bg-white rounded-xl p-4">
              <p className="font-medium mb-3" style={{ color: theme.text }}>
                Variantes ({product.variants.length})
              </p>
              <div className="space-y-3">
                {product.variants.map((variant:any, index:any) => (
                  <div 
                    key={index}
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: theme.bg }}
                  >
                    <div className="flex justify-between mb-1">
                      <p className="font-medium" style={{ color: theme.text }}>
                        {variant.name}
                      </p>
                      <p className="font-medium" style={{ color: theme.text }}>
                        ${Number(variant.price).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span style={{ color: theme.textSecondary }}>
                        Compra: ${Number(variant.price).toLocaleString()}
                      </span>
                      <span style={{ color: theme.textSecondary }}>
                        Stock: {variant.stock}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-white" 
        style={{ borderColor: theme.border }}>
        <div className="p-4">
          <button
            className="w-full p-4 rounded-xl text-white flex items-center justify-center gap-2"
            style={{ backgroundColor: theme.primary }}
            onClick={() => alert(`¡Producto ${isActive ? 'agregado al inventario' : 'guardado como inactivo'}!`)}
          >
            {isActive ? (
              <>
                <Plus className="w-6 h-6" />
                <span className="text-xl font-medium">Agregar al Inventario</span>
              </>
            ) : (
              <>
                <Save className="w-6 h-6" />
                <span className="text-xl font-medium">Guardar como Inactivo</span>
              </>
            )}
          </button>
        </div>
        <div className="px-4 pb-4 text-center">
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-sm font-medium flex items-center justify-center gap-2 mx-auto p-2"
            style={{ color: theme.error }}
          >
            <Trash className="w-5 h-5" />
            <span>Eliminar producto</span>
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div 
          className="fixed inset-0 bg-black/50 flex items-end z-50"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div 
            className="w-full bg-white rounded-t-xl p-4 space-y-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: `${theme.error}15` }}
              >
                <AlertCircle className="w-5 h-5" style={{ color: theme.error }} />
              </div>
              <div>
                <h3 className="font-medium" style={{ color: theme.text }}>
                  ¿Eliminar producto?
                </h3>
                <p className="text-sm" style={{ color: theme.textSecondary }}>
                  Esta acción no se puede deshacer
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                className="p-3 rounded-xl text-center w-full"
                style={{ 
                  backgroundColor: theme.card,
                  border: `1px solid ${theme.border}`,
                  color: theme.text
                }}
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancelar
              </button>
              <button
                className="p-3 rounded-xl text-center w-full text-white"
                style={{ backgroundColor: theme.error }}
                onClick={() => {
                  alert('Producto eliminado');
                  setShowDeleteConfirm(false);
                }}
              >
                Sí, eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper function to calculate margin
const calculateMargin = (price:any, purchasePrice:any) => {
  if (!price || !purchasePrice || purchasePrice === 0) return "0%";
  const margin = ((price - purchasePrice) / price) * 100;
  return `${Math.round(margin)}%`;
};

interface NavigationState {
  selectedOption: CreationOption | null;
  currentStep: number;
  isTransitioning: boolean;
  createdProduct: any | null;
}

const IntegratedProductSystem: React.FC = () => {
  const [navState, setNavState] = useState<NavigationState>({
    selectedOption: null,
    currentStep: 0,
    isTransitioning: false,
    createdProduct: null
  });

  // Define creation options
  const creationOptions: CreationOption[] = [
    {
      id: 'physical',
      icon: Package,
      title: 'Producto Físico',
      description: 'Ropa, Alimentos, Electrónicos',
      nextTitle: 'Nuevo Producto Físico',
      nextDescription: 'Completa los detalles del producto físico'
    },
    {
      id: 'service',
      icon: Clock,
      title: 'Servicio',
      description: 'Consultas, Cortes, Tratamientos',
      nextTitle: 'Nuevo Servicio',
      nextDescription: 'Define los detalles del servicio'
    },
    {
      id: 'digital',
      icon: FileText,
      title: 'Servicios Digitales',
      description: 'Recargas, Paquetes, Pagos',
      nextTitle: 'Nuevo Servicio Digital',
      nextDescription: 'Configura el servicio digital'
    },
    {
      id: 'duplicate',
      icon: Copy,
      title: 'Duplicar Producto/Servicio',
      description: 'Copiar y modificar existente',
      recommended: true,
      nextTitle: 'Seleccionar Producto',
      nextDescription: 'Elige el producto que quieres duplicar'
    },
    {
      id: 'smart',
      icon: Sparkles,
      title: 'Smart Create',
      description: 'IA completa los detalles',
      nextTitle: 'Smart Create',
      nextDescription: 'La IA te ayudará a completar los detalles'
    }
  ];

  // Handle selection of a product type
  const handleSelect = (option: CreationOption): void => {
    setNavState(prev => ({
      ...prev,
      selectedOption: option
    }));
    
    setTimeout(() => {
      setNavState(prev => ({
        ...prev,
        isTransitioning: true
      }));
      
      setTimeout(() => {
        setNavState(prev => ({
          ...prev,
          currentStep: 1
        }));
      }, 300);
    }, 200);
  };

  // Handle going back to the previous step
  const handleBack = (): void => {
    if (navState.currentStep === 2) {
      // If we're on step 2 (product form), go back to step 1 (confirmation screen)
      setNavState(prev => ({
        ...prev,
        currentStep: 1
      }));
    } else {
      // If we're on step 1, go back to selection
      setNavState(prev => ({
        ...prev,
        isTransitioning: false
      }));
      
      setTimeout(() => {
        setNavState(prev => ({
          ...prev,
          currentStep: 0,
          selectedOption: null
        }));
      }, 300);
    }
  };

  // Handle proceeding to the product form
  const handleProceed = (): void => {
    setNavState(prev => ({
      ...prev,
      currentStep: 2
    }));
  };
  
  // Handle product creation completion
  const handleProductCreated = (product: any): void => {
    setNavState(prev => ({
      ...prev,
      currentStep: 3,
      createdProduct: product
    }));
  };

  return (
    <div className="min-h-screen relative" style={{ backgroundColor: theme.bg }}>
      {/* Main Content - Product Type Selection */}
      <div 
        className="transition-all duration-500 ease-in-out"
        style={{ 
          opacity: navState.isTransitioning ? 0.3 : 1,
          transform: `translateX(${navState.isTransitioning ? '-5%' : '0'})`
        }}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 px-6 py-4 border-b flex items-center justify-between" 
          style={{ backgroundColor: theme.bg, borderColor: theme.border }}>
          <div className="flex items-center gap-3">
            <button 
              className="p-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-all duration-200" 
              style={{ backgroundColor: theme.card }}
            >
              <ChevronLeft className="w-6 h-6" style={{ color: theme.text }} />
            </button>
            <span className="text-xl font-medium" style={{ color: theme.text }}>
              Nuevo Producto
            </span>
          </div>
          <ProgressDots currentStep={navState.currentStep} totalSteps={3} />
        </div>

        <div className="p-6 space-y-6">
          {/* Title */}
          <div>
            <h1 className="text-2xl font-medium mb-2" style={{ color: theme.text }}>
              ¿Cómo quieres empezar?
            </h1>
            <p 
              className="text-base"
              style={{ color: theme.textSecondary }}
            >
              Elige cómo crear tu producto o servicio
            </p>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {creationOptions.map((option) => (
              <ProductTypeCard
                key={option.id}
                option={option}
                onSelect={handleSelect}
                isSelected={navState.selectedOption?.id === option.id}
                isTransitioning={navState.isTransitioning}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Next Screen - Confirm product type */}
      {navState.selectedOption && (
        <NextScreen 
          option={navState.selectedOption}
          isVisible={navState.currentStep === 1}
          onBack={handleBack}
          onProceed={handleProceed}
        />
      )}

      {/* Product Create Form */}
      {navState.selectedOption && (
        <ProductCreateForm
          isVisible={navState.currentStep === 2}
          productType={navState.selectedOption}
          onBack={handleBack}
          onProductCreated={handleProductCreated}
        />
      )}
      
      {/* Product Review Screen */}
      {navState.createdProduct && (
        <ProductReview
          isVisible={navState.currentStep === 3}
          product={navState.createdProduct}
          onBack={() => setNavState(prev => ({ ...prev, currentStep: 2 }))}
        />
      )}
    </div>
  );
};

export default IntegratedProductSystem;