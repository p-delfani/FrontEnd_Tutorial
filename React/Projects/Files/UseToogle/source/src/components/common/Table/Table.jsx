import Pagination from "../Pagination";
import TableHeader from "./elements/TableHeader";

const Table = ({
  header = { title: "لیست آیتم‌ها", Buttons: undefined },
  children,
  pagination = {
    items: null,
    setItems: null,
    itemsPerPage: null,
  },
}) => {
  return (
    <div className="mt-10 border min-w-full! bg-white primary-border-color rounded-xl overflow-hidden">
      <TableHeader header={header} />
      <div>{children}</div>

      <Pagination
        items={pagination.items}
        setItems={pagination.setItems}
        itemsPerPage={pagination.itemsPerPage}
      />
    </div>
  );
};

export default Table;
