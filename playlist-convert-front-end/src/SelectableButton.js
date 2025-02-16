import { useState } from "react";
import { Button, createColorScheme, createTheme } from "@mui/material";

export default function SelectableButton() {
  const [selected, setSelected] = useState(false);

  return (
    <Button
      onClick={() => setSelected(!selected)}
      variant="contained"
      color={selected ? "success" : "gray"}
    >
      {selected ? "Selected" : "Select"}
    </Button>
  );
}
