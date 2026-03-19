import React, { useEffect, useMemo, useState } from 'react';
import {
  AlertOctagon,
  ArrowRightCircle,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  Clock,
  Download,
  ExternalLink,
  Eye,
  EyeOff,
  Languages,
  Layers,
  LayoutGrid,
  Maximize2,
  Package,
  Star,
  Stethoscope,
  Tags,
  Trash2,
  Truck,
  ChevronDown as MoveDown,
  ChevronUp as MoveUp,
} from 'lucide-react';

const T1_DATA = [
  { code: 'LH 1873', belt: '50', dest: 'MUC', airline: 'Lufthansa', std: '16:57', fc: 'CARR', richiesta: '1BL / 2BT / 1BS', tot: '4AKH' },
  { code: 'LH 243', belt: '49', dest: 'FRA', airline: 'Lufthansa', std: '17:02', fc: 'CARR', richiesta: '1BL / 4BT / 2 IAH 440', tot: '7AKH' },
  { code: 'IB 658', belt: '39', dest: 'MAD', airline: 'Iberia', std: '17:27', fc: 'CARR', richiesta: '2BL / 2BT / 1BS', tot: '5AKH' },
  { code: 'DX 1701', belt: '46', dest: 'AOI', airline: 'Danish Air', std: '17:37', fc: '', richiesta: '', tot: '' },
  { code: 'FR 4902', belt: '48', dest: 'PMO', airline: 'Ryanair', std: '17:57', fc: '', richiesta: '', tot: '' },
  { code: 'FR 1170', belt: '44', dest: 'CTA', airline: 'Ryanair', std: '18:32', fc: '', richiesta: '', tot: '' },
  { code: 'FR 999', belt: '47', dest: 'VLC', airline: 'Ryanair', std: '18:37', fc: '', richiesta: '', tot: '' },
  { code: 'FR 1198', belt: '45', dest: 'ATH', airline: 'Ryanair', std: '18:42', fc: '', richiesta: '', tot: '' },
  { code: 'KM 613', belt: '39', dest: 'MLA', airline: 'Air Malta', std: '18:52', fc: '', richiesta: '', tot: '' },
  { code: 'FR 9601', belt: '43', dest: 'MAD', airline: 'Ryanair', std: '19:22', fc: '', richiesta: '', tot: '' },
  { code: 'FR 407', belt: '42', dest: 'CPH', airline: 'Ryanair', std: '19:22', fc: '', richiesta: '', tot: '' },
  { code: 'LX 1727', belt: '50', dest: 'ZRH', airline: 'Swiss', std: '19:32', fc: '', richiesta: '2BL+FC / 2BT / 1BS', tot: '5AKH' },
  { code: 'FR 41', belt: '41', dest: 'BER', airline: 'Ryanair', std: '19:32', fc: '', richiesta: '', tot: '' },
  { code: 'VY 6101', belt: '46', dest: 'BCN', airline: 'Vueling', std: '19:42', fc: '', richiesta: '', tot: '' },
  { code: 'LH 231', belt: '64', dest: 'FRA', airline: 'Lufthansa', std: '19:42', fc: 'CARR', richiesta: '1BL / 4BT / 1 IAH UA 047-1 HND 716', tot: '7AKH' },
  { code: 'EW 9883', belt: '39', dest: 'DUS', airline: 'Eurowings', std: '20:02', fc: '', richiesta: '', tot: '' },
  { code: 'OS 552', belt: '49', dest: 'VIE', airline: 'Austrian', std: '20:12', fc: 'CARR', richiesta: '5BL / 1BT / BS CARR', tot: '6AKH' },
  { code: 'VY 6255', belt: '46', dest: 'ORY', airline: 'Vueling', std: '20:17', fc: '', richiesta: '', tot: '' },
  { code: 'A3 651', belt: '64', dest: 'ATH', airline: 'Aegean', std: '20:32', fc: '', richiesta: '', tot: '' },
];

