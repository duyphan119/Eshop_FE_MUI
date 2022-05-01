import {
  Box,
  Container,
  Grid,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import MailIcon from "@mui/icons-material/Mail";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
const Footer = () => {
  return (
    <Box
      bgcolor="var(--main-color)"
      style={{
        marginTop: "auto",
        paddingBlock: "24px",
      }}
    >
      <Container>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <List>
              <ListItem>
                <Typography variant="h5">Về chúng tôi</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="body2">
                  CHICK DEV được thành lập vào ngày 11/4/2022 bởi Phan Khánh Duy
                  - một lập trình viên dởm nhưng đầy tâm huyết và nổ lực. Sản
                  phẩm chúng tôi rất chất lượng. Mặc một lần là mê tới chết.
                </Typography>
              </ListItem>
              <ListItem>
                <Link
                  sx={{
                    borderRadius: "5px",
                    width: "34px",
                    height: "34px",
                    backgroundColor: "var(--main-color)",
                    boxShadow: "0 0 3px 0 #333",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "10px",
                  }}
                  href="https://www.facebook.com/duydusk1"
                >
                  <FacebookIcon
                    style={{
                      color: "#000",
                      fontSize: "18px",
                    }}
                  />
                </Link>
                <Link
                  sx={{
                    borderRadius: "5px",
                    width: "34px",
                    height: "34px",
                    backgroundColor: "var(--main-color)",
                    boxShadow: "0 0 3px 0 #333",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "10px",
                  }}
                  href="https://www.instagram.com/khanh_duy_p/"
                >
                  <InstagramIcon
                    style={{
                      color: "#000",
                      fontSize: "18px",
                    }}
                  />
                </Link>
                <Link
                  sx={{
                    borderRadius: "5px",
                    width: "34px",
                    height: "34px",
                    backgroundColor: "var(--main-color)",
                    boxShadow: "0 0 3px 0 #333",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: "10px",
                  }}
                  href="https://www.linkedin.com/in/duy-phan-3802a51a2/"
                >
                  <LinkedInIcon
                    style={{
                      color: "#000",
                      fontSize: "18px",
                    }}
                  />
                </Link>
                <Link
                  sx={{
                    borderRadius: "5px",
                    width: "34px",
                    height: "34px",
                    backgroundColor: "var(--main-color)",
                    boxShadow: "0 0 3px 0 #333",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  href="https://github.com/duyphan119"
                >
                  <GitHubIcon
                    style={{
                      color: "#000",
                      fontSize: "18px",
                    }}
                  />
                </Link>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={6}>
            <List>
              <ListItem>
                <Typography variant="h5">Liên hệ</Typography>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocationOnIcon />
                </ListItemIcon>
                <ListItemText primary="115/20 Hoàng Hoa Thám, P2, Tp Tân An, tỉnh Long An," />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                <ListItemText primary="0385981196" />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <MailIcon />
                </ListItemIcon>
                <ListItemText primary="duychomap123@gmail.com" />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
