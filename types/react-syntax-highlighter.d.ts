declare module 'react-syntax-highlighter';
declare module 'react-syntax-highlighter/dist/esm/styles/prism';

declare module 'react-markdown' {
  import { ComponentType } from 'react';
  
  interface CodeProps {
    inline?: boolean;
    className?: string;
    children?: React.ReactNode;
  }

  const ReactMarkdown: ComponentType<{
    children: string;
    components?: Record<string, ComponentType<any>>;
  }>;
  
  export default ReactMarkdown;
} 