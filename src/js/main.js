$(function () {

    var defaultJson = function () {
        return {
            desc1: "",
            desc2: "",
            desc3: "",
            price: "",
            gst: "",
            amount: 0
        }
    }

    var tableArray = [];

    $('.submitButton').click(function (e) {
        e.preventDefault();
        var tempJson = defaultJson();

        tempJson.desc1 = $('input#desc1').val();
        tempJson.desc2 = $('input#desc2').val();
        tempJson.desc3 = $('input#desc3').val();
        tempJson.price = $('input#price').val();
        tempJson.gst = $('input#gst').val();
        tempJson.amount = parseInt(tempJson.price) + parseInt(tempJson.gst);
        console.log(tempJson);
        tableArray.push(tempJson);
        
        setTableTODisplay(tempJson);
    });

    var setTableTODisplay = function(data) {
        var table = $('.myTable');
            table.append( $( '<tr>' ) );

            table.append(
                $('<td>'+data.desc1+'<br>'+data.desc2+'<br>'+data.desc3+'</td>' + 
                    '<td></td>' +
                    '<td>'+data.price+'</td>' +
                    '<td>'+data.gst+'</td>' +
                    '<td>'+data.amount+'</td>')
            )

            table.append( $( '</tr>' ) );
    };

    $('.pdfButton').click(function(e) {
        e.preventDefault();

        if(mainJson.content[3].table.body.length > 1) {
            mainJson.content[3].table.body = mainJson.content[3].table.body.slice(0,1);
        }

        for(var i=0; i<tableArray.length; i++) {
            mainJson.content[3].table.body.push([
                {
                    "text": tableArray[i].desc1 + "\n" + tableArray[i].desc2 + "\n" + tableArray[i].desc3
                },
                {},
                {
                    "text": tableArray[i].price
                },
                {
                    "text": tableArray[i].gst
                },
                {
                    "text": tableArray[i].amount
                }
            ])
        };

        var totals = getTotals();

        mainJson.content[3].table.body.push(getSubTotal(totals.subTotal));
        mainJson.content[3].table.body.push(getGstTotal(totals.gstTotal));
        mainJson.content[3].table.body.push(getMainTotal(totals.mainTotal));

        console.log(mainJson);
        pdfMake.createPdf(mainJson).download();
    });

    var getTotals = function() {

        var subTotal = 0;
        var gstTotal = 0;
        var mainTotal = 0;

        for(var i=0; i<tableArray.length; i++) {
            subTotal = subTotal + parseInt(tableArray[i].price);
            gstTotal = gstTotal + parseInt(tableArray[i].gst);
            mainTotal = subTotal + gstTotal;
        };

        return {
            subTotal: subTotal,
            gstTotal: gstTotal,
            mainTotal : mainTotal 
        }
    };

    var getSubTotal = function(total) {
        return [
            {
                "text": "Bank NAB \n Ac Name Saradhi Pyt Ltd \n BSB 084-004 Ac No 912655894 \n\n Phone Number - 0456078190",
                "rowSpan": 3,
                "colSpan": 2
            },
            "",
            {
                "text": "Subtotal",
                "colSpan": 2
            },
            "",
            {
                "text": "$"+total
            }
        ];
    };
    var getGstTotal = function(total) {
        return [
            "",
            "",
            {
                "text": "GST",
                "colSpan": 2
            },
            "",
            {
                "text": "$"+total
            }
        ];
    };
    var getMainTotal = function(total) {
        return [
            "",
            "",
            {
                "text": "Total",
                "colSpan": 2
            },
            "",
            {
                "text": "$"+total
            }
        ];
    };
 



    // ******************  Sample Json **********************************

    var mainJson = {
        "content": [
            {
                "text": "Saradhi Pty Ltd",
                "style": "header"
            },
            {
                "columns": [
                    {
                        "text": "21 Christophert St \n Augustine Heights, QLD 4300 \n E-mail - balikopparthi@gmail.com \n Phone Number - 0456078190"
                    },
                    [
                        {
                            "text": [
                                {
                                    "text": "Tax Invoice \n",
                                    "style": "header2"
                                }
                            ]
                        },
                        {
                            "style": "InvDateTable",
                            "table": {
                                "body": [
                                    [
                                        "Tax Date",
                                        "Invoice No"
                                    ],
                                    [
                                        "18/02/2019",
                                        "10"
                                    ]
                                ]
                            }
                        }
                    ]
                ]
            },
            {
                "style": "AddrDateTable",
                "table": {
                    "body": [
                        [
                            {
                                "text": "Invoice To",
                                "colSpan": 2
                            },
                            {}
                        ],
                        [
                            {
                                "text": "Attention Payroll: \n Ochre Health PTY Ltd \n Ground Level Suit A, 140 William Street \n Wooloomooloo, NSW 2011 \n Email - invoices@ochrehealth.com.au \n T - +61 2 9357 2448",
                                "colSpan": 2
                            },
                            {}
                        ],
                        [
                            {
                                "text": "ABN"
                            },
                            {
                                "text": "79 101 069 452"
                            }
                        ]
                    ]
                }
            },
            {
                "style": "AmountDateTable",
                "table": {
                    "widths": [
                        "auto",
                        "*",
                        "*",
                        "*",
                        "*"
                    ],
                    "body": [
                        [
                            {
                                "text": "Description"
                            },
                            {
                                "text": "Qty"
                            },
                            {
                                "text": "Price"
                            },
                            {
                                "text": "GST"
                            },
                            {
                                "text": "Amount"
                            }
                        ]                        
                    ]
                }
            }
        ],
        "styles": {
            "header": {
                "fontSize": 18,
                "bold": true,
                "margin": [
                    0,
                    0,
                    0,
                    10
                ]
            },
            "header2": {
                "fontSize": 18,
                "bold": true,
                "alignment": "right"
            },
            "subheader": {
                "fontSize": 16,
                "bold": true,
                "margin": [
                    0,
                    10,
                    0,
                    5
                ]
            },
            "tableExample": {
                "margin": [
                    0,
                    5,
                    0,
                    15
                ]
            },
            "InvDateTable": {
                "alignment": "center",
                "margin": [
                    115,
                    0,
                    0,
                    0
                ]
            },
            "AddrDateTable": {
                "marginTop": 15
            },
            "AmountDateTable": {
                "marginTop": 15
            },
            "tableHeader": {
                "bold": true,
                "fontSize": 13,
                "color": "black"
            }
        }
    };

});