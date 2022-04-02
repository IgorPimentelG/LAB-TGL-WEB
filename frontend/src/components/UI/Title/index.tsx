import { Text } from './styles';

const Title: React.FC = (props) => {
    return(
        <Text>
            {props.children}
        </Text>
    );
}

export default Title;