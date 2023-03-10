import './button.scss';
// https://github.com/trananhtuat/react-modal
const Button = props => {
    return <button onClick={props.onClick}>
        {props.children}
    </button>;
};

export default Button;