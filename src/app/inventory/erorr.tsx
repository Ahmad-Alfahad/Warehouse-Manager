"use client";

import { Button, Typography } from "@mui/material";

export default function ErrorPage({
 
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <>
      <Typography color="error" variant="h6">
        Failed to load inventory
      </Typography>
      <Button onClick={reset}>Retry</Button>
    </>
  );
}
