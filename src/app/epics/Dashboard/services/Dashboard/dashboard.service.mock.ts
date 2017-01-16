export const DASHBOARD_MOCK : any = {

    getDashBoard : [{
        billing : {
            dueDate     : '06/02/15',
            dueAmount   : '310,876',
            lastPayment : {
                paymentAmount   : '309,987',
                paymentDate     : '04/01/2016'
            }
        },
        employee : {
            dayOfWeekUpdate : 'Wed',
            numEmployees    : '3,092'
        },
        claims  : {
            claimsFiled         : 25,
            claimsEvaluating    : 12,
            claimsProcessing    : 33
        },
        plans   : [
            {
                planType    : 'Life',
                amountMonth : '$15,150,000',
                numCoverage : '9,045'
            },
            {
                planType    : 'AD&D',
                amountMonth : '$17,350,000',
                numCoverage : '8,035'
            },
            {
                planType    : 'Critical Illness',
                amountMonth : '$12,245,000',
                numCoverage : '6,015'
            }
        ]
    }],
    getDashBoardWrap : {
        billing : {
            dueDate     : '06/02/15',
            dueAmount   : '310,876',
            lastPayment : {
                paymentAmount   : '309,987',
                paymentDate     : '04/01/2016'
            }
        },
        employee : {
            dayOfWeekUpdate : 'Wed',
            numEmployees    : '3,092'
        },
        claims  : {
            claimsFiled         : 25,
            claimsEvaluating    : 12,
            claimsProcessing    : 33
        },
        plans   : [
            {
                planType    : 'Life',
                amountMonth : '$15,150,000',
                numCoverage : '9,045'
            },
            {
                planType    : 'AD&D',
                amountMonth : '$17,350,000',
                numCoverage : '8,035'
            },
            {
                planType    : 'Critical Illness',
                amountMonth : '$12,245,000',
                numCoverage : '6,015'
            }
        ]
    },

    getCarouselMessages : [
        {
            title       : 'Salary Update',
            summary     : 'Reporting your employees\' earnings correctly helps ensure their benefits coverages are correct and premiums are accurate.',
            linkDesc    : 'Learn'
        },
        {
            title       : 'Lorium Ipsum',
            summary     : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eu scelerisque est Duis ultrices elit eu rutrum porta.',
            linkDesc    : 'Dolor'
        },
        {
            title       : 'Workwell Launch',
            summary     : 'Unum is pleased to announce the launch of Workwell, an educational site for your employees to make the most of work life.',
            linkDesc    : 'Dolor'
        }
    ],
    getCarouselMessagesWrap : {
        title       : 'Salary Update',
        summary     : 'Reporting your employees\' earnings correctly helps ensure their benefits coverages are correct and premiums are accurate.',
        linkDesc    : 'Learn'
    }
};
