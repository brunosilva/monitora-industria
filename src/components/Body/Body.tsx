import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import {
    HighchartsChart, Chart, withHighcharts, XAxis, YAxis, Title, Legend, ColumnSeries, SplineSeries, PieSeries
} from 'react-jsx-highcharts';

import { api } from '../../services/api';
import HighchartsReact from 'highcharts-react-official';

interface UserUnit {
    unitId: number;
}

export default function Body() {
    const [usersUnit, setUsersUnit] = useState<UserUnit[]>([]);

    useEffect(() => {
        api.get<UserUnit[]>('/users').then(response => {
            setUsersUnit(response.data);
        })
    });

    const unidade1 = usersUnit.filter((e) => e.unitId === 1).length;
    const unidade2 = usersUnit.filter((e) => e.unitId === 2).length;


    const optionsChart = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Total Usuários por unidade'
        },
        xAxis: {
            crosshair: true
        },
        yAxis: {
            title: {
                text: 'Quantidade (un)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y} </b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        series: [
            {
                name: 'Unidade Jaguar',
                data: [4]

            },
            {
                name: 'Unidade Tobias',
                data: [2]

            }
        ]
    }


    return (
        <>
            <HighchartsReact
                highcharts={Highcharts}
                options={optionsChart}
            />
        </>
    )
}