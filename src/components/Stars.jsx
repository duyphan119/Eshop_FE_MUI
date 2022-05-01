import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import { EXAMPLE_STARS_ARRAY } from "../constants";
const Stars = ({ fontSize, rate, setRate, isActive }) => {
  return (
    <ul
      style={{
        display: "flex",
        listStyle: "none",
        color: "var(--main-color)",
        padding: 0,
        margin: 0,
      }}
    >
      {EXAMPLE_STARS_ARRAY.map((item) => {
        return (
          <li key={item + Math.random()} style={{ color: "var(--star-color)" }}>
            {!isActive && item <= rate && (
              <span>
                <StarIcon
                  fontSize={fontSize}
                  sx={{ transform: "translateY(1px)" }}
                />
              </span>
            )}
            {!isActive &&
              item > rate &&
              (rate !== 0 && Math.ceil(rate) % 5 === 0 ? (
                <span>
                  <StarHalfIcon
                    fontSize={fontSize}
                    sx={{ transform: "translateY(1px)" }}
                  />
                </span>
              ) : (
                <span>
                  <StarBorderIcon
                    fontSize={fontSize}
                    sx={{ transform: "translateY(1px)" }}
                  />
                </span>
              ))}
            {isActive && (
              <span
                onMouseEnter={() => {
                  setRate(item);
                }}
                onMouseLeave={() => {
                  if (item === 1) {
                    setRate(0);
                  }
                }}
              >
                {item <= rate ? (
                  <StarIcon
                    fontSize={fontSize}
                    sx={{ transform: "translateY(1px)" }}
                  />
                ) : (
                  <StarBorderIcon
                    fontSize={fontSize}
                    sx={{ transform: "translateY(1px)" }}
                  />
                )}
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Stars;
