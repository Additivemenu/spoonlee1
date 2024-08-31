
type Props = {
    name: string;
    age: number;
}

const Title : React.FC<Props> = ({name, age}) =>{
    return (
        <div>
            <h3>This is a title</h3>
            <h5>{name}</h5>
            <h5>{age}</h5>
        </div>
    )
}

export default Title;