const T3_DATA = [
  { code: 'AZ 601', belt: '12', dest: 'JFK', airline: 'ITA Airways', std: '20:07', richiesta: '3BL / 1BT', tot: '4AKH' },
  { code: 'DL 182', belt: '10', dest: 'ATL', airline: 'Delta', std: '20:42', richiesta: '2BL / 2BT / 1BS', tot: '5AKH' },
  { code: 'UA 40', belt: '8', dest: 'EWR', airline: 'United', std: '21:17', richiesta: '4BL', tot: '4AKH' },
  { code: 'AA 235', belt: '6', dest: 'ORD', airline: 'American', std: '21:57', richiesta: '2BL / 1BT / 1BS', tot: '4AKH' },
];

const TRANSLATIONS = {
  en: {
    back: 'Back',
    totalTasks: 'Total',
    urgent: 'Urgent',
    timeline: 'Timeline',
    nextToHandle: 'Flights to handle',
    belt: 'Belt',
    chute: 'Chute',
    bay: 'Bay',
    allBelts: 'All Belts',
    allChutes: 'All Chutes',
    allBays: 'All Bays',
    atPlaneBy: 'At Plane',
    atPlane: 'At Plane',
    std: 'STD',
    noFlights: 'No matching flights',
    glossary: 'Glossary',
    protocols: 'Protocols',
    bl_def: 'Local Luggage',
    bt_def: 'Transit Luggage',
    akh_def: 'Low Height Container',
    ake_def: 'Large Container',
    bs_def: 'Short Transfer Luggage',
    fm_def: 'Oversized (FM)',
    rushRule: 'Keep on belt. Load last. Do not scan.',
    transitRule: 'Transit baggage can be mixed.',
    priorityRule: 'Immediate trolley.',
    noTagRule: 'Put on ground. Notify TL immediately.',
    sorted: 'Sorted',
    stacked: 'Stacked',
    pastHidden: 'Past hidden',
    pastVisible: 'Past visible',
  },
  it: {
    back: 'Indietro',
    totalTasks: 'Totali',
    urgent: 'Urgenti',
    timeline: 'Timeline',
    nextToHandle: 'Voli da gestire',
    belt: 'Nastro',
    chute: 'Scivolo',
    bay: 'Baia',
    allBelts: 'Tutti i Nastri',
    allChutes: 'Tutti gli Scivoli',
    allBays: 'Tutte le Baie',
    atPlaneBy: 'Sotto Bordo',
    atPlane: 'Sotto Bordo',
    std: 'STD',
    noFlights: 'Nessun volo corrispondente',
    glossary: 'Glossario',
    protocols: 'Protocolli',
    bl_def: 'Bagagli Local',
    bt_def: 'Bagagli Transito',
    akh_def: 'Contenitore Basso',
    ake_def: 'Contenitore Grande',
    bs_def: 'Short Transfer',
    fm_def: 'Fuori Misura',
    rushRule: 'Resta sul nastro. Carica per ultimo. Non scansionare.',
    transitRule: 'Il bagaglio in transito puo essere mischiato.',
    priorityRule: 'Carrello immediato.',
    noTagRule: 'Mettere a terra. Avvisare subito il TL.',
    sorted: 'Smistato',
    stacked: 'Impilato',
    pastHidden: 'Passati nascosti',
    pastVisible: 'Passati visibili',
  },
};

const getPositionCategory = (val, terminal) => {
  const num = parseInt(val, 10);
  if (Number.isNaN(num)) return 'BAY';
  if (terminal === 'T1') {
    if (num === 39 || num === 46) return 'BELT';
    if ((num >= 1 && num <= 11) || (num >= 40 && num <= 48)) return 'CHUTE';
    return 'BAY';
  }
  if ([6, 8, 10, 12].includes(num)) return 'BAY';
  if (num >= 14 && num <= 42 && num % 2 === 0 && num !== 30) return 'CHUTE';
  return 'BELT';
};

const getUrgencyColor = (diffMin) => {
  if (diffMin >= 120) return 'hsl(140, 75%, 35%)';
  if (diffMin <= 45) return 'hsl(0, 85%, 45%)';

  if (diffMin > 70) {
    const normalized = (diffMin - 70) / 50;
    const hue = 35 + normalized * 105;
    return `hsl(${hue}, 80%, 40%)`;
  }

  const normalized = (diffMin - 45) / 25;
  const hue = normalized * 35;
  return `hsl(${hue}, 85%, 45%)`;
};

const parseTime = (timeStr, baseDate) => {
  if (!timeStr) return new Date();
  const [h, m] = timeStr.replace('.', ':').split(':').map(Number);
  const d = new Date(baseDate);
  d.setHours(h || 0, m || 0, 0, 0);
  return d;
};

