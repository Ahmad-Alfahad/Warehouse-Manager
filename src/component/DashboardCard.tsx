"use client";

import {
  Card,
  CardContent,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import Link from "next/link";

interface Props {
  title: string;
  value: string;
  link: string;
  icon: React.ReactNode;
  color?: string;
}

export default function DashboardCard({
  title,
  value,
  link,
  icon,
  color = "#1976d2",
}: Props) {
  return (
    <Card
      component={Link}
      href={link}
      sx={{
        height: 150,
        width: 200,
        textDecoration: "none",
        borderRadius: 3,
        boxShadow: 3,
        display: "flex",
        alignItems: "center",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: 6,
        },
      }}
    >
      <CardContent
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>

          <Typography variant="h6" fontWeight="bold">
            {value}
          </Typography>
        </Box>

        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{
            width: 48,
            height: 48,
            borderRadius: "50%",
            backgroundColor: color,
            color: "#fff",
          }}
        >
          {icon}
        </Stack>
      </CardContent>
    </Card>
  );
}
