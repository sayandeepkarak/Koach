import { memo } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Button } from "./LoadingButton.styled";

interface props {
  isLoading: boolean;
  text: string;
  type: "submit" | "button" | "reset";
  color: string;
  width?: string;
}

const LoadingButton = ({ isLoading, text, type, color, width }: props) => {
  return (
    <Button style={{ backgroundColor: color, width }} type={type}>
      {isLoading ? (
        <CircularProgress
          variant="indeterminate"
          value={25}
          size={25}
          sx={{ color: "var(--white)" }}
        />
      ) : (
        text
      )}
    </Button>
  );
};

export default memo(LoadingButton);
