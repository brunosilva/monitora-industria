import { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { api } from '../../services/api';

import style from './style.module.scss';

interface UserUnitProps {
    unitId: number;
}

interface AtivoUnitProps {
    unitId: number;
}

interface StatusAtivoProps {
    status: string;
}

const chartData = (unit1: Number = 0, unit2: Number = 0) => {
    return {
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
                data: [unit1] // 4
            },
            {
                name: 'Unidade Tobias',
                data: [unit2] // 2

            }
        ]
    }
}

const chartDataAtivos = (ativoUnit1: Number = 0, ativoUnit2: Number = 0) => {
    return {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Total de Ativos por unidade'
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
                data: [ativoUnit1] // 4
            },
            {
                name: 'Unidade Tobias',
                data: [ativoUnit2] // 2

            }
        ]
    }
}

const chartDataStatusAtivos = (inAlert: Number = 0, inOperation: Number = 0, inDowntime: number = 0) => {
    return {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Total de Ativos por status'
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
                name: 'Em Alerta',
                data: [inAlert] // inAlert
            },
            {
                name: 'Em Operação',
                data: [inOperation] // inOperation

            },
            {
                name: 'Em Parada',
                data: [inDowntime] // inDowntime

            }
        ]
    }
}

export default function Body() {
    const [initializeChart, _] = useState(0);
    const [optionsChart, setOptionsChart] = useState(chartData());
    const [optionsChartAtivos, setOptionsChartAtivos] = useState(chartDataAtivos());
    const [optionsChartStatusAtivos, setOptionsChartStatusAtivos] = useState(chartDataStatusAtivos());

    useEffect(() => {
        api.get<UserUnitProps[]>('/users').then(response => {
            const usersUnit = response.data;
            const unidade1 = usersUnit.filter((e) => e.unitId === 1).length;
            const unidade2 = usersUnit.filter((e) => e.unitId === 2).length;
            setOptionsChart(chartData(unidade1,unidade2))
        })
    }, [initializeChart]);

    useEffect(() => {
        api.get<AtivoUnitProps[]>('/assets').then(response => {
            const ativoUnit = response.data;
            const ativoUnit1 = ativoUnit.filter((e) => e.unitId === 1).length;
            const ativoUnit2 = ativoUnit.filter((e) => e.unitId === 2).length;
            setOptionsChartAtivos(chartDataAtivos(ativoUnit1,ativoUnit2))
        })
    }, [initializeChart]);

    useEffect(() => {
        api.get<StatusAtivoProps[]>('/assets').then(response => {
            const statusAtivo = response.data;
            const inAlert = statusAtivo.filter((e) => e.status === 'inAlert').length;
            const inOperation = statusAtivo.filter((e) => e.status === 'inOperation').length;
            const inDowntime = statusAtivo.filter((e) => e.status === 'inDowntime').length;
            setOptionsChartStatusAtivos(chartDataStatusAtivos(inAlert,inOperation,inDowntime))
        })
    }, [initializeChart]);

    return (
        <div className={style.container}>
            <Row className={style.rowCharts} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
                <Col className="gutter-row" xs={24} sm={24} md={24} lg={8}>
                    <HighchartsReact xs={24} sm={24} md={24} lg={8}
                        highcharts={Highcharts}
                        options={optionsChartAtivos}
                    />
                </Col>
                <Col className="gutter-row" xs={24} sm={24} md={24} lg={8}>
                    <HighchartsReact  xs={24} sm={24} md={24} lg={8}
                        highcharts={Highcharts}
                        options={optionsChart}
                    />
                </Col>
                <Col className="gutter-row" xs={24} sm={24} md={24} lg={8}>
                    <HighchartsReact xs={24} sm={24} md={24} lg={8}
                        highcharts={Highcharts}
                        options={optionsChartStatusAtivos}
                    />
                </Col>
            </Row>
        </div>
    )
}