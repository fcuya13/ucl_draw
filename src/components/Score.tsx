import { Input } from 'antd';
import { useEffect, useState } from 'react';

const Score = ({score, setScore}: any) => {

	const [status, setStatus] = useState<''| 'warning'| 'error'|undefined>('')

	const checkScore =() => {
		if (!isNaN(score)){
			setStatus('')
		}
		else{
			setStatus('error')
		}
	}

	useEffect(() => {
		checkScore()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [score]);


	return    <Input placeholder="0" status={status} value={score} onChange={(e) => setScore(e.target.value)} style={{
		height:"100%",
		width: "50%",
		marginLeft:"25%",
		marginRight:"25%",
		borderWidth:1,
		borderStyle:"solid",
		borderRadius: 5,
		fontSize:20,
		fontWeight:"bold",
		textAlign:"center",
		padding:0
	}}/>

}

export default Score