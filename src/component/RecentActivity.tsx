import { Card, CardContent, Typography, List, ListItem } from "@mui/material";

export default function RecentActivity() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Recent Activity</Typography>
        <List>
          <ListItem>➕ Added product</ListItem>
          <ListItem>🗑️ Removed item from order</ListItem>
          <ListItem>📦 Order confirmed</ListItem>
        </List>
      </CardContent>
    </Card>
  );
}
