interface DividerProps {
  color: string;
  height: string;
}

export default function Divider({ color, height }: DividerProps) {
  return <div className={`w-full ${height} ${color}`} />;
}
