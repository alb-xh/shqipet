import logo from '../../assets/logo.png';

export default function Logo() {
  return (
    <img height={100} src={logo} alt="logo" style={{ userSelect: "none" }} />
  );
}