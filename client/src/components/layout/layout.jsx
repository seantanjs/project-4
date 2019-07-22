import React from 'react';

class Layout extends React.Component {

    render(){
        return (
             <html>
            <head>
                <meta charSet="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>

                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css"/>
                <link rel="stylesheet" type="text/scss" href="style.scss"/>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>
                <title>Layout</title>
            </head>
            <body>
                {this.props.children}
            </body>
        </html>
        );
    }
}

export default Layout;