declare module 'markdown-it-sub'
declare module 'markdown-it-sup'
declare module 'markdown-it-footnote'
declare module 'markdown-it-deflist'
declare module 'markdown-it-abbr'
declare module 'markdown-it-ins'
declare module 'markdown-it-mark'

declare module 'react-dom'

declare module "*.md" {
  const content: string;
  export default content;
}

interface Number {
  add(arg1: number): number,
  sub(arg1: number): number,
  mul(arg1: number): number,
  div(arg1: number): number,
  floor(arg1: number): number,
  ceil(arg1: number): number,
}

declare module "@components/markdown/md" {
  export function Md(props: any): JSX.Element
}

declare module "@components/calendar" {
  export const Calendar: React.ForwardRefExoticComponent<React.RefAttributes<any>>
}