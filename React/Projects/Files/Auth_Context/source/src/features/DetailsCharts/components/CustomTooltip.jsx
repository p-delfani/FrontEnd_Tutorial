const CustomTooltip = ({ payload }) => {
  return (
    <div className="custom-tooltip bg-white p-2 border shadow rounded">
      <p className="label">{`${payload[0]?.payload?.name}: ${payload[0]?.payload?.value}`}</p>
    </div>
  );
};

export default CustomTooltip;
