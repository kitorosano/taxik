import TaxikLogo from "/resources/assets/img/taxik-logo.png";
export default function ApplicationLogo(props) {
    return <img className="w-24 h-24" src={TaxikLogo} width={24} {...props} />;
}
