import Typography from "@mui/material/Typography";

export function TitlePaper(props) {
  return (
    <Typography component="h2" variant="h6" color="primary" gutterBottom>
      {props.children}
    </Typography>
  );
}

export function TitleCenter(props) {
  return (
    <Typography
      component="h2"
      variant="h6"
      color="primary"
      gutterBottom
      textAlign="center"
      textTransform="uppercase"
      my={2}
    >
      {props.children}
    </Typography>
  );
}
