import React from 'react';
import { Helmet } from 'react-helmet';

const Head: React.FC<{ name: string; }> = ({ name }) => {
    return(
        <Helmet>
            <title>TGL | {name}</title>
        </Helmet>
    );
}

export default Head;