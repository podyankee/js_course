const smartgrid = require('smart-grid');

const settings = {
    outputStyle: 'sass',
    columns: 12,
    offset: '10px',
    container: {
        maxWidth: '1210px',
        fields: '10px'
    },
    breakPoints: {
        md: {
            width: "992px",
            fields: "10px"
        },
        sm: {
            width: "720px",
            fields: "10px"
        },
        xs: {
            width: "576px",
            fields: "5px"
        },
        xxs: {
            width: "380px",
            fields: "5px"
        }
    },
    oldSizeStyle: false,
    properties: [
        'justify-content'
    ]
};

smartgrid('./source/libs', settings);