import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { ConfigProvider, theme as antdTheme } from "antd";

const ThemeContext = createContext({
  theme: 'system',
  setTheme: () => {},
});

const STORAGE_KEY = 'theme'; // 'light' | 'dark' | 'system'

export default function ThemeProvider({children}) {
  const [theme, setTheme] = useState(() => {
    localStorage.getItem(STORAGE_KEY) || 'system';
  })

  const systemDark = useMemo(() => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }, [])

  useEffect(() => {
    const save = () => {
      localStorage.setItem(STORAGE_KEY, theme);
    }
  }, [theme])

  const effective = theme === 'system' ? (systemDark?.matches ? 'dark' : 'light') : theme;

  useEffect(() => {
    const el = document.documentElement;
    el.setAttribute('data-theme', effective);

    el.style.background = effective === 'dark' ? '#0f1c26' : '#ffffff';
    if (!systemDark) return;

    const listener = e => theme === 'system' && el.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    systemDark.addEventListener?.('change', listener);

    return () => systemDark.removeEventListener?.('change', listener);
  }, [systemDark, effective, theme]);

  const { defaultAlgorithm, darkAlgorithm } = antdTheme;
  
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <ConfigProvider theme={{
          algorithm: effective === 'dark' ? darkAlgorithm : defaultAlgorithm,
          token: {
            colorPrimary: '#1677ff',
            borderRadius: 10,
            fontFamily: 'Inter, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
            colorBgLayout: effective === 'dark' ? '#07131b' : '#f5f7fa',
          },
          components: {
            Card: { borderRadiusLG: 14, boxShadow: '0 6px 20px rgba(0,0,0,0.08)' },
            Statistic: { titleFontSize: 14 },
            Layout: { headerBg: 'transparent' },
            Tag: { fontSize: 12, borderRadiusSM: 999 },
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext);