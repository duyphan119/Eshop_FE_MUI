import Container from "react-bootstrap/esm/Container";
// import { Link } from "react-router-dom";

const Banners = () => {
  return (
    <Container
      style={{
        padding: "30px 0",
      }}
    >
      <div
        style={{
          textAlign: "center",
          margin: "20px 0",
          fontSize: "2rem",
          color:"var(--main-color)"
        }}
      >
        #YODY
      </div>
      <a
        href={`https://yody.vn/sieu-su-kien-livestream-9-3-yody-tang-qua-mien-phi-1-ty-dong`}
        style={{
          display: "block",
          width: "100%",
          height: "400px",
          backgroundImage: `url(${"https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/b1.jpg?1646486842767"})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          margin: "20px 0",
        }}
      > </a>
      <a
        href={`https://yody.vn/polo-cafe`}
        style={{
          display: "block",
          width: "100%",
          height: "400px",
          backgroundImage: `url(${"https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/b2.jpg?1646486842767"})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          margin: "20px 0",
        }}
      > </a>
      <a
        href={`https://yody.vn/san-pham-cotton-usa`}
        style={{
          display: "block",
          width: "100%",
          height: "400px",
          backgroundImage: `url(${"https://bizweb.dktcdn.net/100/438/408/themes/848101/assets/b3.jpg?1646486842767"})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          margin: "20px 0",
        }}
      > </a>
    </Container>
  );
};

export default Banners;
