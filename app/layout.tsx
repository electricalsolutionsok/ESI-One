import type { Metadata } from 'next';
import './style.css';
export const metadata: Metadata = { title:'ESI One | AI Scope Review', description:'Internal electrical proposal analysis workspace' };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}