const formatICSDate = (date) => date.toISOString().replace(/-|:|\.\d+/g, '');

const getUnitTypeMeta = (token, lang) => {
  const normalized = token.trim().toUpperCase();

  if (normalized.includes('BL')) {
    return {
      type: 'local',
      label: lang === 'it' ? 'Bagagli Locali' : 'Local Baggage',
      accent: 'border-emerald-300 bg-emerald-50',
      badge: 'bg-emerald-600 text-white',
      pill: 'bg-emerald-600',
    };
  }

  if (normalized.includes('BS')) {
    return {
      type: 'short',
      label: lang === 'it' ? 'Bagagli Short Transfer' : 'Short Transfer Baggage',
      accent: 'border-red-300 bg-red-50',
      badge: 'bg-red-600 text-white',
      pill: 'bg-red-600',
    };
  }

  if (normalized.includes('BT')) {
    return {
      type: 'transit',
      label: lang === 'it' ? 'Bagagli Transiti' : 'Transit Baggage',
      accent: 'border-blue-300 bg-blue-50',
      badge: 'bg-blue-600 text-white',
      pill: 'bg-blue-600',
    };
  }

  if (normalized.includes('AKH')) {
    return {
      type: 'akh',
      label: 'AKH Extra',
      accent: 'border-indigo-300 bg-indigo-50',
      badge: 'bg-indigo-600 text-white',
      pill: 'bg-indigo-600',
    };
  }

  if (normalized.includes('AKE')) {
    return {
      type: 'ake',
      label: 'AKE Extra',
      accent: 'border-violet-300 bg-violet-50',
      badge: 'bg-violet-600 text-white',
      pill: 'bg-violet-600',
    };
  }

  return {
    type: 'other',
    label: token.trim(),
    accent: 'border-slate-300 bg-slate-50',
    badge: 'bg-slate-700 text-white',
    pill: 'bg-slate-700',
  };
};

