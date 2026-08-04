import TableHeader from "./elements/TableHeader";

const Table = ({
  header = { title: "لیست آیتم‌ها", Buttons: undefined },
  children,
}) => {
  return (
    <div className="mt-10 border min-w-full! bg-white primary-border-color rounded-xl overflow-hidden">
      <TableHeader header={header} />
      <div>{children}</div>
    </div>
  );
};

export default Table;
