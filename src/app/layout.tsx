"use client";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { theme } from "../lib/Theme"
import CssBaseline from "@mui/material/CssBaseline";
import { SnackbarProvider } from "notistack"
import Sidebar from "@/component/Sidebar";
import { Box } from "@mui/material";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <SnackbarProvider
            maxSnack={3}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
          >
            <Box display="flex" flexDirection={'row'} minHeight="100vh"  width={'100vw'}>
               <Sidebar />
                <Box  width={'100vw'}>
                  {children}
              </Box>
            </Box>
          </SnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
