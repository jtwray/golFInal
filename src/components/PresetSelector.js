import React, { useState } from "react";
import { presets } from "../data/presets";
import "./PresetSelector.css";

export default function PresetSelector({ onLoad }) {
  const [selected, setSelected] = useState("glider");

  return (
    <div className="presetControls">
      <label htmlFor="preset-select">Starting pattern</label>
      <select
        id="preset-select"
        value={selected}
        onChange={(event) => setSelected(event.target.value)}
        aria-describedby="preset-description"
      >
        {Object.entries(presets).map(([id, preset]) => (
          <option key={id} value={id}>{preset.name}</option>
        ))}
      </select>
      <p id="preset-description">{presets[selected].description}</p>
      <button type="button" onClick={() => onLoad(selected)}>
        Load pattern
      </button>
    </div>
  );
}
