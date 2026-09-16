import React, { useState, useMemo } from 'react';
import { ChemicalProduct } from '../types';
import { ProductCard } from './ProductCard';
import { 
  Search, 
  Filter, 
  FileDown, 
  RotateCcw, 
  Sprout, 
  Bug, 
  Tag, 
  ShieldCheck,
  CheckCircle2,
  X,
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  Layers,
  ArrowUpDown,
  Info,
  Sliders,
  Sparkles,
  Activity,
  Calculator,
  ShieldAlert,
  Clock,
  Trash2,
  Upload,
  Table,
  Warehouse,
  HeartPulse
} from 'lucide-react';
import { exportCropGuidePDF } from '../utils/pdfExport';
import { useLanguage } from '../context/LanguageContext';
import { MOA_DATABASE } from '../data/moaData';
import { CollapsibleUserGuide } from './CollapsibleUserGuide';

interface DatabaseViewProps {
  products: ChemicalProduct[];
  /** Count of built-in catalogue entries (before user-imported customs). */
  baselineCount: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSelectProduct: (product: ChemicalProduct) => void;
  onOpenCalculator: (product: ChemicalProduct) => void;
  onOpenSafety: (product: ChemicalProduct) => void;
  onUpdateProducts?: (newProducts: ChemicalProduct[]) => void;
  onResetProducts?: () => void;
}

const CROP_EMOJIS: Record<string, string> = {
  'all': '🌟',
  'Rice': '🌾',
  'Potato': '🥔',
  'Tomato': '🍅',
  'Brinjal': '🍆',
  'Mango': '🥭',
  'Tea': '🍵',
  'Jute': '🌱',
  'Cotton': '☁️',
  'Wheat': '🌾',
  'Mustard': '🌼',
  'Sugarcane': '🎋',
  'Bean': '🫛',
  'Cauliflower': '🥦',
  'Cabbage': '🥬',
  'Chilli': '🌶️',
  'Cucumber': '🥒',
  'Cucurbits': '🎃',
  'Maize': '🌽',
  'Onion': '🧅',
  'Garlic': '🧄',
  'Pulses': '🫘',
  'Groundnut': '🥜',
  'Citrus': '🍊'
};

