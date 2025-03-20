import React, { useState, ChangeEvent } from 'react';
import { 
  ChevronLeft, 
  Camera,
  Plus,
  PlusSquare,
  Minus,
  Barcode,
  AlertCircle
} from 'lucide-react';

// Theme definition
interface ThemeColors {
  bg: string;
  card: string;
  primary: string;
  text: string;
  textSecondary: string;
  border: string;
  success: string;
  error: string;
}

const theme: ThemeColors = {
  bg: '#F8FAFC',
  card: '#FFFFFF',
  primary: '#6366F1',
  text: '#1A1A2E',
  textSecondary: '#64748B',
  border: '#E2E8F0',
  success: '#10B981',
  error: '#EF4444'
};

// Input component props
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

// PriceInput component props
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

// TagInput component props
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
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

// Variant interface
interface Variant {
  name: string;
  price: string;
  stock: string;
}

// Form state interface
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

const ProductCreate: React.FC = () => {
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

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.bg }}>
      {/* Header */}
      <div className="sticky top-0 z-10 px-6 py-4 border-b" 
        style={{ backgroundColor: theme.bg, borderColor: theme.border }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              className="p-2 rounded-lg active:bg-gray-100" 
              style={{ backgroundColor: theme.card }}
            >
              <ChevronLeft className="w-6 h-6" style={{ color: theme.text }} />
            </button>
            <span className="text-xl font-medium" style={{ color: theme.text }}>
              Nuevo Producto
            </span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3].map((dot) => (
              <div
                key={dot}
                className="rounded-full"
                style={{
                  width: dot === 2 ? '8px' : '6px',
                  height: dot === 2 ? '8px' : '6px',
                  backgroundColor: dot === 2 ? theme.primary : 
                                dot < 2 ? `${theme.primary}80` : theme.border
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Form */}
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
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
          required
        />

        <Input
          label="Descripción"
          placeholder="Ej: Refresco carbonatado"
          value={form.description}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('description', e.target.value)}
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('ivaRate', `${e.target.value}%`)}
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
              onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('stock', e.target.value)}
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('variantName', e.target.value)}
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
                  onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange('variantStock', e.target.value)}
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

      {/* Save Button */}
      <div className="sticky bottom-0 p-4 border-t" 
        style={{ backgroundColor: theme.card, borderColor: theme.border }}>
        <button
          className="w-full p-4 rounded-xl text-white flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
          style={{ backgroundColor: theme.primary }}
        >
          <Plus className="w-6 h-6" />
          <span className="text-lg font-medium">
            Guardar Producto
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductCreate;