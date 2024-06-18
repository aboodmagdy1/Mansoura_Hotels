type Props = {
  selectedOption?: string;
  onChange: (value?: string) => void;
};

const SortByList = ({ selectedOption, onChange }: Props) => {
  return (
    <div>
      <select
        className="p-2 border rounded-md w-full"
        value={selectedOption}
        onChange={(event) =>
          onChange(event.target.value ? event.target.value : undefined)
        }
      >
        <option value="">Sort By</option>
        <option value="startRating">Star Rating</option>
        <option value="pricePerNightAsc">
          Price Per Night ( low to high )
        </option>
        <option value="pricePerNightDesc">
          Price Per Night ( high to low )
        </option>
      </select>
    </div>
  );
};

export default SortByList;
