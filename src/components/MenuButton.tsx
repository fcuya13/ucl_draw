import { Button } from 'antd';

interface ButtonProps {
	style?: React.CSSProperties | null,
	onClick: () => void,
	description: React.ReactNode
}
const menuButton = ({style=null, onClick, description}: ButtonProps) => {
	return <Button style={{
		...style,
		width:"200px",
		height: "auto",
		alignSelf:"center",
		borderColor: "#9e16ce",
		color: "#05248c",
		borderWidth: 3,
		fontSize: "1rem"
	}} onClick={onClick}>{description}</Button>
}

export default menuButton