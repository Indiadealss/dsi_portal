// OTPInput.jsx
import React, { useRef, useState } from "react";

export default function Inputforotp({ length, onComplete }) {
  const [values, setValues] = useState(Array(length).fill(""));
  const refs = useRef(Array(length).fill(null));

  const focusInput = (idx) => {
    const node = refs.current[idx];
    if (node) node.focus();
  };

  const handleChange = (idx, e) => {
    const raw = e.target.value;
    // keep only first digit and only numbers
    const digit = raw.replace(/\D/g, "").slice(0, 1);
    if (!digit && raw !== "") return; // ignore non-digit input

    const next = [...values];
    next[idx] = digit;
    setValues(next);

    if (digit) {
      // move forward if not last
      if (idx < length - 1) focusInput(idx + 1);
    }

    // if all filled, call onComplete
    if (next.every((v) => v !== "")) {
      onComplete?.(next.join(""));
    }
  };

  const handleKeyDown = (idx, e) => {
    const key = e.key;

    if (key === "Backspace") {
      // If current has value, clear it. If empty, move back and clear previous
      if (values[idx]) {
        const next = [...values];
        next[idx] = "";
        setValues(next);
      } else if (idx > 0) {
        const prevIdx = idx - 1;
        const next = [...values];
        next[prevIdx] = "";
        setValues(next);
        focusInput(prevIdx);
      }
      // prevent default so cursor doesn't do weird things
      e.preventDefault();
      return;
    }

    if (key === "ArrowLeft" && idx > 0) {
      focusInput(idx - 1);
      e.preventDefault();
      return;
    }
    if (key === "ArrowRight" && idx < length - 1) {
      focusInput(idx + 1);
      e.preventDefault();
      return;
    }

    // Optional: allow pressing Enter to submit if all filled
    if (key === "Enter") {
      if (values.every((v) => v !== "")) {
        onComplete?.(values.join(""));
      }
    }
  };

  const handlePaste = (idx, e) => {
    e.preventDefault();
    const paste = (e.clipboardData || window.clipboardData).getData("text");
    const digits = paste.replace(/\D/g, "").slice(0, length - idx).split("");
    if (digits.length === 0) return;

    const next = [...values];
    for (let i = 0; i < digits.length; i++) {
      next[idx + i] = digits[i];
    }
    setValues(next);

    // focus the position after the last pasted digit (or last input)
    const newFocus = Math.min(idx + digits.length, length - 1);
    focusInput(newFocus);

    if (next.every((v) => v !== "")) {
      onComplete?.(next.join(""));
    }
  };

  return (
    <div className="flex gap-2">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          value={values[i]}
          onChange={(e) => handleChange(i, e)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={(e) => handlePaste(i, e)}
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={1}
          aria-label={`OTP digit ${i + 1}`}
          className="w-12 h-12 text-center text-xl rounded border focus:outline-none focus:ring"
          // style can be replaced with Tailwind or your own CSS
        />
      ))}
    </div>
  );
}