const parseInitialUnits = (richiesta) => {
  if (!richiesta) return [];

  return richiesta
    .split('/')
    .flatMap((part) => {
      const trimmed = part.trim();
      const match = trimmed.match(/^(\d+)\s*(.+)$/);
      const count = match ? Number(match[1]) : 1;
      const rawToken = match ? match[2].trim() : trimmed;
      const meta = getUnitTypeMeta(rawToken, 'it');

      return Array.from({ length: count }, (_, index) => ({
        id: `unit-${rawToken}-${index}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        label: count > 1 ? `${meta.label} ${index + 1}` : meta.label,
        rawToken,
        type: meta.type,
        status: 'pending',
        tags: [],
      }));
    });
};

const initialFlightState = (flight) => ({
  ...flight,
  status: { sorted: false, stacked: false, delivered: false, missingTag: false },
  units: parseInitialUnits(flight.richiesta),
});

function App() {
  const [lang, setLang] = useState('it');
  const [now, setNow] = useState(new Date());
  const [terminal, setTerminal] = useState('T1');
  const [view, setView] = useState('DASHBOARD');
  const [activeFlightCode, setActiveFlightCode] = useState(null);
  const [expandedFlight, setExpandedFlight] = useState(null);
  const [hidePast, setHidePast] = useState(true);
  const [t1Flights, setT1Flights] = useState(() => T1_DATA.map(initialFlightState));
  const [t3Flights, setT3Flights] = useState(() => T3_DATA.map(initialFlightState));
  const [filters, setFilters] = useState({ chute: 'All', belt: 'All', bay: 'All' });

  const t = TRANSLATIONS[lang];
  const currentFlights = terminal === 'T1' ? t1Flights : t3Flights;
  const setCurrentFlights = terminal === 'T1' ? setT1Flights : setT3Flights;

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const activeFlightObject = useMemo(
    () => currentFlights.find((flight) => flight.code === activeFlightCode),
    [activeFlightCode, currentFlights]
  );

  const uniquePositions = useMemo(() => {
    const categories = { CHUTE: [], BELT: [], BAY: [] };
    const sourceData = terminal === 'T1' ? T1_DATA : T3_DATA;
    sourceData.forEach((flight) => {
      if (flight.belt !== '—') categories[getPositionCategory(flight.belt, terminal)].push(flight.belt);
    });
    return {
      CHUTE: ['All', ...Array.from(new Set(categories.CHUTE)).sort((a, b) => parseInt(a, 10) - parseInt(b, 10))],
      BELT: ['All', ...Array.from(new Set(categories.BELT)).sort((a, b) => parseInt(a, 10) - parseInt(b, 10))],
      BAY: ['All', ...Array.from(new Set(categories.BAY)).sort((a, b) => parseInt(a, 10) - parseInt(b, 10))],
    };
  }, [terminal]);

  const visibleFlights = useMemo(
    () =>
      currentFlights
        .filter((flight) => {
          const std = parseTime(flight.std, now);
          if (hidePast && std <= now) return false;
          if (filters.chute !== 'All') return flight.belt === filters.chute;
          if (filters.belt !== 'All') return flight.belt === filters.belt;
          if (filters.bay !== 'All') return flight.belt === filters.bay;
          return true;
        })
        .sort((a, b) => parseTime(a.std, now) - parseTime(b.std, now)),
    [currentFlights, filters, hidePast, now]
  );

  const toggleFlightStatus = (code, key) => {
    setCurrentFlights((prev) =>
      prev.map((flight) =>
        flight.code === code ? { ...flight, status: { ...flight.status, [key]: !flight.status[key] } } : flight
      )
    );
  };

  const updateUnit = (code, id, updates) => {
    setCurrentFlights((prev) =>
      prev.map((flight) =>
        flight.code === code
          ? { ...flight, units: flight.units.map((unit) => (unit.id === id ? { ...unit, ...updates } : unit)) }
          : flight
      )
    );
  };

  const moveUnit = (code, id, direction) => {
    setCurrentFlights((prev) =>
      prev.map((flight) => {
        if (flight.code !== code) return flight;
        const index = flight.units.findIndex((unit) => unit.id === id);
        if (index === -1) return flight;
        const nextIndex = direction === 'up' ? index - 1 : index + 1;
        if (nextIndex < 0 || nextIndex >= flight.units.length) return flight;
        const units = [...flight.units];
        [units[index], units[nextIndex]] = [units[nextIndex], units[index]];
        return { ...flight, units };
      })
    );
  };

  const addExtraUnit = (code, type) => {
    const meta = getUnitTypeMeta(type, lang);
    setCurrentFlights((prev) =>
      prev.map((flight) =>
        flight.code === code
          ? {
              ...flight,
              units: [
                ...flight.units,
                {
                  id: `ex-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
                  label: meta.label,
                  rawToken: type,
                  type: meta.type,
                  status: 'pending',
                  tags: [],
                },
              ],
            }
          : flight
      )
    );
  };

  const deleteUnit = (code, id) => {
    setCurrentFlights((prev) =>
      prev.map((flight) => (flight.code === code ? { ...flight, units: flight.units.filter((unit) => unit.id !== id) } : flight))
    );
  };

  const downloadAppleCalendar = (flight) => {
    const std = parseTime(flight.std, now);
    const target = new Date(std.getTime() - 45 * 60000);
    const ics = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:${formatICSDate(target)}\nDTEND:${formatICSDate(std)}\nSUMMARY:${flight.code}\nEND:VEVENT\nEND:VCALENDAR`;
    const blob = new Blob([ics], { type: 'text/calendar' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = `${flight.code}.ics`;
    link.click();
  };

  if (view === 'LOADING' && activeFlightObject) {
    return (
      <div className="min-h-screen bg-slate-100 pb-10 font-sans text-slate-900">
        <header className="sticky top-0 z-50 flex items-center justify-between bg-indigo-900 p-4 text-white shadow-lg">
          <button
            onClick={() => setView('DASHBOARD')}
            className="flex items-center gap-1 text-xs font-black uppercase transition-opacity hover:opacity-70"
          >
            <ChevronLeft />
            {t.back}
          </button>
          <div className="text-center">
            <h1 className="text-sm font-black tracking-widest">{activeFlightObject.code}</h1>
            <p className="text-[10px] font-bold uppercase opacity-70">{activeFlightObject.dest}</p>
          </div>
          <div className="w-10" />
        </header>
        <main className="mx-auto max-w-2xl space-y-4 p-4">
          {activeFlightObject.units.map((unit, index) => (
            (() => {
              const meta = getUnitTypeMeta(unit.rawToken || unit.label, lang);
              return (
            <div
              key={unit.id}
              className={`rounded-2xl border-2 p-4 transition-all ${
                unit.status === 'loaded'
                  ? 'border-emerald-500 bg-emerald-50'
                  : unit.status === 'loading'
                    ? 'animate-pulse border-orange-400 bg-orange-50'
                    : meta.accent
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-black text-white shadow-sm ${meta.pill}`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="pt-0.5 text-sm font-black uppercase leading-tight">{unit.label}</p>
                    <p className={`mt-1 inline-flex rounded-md px-2 py-0.5 text-[9px] font-black uppercase ${meta.badge}`}>
                      {unit.type}
                    </p>
                    <div className="mt-1.5 flex flex-wrap gap-1">
                      {unit.tags.map((tag) => (
                        <span
                          key={tag}
                          className={`rounded border px-2 py-0.5 text-[8px] font-black uppercase ${
                            tag === 'Priority'
                              ? 'border-indigo-700 bg-indigo-600 text-white'
                              : tag === 'Rush'
                                ? 'border-amber-600 bg-amber-500 text-white'
                                : 'border-cyan-600 bg-cyan-500 text-white'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => moveUnit(activeFlightObject.code, unit.id, 'up')}
                    disabled={index === 0}
                    className="rounded-lg p-2 text-slate-400 transition-colors hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <MoveUp className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => moveUnit(activeFlightObject.code, unit.id, 'down')}
                    disabled={index === activeFlightObject.units.length - 1}
                    className="rounded-lg p-2 text-slate-400 transition-colors hover:text-slate-700 disabled:cursor-not-allowed disabled:opacity-30"
                  >
                    <MoveDown className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() =>
                      updateUnit(activeFlightObject.code, unit.id, {
                        status: unit.status === 'pending' ? 'loading' : unit.status === 'loading' ? 'loaded' : 'pending',
                      })
                    }
                    className={`rounded-lg p-2 transition-all ${
                      unit.status === 'loaded' ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    <CheckCircle2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => deleteUnit(activeFlightObject.code, unit.id)}
                    className="p-2 text-slate-300 transition-colors hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="mt-3 flex gap-2 border-t border-slate-100 pt-3">
                {['Priority', 'Rush', 'FM'].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => {
                      const nextTags = unit.tags.includes(tag)
                        ? unit.tags.filter((existingTag) => existingTag !== tag)
                        : [...unit.tags, tag];
                      updateUnit(activeFlightObject.code, unit.id, { tags: nextTags });
                    }}
                    className={`flex-1 rounded-lg border-2 py-1.5 text-[8px] font-black uppercase transition-all ${
                      unit.tags.includes(tag)
                        ? 'border-slate-900 bg-slate-900 text-white shadow-sm'
                        : 'border-slate-100 bg-white text-slate-400'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
              );
            })()
          ))}
          <div className="grid grid-cols-3 gap-2 pt-4">
            <button
              onClick={() => addExtraUnit(activeFlightObject.code, 'AKH')}
              className="rounded-xl border-2 border-slate-200 bg-white py-3 text-[10px] font-black uppercase text-indigo-700 shadow-sm transition-colors active:bg-slate-50"
            >
              + AKH
            </button>
            <button
              onClick={() => addExtraUnit(activeFlightObject.code, 'AKE')}
              className="rounded-xl border-2 border-slate-200 bg-white py-3 text-[10px] font-black uppercase text-indigo-700 shadow-sm transition-colors active:bg-slate-50"
            >
              + AKE
            </button>
            <button
              onClick={() => addExtraUnit(activeFlightObject.code, 'CARR')}
              className="rounded-xl border-2 border-slate-200 bg-white py-3 text-[10px] font-black uppercase text-slate-700 shadow-sm transition-colors active:bg-slate-50"
            >
              + CARR
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-20 font-sans text-slate-900">
      <header className="sticky top-0 z-50 space-y-3 bg-indigo-900 p-4 text-white shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Truck className="h-5 w-5 text-indigo-300" />
            <h1 className="text-md font-black uppercase italic leading-none tracking-tighter">GroundLoad Pro</h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === 'it' ? 'en' : 'it')}
              className="rounded-lg bg-white/10 p-1.5 text-[10px] font-black uppercase transition-all hover:bg-white/20"
            >
              <Languages className="h-3.5 w-3.5" />
            </button>
            <div className="flex items-center gap-2 rounded-lg bg-white/10 px-2.5 py-1 font-mono text-xs font-bold shadow-inner">
              <Clock className="h-3.5 w-3.5 text-indigo-300" />
              {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })}
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex gap-1.5 rounded-xl bg-indigo-950/50 p-1 shadow-inner">
            {['T1', 'T3'].map((nextTerminal) => (
              <button
                key={nextTerminal}
                onClick={() => {
                  setTerminal(nextTerminal);
                  setFilters({ chute: 'All', belt: 'All', bay: 'All' });
                  setExpandedFlight(null);
                }}
                className={`rounded-lg px-5 py-1 text-[10px] font-black transition-all ${
                  terminal === nextTerminal ? 'bg-white text-indigo-900 shadow-sm' : 'text-indigo-300'
                }`}
              >
                {nextTerminal}
              </button>
            ))}
          </div>
          <button
            onClick={() => setHidePast(!hidePast)}
            className={`flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[9px] font-black uppercase transition-all ${
              hidePast ? 'border-indigo-600 bg-indigo-600 text-white shadow-md' : 'border-white/20 bg-white text-indigo-200'
            }`}
          >
            {hidePast ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
            {hidePast ? t.pastHidden : t.pastVisible}
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-4xl space-y-3 p-3">
        <div className="sticky top-[106px] z-40 grid grid-cols-2 gap-3 border-b border-slate-200 bg-slate-50/95 py-2 backdrop-blur-md">
          <div className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm">
            <p className="mb-0.5 text-[8px] font-black uppercase text-slate-400">{t.totalTasks}</p>
            <p className="text-xl font-black leading-none">{visibleFlights.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-2.5 shadow-sm">
            <p className="mb-0.5 text-[8px] font-black uppercase text-slate-400">{t.urgent}</p>
            <p className="text-xl font-black leading-none text-red-600">
              {visibleFlights.filter((flight) => (parseTime(flight.std, now) - 45 * 60000 - now) / 60000 <= 15).length}
            </p>
          </div>
        </div>

        <div className="sticky top-[162px] z-40 grid grid-cols-3 gap-2 border-b border-slate-200 bg-slate-50/95 py-2 backdrop-blur-md">
          {['chute', 'belt', 'bay'].map((category) => (
            <div key={category} className="relative">
              <label className="absolute -top-1.5 left-2 z-10 bg-white px-1 text-[7px] font-black uppercase text-slate-400">
                {t[category]}
              </label>
              <select
                value={filters[category]}
                onChange={(event) => setFilters({ chute: 'All', belt: 'All', bay: 'All', [category]: event.target.value })}
                className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-1.5 py-1.5 text-[10px] font-black shadow-sm outline-none ring-indigo-500 transition-shadow focus:ring-1"
              >
                {uniquePositions[category.toUpperCase()]?.map((position) => (
                  <option key={position} value={position}>
                    {position === 'All' ? t[`all${category.charAt(0).toUpperCase() + category.slice(1)}s`] : position}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-1 flex items-center text-slate-300">
                <ChevronDown className="h-3 w-3" />
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-2 pt-1">
          {visibleFlights.length > 0 && (
            <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.24em] text-slate-400">{t.timeline}</p>
                  <h2 className="text-sm font-black uppercase tracking-tight text-slate-900">{t.nextToHandle}</h2>
                </div>
                <div className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-black uppercase text-slate-500">
                  {visibleFlights.length}
                </div>
              </div>
              <div className="space-y-0">
                {visibleFlights.map((flight, index) => {
                  const stdTime = parseTime(flight.std, now);
                  const target = new Date(stdTime.getTime() - 45 * 60000);
                  const diffMin = (target - now) / 60000;
                  const urgencyBg = getUrgencyColor(diffMin);
                  const category = getPositionCategory(flight.belt, terminal);

                  return (
                    <div key={`timeline-${flight.code}`} className="grid grid-cols-[20px_1fr] gap-3">
                      <div className="flex flex-col items-center">
                        <div
                          style={{ backgroundColor: urgencyBg }}
                          className="mt-1 h-3 w-3 rounded-full border-2 border-white shadow"
                        />
                        {index !== visibleFlights.length - 1 && <div className="mt-1 w-px flex-1 bg-slate-200" />}
                      </div>
                      <button
                        onClick={() => setExpandedFlight(expandedFlight === flight.code ? null : flight.code)}
                        className="mb-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-left transition-colors hover:bg-slate-100"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[10px] font-black uppercase tracking-tight text-slate-900">{flight.code}</p>
                            <p className="text-[10px] font-bold uppercase text-slate-500">
                              {flight.dest} • {t[category.toLowerCase()]} {flight.belt}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[9px] font-black uppercase text-slate-400">{t.atPlaneBy}</p>
                            <p className="text-xs font-black text-slate-800">
                              {target.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                            </p>
                          </div>
                        </div>
                      </button>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {visibleFlights.length === 0 ? (
            <div className="py-20 text-center text-slate-400">
              <Building2 className="mx-auto mb-2 h-12 w-12 opacity-20" />
              <p className="text-xs font-black uppercase">{t.noFlights}</p>
            </div>
          ) : (
            visibleFlights.map((flight) => {
              const stdTime = parseTime(flight.std, now);
              const target = new Date(stdTime.getTime() - 45 * 60000);
              const diffMin = (target - now) / 60000;
              const urgencyBg = getUrgencyColor(diffMin);
              const category = getPositionCategory(flight.belt, terminal);
              const isExpanded = expandedFlight === flight.code;

              return (
                <div key={flight.code} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all">
                  <div
                    className={`flex cursor-pointer items-center justify-between p-3 transition-colors active:bg-slate-50 ${
                      isExpanded ? 'bg-slate-50/50' : ''
                    }`}
                    onClick={() => setExpandedFlight(isExpanded ? null : flight.code)}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        style={{ backgroundColor: urgencyBg }}
                        className="flex h-10 w-10 shrink-0 flex-col items-center justify-center rounded-xl border border-white/20 text-white shadow-sm transition-colors duration-500"
                      >
                        <span className="mb-0.5 text-[6px] font-black uppercase leading-none tracking-tighter opacity-60">
                          {t[category.toLowerCase()]}
                        </span>
                        <span className="text-sm font-black leading-none">{flight.belt}</span>
                      </div>
                      <div>
                        <h2 className="mb-1 text-sm font-black leading-none tracking-tighter">{flight.code}</h2>
                        <p className="text-[10px] font-bold uppercase leading-none text-slate-500">
                          {flight.dest} • <span className="text-indigo-600">{flight.std}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-right">
                      <div>
                        <p className="mb-0.5 text-[8px] font-black uppercase leading-none text-slate-400">{t.atPlaneBy}</p>
                        <p className="text-xs font-black leading-none text-slate-700">
                          {target.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
                        </p>
                      </div>
                      {isExpanded ? <ChevronUp className="h-4 w-4 text-slate-300" /> : <ChevronDown className="h-4 w-4 text-slate-300" />}
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="animate-in slide-in-from-top-2 border-t border-slate-100 bg-white p-3 duration-200">
                      <div className="mb-3 flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/80 p-2">
                        <div>
                          <p className="mb-0.5 text-[8px] font-black uppercase leading-none text-slate-400">Airline</p>
                          <p className="text-[11px] font-black uppercase leading-none text-indigo-900">{flight.airline}</p>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() =>
                              window.open(
                                `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
                                  flight.code
                                )}&dates=${formatICSDate(target)}/${formatICSDate(stdTime)}`,
                                '_blank'
                              )
                            }
                            className="rounded-lg border border-slate-200 bg-white p-2 text-indigo-600 shadow-sm transition-colors active:bg-slate-50"
                          >
                            <Calendar className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => downloadAppleCalendar(flight)}
                            className="rounded-lg border border-slate-200 bg-white p-2 text-indigo-600 shadow-sm transition-colors active:bg-slate-50"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <div className="mb-3 grid grid-cols-4 gap-2">
                        {[
                          { key: 'sorted', icon: LayoutGrid, label: t.sorted, color: 'bg-emerald-600' },
                          { key: 'stacked', icon: Package, label: t.stacked, color: 'bg-blue-600' },
                          { key: 'delivered', icon: Truck, label: t.atPlane, color: 'bg-indigo-900' },
                          { key: 'missingTag', icon: Tags, label: 'TAG?', color: 'bg-red-600' },
                        ].map((action) => (
                          <button
                            key={action.key}
                            onClick={() => toggleFlightStatus(flight.code, action.key)}
                            className={`flex flex-col items-center gap-1 rounded-xl border-2 p-2 transition-all ${
                              flight.status[action.key]
                                ? `${action.color} border-transparent text-white shadow-md`
                                : 'border-slate-100 bg-white text-slate-300'
                            }`}
                          >
                            <action.icon className="h-4 w-4" />
                            <span className="text-[7px] font-black uppercase">{action.label}</span>
                          </button>
                        ))}
                      </div>

                      {flight.status.missingTag && (
                        <div className="mb-3 animate-pulse rounded-xl border border-red-100 bg-red-50 p-2 text-center text-[10px] font-bold uppercase text-red-600 shadow-sm">
                          {t.noTagRule}
                        </div>
                      )}

                      {flight.status.delivered === false && flight.richiesta && (
                        <div className="mb-3 rounded-xl border border-amber-100 bg-amber-50 p-2 text-center text-[10px] font-bold uppercase text-amber-700 shadow-sm">
                          {t.rushRule}
                        </div>
                      )}

                      {flight.richiesta && (
                        <button
                          onClick={() => {
                            setActiveFlightCode(flight.code);
                            setView('LOADING');
                          }}
                          className="flex w-full items-center justify-between rounded-xl border border-indigo-100 bg-indigo-50 p-3 text-indigo-700 shadow-sm transition-all hover:bg-indigo-100 active:scale-95"
                        >
                          <div className="flex items-center gap-2">
                            <Layers className="h-4 w-4" />
                            <span className="text-[10px] font-black uppercase tracking-tight">{flight.richiesta}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black">{flight.tot}</span>
                            <ExternalLink className="h-3 w-3 opacity-50" />
                          </div>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        <footer className="mt-8 space-y-4 pb-10 opacity-90">
          <div className="space-y-3 rounded-2xl border border-slate-200 border-l-8 border-l-orange-500 bg-white p-4 text-[10px] shadow-sm">
            <h3 className="flex items-center gap-2 font-black uppercase tracking-widest text-slate-900">
              <Stethoscope className="h-3.5 w-3.5 text-orange-500" />
              {t.protocols}
            </h3>
            <div className="grid grid-cols-1 gap-3 font-bold text-slate-600 md:grid-cols-2">
              <div className="flex gap-2">
                <Star className="h-3.5 w-3.5 shrink-0 text-indigo-600" />
                <p>
                  <span className="font-black uppercase text-indigo-900">Priority</span> {t.priorityRule}
                </p>
              </div>
              <div className="flex gap-2">
                <ArrowRightCircle className="h-3.5 w-3.5 shrink-0 text-amber-500" />
                <p>
                  <span className="font-black uppercase text-amber-700">Rush</span> {t.rushRule}
                </p>
              </div>
              <div className="flex gap-2">
                <AlertOctagon className="h-3.5 w-3.5 shrink-0 text-red-600" />
                <p>
                  <span className="font-black uppercase text-red-700">No Tag</span> {t.noTagRule}
                </p>
              </div>
              <div className="flex gap-2">
                <Maximize2 className="h-3.5 w-3.5 shrink-0 text-cyan-600" />
                <p>
                  <span className="font-black uppercase text-cyan-700">FM</span> Fuori Misura.
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 rounded-2xl border border-indigo-800 bg-indigo-950 p-4 text-center text-[9px] text-white shadow-lg">
            <div>
              <span className="mb-1 block font-black uppercase opacity-40">{t.glossary}</span>
              BL: {t.bl_def}
            </div>
            <div>
              <span className="mb-1 block font-black uppercase opacity-40">Transit / Short</span>
              BT: {t.bt_def}. {t.transitRule}
            </div>
            <div>
              <span className="mb-1 block font-black uppercase opacity-40">BS / FM / AKE / AKH</span>
              BS: {t.bs_def}. FM: {t.fm_def}. AKE / AKH: {t.ake_def} / {t.akh_def}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;
