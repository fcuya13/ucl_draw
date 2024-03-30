import {Layout, Typography} from "antd";
import React, { PropsWithChildren, useEffect, useState } from 'react';

const PageLayout = ({children}: PropsWithChildren) => {
    const { Header, Footer } = Layout;
    const {Paragraph} = Typography
    const [times, setTimes] = useState<number>(0)

    const times_fn = async () => {
        const response = await fetch('https://bam6bjtbj5.execute-api.us-east-2.amazonaws.com/get_drawn_times')
        const data = await response.json()
        setTimes(parseInt(data['body']))
    }

    useEffect(() => {
        times_fn()
    }, []);

    const headerStyle: React.CSSProperties = {
        textAlign: 'center',
        height: "auto",
        paddingInline: 48,
        lineHeight: '64px',
    };

    const footerStyle: React.CSSProperties = {
        textAlign: 'center',
        backgroundColor: '#282424',
        height: "auto",
        padding:10,
        marginTop:"auto"
    };

    return <Layout  style={{
        backgroundColor:"white",
        height: "100vh"
    }}>
        <Header className="gradient" style={headerStyle}>
            <Typography className="title" style={{
                color: "white",
                fontSize: 40,
                fontWeight: "bold",
                margin: 'auto',
                marginTop: 5,
                marginBottom: 5,
                width:"50%",

            }} >
                UEFA Champions League 24-25 Group Stage Draw
            </Typography>
        </Header>
        {children}
        <Footer style={footerStyle}>
            <Typography>
                <Paragraph style={{color:"white", margin:1}}>
                    2024 Franco Cuya | All Rights Reserved
                </Paragraph>
                <Paragraph style={{color:"white",  marginBottom:0}}>
                    Este sorteo ha sido completado {times} veces
                </Paragraph>
            </Typography>
        </Footer>
    </Layout>
}

export default PageLayout