interface MenuHeaderProps {
  title: string;
}
const NoneBackMenuHeader: React.FC<MenuHeaderProps> = ({ title }) => {
  return (
    <nav
      className="flex items-center justify-center w-full px-3 text-xl border-b-2 border-solid font-mediums border-b-gray-300"
      style={{ minHeight: "var(--menuheader-height)" }}
    >
      {title}
    </nav>
  );
};

export default NoneBackMenuHeader;