export const DatabaseView: React.FC<DatabaseViewProps> = ({
  products,
  baselineCount,
  searchQuery,
  setSearchQuery,
  onSelectProduct,
  onOpenCalculator,
  onOpenSafety,
  onUpdateProducts,
  onResetProducts
}) => {
  const { language, t, transCrop, transCat, transRisk, transPest, transDose, formatNum } = useLanguage();
  const moaInfoMap = useMemo(() => Object.fromEntries(MOA_DATABASE.map(m => [m.code, m])), []);

  // Importer & Registry States
  const [isImporterOpen, setIsImporterOpen] = useState<boolean>(false);
  const [pastedData, setPastedData] = useState<string>('');
  const [parsedPreview, setParsedPreview] = useState<ChemicalProduct[]>([]);
  const [importError, setImportError] = useState<string>('');
  const [importSuccess, setImportSuccess] = useState<string>('');

  // Primary navigation states
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCrop, setSelectedCrop] = useState<string>('all');
  const [selectedIngredient, setSelectedIngredient] = useState<string>('all');
  
  // Advanced filters (collapsible)
  const [selectedMoA, setSelectedMoA] = useState<string>('all');
  const [selectedRisk, setSelectedRisk] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'type' | 'phi' | 'reg'>('name');
  
  // View mode & UX controls
  const [viewMode, setViewMode] = useState<'table' | 'grouped' | 'grid'>('table');
  const [showMobileFilters, setShowMobileFilters] = useState<boolean>(false);
  const [expandedIngredients, setExpandedIngredients] = useState<Record<string, boolean>>({});
  const [visibleLimit, setVisibleLimit] = useState<number>(50);

  // Dynamic list of unique categories in entire catalog
  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.type) set.add(p.type);
    });
    return ['all', ...Array.from(set).sort()];
  }, [products]);

  // Dynamic list of unique crops in entire catalog
  const cropList = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      p.crops.forEach((c) => set.add(c));
    });
    return ['all', ...Array.from(set).sort()];
  }, [products]);

  const moaCodes = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.moaCode) set.add(p.moaCode);
    });
    return ['all', ...Array.from(set).sort()];
  }, [products]);

  // Compute live category counts based on other current filters (crop, search query, MoA, Risk)
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { 'all': 0 };
    products.forEach((p) => {
      const matchesSearch = !searchQuery.trim() || (() => {
        const q = searchQuery.toLowerCase().trim();
        return p.tradeName.toLowerCase().includes(q) ||
               p.commonName.toLowerCase().includes(q) ||
               p.registrationHolder.toLowerCase().includes(q) ||
               p.registrationNo.toLowerCase().includes(q) ||
               p.crops.some((c) => c.toLowerCase().includes(q) || transCrop(c).toLowerCase().includes(q)) ||
               p.pests.some((pest) => pest.toLowerCase().includes(q));
      })();
      const matchesCrop = selectedCrop === 'all' || p.crops.includes(selectedCrop);
      const matchesRisk = selectedRisk === 'all' || p.resistanceRisk === selectedRisk;
      const matchesMoA = selectedMoA === 'all' || p.moaCode === selectedMoA;

      if (matchesSearch && matchesCrop && matchesRisk && matchesMoA) {
        counts[p.type] = (counts[p.type] || 0) + 1;
        counts['all'] += 1;
      }
    });
    return counts;
  }, [products, searchQuery, selectedCrop, selectedRisk, selectedMoA, transCrop]);

  // Compute live active ingredients present in currently filtered items (helps user see subcategories)
  const activeIngredientsInSelectedCategory = useMemo(() => {
    const map: Record<string, number> = {};
    products.forEach((p) => {
      const matchesSearch = !searchQuery.trim() || (() => {
        const q = searchQuery.toLowerCase().trim();
        return p.tradeName.toLowerCase().includes(q) ||
               p.commonName.toLowerCase().includes(q) ||
               p.registrationHolder.toLowerCase().includes(q) ||
               p.registrationNo.toLowerCase().includes(q) ||
               p.crops.some((c) => c.toLowerCase().includes(q) || transCrop(c).toLowerCase().includes(q)) ||
               p.pests.some((pest) => pest.toLowerCase().includes(q));
      })();
      const matchesCrop = selectedCrop === 'all' || p.crops.includes(selectedCrop);
      const matchesCategory = selectedType === 'all' || p.type === selectedType;
      const matchesRisk = selectedRisk === 'all' || p.resistanceRisk === selectedRisk;
      const matchesMoA = selectedMoA === 'all' || p.moaCode === selectedMoA;

      if (matchesSearch && matchesCrop && matchesCategory && matchesRisk && matchesMoA) {
        map[p.commonName] = (map[p.commonName] || 0) + 1;
      }
    });
    return Object.entries(map).sort((a, b) => b[1] - a[1]); // Sort by brand count descending
  }, [products, searchQuery, selectedCrop, selectedType, selectedRisk, selectedMoA, transCrop]);

  // Filter and sort the commercial products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Search matches brand name, active ingredient, registrant, reg no, crop, pest or MoA Group
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = p.tradeName.toLowerCase().includes(q);
        const matchesCommon = p.commonName.toLowerCase().includes(q);
        const matchesHolder = p.registrationHolder.toLowerCase().includes(q);
        const matchesReg = p.registrationNo.toLowerCase().includes(q);
        const matchesCrops = p.crops.some((c) => c.toLowerCase().includes(q) || transCrop(c).toLowerCase().includes(q));
        const matchesPests = p.pests.some((pest) => pest.toLowerCase().includes(q));
        const matchesMoA = (p.moaCode && p.moaCode.toLowerCase().includes(q)) || 
                           (p.moaGroup && p.moaGroup.toLowerCase().includes(q));

        if (!matchesName && !matchesCommon && !matchesHolder && !matchesReg && !matchesCrops && !matchesPests && !matchesMoA) {
          return false;
        }
      }

      // Category filter
      if (selectedType !== 'all' && p.type !== selectedType) {
        return false;
      }

      // Crop filter
      if (selectedCrop !== 'all' && !p.crops.includes(selectedCrop)) {
        return false;
      }

      // Subcategory Active Ingredient filter
      if (selectedIngredient !== 'all' && p.commonName !== selectedIngredient) {
        return false;
      }

      // MoA code filter
      if (selectedMoA !== 'all' && p.moaCode !== selectedMoA) {
        return false;
      }

      // Risk filter
      if (selectedRisk !== 'all' && p.resistanceRisk !== selectedRisk) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'name') return a.tradeName.localeCompare(b.tradeName);
      if (sortBy === 'type') return a.type.localeCompare(b.type);
      if (sortBy === 'phi') return (a.phiDays || 0) - (b.phiDays || 0);
      if (sortBy === 'reg') return a.registrationNo.localeCompare(b.registrationNo);
      return 0;
    });
  }, [products, searchQuery, selectedType, selectedCrop, selectedIngredient, selectedMoA, selectedRisk, sortBy, transCrop]);

  // Group filtered products by Active Ingredient
  const groupedByIngredient = useMemo(() => {
    const groups: Record<string, {
      ingredient: string;
      type: string;
      moaCode?: string;
      moaGroup?: string;
      resistanceRisk?: string;
      toxicityClass?: string;
      whoColor?: string;
      crops: Set<string>;
      pests: Set<string>;
      products: ChemicalProduct[];
    }> = {};

    filteredProducts.forEach((p) => {
      const key = p.commonName;
      if (!groups[key]) {
        groups[key] = {
          ingredient: p.commonName,
          type: p.type,
          moaCode: p.moaCode,
          moaGroup: p.moaGroup,
          resistanceRisk: p.resistanceRisk,
          toxicityClass: p.toxicityClass,
          whoColor: p.whoColor,
          crops: new Set<string>(),
          pests: new Set<string>(),
          products: [],
        };
      }
      p.crops.forEach((c) => groups[key].crops.add(c));
      p.pests.forEach((pest) => groups[key].pests.add(pest));
      groups[key].products.push(p);
    });

    return Object.values(groups).sort((a, b) => a.ingredient.localeCompare(b.ingredient));
  }, [filteredProducts]);

  // Live Summary Dashboard metrics calculations
  const totalBrandsCount = filteredProducts.length;
  const uniqueIngredientsCount = useMemo(() => {
    const set = new Set<string>();
    filteredProducts.forEach((p) => set.add(p.commonName));
    return set.size;
  }, [filteredProducts]);

  const safestChoicesCount = useMemo(() => {
    return filteredProducts.filter((p) => p.whoColor === '#3b82f6' || p.whoColor === '#22c55e' || p.whoColor === '#10b981').length;
  }, [filteredProducts]);

  const phiRangeString = useMemo(() => {
    const phis = filteredProducts.map((p) => p.phiDays).filter((phi): phi is number => phi !== undefined && phi > 0);
    if (phis.length === 0) return '—';
    const minPhi = Math.min(...phis);
    const maxPhi = Math.max(...phis);
    if (minPhi === maxPhi) return `${minPhi} ${language === 'bn' ? 'দিন' : 'days'}`;
    return `${minPhi} - ${maxPhi} ${language === 'bn' ? 'দিন' : 'days'}`;
  }, [filteredProducts, language]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedType('all');
    setSelectedCrop('all');
    setSelectedIngredient('all');
    setSelectedMoA('all');
    setSelectedRisk('all');
    setSortBy('name');
    setVisibleLimit(48);
  };

  const parsePastedData = (text: string) => {
    setImportError('');
    setImportSuccess('');
    if (!text.trim()) {
      setParsedPreview([]);
      return;
    }

    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    if (lines.length === 0) {
      setParsedPreview([]);
      return;
    }
    
    // Detect separator (tab or comma)
    const firstLine = lines[0];
    const hasTabs = firstLine.includes('\t');
    const separator = hasTabs ? '\t' : ',';
    
    // Simple state machine CSV parsing to support quoted fields with commas
    const parseLine = (line: string): string[] => {
      const result: string[] = [];
      let current = '';
      let inQuotes = false;
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"' && (j === 0 || line[j-1] !== '\\')) {
          inQuotes = !inQuotes;
        } else if (char === separator && !inQuotes) {
          result.push(current.trim().replace(/^"|"$/g, ''));
          current = '';
        } else {
          current += char;
        }
      }
      result.push(current.trim().replace(/^"|"$/g, ''));
      return result;
    };

    const firstLineCols = parseLine(firstLine);
    
    // Default column indices mapping
    let tradeIdx = 0;
    let commonIdx = 1;
    let typeIdx = 2;
    let regNoIdx = 3;
    let holderIdx = 4;
    let cropsIdx = 5;
    let pestsIdx = 6;
    let dosageIdx = 7;
    let moaIdx = -1;
    let toxicityIdx = -1;

    let hasHeader = false;
    const lowerFirstCols = firstLineCols.map(c => c.toLowerCase().trim());
    
    // Detect if first line is a header
    if (
      lowerFirstCols.some(c => 
        c.includes('trade') || 
        c.includes('common') || 
        c.includes('ingredient') || 
        c.includes('registration') || 
        c.includes('holder') ||
        c.includes('crop') ||
        c.includes('type')
      )
    ) {
      hasHeader = true;
      // Map columns dynamically based on header text
      lowerFirstCols.forEach((col, idx) => {
        if (col.includes('trade')) {
          tradeIdx = idx;
        } else if (col.includes('common') || col.includes('ingredient')) {
          commonIdx = idx;
        } else if (col.includes('type')) {
          typeIdx = idx;
        } else if (col.includes('registration no') || col.includes('reg no') || col.includes('registration_no') || col.includes('regno') || (col.includes('registration') && !col.includes('holder'))) {
          regNoIdx = idx;
        } else if (col.includes('holder') || col.includes('registration holder') || col.includes('name of registration')) {
          holderIdx = idx;
        } else if (col.includes('crop')) {
          cropsIdx = idx;
        } else if (col.includes('pest')) {
          pestsIdx = idx;
        } else if (col.includes('dosage') || col.includes('rate')) {
          dosageIdx = idx;
        } else if (col.includes('moa') || col.includes('code')) {
          moaIdx = idx;
        } else if (col.includes('toxicity') || col.includes('hazard')) {
          toxicityIdx = idx;
        }
      });
      
      // Secondary explicit check to make sure Holder and RegNo indices are distinct
      const regHolderColIdx = lowerFirstCols.findIndex(c => c.includes('registration holder') || c.includes('name of registration'));
      if (regHolderColIdx !== -1) {
        holderIdx = regHolderColIdx;
      }
      const regNoColIdx = lowerFirstCols.findIndex(c => c === 'registration no' || c === 'reg no' || c === 'registration_no' || c === 'regno' || (c.includes('registration') && !c.includes('holder')));
      if (regNoColIdx !== -1) {
        regNoIdx = regNoColIdx;
      }
    } else {
      // No header line. Auto-detect if columns match the DAE pattern:
      // Column 0 is chemical type (Insecticide, Fungicide, etc.)
      const firstVal = firstLineCols[0]?.toLowerCase().trim() || '';
      if (['insecticide', 'fungicide', 'herbicide', 'miticide', 'rodenticide', 'bio pesticide'].includes(firstVal)) {
        // DAE CSV format: Type, Common Name, Trade Name, Reg No, Holder, Crops, Pests, Dosage
        typeIdx = 0;
        commonIdx = 1;
        tradeIdx = 2;
        regNoIdx = 3;
        holderIdx = 4;
        cropsIdx = 5;
        pestsIdx = 6;
        dosageIdx = 7;
        moaIdx = -1;
        toxicityIdx = -1;
      }
    }

    const parsedRows: ChemicalProduct[] = [];
    const startIndex = hasHeader ? 1 : 0;
    
    for (let i = startIndex; i < lines.length; i++) {
      const columns = parseLine(lines[i]);
      if (columns.length < 2) continue; // Skip invalid lines
      
      const tradeName = columns[tradeIdx] || '';
      const commonName = columns[commonIdx] || '';
      if (!tradeName || !commonName) continue; // Skip lines missing essential name fields
      
      const typeInput = typeIdx !== -1 && columns[typeIdx] ? columns[typeIdx] : 'Insecticide';
      
      // Match type safely
      let type: 'Insecticide' | 'Fungicide' | 'Herbicide' | 'Miticide' | 'Bio Pesticide' | 'Store Grain Insecticide' | 'Rodenticide' | 'Public Health' = 'Insecticide';
      const typeLower = typeInput.toLowerCase();
      if (typeLower.includes('fungi')) type = 'Fungicide';
      else if (typeLower.includes('herb') || typeLower.includes('weed')) type = 'Herbicide';
      else if (typeLower.includes('miti') || typeLower.includes('spider') || typeLower.includes('bromopropylate') || typeLower.includes('sulphur')) type = 'Miticide';
      else if (typeLower.includes('bio') || typeLower.includes('organic')) type = 'Bio Pesticide';
      else if (typeLower.includes('store') || typeLower.includes('grain')) type = 'Store Grain Insecticide';
      else if (typeLower.includes('rodent') || typeLower.includes('rat')) type = 'Rodenticide';
      else if (typeLower.includes('public health') || typeLower.includes('mosquito') || typeLower.includes('vector')) type = 'Public Health';
      
      const registrationNo = regNoIdx !== -1 && columns[regNoIdx] ? columns[regNoIdx] : `AP-CUST-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
      const registrationHolder = holderIdx !== -1 && columns[holderIdx] ? columns[holderIdx] : 'কাস্টম আমদানিকারক';
      const crops = cropsIdx !== -1 && columns[cropsIdx] ? columns[cropsIdx].split(/[;|]/).map(c => c.trim()).filter(Boolean) : ['All Crops'];
      const pests = pestsIdx !== -1 && columns[pestsIdx] ? columns[pestsIdx].split(/[;|]/).map(p => p.trim()).filter(Boolean) : ['লক্ষ্য বালাই'];
      const dosageRate = dosageIdx !== -1 && columns[dosageIdx] ? columns[dosageIdx] : '1.5 - 2.0 L/ha';
      const moaCode = moaIdx !== -1 && columns[moaIdx] ? columns[moaIdx] : 'UN';
      const toxicityClass = toxicityIdx !== -1 && columns[toxicityIdx] ? columns[toxicityIdx] : 'III - Slightly Hazardous';
      
      // Infer WHO color
      let whoColor = '#3b82f6'; // Blue default
      if (toxicityClass.includes('Ia') || toxicityClass.toLowerCase().includes('extremely')) whoColor = '#ef4444'; // Red
      else if (toxicityClass.includes('Ib') || toxicityClass.toLowerCase().includes('highly')) whoColor = '#ef4444'; // Red
      else if (toxicityClass.includes('II') || toxicityClass.toLowerCase().includes('moderately')) whoColor = '#eab308'; // Yellow
      else if (toxicityClass.includes('III') || toxicityClass.toLowerCase().includes('slightly')) whoColor = '#3b82f6'; // Blue
      else if (toxicityClass.toLowerCase().includes('unlikely') || toxicityClass.includes('U')) whoColor = '#10b981'; // Green

      parsedRows.push({
        id: `cust-${Math.random().toString(36).substring(2, 9)}`,
        type,
        commonName,
        tradeName,
        registrationNo,
        registrationHolder,
        crops: crops.length > 0 ? crops : ['All Crops'],
        pests: pests.length > 0 ? pests : ['লক্ষ্য বালাই'],
        dosageRate,
        moaCode,
        moaGroup: `IRAC/FRAC গ্রুপ ${moaCode}`,
        resistanceRisk: 'Medium',
        toxicityClass: toxicityClass as any,
        whoColor,
        formulation: tradeName.split(' ').pop() || 'EC',
        phiDays: 14,
        reiHours: 24,
        waterVolumeLPerHa: 500,
        safetyNotes: ['ব্যবহারের পূর্বে পণ্যের লেবেল যাচাই করুন', 'প্রয়োগের সময় সম্পূর্ণ সুরক্ষা সামগ্রী পরিধান করুন'],
        rotationNotes: 'প্রতিরোধ রোধে ভিন্ন MoA গ্রুপের ওষুধ দিয়ে ঘূর্ণন করুন।'
      });
    }
    
    if (parsedRows.length === 0) {
      setImportError(language === 'bn' ? 'কোন বৈধ রেকর্ড পাওয়া যায়নি। বোতামের উপরের উদাহরণ বিন্যাসটি দেখুন।' : 'No valid records could be parsed. Check the template format.');
    }
    setParsedPreview(parsedRows);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (evt) => {
      const text = evt.target?.result as string;
      setPastedData(text);
      parsePastedData(text);
    };
    reader.readAsText(file);
  };

  const executeImport = () => {
    if (parsedPreview.length === 0) {
      setImportError(language === 'bn' ? 'কোন আমদানিকৃত রেকর্ড খালি রয়েছে।' : 'The import list is empty.');
      return;
    }
    
    if (!onUpdateProducts) {
      setImportError(language === 'bn' ? 'সিস্টেম কাস্টম ডাটাবেস আপডেট সমর্থন করে না।' : 'System does not support custom updates in this view.');
      return;
    }

    // Merge duplicate rows in the parsed preview first
    const mergedPreviewMap = new Map<string, ChemicalProduct>();
    parsedPreview.forEach(p => {
      const key = `${p.registrationNo.toLowerCase().trim()}-${p.tradeName.toLowerCase().trim()}-${p.commonName.toLowerCase().trim()}`;
      if (!mergedPreviewMap.has(key)) {
        mergedPreviewMap.set(key, { ...p });
      } else {
        const existing = mergedPreviewMap.get(key)!;
        existing.crops = [...new Set([...existing.crops, ...p.crops])];
        existing.pests = [...new Set([...existing.pests, ...p.pests])];
        if (p.dosageRate && !existing.dosageRate.toLowerCase().includes(p.dosageRate.toLowerCase())) {
          existing.dosageRate += `; ${p.dosageRate}`;
        }
      }
    });
    const mergedPreview = Array.from(mergedPreviewMap.values());

    // Group or merge with existing catalog
    const catalogMap = new Map<string, ChemicalProduct>();
    products.forEach(p => {
      const key = `${p.registrationNo.toLowerCase().trim()}-${p.tradeName.toLowerCase().trim()}-${p.commonName.toLowerCase().trim()}`;
      catalogMap.set(key, { ...p });
    });

    let newAddedCount = 0;
    mergedPreview.forEach(p => {
      const key = `${p.registrationNo.toLowerCase().trim()}-${p.tradeName.toLowerCase().trim()}-${p.commonName.toLowerCase().trim()}`;
      if (catalogMap.has(key)) {
        // Merge crops and pests to existing product instead of creating a duplicate row!
        const existing = catalogMap.get(key)!;
        existing.crops = [...new Set([...existing.crops, ...p.crops])];
        existing.pests = [...new Set([...existing.pests, ...p.pests])];
        if (p.dosageRate && !existing.dosageRate.toLowerCase().includes(p.dosageRate.toLowerCase())) {
          existing.dosageRate += `; ${p.dosageRate}`;
        }
      } else {
        catalogMap.set(key, p);
        newAddedCount++;
      }
    });

    const updatedCatalog = Array.from(catalogMap.values());
    onUpdateProducts(updatedCatalog);
    
    setImportSuccess(language === 'bn' 
      ? `সফলভাবে ${formatNum(newAddedCount)}টি নতুন বালাইনাশক ডাটাবেজে যুক্ত করা হয়েছে!` 
      : `Successfully added ${formatNum(newAddedCount)} approved products to your database!`);
    
    setParsedPreview([]);
    setPastedData('');
  };

  const downloadCSVTemplate = () => {
    const headers = language === 'bn'
      ? "বাণিজ্যিক নাম (Trade Name),মূল উপাদান (Active Ingredient),ধরণ (Category),নিবন্ধন নং (Registration No),কোম্পানি (Registration Holder),ফসল (Crops - সেমিকোলন দিয়ে),বালাই (Pests - সেমিকোলন দিয়ে),মাত্রা (Dosage Rate),MoA কোড (MoA Code),বিষাক্ততা (Toxicity Class)\n"
      : "Trade Name,Active Ingredient,Category,Registration No,Registration Holder,Crops (separated by semicolon),Pests (separated by semicolon),Dosage Rate,MoA Code,Toxicity Class\n";
    const exampleRow = "Demo-Guard 250 EC,Deltamethrin,Insecticide,AP-CUST-999,Demo Agri Solutions Ltd,Rice;Tomato;Brinjal,Stem borer;Leafminer;Aphids,1.50 L/ha,IRAC 3A,II - Moderately Hazardous\n";
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(headers + exampleRow);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", "agrichem_approved_pesticides_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportFullDatabaseToCSV = () => {
    const headers = language === 'bn'
      ? "আইডি (ID),ধরণ (Category),মূল উপাদান (Common Name),বাণিজ্যিক নাম (Trade Name),নিবন্ধন নং (Registration No),কোম্পানি (Registration Holder),ফসল (Crops),বালাই (Pests),মাত্রা (Dosage Rate),MoA কোড (MoA Code),বিষাক্ততা (Toxicity Class),PHI (দিন),REI (ঘণ্টা),ফর্মুলেশন (Formulation)\n"
      : "ID,Category,Common Name,Trade Name,Registration No,Registration Holder,Crops,Pests,Dosage Rate,MoA Code,Toxicity Class,PHI Days,REI Hours,Formulation\n";
    const rows = products.map(p => {
      return [
        p.id,
        p.type,
        `"${(p.commonName || '').replace(/"/g, '""')}"`,
        `"${(p.tradeName || '').replace(/"/g, '""')}"`,
        `"${(p.registrationNo || '').replace(/"/g, '""')}"`,
        `"${(p.registrationHolder || '').replace(/"/g, '""')}"`,
        `"${(p.crops || []).join('; ').replace(/"/g, '""')}"`,
        `"${(p.pests || []).join('; ').replace(/"/g, '""')}"`,
        `"${(p.dosageRate || '').replace(/"/g, '""')}"`,
        `"${p.moaCode || 'UN'}"`,
        `"${p.toxicityClass || 'U - বিপদমুক্ত (Unlikely)'}"`,
        p.phiDays || 0,
        p.reiHours || 0,
        p.formulation || ''
      ].join(',');
    });
    
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(headers + rows.join('\n'));
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `agrichem_full_database_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const purgeCustomData = () => {
    if (window.confirm(language === 'bn' 
      ? 'আপনি কি নিশ্চিত যে আপনার সমস্ত কাস্টম আমদানিকৃত বালাইনাশক মুছে ফেলতে চান?' 
      : 'Are you sure you want to delete all custom imported pesticides and reset to factory defaults?')) {
      if (onResetProducts) {
        onResetProducts();
        setImportSuccess(language === 'bn' ? 'সফলভাবে ডাটাবেজ ফ্যাক্টরি মোডে রিসেট করা হয়েছে।' : 'Database successfully reset to factory defaults.');
        setImportError('');
        setParsedPreview([]);
      }
    }
  };

  const hasActiveFilters = searchQuery !== '' || selectedType !== 'all' || selectedCrop !== 'all' || selectedIngredient !== 'all' || selectedMoA !== 'all' || selectedRisk !== 'all';

  const toggleExpand = (ingredient: string) => {
    setExpandedIngredients((prev) => ({
      ...prev,
      [ingredient]: !prev[ingredient],
    }));
  };

  const expandAll = () => {
    const expanded: Record<string, boolean> = {};
    groupedByIngredient.forEach((g) => {
      expanded[g.ingredient] = true;
    });
    setExpandedIngredients(expanded);
  };

  const collapseAll = () => {
    setExpandedIngredients({});
  };

  const getCategoryIcon = (type: string, className = "w-4 h-4") => {
    switch (type) {
      case 'Insecticide': return <Bug className={className} />;
      case 'Fungicide': return <Sprout className={className} />;
      case 'Herbicide': return <Layers className={className} />;
      case 'Miticide': return <Activity className={className} />;
      case 'Bio Pesticide': return <ShieldCheck className={className} />;
      case 'Stored Grain':
      case 'Store Grain Insecticide': return <Warehouse className={className} />;
      case 'Rodenticide': return <ShieldAlert className={className} />;
      case 'Public Health': return <HeartPulse className={className} />;
      default: return <Tag className={className} />;
    }
  };

  const getCategoryTheme = (type: string) => {
    switch (type) {
      case 'Insecticide': return 'text-amber-700 bg-amber-50 hover:bg-amber-100/70 border-amber-200/60';
      case 'Fungicide': return 'text-sky-700 bg-sky-50 hover:bg-sky-100/70 border-sky-200/60';
      case 'Herbicide': return 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100/70 border-emerald-200/60';
      case 'Miticide': return 'text-rose-700 bg-rose-50 hover:bg-rose-100/70 border-rose-200/60';
      case 'Bio Pesticide': return 'text-teal-700 bg-teal-50 hover:bg-teal-100/70 border-teal-200/60';
      case 'Stored Grain':
      case 'Store Grain Insecticide': return 'text-indigo-700 bg-indigo-50 hover:bg-indigo-100/70 border-indigo-200/60';
      case 'Rodenticide': return 'text-purple-700 bg-purple-50 hover:bg-purple-100/70 border-purple-200/60';
      case 'Public Health': return 'text-cyan-700 bg-cyan-50 hover:bg-cyan-100/70 border-cyan-200/60';
      default: return 'text-slate-700 bg-slate-50 hover:bg-slate-100 border-slate-200';
    }
  };

  const getRiskColor = (risk?: string) => {
    switch (risk) {
      case 'High': return 'bg-rose-100 text-rose-800 border-rose-200';
      case 'Medium': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'Low': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      default: return 'bg-slate-100 text-slate-800 border-slate-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      
      {/* 🚀 1. Visual Crop Focus Bar (Horizontal scrolling Carousel) */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-3xs space-y-2.5">
        <div className="flex items-center justify-between text-xs px-1">
          <span className="font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wider">
            <Sprout className="w-4 h-4 text-emerald-600" />
            {language === 'bn' ? 'ফসল ভিত্তিক সরাসরি অনুসন্ধান' : 'Browse Solutions by Crop Focus'}
          </span>
          {selectedCrop !== 'all' && (
            <button
              onClick={() => { setSelectedCrop('all'); setSelectedIngredient('all'); }}
              className="text-rose-600 font-semibold hover:underline flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              {language === 'bn' ? 'সব ফসল দেখান' : 'Show All Crops'}
            </button>
          )}
        </div>
        <div className="flex gap-2.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-slate-200">
          {cropList.map((crop) => {
            const emoji = CROP_EMOJIS[crop] || '🌱';
            const isSelected = selectedCrop === crop;
            return (
              <button
                key={crop}
                onClick={() => {
                  setSelectedCrop(crop);
                  setSelectedIngredient('all');
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs scale-102 font-bold'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-slate-50/55'
                }`}
              >
                <span className="text-base leading-none">{emoji}</span>
                <span>{crop === 'all' ? (language === 'bn' ? 'সব ফসল' : 'All Crops') : transCrop(crop)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Collapsible User Guide */}
      <CollapsibleUserGuide
        pageKey="database"
        titleEn="Pesticide Database Search Guide"
        titleBn="বালাইনাশক ডাটাবেস অনুসন্ধান নির্দেশিকা"
        subtitleEn="Learn how to filter commercial trade names, active ingredients, and safety bands."
        subtitleBn="বাণিজ্যিক নাম, সক্রিয় উপাদান ও ডব্লিউএইচও নিরাপত্তা ব্যান্ড কীভাবে খুঁজবেন ও মেলাবেন।"
        stepsEn={[
          "Select a Crop from the horizontal scrolling focus bar to instantly filter registered chemical products for that crop.",
          "Choose a primary pesticide category (e.g., Insecticide, Fungicide) on the left sidebar to refine chemical targets.",
          "Click on any Active Ingredient in the subcategory list to see all of its commercial brand formulations.",
          "Check the WHO Hazard color band to prioritize green and blue (less toxic) categories over red/yellow labels.",
          "Review the PHI (Pre-Harvest Interval) days to plan the minimum safe duration between spraying and crop harvesting."
        ]}
        stepsBn={[
          "ফসল ভিত্তিক ফিল্টার করতে উপরের স্ক্রলিং বার থেকে যেকোনো ফসল নির্বাচন করুন এবং অনুমোদিত ওষুধের তালিকা দেখুন।",
          "কীটনাশক, ছত্রাকনাশক বা আগাছানাশক ক্যাটাগরি ফিল্টার করতে বাম পাশের প্রধান ক্যাটাগরি মেনু ব্যবহার করুন।",
          "নির্দিষ্ট কোনো উপাদানের বাণিজ্যিক ব্র্যান্ডগুলো দেখতে বাম পাশের সাব-ক্যাটাগরি তালিকা থেকে উপাদানটিতে ক্লিক করুন।",
          "পরিবেশ ও স্বাস্থ্যের ঝুঁকি কমাতে লাল বা হলুদের বদলে সবুজ ও নীল (কম বিষাক্ত) ব্যান্ডযুক্ত ওষুধগুলোকে অগ্রাধিকার দিন।",
          "ফসল তোলার কতদিন পূর্বে স্প্রে বন্ধ করতে হবে তা জানতে অবশ্যই PHI (প্রাক-কর্তন নিরাপদ বিরতি) দিনগুলো লক্ষ করুন।"
        ]}
        proTipsEn={[
          "Toggle 'Grouped View' to condense duplicates into chemical families, or 'Flat Grid' to search alphabetically.",
          "Each brand has a unique DAE Registration Number - match this with physical labels to identify counterfeit products."
        ]}
        proTipsBn={[
          "একই উপাদানের ডুপ্লিকেট ব্র্যান্ড দেখতে 'গ্রুপভিত্তিক ভিউ' এবং বর্ণানুক্রমিকভাবে খুঁজতে 'গ্রিড ভিউ' ব্যবহার করুন।",
          "প্রতিটি ব্র্যান্ডের জন্য আলাদা ডিএই রেজি. নম্বর রয়েছে। নকল ওষুধ সনাক্ত করতে বোতলের নম্বরের সাথে এটি মিলিয়ে নিন।"
        ]}
      />

      {/* 🌾 2. Smart Crop Advisory Summary Alert */}
      {selectedCrop !== 'all' && (
        <div className="bg-emerald-50/80 border border-emerald-200/70 rounded-xl p-4 flex items-start gap-3.5 shadow-2xs">
          <div className="p-2 bg-emerald-600 text-white rounded-lg shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="space-y-1 text-xs">
            <h4 className="font-bold text-emerald-950">
              {language === 'bn' ? `${transCrop(selectedCrop)} ফসল সুরক্ষা ও বালাই দমন পরামর্শ` : `${transCrop(selectedCrop)} Protection & Health Dossier`}
            </h4>
            <p className="text-emerald-800 leading-relaxed font-medium">
              {language === 'bn' 
                ? `বর্তমানে এই ডাটাবেজে ${transCrop(selectedCrop)}-এর জন্য মোট ${formatNum(filteredProducts.length)}টি অনুমোদিত ব্রান্ড এবং ${formatNum(uniqueIngredientsCount)}টি স্বতন্ত্র সক্রিয় বালাইনাশক উপাদান নিবন্ধিত রয়েছে। নিচে এদের সঠিক বালাই দমনের মাত্রা ও তোলার নিয়মাবলী দেওয়া হলো।`
                : `Currently, there are ${formatNum(filteredProducts.length)} authorized brand formulations containing ${formatNum(uniqueIngredientsCount)} unique active chemical ingredients registered for ${transCrop(selectedCrop)} pest management in Bangladesh.`}
            </p>
          </div>
        </div>
      )}

      {/* 📊 Smart Spreadsheet Importer & Custom Pesticides Registry */}
      <div id="smart-spreadsheet-importer-card" className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
        <button
          onClick={() => setIsImporterOpen(!isImporterOpen)}
          className="w-full flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-100 hover:bg-slate-100/60 transition cursor-pointer select-none"
        >
          <div className="flex items-center gap-2.5 text-left">
            <div className="p-2 bg-teal-50 text-teal-700 rounded-xl">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                {language === 'bn' ? 'স্মার্ট স্প্রেডশিট আমদানিকারক ও কাস্টম রেজিস্ট্রি' : 'Smart Spreadsheet Importer & Custom Registry'}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'bn' 
                  ? 'আপনার এক্সেল/গুগল শিট থেকে ডিএই অনুমোদিত বালাইনাশকের তালিকা সরাসরি এখানে পেস্ট বা আপলোড করুন।' 
                  : 'Import, parse, and append DAE-approved pesticides directly from Microsoft Excel or CSV files.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {products.length > baselineCount && (
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full border border-emerald-200">
                {language === 'bn' ? `+${formatNum(products.length - baselineCount)} কাস্টম` : `+${formatNum(products.length - baselineCount)} Custom`}
              </span>
            )}
            {isImporterOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
          </div>
        </button>

        {isImporterOpen && (
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left explanation column */}
              <div className="md:col-span-1 space-y-4 text-xs">
                <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 space-y-2.5 leading-relaxed text-slate-600">
                  <h4 className="font-bold text-slate-800 flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-teal-600" />
                    {language === 'bn' ? 'আমদানি করার নিয়মাবলী' : 'How to Import Data'}
                  </h4>
                  <ul className="list-disc pl-4 space-y-1.5 font-medium">
                    <li>
                      {language === 'bn' 
                        ? 'আপনার অনুমোদিত বালাইনাশকের শিটটি খুলুন এবং কলামগুলো কাস্টমাইজ করুন।' 
                        : 'Open your spreadsheet containing approved pesticides and align your column structure.'}
                    </li>
                    <li>
                      {language === 'bn' 
                        ? 'নিচের টেমপ্লেটটি ডাউনলোড করে সঠিক কলামগুলো দেখে নিতে পারেন।' 
                        : 'Download our standard CSV format template to verify required columns and headers.'}
                    </li>
                    <li>
                      {language === 'bn' 
                        ? 'এক্সেল থেকে সরাসরি পুরো লাইন কপি করে নিচের বাক্সে পেস্ট করতে পারেন (ট্যাব বা কমা সাপোর্ট করে)।' 
                        : 'You can copy and paste rows directly from Excel/Google Sheets into the pasteboard box.'}
                    </li>
                    <li>
                      {language === 'bn' 
                        ? 'নিবন্ধন নম্বর অনুযায়ী সিস্টেম ডুপ্লিকেট চেক করে স্বয়ংক্রিয়ভাবে ফিল্টার করে নেবে।' 
                        : 'The system uses Registration Numbers as unique identifiers to safely prevent duplicate records.'}
                    </li>
                  </ul>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={downloadCSVTemplate}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-bold shadow-3xs cursor-pointer transition"
                  >
                    <FileDown className="w-4 h-4 text-slate-500" />
                    {language === 'bn' ? 'সিএসভি টেমপ্লেট ডাউনলোড' : 'Download CSV Template'}
                  </button>

                  <button
                    onClick={exportFullDatabaseToCSV}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold shadow-3xs cursor-pointer transition"
                  >
                    <FileDown className="w-4 h-4 text-emerald-600" />
                    {language === 'bn' ? 'সমগ্র ডাটাবেজ এক্সপোর্ট (CSV)' : 'Export Full Database (CSV)'}
                  </button>

                  {products.length > baselineCount && (
                    <button
                      onClick={purgeCustomData}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-red-200 rounded-xl bg-red-50 hover:bg-red-100 text-red-700 font-bold shadow-3xs cursor-pointer transition"
                    >
                      <Trash2 className="w-4 h-4 text-red-600" />
                      {language === 'bn' ? 'কাস্টম রেজিস্ট্রি রিসেট করুন' : 'Reset Custom Registry'}
                    </button>
                  )}
                </div>
              </div>

              {/* Right Input and Preview columns */}
              <div className="md:col-span-2 space-y-4">
                {/* Alert Messages */}
                {importError && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-800 rounded-xl p-4 text-xs font-semibold flex items-center gap-2 animate-fade-in">
                    <span className="text-base">⚠️</span>
                    <span>{importError}</span>
                  </div>
                )}
                {importSuccess && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl p-4 text-xs font-semibold flex items-center gap-2 animate-fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{importSuccess}</span>
                  </div>
                )}

                {/* Upload or Paste selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-teal-400 transition relative">
                    <input
                      type="file"
                      accept=".csv,.txt"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <Upload className="w-6 h-6 text-slate-400 mx-auto mb-2" />
                    <p className="text-xs font-bold text-slate-700">
                      {language === 'bn' ? 'অনুমোদিত CSV ফাইল আপলোড করুন' : 'Upload Approved CSV File'}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {language === 'bn' ? 'এখানে ড্র্যাগ করুন অথবা ক্লিক করুন' : 'Drag and drop or click to browse'}
                    </p>
                  </div>

                  <div className="flex flex-col justify-between p-4 border border-slate-200 rounded-xl bg-slate-50/50 text-xs">
                    <div>
                      <h5 className="font-bold text-slate-700 flex items-center gap-1.5">
                        <Layers className="w-3.5 h-3.5 text-teal-600" />
                        {language === 'bn' ? 'এক্সেল পেস্টবোর্ড জোন' : 'Direct Excel Copy-Paste'}
                      </h5>
                      <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                        {language === 'bn' 
                          ? 'আপনার স্প্রেডশিট টেবিল থেকে সরাসরি কলাম কপি করে নিচের বড় বক্সে পেস্ট করতে পারেন।' 
                          : 'Copy rows directly from Excel or Google Sheets, then paste into the box below.'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">
                    {language === 'bn' ? 'স্প্রেডশিট ডাটা পেস্টবোর্ড' : 'Spreadsheet Pasteboard'}
                  </label>
                  <textarea
                    rows={4}
                    value={pastedData}
                    onChange={(e) => {
                      setPastedData(e.target.value);
                      parsePastedData(e.target.value);
                    }}
                    placeholder={language === 'bn' 
                      ? "উদা: \nব্র্যান্ড-নাম, সক্রিয়-উপাদান, কীটনাশক, রেজি-নম্বর, কোম্পানি, ফসল, পোকা, মাত্রা, MoA-কোড, বিষাক্ততা-শ্রেণী" 
                      : "Example (comma or tab separated):\nSumithrin 10 EC,Cypermethrin,Insecticide,AP-1234,Naafco Ltd,Rice;Brinjal,Stem borer;Mealybug,1.00 L/ha,IRAC 3A,II - Moderately Hazardous"}
                    className="w-full p-3 border border-slate-200 rounded-xl text-xs bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/10 focus:border-teal-600 font-mono"
                  />
                </div>

                {/* Parsed Preview Section */}
                {parsedPreview.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold text-slate-800 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        {language === 'bn' 
                          ? `পার্সড ডাটা রিভিউ (${formatNum(parsedPreview.length)}টি রেকর্ড সনাক্ত হয়েছে)` 
                          : `Parsed Record Review (${formatNum(parsedPreview.length)} records detected)`}
                      </h5>
                      <button
                        onClick={executeImport}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer transition"
                      >
                        {language === 'bn' ? 'আমদানি সম্পন্ন করুন' : 'Confirm & Import Rows'}
                      </button>
                    </div>

                    <div className="border border-slate-200 rounded-xl overflow-hidden max-h-48 overflow-y-auto shadow-2xs">
                      <table className="w-full text-[10px] text-left border-collapse">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                            <th className="p-2 border-r border-slate-200">{language === 'bn' ? 'ব্র্যান্ড নাম' : 'Trade Name'}</th>
                            <th className="p-2 border-r border-slate-200">{language === 'bn' ? 'সক্রিয় উপাদান' : 'Active Ingredient'}</th>
                            <th className="p-2 border-r border-slate-200">{language === 'bn' ? 'ক্যাটাগরি' : 'Category'}</th>
                            <th className="p-2 border-r border-slate-200">{language === 'bn' ? 'রেজি নম্বর' : 'Reg No'}</th>
                            <th className="p-2 border-r border-slate-200">{language === 'bn' ? 'কোম্পানি' : 'Holder'}</th>
                            <th className="p-2">{language === 'bn' ? 'MoA কোড' : 'MoA Code'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white font-medium text-slate-700">
                          {parsedPreview.map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50">
                              <td className="p-2 border-r border-slate-200 font-bold text-slate-900">{row.tradeName}</td>
                              <td className="p-2 border-r border-slate-200">{row.commonName}</td>
                              <td className="p-2 border-r border-slate-200 text-slate-600 font-semibold">{row.type}</td>
                              <td className="p-2 border-r border-slate-200 text-slate-600 font-mono">{row.registrationNo}</td>
                              <td className="p-2 border-r border-slate-200 text-slate-500 truncate max-w-[120px]">{row.registrationHolder}</td>
                              <td className="p-2 font-mono font-bold text-teal-700">{row.moaCode || 'UN'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 📊 3. Primary Two-Column Navigation & Visualization Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        
        {/* ================= LEFT COLUMN: Smart Categorization & Sub-classification Sidebar ================= */}
        <div className="space-y-5 lg:col-span-1">
          
          {/* Mobile Filter Toggle Trigger Button */}
          <button
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden w-full flex items-center justify-between p-3.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-700 shadow-2xs hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-emerald-600" />
              <span>{language === 'bn' ? 'ক্যাটাগরি ও সক্রিয় উপাদান নির্বাচন' : 'Navigate Categories & Ingredients'}</span>
              {hasActiveFilters && (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              )}
            </div>
            <span className="text-[10px] text-slate-400">{showMobileFilters ? (language === 'bn' ? '✕ বন্ধ' : '✕ CLOSE') : (language === 'bn' ? '▶ ফিল্টার' : '▶ BROWSE')}</span>
          </button>

          {/* Sidebar container */}
          <div className={`${showMobileFilters ? 'block' : 'hidden'} lg:block space-y-5`}>
            
            {/* A. Main Pesticide Category Selection List */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-3xs space-y-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Sliders className="w-3.5 h-3.5 text-slate-500" />
                {language === 'bn' ? 'বালাইনাশক প্রধান শ্রেণী' : 'Main Pesticide Classes'}
              </h3>
              <div className="space-y-1.5">
                {categories.map((cat) => {
                  const isSelected = selectedType === cat;
                  const count = categoryCounts[cat] || 0;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        setSelectedType(cat);
                        setSelectedIngredient('all');
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-900 text-white border-emerald-900 font-bold shadow-xs'
                          : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {getCategoryIcon(cat, `w-4 h-4 ${isSelected ? 'text-emerald-300' : 'text-slate-400'}`)}
                        <span>{cat === 'all' ? (language === 'bn' ? 'সকল শ্রেণী' : 'All Classes') : transCat(cat)}</span>
                      </div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-100 text-slate-500 border border-slate-200'
                      }`}>
                        {formatNum(count)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* B. Smart Sub-Categories (Active Ingredients) Browser */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-3xs space-y-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Layers className="w-3.5 h-3.5 text-slate-500" />
                {language === 'bn' ? 'উপ-শ্রেণী (সক্রিয় উপাদান)' : 'Subcategories (Active Ingredient)'}
              </h3>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                {language === 'bn' 
                  ? 'বর্তমান সিলেকশনের সাথে মিলে যাওয়া সক্রিয় বালাই উপাদানের তালিকা। ব্র্যান্ড ফিল্টার করতে সরাসরি ক্লিক করুন।' 
                  : 'Active ingredients matching current filters. Click to filter trade names directly.'}
              </p>
              
              <div className="max-h-72 overflow-y-auto pr-1 space-y-1.5 scrollbar-thin">
                <button
                  onClick={() => setSelectedIngredient('all')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold transition-all border ${
                    selectedIngredient === 'all'
                      ? 'bg-slate-800 text-white border-slate-800'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span>{language === 'bn' ? 'সকল উপাদান' : 'All Active Ingredients'}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-200 text-slate-700 font-bold border border-slate-300/40">
                    {formatNum(totalBrandsCount)}
                  </span>
                </button>
                
                {activeIngredientsInSelectedCategory.map(([ingredient, count]) => {
                  const isSelected = selectedIngredient === ingredient;
                  return (
                    <button
                      key={ingredient}
                      onClick={() => setSelectedIngredient(ingredient)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all border ${
                        isSelected
                          ? 'bg-emerald-700 text-white border-emerald-700 font-semibold'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <span className="truncate max-w-[150px]" title={ingredient}>{ingredient}</span>
                      <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold ${
                        isSelected ? 'bg-emerald-800 text-emerald-100' : 'bg-slate-100 text-slate-500'
                      }`}>
                        {formatNum(count)}
                      </span>
                    </button>
                  );
                })}

                {activeIngredientsInSelectedCategory.length === 0 && (
                  <div className="text-center py-4 text-xs text-slate-400">
                    {language === 'bn' ? 'কোন উপাদান নেই' : 'No ingredients found'}
                  </div>
                )}
              </div>
            </div>

            {/* C. Collapsible Advanced Filters Accordion */}
            <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-3xs space-y-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-100 pb-2">
                <Sliders className="w-3.5 h-3.5 text-slate-500" />
                {language === 'bn' ? 'ক্রিয়া ও প্রতিরোধ ফিল্টার' : 'MoA & Resistance Filters'}
              </h3>
              
              <div className="space-y-3.5 text-xs">
                {/* MoA Group Filter */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-500 block">
                    {language === 'bn' ? 'ক্রিয়া কৌশল কোড (MoA Code)' : 'Mechanism of Action Code'}
                  </label>
                  <select
                    id="moa-select"
                    value={selectedMoA}
                    onChange={(e) => setSelectedMoA(e.target.value)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="all">{t('filter_all_moa')}</option>
                    {moaCodes.filter((m) => m !== 'all').map((m) => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                {/* Resistance Risk Filter */}
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-500 block">
                    {language === 'bn' ? 'প্রতিরোধের ঝুঁকি মাত্রা' : 'Resistance Risk Level'}
                  </label>
                  <select
                    id="risk-select"
                    value={selectedRisk}
                    onChange={(e) => setSelectedRisk(e.target.value)}
                    className="w-full px-2.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700 focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="all">{t('filter_all_risks')}</option>
                    <option value="High">{transRisk('High')}</option>
                    <option value="Medium">{transRisk('Medium')}</option>
                    <option value="Low">{transRisk('Low')}</option>
                  </select>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ================= RIGHT COLUMN: Metrics summary & Main interactive database ================= */}
        <div className="space-y-6 lg:col-span-3">

          {/* A. Summarized Agro-Metrics Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Metric 1: Total Brands */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-3xs flex flex-col justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                {language === 'bn' ? 'বাণিজ্যিক ব্র্যান্ড' : 'Trade Brand Formulations'}
              </span>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900 leading-none">{formatNum(totalBrandsCount)}</span>
                <span className="text-[10px] font-bold text-slate-500">{language === 'bn' ? 'টি পণ্য' : 'Brands'}</span>
              </div>
            </div>

            {/* Metric 2: Unique Ingredients */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-3xs flex flex-col justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                {language === 'bn' ? 'সক্রিয় রাসায়নিক উপাদান' : 'Unique Active Ingredients'}
              </span>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-slate-900 leading-none">{formatNum(uniqueIngredientsCount)}</span>
                <span className="text-[10px] font-bold text-slate-500">{language === 'bn' ? 'টি গ্রুপ' : 'Chemicals'}</span>
              </div>
            </div>

            {/* Metric 3: Safest Options */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-3xs flex flex-col justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                {language === 'bn' ? 'সবুজ / নীল সেফ ব্যান্ড' : 'Safest Class Options (WHO)'}
              </span>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-2xl font-black text-emerald-700 leading-none">{formatNum(safestChoicesCount)}</span>
                <span className="text-[10px] font-bold text-emerald-600">{language === 'bn' ? 'টি নিরাপদ' : 'Safest'}</span>
              </div>
            </div>

            {/* Metric 4: Minimum PHI days */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 shadow-3xs flex flex-col justify-between">
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                {language === 'bn' ? 'ফসল তোলার বিরতি (PHI)' : 'Pre-Harvest Intervals'}
              </span>
              <div className="mt-2 flex items-baseline gap-1.5">
                <span className="text-lg font-extrabold text-indigo-700 leading-none truncate max-w-[130px]" title={phiRangeString}>
                  {phiRangeString}
                </span>
              </div>
            </div>

          </div>

          {/* B. Integrated Filters, Sort, Search, and View Mode Toggle Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4.5 shadow-3xs space-y-4">
            
            <div className="flex flex-col md:flex-row items-center gap-3">
              
              {/* Dynamic Interactive Search Input */}
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="db-search-input"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={language === 'bn' ? 'বাণিজ্যিক ব্র্যান্ড বা উপাদান দিয়ে খুঁজুন...' : 'Search brands, ingredients, pests...'}
                  className="w-full pl-10 pr-10 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition font-medium"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Sorting & Formatting controls */}
              <div className="flex items-center gap-2.5 w-full md:w-auto shrink-0">
                
                {/* Sort dropdown */}
                <div className="flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-xl px-2.5 py-1.5 flex-1 md:flex-initial">
                  <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    id="db-sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent border-none text-xs font-semibold text-slate-700 focus:outline-none focus:ring-0 py-0.5 cursor-pointer"
                  >
                    <option value="name">{t('sort_name')}</option>
                    <option value="type">{t('sort_type')}</option>
                    <option value="phi">{t('sort_phi')}</option>
                    <option value="reg">{t('sort_reg')}</option>
                  </select>
                </div>

                {/* View Mode Toggle: Table (with MoA column) vs Grouped vs Card Grid */}
                <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/60 text-xs shrink-0">
                  <button
                    onClick={() => setViewMode('table')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                      viewMode === 'table'
                        ? 'bg-white text-emerald-800 shadow-2xs' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title={language === 'bn' ? 'টেবিল ভিউ (IRAC MoA কলাম সহ)' : 'Table View (with MoA Column)'}
                  >
                    <Table className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{language === 'bn' ? 'টেবিল ভিউ' : 'Table'}</span>
                  </button>
                  <button
                    onClick={() => setViewMode('grouped')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                      viewMode === 'grouped'
                        ? 'bg-white text-emerald-800 shadow-2xs' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title={language === 'bn' ? 'সক্রিয় উপাদান ভিত্তিক গ্রুপ' : 'Grouped by Ingredient'}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{language === 'bn' ? 'গ্রুপ ভিউ' : 'Grouped'}</span>
                  </button>
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-bold transition-all ${
                      viewMode === 'grid'
                        ? 'bg-white text-emerald-800 shadow-2xs' 
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                    title={language === 'bn' ? 'কার্ড গ্রিড তালিকা' : 'Card Grid View'}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{language === 'bn' ? 'কার্ড গ্রিড' : 'Cards'}</span>
                  </button>
                </div>

              </div>

            </div>

            {/* Active Filters Pill Row */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 text-[10px]">
                <span className="text-slate-400 font-bold uppercase">{language === 'bn' ? 'সক্রিয় ফিল্টারসমূহ:' : 'Active Filters:'}</span>
                
                {selectedType !== 'all' && (
                  <span className="bg-amber-50 text-amber-800 border border-amber-200/50 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1">
                    <span>{transCat(selectedType)}</span>
                    <button onClick={() => { setSelectedType('all'); setSelectedIngredient('all'); }} className="hover:text-rose-600 font-bold">✕</button>
                  </span>
                )}

                {selectedCrop !== 'all' && (
                  <span className="bg-emerald-50 text-emerald-800 border border-emerald-200/50 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1">
                    <span>{transCrop(selectedCrop)}</span>
                    <button onClick={() => { setSelectedCrop('all'); setSelectedIngredient('all'); }} className="hover:text-rose-600 font-bold">✕</button>
                  </span>
                )}

                {selectedIngredient !== 'all' && (
                  <span className="bg-teal-50 text-teal-800 border border-teal-200/50 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1">
                    <span>{selectedIngredient}</span>
                    <button onClick={() => setSelectedIngredient('all')} className="hover:text-rose-600 font-bold">✕</button>
                  </span>
                )}

                {selectedMoA !== 'all' && (
                  <span className="bg-indigo-50 text-indigo-800 border border-indigo-200/50 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1">
                    <span>MoA: {selectedMoA}</span>
                    <button onClick={() => setSelectedMoA('all')} className="hover:text-rose-600 font-bold">✕</button>
                  </span>
                )}

                {selectedRisk !== 'all' && (
                  <span className="bg-rose-50 text-rose-800 border border-rose-200/50 px-2 py-0.5 rounded-md font-semibold flex items-center gap-1">
                    <span>{language === 'bn' ? transRisk(selectedRisk) : `${transRisk(selectedRisk)} Risk`}</span>
                    <button onClick={() => setSelectedRisk('all')} className="hover:text-rose-600 font-bold">✕</button>
                  </span>
                )}

                <button
                  onClick={resetFilters}
                  className="text-rose-600 font-bold hover:underline cursor-pointer ml-auto flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>{language === 'bn' ? 'সব মুছুন' : 'Clear All'}</span>
                </button>
              </div>
            )}

          </div>

          {/* C. Action Bar: Result Count & Crop guide PDF Download */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-2 font-medium">
              <span>
                {language === 'bn' ? 'ফলাফল দেখাচ্ছে:' : 'Showing'}{' '}
                <strong className="text-slate-900 font-extrabold">{formatNum(totalBrandsCount)}</strong> {language === 'bn' ? 'টি ব্র্যান্ড' : 'brands'}{' '}
                ({language === 'bn' ? `মোট ${formatNum(uniqueIngredientsCount)}টি উপাদানের অধীনে` : `grouped under ${formatNum(uniqueIngredientsCount)} active ingredients`})
              </span>
            </div>

            {selectedCrop !== 'all' && filteredProducts.length > 0 && (
              <button
                onClick={() => exportCropGuidePDF(selectedCrop, filteredProducts)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 text-white hover:bg-emerald-800 rounded-xl font-bold shadow-xs transition cursor-pointer text-xs"
              >
                <FileDown className="w-3.5 h-3.5" />
                <span>
                  {language === 'bn' ? `${transCrop(selectedCrop)} সুরক্ষা গাইড (PDF)` : `Export ${selectedCrop} Dossier (PDF)`}
                </span>
              </button>
            )}
          </div>

          {/* ================= D. PRIMARY VISUAL RESULTS CONTAINER ================= */}
          {filteredProducts.length > 0 ? (
            
            // View Mode 1: Tabular Registry View (With dedicated IRAC/FRAC MoA Column for each row)
            viewMode === 'table' ? (
              <div className="space-y-4">
                <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-slate-100/90 border-b border-slate-200 text-slate-700 font-bold text-[11px] uppercase tracking-wider whitespace-nowrap select-none">
                          <th className="py-3 px-3.5 text-center text-slate-400 font-mono w-10">#</th>
                          <th className="py-3 px-3.5">{language === 'bn' ? 'বাণিজ্যিক নাম ও ফর্মুলেশন' : 'Trade Name & Form.'}</th>
                          <th className="py-3 px-3.5">{language === 'bn' ? 'সক্রিয় উপাদান' : 'Active Ingredient'}</th>
                          {/* Dedicated IRAC/FRAC/HRAC MoA Column */}
                          <th className="py-3 px-3.5 bg-emerald-50 text-emerald-950 border-x border-emerald-200/70 font-black">
                            <div className="flex items-center gap-1.5">
                              <Sparkles className="w-3 h-3 text-emerald-600" />
                              <span>{language === 'bn' ? 'MoA নম্বর (IRAC/FRAC)' : 'MoA Number (IRAC/FRAC)'}</span>
                            </div>
                          </th>
                          <th className="py-3 px-3.5">{language === 'bn' ? 'নিবন্ধন নং' : 'Reg. No'}</th>
                          <th className="py-3 px-3.5">{language === 'bn' ? 'রেজিস্ট্রেশন হোল্ডার' : 'Company'}</th>
                          <th className="py-3 px-3.5">{language === 'bn' ? 'অনুমোদিত ফসল' : 'Crops'}</th>
                          <th className="py-3 px-3.5">{language === 'bn' ? 'অনুমোদিত পোকা/রোগ' : 'Target Pests'}</th>
                          <th className="py-3 px-3.5">{language === 'bn' ? 'প্রয়োগ মাত্রা' : 'Dosage Rate'}</th>
                          <th className="py-3 px-3.5 text-center">{language === 'bn' ? 'তোলার বিরতি' : 'PHI'}</th>
                          <th className="py-3 px-3.5 text-center">{language === 'bn' ? 'অ্যাকশন' : 'Actions'}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-normal text-slate-800">
                        {filteredProducts.slice(0, visibleLimit).map((product, idx) => (
                          <tr 
                            key={product.id}
                            className="hover:bg-slate-50/80 transition-colors"
                          >
                            {/* Index */}
                            <td className="py-2.5 px-3.5 text-center text-slate-400 font-mono text-[11px]">
                              {formatNum(idx + 1)}
                            </td>

                            {/* Trade Name */}
                            <td className="py-2.5 px-3.5 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => onSelectProduct(product)}
                                  className="font-bold text-slate-900 hover:text-emerald-700 transition text-left cursor-pointer"
                                >
                                  {product.tradeName}
                                </button>
                                {product.formulation && (
                                  <span className="bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-bold border border-slate-200">
                                    {product.formulation}
                                  </span>
                                )}
                              </div>
                              <span className={`inline-flex items-center gap-1 text-[9px] font-semibold px-1.5 py-0.2 rounded-full border mt-0.5 ${getCategoryTheme(product.type)}`}>
                                {transCat(product.type)}
                              </span>
                            </td>

                            {/* Active Ingredient */}
                            <td className="py-2.5 px-3.5 text-slate-700 font-medium max-w-[170px]">
                              <span className="truncate block font-semibold text-slate-800" title={product.commonName}>
                                {product.commonName}
                              </span>
                            </td>

                            {/* DEDICATED COLUMN: IRAC / FRAC / HRAC MoA Number */}
                            <td className="py-2.5 px-3.5 bg-emerald-50/40 border-x border-emerald-100 whitespace-nowrap">
                              <div className="flex flex-col items-start gap-0.5">
                                <span 
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-[11px] font-mono font-black tracking-tight border shadow-2xs ${
                                    product.moaCode?.startsWith('IRAC')
                                      ? 'bg-emerald-900 text-emerald-200 border-emerald-700'
                                      : product.moaCode?.startsWith('FRAC')
                                      ? 'bg-sky-900 text-sky-200 border-sky-700'
                                      : product.moaCode?.startsWith('HRAC')
                                      ? 'bg-amber-900 text-amber-200 border-amber-700'
                                      : 'bg-slate-800 text-slate-200 border-slate-700'
                                  }`}
                                  title={product.moaGroup}
                                >
                                  {product.moaCode || 'IRAC UN'}
                                </span>
                                <span className="text-[10px] text-slate-500 font-medium truncate max-w-[160px] block" title={product.moaGroup}>
                                  {product.moaGroup}
                                </span>
                              </div>
                            </td>

                            {/* Registration No */}
                            <td className="py-2.5 px-3.5 whitespace-nowrap font-mono text-[11px] font-bold text-slate-600">
                              {product.registrationNo}
                            </td>

                            {/* Registration Holder */}
                            <td className="py-2.5 px-3.5 text-slate-600 max-w-[170px]">
                              <span className="truncate block text-[11px]" title={product.registrationHolder}>
                                {product.registrationHolder}
                              </span>
                            </td>

                            {/* Recommended Crops */}
                            <td className="py-2.5 px-3.5 max-w-[160px]">
                              <div className="flex flex-wrap gap-1">
                                {product.crops.slice(0, 2).map((crop: string) => (
                                  <span key={crop} className="bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded text-[10px] font-medium">
                                    {transCrop(crop)}
                                  </span>
                                ))}
                                {product.crops.length > 2 && (
                                  <span className="text-slate-400 text-[10px] font-semibold" title={product.crops.join(', ')}>
                                    +{product.crops.length - 2}
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Recommended Pests */}
                            <td className="py-2.5 px-3.5 max-w-[160px]">
                              <span className="text-[11px] text-slate-600 truncate block" title={product.pests.join(', ')}>
                                {product.pests.map((pest) => transPest(pest)).join(', ') || '—'}
                              </span>
                            </td>

                            {/* Dosage */}
                            <td className="py-2.5 px-3.5 max-w-[140px] font-medium text-slate-700">
                              <span className="truncate block text-[11px]" title={product.dosageRate}>
                                {transDose(product.dosageRate)}
                              </span>
                            </td>

                            {/* PHI */}
                            <td className="py-2.5 px-3.5 text-center whitespace-nowrap font-bold">
                              {product.phiDays ? (
                                <span className="bg-slate-100 text-slate-800 px-2 py-0.5 rounded-full text-[10px]">
                                  {formatNum(product.phiDays)} {language === 'bn' ? 'দিন' : 'd'}
                                </span>
                              ) : (
                                <span className="text-slate-400">—</span>
                              )}
                            </td>

                            {/* Actions */}
                            <td className="py-2.5 px-3.5 whitespace-nowrap text-center">
                              <div className="flex items-center justify-center gap-1">
                                <button
                                  onClick={() => onOpenCalculator(product)}
                                  className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition cursor-pointer"
                                  title={language === 'bn' ? 'ডোজ হিসাব' : 'Dosage'}
                                >
                                  <Calculator className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => onOpenSafety(product)}
                                  className="p-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg transition cursor-pointer"
                                  title={language === 'bn' ? 'নিরাপত্তা শিট' : 'Safety'}
                                >
                                  <ShieldCheck className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => onSelectProduct(product)}
                                  className="p-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition cursor-pointer"
                                  title={language === 'bn' ? 'বিস্তারিত' : 'Details'}
                                >
                                  <Info className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>

                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {filteredProducts.length > visibleLimit && (
                    <div className="flex flex-col items-center justify-center py-5 border-t border-slate-100 bg-slate-50/50 space-y-2">
                      <p className="text-xs font-semibold text-slate-500">
                        {language === 'bn'
                          ? `মোট ${formatNum(filteredProducts.length)} টির মধ্যে ${formatNum(Math.min(visibleLimit, filteredProducts.length))} টি পণ্য প্রদর্শিত হচ্ছে`
                          : `Showing ${Math.min(visibleLimit, filteredProducts.length)} of ${filteredProducts.length} registered products`}
                      </p>
                      <button
                        onClick={() => setVisibleLimit((prev) => prev + 50)}
                        className="px-5 py-2 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs shadow-xs transition flex items-center gap-2 cursor-pointer"
                      >
                        <Layers className="w-4 h-4 text-emerald-600" />
                        <span>{language === 'bn' ? 'আরও ৫০টি পণ্য লোড করুন' : 'Load 50 More Products'}</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : viewMode === 'grouped' ? (
              
              // View Mode 2: Compact, Grouped by Active Ingredient
              <div className="space-y-4">
                
                {/* Expand / Collapse All control triggers */}
                <div className="flex justify-end gap-3 text-[11px] font-bold text-emerald-800">
                  <button onClick={expandAll} className="hover:underline cursor-pointer">{language === 'bn' ? 'সবগুলো গ্রুপ খুলুন' : 'Expand All Groups'}</button>
                  <span className="text-slate-300">|</span>
                  <button onClick={collapseAll} className="hover:underline cursor-pointer">{language === 'bn' ? 'সবগুলো গ্রুপ বন্ধ করুন' : 'Collapse All Groups'}</button>
                </div>

                {groupedByIngredient.map((group) => {
                  const isExpanded = !!expandedIngredients[group.ingredient];
                  const hasGreenOrBlueToxicity = group.whoColor === '#3b82f6' || group.whoColor === '#22c55e' || group.whoColor === '#10b981';

                  return (
                    <div 
                      key={group.ingredient} 
                      className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-3xs transition-all duration-200 hover:border-slate-300"
                    >
                      
                      {/* Active Ingredient Summary Header Box */}
                      <div 
                        onClick={() => toggleExpand(group.ingredient)}
                        className="p-4.5 flex flex-col md:flex-row md:items-center justify-between gap-3 cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors"
                      >
                        <div className="space-y-1">
                          
                          {/* Row 1: Badges */}
                          <div className="flex flex-wrap items-center gap-2">
                            <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${getCategoryTheme(group.type)}`}>
                              {getCategoryIcon(group.type, "w-3.5 h-3.5")}
                              <span>{transCat(group.type)}</span>
                            </span>
                            {group.moaCode && (
                              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-emerald-300 tracking-wide">
                                MoA {group.moaCode}
                              </span>
                            )}
                            {group.resistanceRisk && (
                              <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${getRiskColor(group.resistanceRisk)}`}>
                                {language === 'bn' ? transRisk(group.resistanceRisk) : `${transRisk(group.resistanceRisk)} Risk`}
                              </span>
                            )}
                          </div>

                          {/* Row 2: Ingredient Name */}
                          <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
                            <Tag className="w-4 h-4 text-emerald-600" />
                            <span>{group.ingredient}</span>
                          </h3>

                          {/* Row 3: MoA Group Label & Crops summary */}
                          <div className="text-xs text-slate-500 space-y-1">
                            {group.moaGroup && (
                              <p className="font-medium text-slate-600">
                                {language === 'bn' ? 'ক্রিয়া কৌশলের গ্রুপ:' : 'Mode of Action Group:'} <strong className="text-slate-800">{language === 'bn' ? (moaInfoMap[group.moaCode || '']?.nameBn || group.moaGroup) : group.moaGroup}</strong>
                              </p>
                            )}
                            <div className="flex flex-wrap gap-1 items-center pt-1">
                              <span className="text-[10px] font-bold uppercase text-slate-400 mr-1">{language === 'bn' ? 'অনুমোদিত ফসল:' : 'Crops:'}</span>
                              {Array.from(group.crops).slice(0, 5).map((c: string) => (
                                <span key={c} className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md text-[10px] font-semibold">
                                  {transCrop(c)}
                                </span>
                              ))}
                              {group.crops.size > 5 && (
                                <span className="text-slate-400 text-[10px] font-semibold">+{group.crops.size - 5} {language === 'bn' ? 'টি ফসল' : 'more'}</span>
                              )}
                            </div>
                          </div>

                        </div>

                        {/* Expand Trigger Indicator */}
                        <div className="flex items-center gap-3 shrink-0 self-end md:self-center border-t md:border-t-0 pt-2.5 md:pt-0">
                          <div className="text-right">
                            <span className="block text-[10px] text-slate-400 font-bold uppercase">{language === 'bn' ? 'অনুমোদিত ব্র্যান্ড' : 'Registered Brands'}</span>
                            <span className="text-sm font-black text-emerald-800">{formatNum(group.products.length)} {language === 'bn' ? 'টি পণ্য' : 'brands'}</span>
                          </div>
                          <div className="p-1.5 bg-slate-100 border border-slate-200 text-slate-600 rounded-lg">
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        </div>

                      </div>

                      {/* Expanded Section containing list of Brand formulations under this Active Ingredient */}
                      {isExpanded && (
                        <div className="border-t border-slate-200/80 bg-white p-4 space-y-3.5">
                          
                          <div className="flex items-center justify-between text-xs font-bold text-slate-600 pb-1.5 border-b border-slate-100">
                            <span>{language === 'bn' ? 'অনুমোদিত ব্রান্ড ফর্মুলেশনসমূহ' : 'Authorized Commercial Brands'}</span>
                            <span className="text-[10px] text-slate-400 font-medium">({formatNum(group.products.length)} {language === 'bn' ? 'টি নিবন্ধিত ব্র্যান্ড' : 'brands registered'})</span>
                          </div>

                          {/* Render Brands inside as clean rows without nesting cards */}
                          <div className="divide-y divide-slate-100">
                            {group.products.map((brand) => (
                              <div 
                                key={brand.id} 
                                className="py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs first:pt-0 last:pb-0 hover:bg-slate-50/60 px-2 rounded-lg transition-colors"
                              >
                                {/* Column 1: Brand Name and Reg Details */}
                                <div className="space-y-1 min-w-[220px]">
                                  <div className="flex items-baseline gap-2">
                                    <h4 className="font-bold text-sm text-slate-900">{brand.tradeName}</h4>
                                    {brand.formulation && (
                                      <span className="bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded text-[10px] font-bold border border-slate-200">
                                        {brand.formulation}
                                      </span>
                                    )}
                                  </div>
                                  <div className="text-[11px] text-slate-500 font-medium space-x-2 flex flex-wrap">
                                    <span>{language === 'bn' ? 'নিবন্ধন নং:' : 'Reg No:'} <strong className="font-mono text-slate-700">{brand.registrationNo}</strong></span>
                                    <span className="text-slate-300">|</span>
                                    <span>{language === 'bn' ? 'আমদানিকারক:' : 'Holder:'} <strong className="text-slate-700">{brand.registrationHolder}</strong></span>
                                  </div>
                                </div>

                                {/* Column 2: Dedicated MoA Number Column */}
                                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 min-w-[130px] shrink-0">
                                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                                    {brand.moaCode?.startsWith('IRAC') ? 'IRAC MoA' : brand.moaCode?.startsWith('FRAC') ? 'FRAC MoA' : brand.moaCode?.startsWith('HRAC') ? 'HRAC MoA' : 'MoA নম্বর'}
                                  </span>
                                  <span className="inline-block mt-0.5 px-2 py-0.5 rounded text-[11px] font-mono font-black bg-slate-800 text-emerald-300">
                                    {brand.moaCode || 'IRAC UN'}
                                  </span>
                                  <span className="text-[10px] text-slate-500 truncate block max-w-[140px] mt-0.5" title={brand.moaGroup}>
                                    {language === 'bn' ? (moaInfoMap[brand.moaCode || '']?.nameBn || brand.moaGroup) : brand.moaGroup}
                                  </span>
                                </div>

                                {/* Column 3: Dosage and PHI */}
                                <div className="grid grid-cols-2 gap-4 text-[11px] md:max-w-xs w-full md:w-auto bg-slate-50 p-2 rounded-lg border border-slate-100">
                                  <div>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">{language === 'bn' ? 'প্রয়োগ মাত্রা' : 'Dosage'}</span>
                                    <span className="font-bold text-slate-800 truncate block max-w-[110px]" title={brand.dosageRate}>{transDose(brand.dosageRate)}</span>
                                  </div>
                                  <div>
                                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">{language === 'bn' ? 'তোলার বিরতি' : 'PHI Days'}</span>
                                    <span className="font-bold text-slate-800 block">
                                      {brand.phiDays ? `${formatNum(brand.phiDays)} ${language === 'bn' ? 'দিন' : 'days'}` : '—'}
                                    </span>
                                  </div>
                                </div>

                                {/* Column 4: Actions Triggers */}
                                <div className="flex items-center gap-1.5 shrink-0 self-end md:self-auto pt-2 md:pt-0">
                                  
                                  {/* Mixing Dosage Station Trigger */}
                                  <button
                                    onClick={() => onOpenCalculator(brand)}
                                    className="p-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200/70 text-emerald-700 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer"
                                    title={language === 'bn' ? 'হিসাবকারী স্টেশন খুলুন' : 'Open Dosage Station'}
                                  >
                                    <Calculator className="w-4 h-4" />
                                    <span className="text-[10px] font-bold">{language === 'bn' ? 'ডোজ হিসাব' : 'Dosage'}</span>
                                  </button>

                                  {/* Safety Assessment Checklist */}
                                  <button
                                    onClick={() => onOpenSafety(brand)}
                                    className="p-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200/70 text-indigo-700 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer"
                                    title={language === 'bn' ? 'নিরাপত্তা চেকলিস্ট' : 'Safety Protocols'}
                                  >
                                    <ShieldCheck className="w-4 h-4" />
                                    <span className="text-[10px] font-bold">{language === 'bn' ? 'নিরাপত্তা' : 'Safety'}</span>
                                  </button>

                                  {/* Detail Specs Panel */}
                                  <button
                                    onClick={() => onSelectProduct(brand)}
                                    className="p-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 rounded-lg font-bold transition flex items-center gap-1 cursor-pointer"
                                    title={language === 'bn' ? 'বিস্তারিত তথ্য' : 'Product Technical Datasheet'}
                                  >
                                    <Info className="w-4 h-4" />
                                  </button>

                                </div>

                              </div>
                            ))}
                          </div>

                        </div>
                      )}

                    </div>
                  );
                })}

              </div>
            ) : (
              
              // View Mode 3: Standard flat list with ProductCard grid
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.slice(0, visibleLimit).map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelectProduct={onSelectProduct}
                      onOpenCalculator={onOpenCalculator}
                      onOpenSafety={onOpenSafety}
                    />
                  ))}
                </div>

                {filteredProducts.length > visibleLimit && (
                  <div className="flex flex-col items-center justify-center pt-8 pb-4 space-y-3">
                    <p className="text-xs font-semibold text-slate-500">
                      {language === 'bn'
                        ? `মোট ${formatNum(filteredProducts.length)} টির মধ্যে ${formatNum(Math.min(visibleLimit, filteredProducts.length))} টি পণ্য প্রদর্শিত হচ্ছে`
                        : `Showing ${Math.min(visibleLimit, filteredProducts.length)} of ${filteredProducts.length} registered products`}
                    </p>
                    <button
                      onClick={() => setVisibleLimit((prev) => prev + 48)}
                      className="px-6 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 font-bold text-xs shadow-xs transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Layers className="w-4 h-4 text-emerald-600" />
                      <span>{language === 'bn' ? 'আরও পণ্য লোড করুন' : 'Load More Products'}</span>
                    </button>
                  </div>
                )}
              </div>
            )

          ) : (
            
            // Empty Results fallback
            <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-base text-slate-900">{t('no_results_title')}</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto font-medium">
                  {t('no_results_desc')}
                </p>
              </div>
              <button
                onClick={resetFilters}
                className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition cursor-pointer"
              >
                {t('clear_filters')}
              </button>
            </div>
          )}

        </div>

      </div>

      {/* Official DAE Registry Disclaimer & Source Verification Footnote */}
      <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <ShieldAlert className="w-5 h-5 text-slate-500 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <strong className="text-slate-900 block font-bold">
              {language === 'bn' ? 'অফিসিয়াল ডিএই তথ্যসূত্র ও আইনি ডিসক্লেইমার:' : 'Official DAE Database Citation & Regulatory Disclaimer:'}
            </strong>
            <p className="text-slate-600 leading-relaxed font-medium">
              {language === 'bn' 
                ? 'এই ডেটাবেসের সকল তথ্য বাংলাদেশ সরকারের কৃষি সম্প্রসারণ অধিদপ্তর (DAE) ও উদ্ভিদ সংরক্ষণ উইং কর্তৃক অনুমোদিত এবং নিবন্ধিত বালাইনাশকের গেজেট তালিকা থেকে সংগৃহীত। ব্যবহারের পূর্বে প্যাকেজের গায়ে খোদাইকৃত বালাইনাশক রেজি. নম্বর মিলিয়ে আসল পণ্য যাচাই করুন। জমিতে প্রয়োগের পূর্বে সর্বদা উপ-সহকারী কৃষি কর্মকর্তা বা ডিএই ফিল্ড অফিসারের প্রত্যক্ষ প্রেসক্রিপশন ও পরামর্শ গ্রহণ করুন।'
                : 'All chemical registry details, trade formulations, and registration numbers displayed in this catalog are sourced directly from the gazetted registers compiled by the Plant Protection Wing of the Department of Agricultural Extension (DAE), Ministry of Agriculture, Government of Bangladesh. Always cross-verify the registration numbers printed on chemical packaging to identify genuine formulations, and consult with certified DAE agronomy field officers before actual crop spraying.'}
            </p>
          </div>
        </div>
      </div>

    </div>
  );
};
