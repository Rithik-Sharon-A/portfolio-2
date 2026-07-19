'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type SystemMode = 'normal' | 'debug';

interface InstrumentBusValue {
  activeProjectId: string | null;
  techFilter: string | null;
  debugOpen: boolean;
  systemMode: SystemMode;
  projectsHighlight: boolean;
  scopeIntensity: number;
  toast: string | null;
  openProject: (id: string | null) => void;
  filterByTech: (tech: string | null) => void;
  setDebugOpen: (open: boolean) => void;
  toggleDebug: () => void;
  setSystemMode: (mode: SystemMode) => void;
  flashProjects: () => void;
  setScopeIntensity: (n: number) => void;
  showToast: (msg: string) => void;
  scrollToSection: (id: string) => void;
}

const InstrumentBusContext = createContext<InstrumentBusValue | null>(null);

export function InstrumentBusProvider({ children }: { children: ReactNode }) {
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [techFilter, setTechFilter] = useState<string | null>(null);
  const [debugOpen, setDebugOpen] = useState(false);
  const [systemMode, setSystemMode] = useState<SystemMode>('normal');
  const [projectsHighlight, setProjectsHighlight] = useState(false);
  const [scopeIntensity, setScopeIntensity] = useState(0.35);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 2600);
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const openProject = useCallback((id: string | null) => {
    setActiveProjectId(id);
    if (id) scrollToSection('projects');
  }, [scrollToSection]);

  const filterByTech = useCallback(
    (tech: string | null) => {
      setTechFilter(tech);
      if (tech) {
        scrollToSection('projects');
        setProjectsHighlight(true);
        window.setTimeout(() => setProjectsHighlight(false), 1800);
        showToast(`Filter · ${tech}`);
      }
    },
    [scrollToSection, showToast]
  );

  const flashProjects = useCallback(() => {
    scrollToSection('projects');
    setProjectsHighlight(true);
    window.setTimeout(() => setProjectsHighlight(false), 2000);
    showToast('Radar · scanning deployed systems');
  }, [scrollToSection, showToast]);

  const toggleDebug = useCallback(() => {
    setSystemMode((m) => {
      const next = m === 'normal' ? 'debug' : 'normal';
      showToast(next === 'debug' ? 'Debug Mode · ENABLED' : 'Debug Mode · OFF');
      return next;
    });
  }, [showToast]);

  useEffect(() => {
    let buffer = '';
    let clearTimer: ReturnType<typeof setTimeout>;

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
        return;
      }
      if (e.key.length !== 1) return;
      buffer += e.key.toLowerCase();
      if (buffer.length > 24) buffer = buffer.slice(-24);
      clearTimeout(clearTimer);
      clearTimer = setTimeout(() => {
        buffer = '';
      }, 1400);

      if (buffer.endsWith('help')) {
        window.dispatchEvent(new Event('open-terminal'));
        showToast('Terminal · help');
        buffer = '';
      } else if (buffer.endsWith('status')) {
        showToast('SYS OK · PWR · UART · LINK');
        buffer = '';
      } else if (buffer.endsWith('projects')) {
        flashProjects();
        buffer = '';
      } else if (buffer.endsWith('firmware')) {
        setScopeIntensity(1);
        window.setTimeout(() => setScopeIntensity(0.35), 2200);
        showToast('Scope · firmware pulse');
        buffer = '';
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      clearTimeout(clearTimer);
    };
  }, [flashProjects, showToast]);

  const value = useMemo(
    () => ({
      activeProjectId,
      techFilter,
      debugOpen,
      systemMode,
      projectsHighlight,
      scopeIntensity,
      toast,
      openProject,
      filterByTech,
      setDebugOpen,
      toggleDebug,
      setSystemMode,
      flashProjects,
      setScopeIntensity,
      showToast,
      scrollToSection,
    }),
    [
      activeProjectId,
      techFilter,
      debugOpen,
      systemMode,
      projectsHighlight,
      scopeIntensity,
      toast,
      openProject,
      filterByTech,
      toggleDebug,
      flashProjects,
      showToast,
      scrollToSection,
    ]
  );

  return (
    <InstrumentBusContext.Provider value={value}>
      {children}
      {toast && (
        <div
          role="status"
          style={{
            position: 'fixed',
            top: 72,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 950,
            fontFamily: 'DM Mono, monospace',
            fontSize: 11,
            letterSpacing: '0.12em',
            color: '#00D4FF',
            background: 'rgba(14,15,18,0.94)',
            border: '1px solid rgba(0,212,255,0.28)',
            padding: '8px 14px',
            pointerEvents: 'none',
          }}
        >
          {toast}
        </div>
      )}
    </InstrumentBusContext.Provider>
  );
}

export function useInstrumentBus() {
  const ctx = useContext(InstrumentBusContext);
  if (!ctx) throw new Error('useInstrumentBus must be used within InstrumentBusProvider');
  return ctx;
}
