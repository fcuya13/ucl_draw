import {Layout, Typography} from "antd";
import React, {PropsWithChildren} from "react";

const PageLayout = ({children}: PropsWithChildren) => {
    const { Header, Footer } = Layout;
    const {Paragraph} = Typography

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
                fontSize: 32,
                fontWeight: "bold",
                margin: 5,
            }} >
                UCL Group Stage Draw
            </Typography>
        </Header>
        {children}
        <Footer style={footerStyle}>
            <Typography>
                <Paragraph style={{color:"white", margin:1}}>
                    2024 Franco Cuya | All Rights Reserved
                </Paragraph>
                <Paragraph style={{color:"white",  marginBottom:0}}>
                    www.github.com/fcuya13
                </Paragraph>
            </Typography>
        </Footer>
    </Layout>
}

export default PageLayout