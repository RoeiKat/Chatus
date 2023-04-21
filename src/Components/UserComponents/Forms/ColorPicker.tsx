import { getColorByBgColor } from "../../../util/inital-color";
export const ColorPicker = function (props: {
  setColor: (color: string) => void;
  color: string;
  username: string;
}) {
  const { setColor, color, username } = props;
  const initialLetter = username && username[0].toUpperCase();

  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <div className="color-pick" style={{ background: `${color}` }}>
        <div className="inital-container">
          <span style={{ zIndex: 999, color: `${getColorByBgColor(color)}` }}>
            {initialLetter}
          </span>
        </div>
        <input
          type="color"
          id="colorInput"
          className="color-input"
          defaultValue={color}
          value={color}
          title="Choose your color"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setColor(e.target.value);
          }}
        />
      </div>
      <label htmlFor="colorInput" className="form-label">
        Choose your color
      </label>
    </div>
  );
};
