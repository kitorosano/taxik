import React, { useState } from "react";
import { EmptyStarIcon, FullStarIcon, HalfStarIcon } from "./Icons";

function Rating({
    className,
    count = 5,
    value,
    color = "#ffd700",
    hoverColor = "#ffc107",
    activeColor = "#ffc107",
    size = 20,
    edit = false,
    isHalf = true,
    onChange,
    emptyIcon = <EmptyStarIcon />,
    halfIcon = <HalfStarIcon />,
    fullIcon = <FullStarIcon />,
}) {
    const [hoverValue, setHoverValue] = useState(undefined);

    const handleMouseMove = (index) => {
        if (!edit) {
            return;
        }
        setHoverValue(index);
    };

    const handleMouseLeave = () => {
        if (!edit) {
            return;
        }
        setHoverValue(undefined);
    };

    const handleClick = (index) => {
        if (!edit) {
            return;
        }
        if (onChange) {
            onChange(index + 1);
        }
    };

    const getColor = (index) => {
        if (hoverValue !== undefined) {
            if (index <= hoverValue) {
                return hoverColor;
            }
        }
        if (value > index) {
            return activeColor;
        }
        return color;
    };

    const stars = [];

    for (let i = 0; i < count; i++) {
        let star;
        if (isHalf && value - i > 0 && value - i < 1) {
            star = halfIcon;
        } else if (i < value) {
            star = fullIcon;
        } else {
            star = emptyIcon;
        }

        if (hoverValue !== undefined) {
            if (i <= hoverValue) {
                star = fullIcon;
            }
        }

        stars.push(
            <div
                key={i}
                style={{ cursor: "pointer" }}
                onMouseMove={() => handleMouseMove(i)}
                onMouseLeave={handleMouseLeave}
                onClick={() => handleClick(i)}
            >
                {React.cloneElement(star, {
                    size: size,
                    color:
                        i <= Number(hoverValue)
                            ? hoverColor
                            : i < value
                            ? activeColor
                            : color,
                })}
            </div>
        );
    }

    return (
        <div className={`flex items-center gap-2 ${className}`}>{stars}</div>
    );
}

export default Rating;
