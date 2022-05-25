import Typography from "@mui/material/Typography";

export function TitlePaper(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}
