export const EMPLOYER_MOCKS : any = {
    getCompanies            : [
        {
            name    : 'ABC_COMPANY',
            address : '2088 Union St',
            city    : 'San Francisco',
            state   : 'CA',
            zipCode : '94123',
            phone   : [
                {
                    type   : 'Main',
                    number : '(123) 456-7890'
                },
                {
                    type   : 'Office',
                    number : '(198) 897-3784'
                }
            ],
            email   : 'hello@abccompany.com',
            admin   : {
                name    : 'Joel Morgan',
                phone   : [
                    {
                        type   : 'Mobile',
                        number : '(321) 654-0987'
                    }
                ],
                email   : 'joel.morgan@abccompany.com'
            }
        },
        {
            name    : 'XYZ_COMPANY',
            address : '2088 Union St',
            city    : 'Boston',
            state   : 'CA',
            zipCode : '94123',
            phone   : [
                {
                    type   : 'Main',
                    number : '(123) 456-7890'
                },
                {
                    type   : 'Office',
                    number : '(198) 897-3784'
                }
            ],
            email   : 'hello@abccompany.com',
            admin   : {
                name    : 'Joel Morgan',
                phone   : [
                    {
                        type   : 'Mobile',
                        number : '(321) 654-0987'
                    }
                ],
                email   : 'joel.morgan@abccompany.com'
            }
        }
    ],
    getCompaniesWrap        : {
        name    : 'ABC Company',
        address : '2088 Union St',
        city    : 'San Francisco',
        state   : 'CA',
        zipCode : '94123',
        phone   : [
            {
                type   : 'Main',
                number : '(123) 456-7890'
            },
            {
                type   : 'Office',
                number : '(198) 897-3784'
            }
        ],
        email   : 'hello@abccompany.com',
        admin   : {
            name    : 'Joel Morgan',
            phone   : [
                {
                    type   : 'Mobile',
                    number : '(321) 654-0987'
                }
            ],
            email   : 'joel.morgan@abccompany.com'
        }
    },

    getPlans                : [
        {
            type        : 'LIFE',
            amount      : '15,150,000',
            employees   : '9,045'
        },
        {
            type        : 'AD_&_D',
            amount      : '15,150,000',
            employees   : '9,045'
        },
        {
            type        : 'CRITICAL_ILLNESS',
            amount      : '15,150,000',
            employees   : '9,045'
        }
    ],
    getPlansWrap            : {
        type        : 'LIFE',
        amount      : '15,150,000',
        employees   : '9,045'
    }
};
